import {useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        const { id } = e.currentTarget
        navigate(`/${id}`)
    }

    return <div className="absolute bottom-0 w-full h-[80px] z-50 flex justify-around items-center border-t-[1px] border-black bg-white">
        <div className="cursor-pointer" onClick={e => onClickHandler(e)} id="home">홈</div>
        <div className="cursor-pointer" onClick={e => onClickHandler(e)} id="map">지도</div>
        <div className="cursor-pointer" onClick={e => onClickHandler(e)} id="board">게시판</div>
        <div className="cursor-pointer" onClick={e => onClickHandler(e)} id="mypage">마이페이지</div>
    </div>
}
