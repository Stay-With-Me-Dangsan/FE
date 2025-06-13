import { useAtom } from 'jotai';
import { userIdAtom, decodeJwt } from '../../store/jwt';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { IBoardCreate } from '../../types/dto/board';
import useAuthMutation from '../../hooks/auth/mutaion/useAuthMutation';
import useBoardMutation from '../../hooks/board/mutation/useBoardMutation';
import userApi from '../../api-url/auth/mypage.api';
import boardApi from '../../api-url/board/board.api';
import person from '../../asset/images/person.png';

const categories = [
  { label: '', value: '자유게시판' },
  { label: '정보게시판', value: '정보게시판' },
  { label: '질문게시판', value: '질문게시판' },
  { label: '호스트게시판', value: '호스트게시판' },
  { label: '세입자게시판', value: '세입자게시판' },
  // { label: '자유게시판', value: 'FREE' },
  // { label: '정보게시판', value: 'INFO' },
  // { label: '질문게시판', value: 'QNA' },
  // { label: '호스트게시판', value: 'HOST' },
  // { label: '세입자게시판', value: 'TENANT' },
];

export const BoardWrite = () => {
  const navigate = useNavigate();
  const [userId] = useAtom(userIdAtom);
  const [nickname, setNickname] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [generalFile, setGeneralFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // 썸네일 전용
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string>('');
  // 사진 여러 장 전용
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const { getMyPageMutation } = useAuthMutation();
  const { postBoardMutation } = useBoardMutation();

  const [form, setForm] = useState<IBoardCreate>({
    boardType: '',
    title: '',
    content: '',
    userId: Number(userId),
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      if (!userId) return;
      try {
        const res = await userApi.getMyPage(userId);
        const nick = res.data?.data?.result.nickname;
        console.log(nick);
        setNickname(nick);
      } catch (e) {
        console.error('닉네임 조회 실패', e);
      }
    };
    fetchNickname();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`${name} 선택/입력 값:`, value); // ← 여기가 핵심
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    //이미지 미리보기
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setGeneralFile(e.target.files[0]);
    }
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    setForm((prev) => ({ ...prev, content: prev.content + emoji.native }));
  };

  // 썸네일 선택 처리
  const onThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
  };

  // 이미지 여러 장 선택 처리
  const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // 기존 preview 해제
    imagePreviews.forEach(URL.revokeObjectURL);
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  // unmount 시 메모리 해제
  useEffect(
    () => () => {
      if (thumbPreview) URL.revokeObjectURL(thumbPreview);
      imagePreviews.forEach(URL.revokeObjectURL);
    },
    [thumbPreview, imagePreviews],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert('로그인 해주세요!');
      return;
    }

    if (!form.boardType || !form.title || !form.content) {
      alert('카테고리·제목·내용을 모두 입력해주세요.');
      return;
    }

    postBoardMutation.mutate(form, {
      onSuccess: async (res) => {
        console.log('res', res);
        // 서버 반환 구조에 맞춰 postId 꺼내기
        const postId = res.data.data.result;

        if (!postId) {
          alert('postId를 받아오지 못했습니다.');
          return;
        }
        console.log('postId:', postId);
        console.log('userId:', userId);

        // 1) 썸네일 업로드
        if (thumbFile) {
          const form = new FormData();
          form.append('file', thumbFile);
          form.append('id', String(postId));
          form.append('menu', 'board');
          form.append('type', 'thumbnail');
          await axios.post(`${process.env.REACT_APP_API_URL}/file/upload`, form, { withCredentials: true });
        }

        // 2) 사진들 업로드
        if (imageFiles.length) {
          const form = new FormData();
          imageFiles.forEach((file) => form.append('file', file));
          form.append('id', String(postId));
          form.append('menu', 'board');
          form.append('type', 'image');
          await axios.post(`${process.env.REACT_APP_API_URL}/file/upload`, form, { withCredentials: true });
        }

        if (generalFile) {
          const fileForm = new FormData();
          fileForm.append('file', generalFile);
          fileForm.append('postId', String(postId));

          await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PREFIX}/file`, fileForm, {
            withCredentials: true,
          });
        }

        alert('게시글 등록 성공!');
        navigate('/board');
      },
      onError: () => {
        alert('게시글 등록 실패');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-screen bg-white pb-[140px]">
      <div className="flex items-center p-4">
        <img src={person} alt="글쓴이 이미지" className="w-12 h-12" />
        <div className="grid ml-2 items-center">
          <span className="px-4 text-sm font-semibold text-gray-800 mb-2">{nickname}</span>
        </div>
      </div>

      <div className="px-4 mb-4">
        <select
          name="boardType"
          value={form.boardType}
          onChange={handleChange}
          //onChange={(e) => setForm((prev) => ({ ...prev, boardType: e.target.value }))}
          className="w-full border rounded p-2 text-gray-700">
          <option value="">게시판을 선택해주세요.</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="px-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="눈에 띄는 주제를 적어주세요!"
          className="w-full text-lg font-bold placeholder-gray-400 outline-none mb-4"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="내용을 적어주세요!"
          className="w-full flex-1 resize-none text-gray-700 placeholder-gray-400 outline-none min-h-[450px] mb-4"
        />
      </div>

      <div className="border-t border-gray-200 pt-3 pb-2 flex gap-6 items-center justify-start px-4">
        <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-2xl">
          😊
        </button>
        <button type="button" onClick={() => thumbInputRef.current?.click()} className="text-2xl">
          📷썸네일 선택
        </button>
        <input type="file" accept="image/*" ref={thumbInputRef} onChange={onThumbChange} className="hidden" />
        {/* 선택 즉시 미리보기 */}
        {thumbPreview && (
          <div className="px-4 mt-4">
            <p className="text-sm text-gray-500">썸네일 미리보기:</p>
            <img src={thumbPreview} alt="선택한 이미지 미리보기" className="w-full max-w-xs rounded-lg shadow" />
          </div>
        )}

        <button type="button" onClick={() => fileInputRef.current?.click()} className="text-2xl">
          📎
        </button>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      </div>
      {showEmojiPicker && (
        <div className="absolute z-50">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      <div>
        <button type="button" onClick={() => imagesInputRef.current?.click()}>
          📷 사진 여러 장 선택
        </button>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={imagesInputRef}
          onChange={onImagesChange}
          className="hidden"
        />
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      <div className="w-full fixed bottom-16 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-3 bg-white border-t border-gray-200">
        <button
          type="button"
          className="flex-1 h-12 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium hover:bg-[#9470DC] hover:text-white">
          임시 보관
        </button>
        <button
          type="submit"
          className="flex-1 h-12 bg-gray-100 text-gray-500 rounded-lg text-sm font-medium hover:bg-[#9470DC] hover:text-white">
          게시하기
        </button>
      </div>
    </form>
  );
};
