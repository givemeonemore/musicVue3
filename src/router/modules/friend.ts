import Layout from '@/views';

const friendRouter = {
  path: '/friend',
  name: 'friend',
  component: Layout,
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'friend',
    cnTitle: '关注',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
};

export default friendRouter;
