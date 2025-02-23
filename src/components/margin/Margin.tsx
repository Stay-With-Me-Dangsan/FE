interface IProps {
  direction: 'top' | 'right' | 'bottom' | 'left';
  size: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20;
  children?: React.ReactNode;
}

export const Margin = (props: IProps) => {
  const { direction, size, children } = props;

  const getMarginStyle = (direction: string, size: number) => {
    const marginSize = `${size * 4}px`;
    switch (direction) {
      case 'top':
        return { marginTop: marginSize };
      case 'right':
        return { marginRight: marginSize };
      case 'bottom':
        return { marginBottom: marginSize };
      case 'left':
        return { marginLeft: marginSize };
      default:
        return { marginBottom: marginSize };
    }
  };

  const style = getMarginStyle(direction, size);

  return <div style={style}>{children}</div>;
};
