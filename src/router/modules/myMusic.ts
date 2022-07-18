import Layout from '@/views';

const myMusicRouter = {
  path: '/mymusic',
  name: 'myMusic',
  component: Layout,
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'myMusic',
    cnTitle: '我的音乐',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
};

export default myMusicRouter;
