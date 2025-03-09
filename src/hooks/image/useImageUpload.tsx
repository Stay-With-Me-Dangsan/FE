import { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

interface UseFileUploadReturn {
  FileUploadButton: () => JSX.Element;
  responseURL: string;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const uploadUrl = `${process.env.REACT_APP_IMAGE_URL}:${process.env.REACT_APP_IMAGE_PORT}/${process.env.REACT_APP_IMAGE_PREFIX}`;
  const imageUrl = `${process.env.REACT_APP_IMAGE_URL}:${process.env.REACT_APP_IMAGE_PORT}`;

  const [responseURL, setResponseURL] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (event.target.files) {
      await handleUpload(event.target.files[0]);
    }
  };

  const handleUpload = async (file: File): Promise<void> => {
    const formData = new FormData();

    formData.append('image', file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const resizedImageUrl = `${imageUrl}${response.data.resizedImageUrl}`;

      setResponseURL(resizedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다.', error);
    }
  };

  const handleButtonClick = (): void => {
    fileInputRef.current?.click();
  };

  const FileUploadButton = (): JSX.Element => (
    <div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <button onClick={handleButtonClick}>이미지 선택 및 업로드</button>
    </div>
  );

  return {
    FileUploadButton,
    responseURL,
  };
};
