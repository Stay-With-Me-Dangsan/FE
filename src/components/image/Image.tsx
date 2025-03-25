import { ImageTypeEnum } from '../../constant/enum';
import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  src: string;
  type: ImageTypeEnum;
  alt: string;
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  className?: string;
}

const imageType = {
  [ImageTypeEnum.LARGE_LOGO]: 383,
  [ImageTypeEnum.SMALL_LOGO]: 300,
  [ImageTypeEnum.LARGE]: 120,
  [ImageTypeEnum.MEDIUM]: 100,
  [ImageTypeEnum.SMALL]: 50,
  [ImageTypeEnum.THUMBNAIL]: 50,
};

export const Image = (props: IProps) => {
  const { src, type, alt, link, onClick, className } = props;

  const { isMobile } = useDeviceLayout();

  const imgElement = (
    <img
      className={`${onClick ? 'cursor-pointer' : ''} ${type === ImageTypeEnum.THUMBNAIL ? 'rounded-3xl' : ''} ${className}`}
      src={src}
      alt={alt}
      width={imageType[type]}
      height={imageType[type]}
      onClick={(event) => onClick && onClick(event)}
    />
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {imgElement}
    </a>
  ) : (
    imgElement
  );
};
