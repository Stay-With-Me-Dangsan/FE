import { useDeviceLayout } from '../../hooks/useDeviceLayout';

interface IProps {
  src: string;
  width: number;
  alt?: string;
}

export const Image = (props: IProps) => {
  const { src, width, alt = '' } = props;

  const { isMobile } = useDeviceLayout();

  return <img src={src} alt={alt} width={width} height={width} />;
};
