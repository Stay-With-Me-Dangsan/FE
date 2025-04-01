import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: IProps) => {
  const { children } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center overflow-x-hidden overflow-y-auto">
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
      <div className="w-full max-w-[960px] flex flex-col items-center overflow-y-auto">{children}</div>
      <div
        className={`${isMobile ? '' : 'w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]'}`}
      />
    </div>
  );
};
