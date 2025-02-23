import { useDeviceLayout } from '../../../hooks/useDeviceLayout';

interface IProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: IProps) => {
  const { children } = props;

  const { isMobile } = useDeviceLayout();

  return (
    <div className="h-[100vh] flex justify-center items-center overflow-x-hidden overflow-y-auto">
      <div className="w-[20px] h-full bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
      <div className={`${isMobile ? 'w-full' : 'w-[80vw]'} max-w-[960px] h-full px-[40px] flex flex-col items-center`}>
        {children}
      </div>
      <div className="w-[20px] h-full bg-gradient-to-l from-[#FFFFFF] via-[#F5F5F5] to-[#F1F1F1]" />
    </div>
  );
};
