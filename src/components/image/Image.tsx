interface IProps {
  src: string;
  width: number;
  alt?: string;
}

export const Image = (props: IProps) => {
  const { src, width, alt = '' } = props;

  return <img src={src} alt={alt} width={width} height={width} />;
};
