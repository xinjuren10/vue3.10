import { createRouter, createWebHashHistory } from 'vue-router'
// 也可以从其他文件导入
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/view/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/view/about.vue')
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
