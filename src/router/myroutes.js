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
  }
]

export default myroutes
