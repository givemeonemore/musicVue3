import http from '@/utils/http';

// 先进行预检，找到唯一码
export const getPrefit = () => {
  return http.get(`/login/qr/key?timerstamp=${Date.now()}`);
};

// 获取二维码
export const getQRcode = (key: string) => {
  return http.get(`/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`);
};

// 校验二维码状态
export const getQRcodeStatus = (key: string) => {
  return http.get(`/login/qr/check?key=${key}&timerstamp=${Date.now()}`);
};

// 校验登录状态
export const getLoginStatus = () => {
  return http.get(`/login/status?timerstamp=${Date.now()}`);
};

// 退出登录
export const logout = () => {
  return http.get(`/logout?timerstamp=${Date.now()}`);
};
