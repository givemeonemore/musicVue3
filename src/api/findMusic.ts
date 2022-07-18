import http from '@/utils/http';

// 获取验证码
export const getSong = (keywords) => {
  return http.get(`/search?keywords=${keywords}`);
};
