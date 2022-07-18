import Layout from '@/views';

const productRouter = {
  path: '/product',
  name: 'product',
  component: Layout,
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'product',
    cnTitle: '商城',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
};

export default productRouter;
