import Layout from '@/views';

const downloadRouter = {
  path: '/download',
  name: 'download',
  component: Layout,
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'download',
    cnTitle: '下载客户端',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
};

export default downloadRouter;
