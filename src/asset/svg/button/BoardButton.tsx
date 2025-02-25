import { useDeviceLayout } from '../../../hooks/useDeviceLayout';
import { ISvgBoardButtonProps } from './interface';

export const BoardButton = ({ color, onClick }: ISvgBoardButtonProps) => {
  const { isMobile } = useDeviceLayout();

  return (
    <svg
      width={isMobile ? '60' : '90'}
      height={isMobile ? '52' : '68'}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}>
      <rect width="100" height="100" rx="50" fill={color} />
      <path
        d="M64.9205 35.0808C62.5912 32.7516 58.8148 32.7517 56.4858 35.0811L36.569 55.0002C35.8918 55.6775 35.4158 56.5293 35.194 57.461L33.368 65.1301C33.2675 65.5525 33.3932 65.9967 33.7001 66.3035C34.0071 66.6105 34.4513 66.7362 34.8735 66.6357L42.5423 64.8098C43.4743 64.5878 44.3264 64.1117 45.0038 63.4342L64.9206 43.515C67.2495 41.1858 67.2495 37.4098 64.9205 35.0808ZM58.2536 36.8487C59.6063 35.4958 61.7998 35.4957 63.1526 36.8486C64.5053 38.2013 64.5055 40.3945 63.1528 41.7473L61.6673 43.2331L56.7683 38.3342L58.2536 36.8487ZM55.0007 40.102L59.8997 45.0009L43.236 61.6665C42.8857 62.0168 42.4451 62.263 41.9632 62.3778L36.2705 63.7331L37.626 58.0401C37.7407 57.5583 37.9868 57.118 38.3369 56.7678L55.0007 40.102Z"
        fill="white"
      />
    </svg>
  );
};
