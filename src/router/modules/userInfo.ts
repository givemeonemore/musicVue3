/*
 * @Author: zhouran
 * @Date: 2022-05-26 14:29:10
 * @LastEditors: zhouran
 * @LastEditTime: 2022-05-26 15:09:11
 * @Description:
 */
import Layout from '@/views';

const userInfoRouter = {
  path: '/user',
  name: 'user',
  component: Layout,
  children: [
    {
      path: '/user/material',
      name: 'material',
      component: () => import('@/views/userInfo/material'),
    },
  ],
};

export default userInfoRouter;
