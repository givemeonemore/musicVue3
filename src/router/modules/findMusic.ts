import Layout from '@/views';

const findMusicRouter = {
  path: '/findmusic',
  name: 'findMusic',
  component: Layout,
  redirect: '/findmusic/recommend',
  meta: {
    icon: 'el-icon-menu',
    enTitle: 'findMusic',
    cnTitle: '发现音乐',
    level: 'firstMenu', // 第一层级的 menu
    // showLink: true,
    // savedPosition: true,
    // rank: 4
  },
  children: [
    {
      path: '/findmusic/recommend',
      name: 'recommend',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'recommend',
        cnTitle: '推荐',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
    {
      path: '/findmusic/toplist',
      name: 'toplist',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'toplist',
        cnTitle: '排行榜',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
    {
      path: '/findmusic/playlist',
      name: 'playlist',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'playlist',
        cnTitle: '歌单',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
    {
      path: '/findmusic/djradio',
      name: 'djradio',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'djradio',
        cnTitle: '主播电台',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
    {
      path: '/findmusic/artist',
      name: 'artist',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'artist',
        cnTitle: '歌手',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
    {
      path: '/findmusic/album',
      name: 'album',
      component: () => import('@/views/findMusic/recommend'),
      meta: {
        enTitle: 'album',
        cnTitle: '新碟上架',
        level: 'secondMenu', // 第二层级的 menu
      },
    },
  ],
};

export default findMusicRouter;
