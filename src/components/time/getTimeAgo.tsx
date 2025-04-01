export const getTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diff = (now.getTime() - targetDate.getTime()) / 1000; // 초 단위

  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
  return `${targetDate.toLocaleDateString('ko-KR')}`; // 오래된 경우 날짜로
};
