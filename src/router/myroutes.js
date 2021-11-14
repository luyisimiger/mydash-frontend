/* Layout */
import Layout from '@/layout'

const myroutes = [
  {
    path: '/google',
    name: 'google',
    component: Layout,
    meta: { title: 'Google', icon: 'google' },
    children: [
      {
        path: 'gmail/filters',
        name: 'gmail',
        component: () => import('@/views/google/gmail/index'),
        meta: { title: 'Gmail', icon: 'gmail' },
        children: [
          {
            path: 'inbox/:name',
            name: 'gmail-inbox',
            hidden: true,
            component: () => import('@/views/google/gmail/Inbox'),
            meta: { title: 'Inbox', icon: 'gmail' },
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/trm',
    name: 'trm',
    component: Layout,
    redirect: '/trm/history',
    meta: { title: 'TRM', icon: 'refresh' },
    children: [
      {
        path: 'history',
        name: 'trmHistory',
        component: () => import('@/views/TRM'),
        meta: { title: 'TRM HISTORY', icon: 'dollar' }
      }
    ]
  },
  {
    path: '/binance',
    name: 'binance',
    component: Layout,
    redirect: '/binance/spot',
    meta: { title: 'TRM', icon: 'refresh' },
    children: [
      {
        path: 'spot',
        name: 'binanceSpot',
        component: () => import('@/views/binance/spot.vue'),
        meta: { title: 'Binance Spot' }
      }
    ]
  }
]

export default myroutes
