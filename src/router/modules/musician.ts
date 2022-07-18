import Layout from '@/views';

const musicianRouter = {
  path: '/musician',
  name: 'musician',
  component: Layout,
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'musician',
    cnTitle: '音乐人',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
};

export default musicianRouter;
