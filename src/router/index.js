import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/accountSettings/login/index'),
    hidden: true
  },
  {
    path: '/serviceAgreement',
    component: () => import('@/views/accountSettings/serviceAgreement/index'),
    hidden: true
  },
  {
    path: '/sendVerificationCode',
    component: () => import('@/views/accountSettings/sendVerificationCode/index'),
    hidden: true
  },
  {
    path: '/checkVerifyCode',
    component: () => import('@/views/accountSettings/checkVerifyCode/index'),
    hidden: true
  },
  {
    path: '/setPassword',
    component: () => import('@/views/accountSettings/setPassword/index'),
    hidden: true
  },





  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    children: [{
      path: 'overview',
      name: 'Overview',
      component: () => import('@/views/overview/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  },

  {
    path: '/cert',
    component: Layout,
    redirect: '/cert',
    // name: 'Example',
    // meta: { title: '存证中心', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Cert',
        component: () => import('@/views/cert/list'),
        meta: { title: '存证中心', icon: 'table' }
      },
      {
        path: 'add',
        name: 'AddCert',
        hidden:true,
        component: () => import('@/views/cert/add'),
        meta: { title: '新增存证', icon: 'table' }
      },
      {
        path: 'detail',
        name: 'CertDetail',
        hidden:true,
        component: () => import('@/views/cert/detail'),
        meta: { title: '查看详情', icon: 'table' }
      },
    ]
  },

  {
    path: '/forensic',
    component: Layout,
    redirect: '/forensic',
    children: [
      {
        path: 'index',
        name: 'Forensic',
        component: () => import('@/views/forensic/list'),
        meta: { title: '取证中心', icon: 'form' }
      },
      {
        path: 'add',
        name: 'AddForensic1',
        hidden:true,
        component: () => import('@/views/forensic/add'),
        meta: { title: '新增取证', icon: 'table' }
      },
      {
        path: 'addProcess',
        name: 'AddForensic2',
        hidden:true,
        component: () => import('@/views/forensic/addProcess'),
        meta: { title: '新增取证', icon: 'table' }
      },
      {
        path: 'detail',
        name: 'ForensicDetail',
        hidden:true,
        component: () => import('@/views/forensic/detail'),
        meta: { title: '查看详情', icon: 'table' }
      },
    ]
  },

  // {
  //   path: '/application',
  //   component: Layout,
  //   redirect: '/application',
  //   // name: 'Nested',
  //   // meta: {
  //   //   title: '应用中心',
  //   //   icon: 'nested'
  //   // },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/application/list/index'), // Parent router-view
  //       name: 'Application',
  //       meta: { title: '应用中心',icon:'nested' },
  //     }
  //   ]
  // },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/account'), // Parent router-view
        name: 'Account',
        hidden:true,
        meta: { title: '账户管理',icon:'nested' },
      },
      {
        path: 'person',
        component: () => import('@/views/account/personalAuthentication'),
        name: 'personalAuthentication',
        hidden:true,
        meta: { title: '个人认证',icon:'nested' },
      },
      {
        path: 'company',
        component: () => import('@/views/account/enterpriseCertification'), 
        name: 'enterpriseCertification',
        hidden:true,
        meta: { title: '企业认证',icon:'nested' },
      },

    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/order'), // Parent router-view
        name: 'Order',
        hidden:true,
        meta: { title: '订单管理',icon:'nested' },
      }
    ]
  },
  {
    path: '/buyPlan',
    component: Layout,
    redirect: '/buyPlan/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/buyPlan'), // Parent router-view
        name: 'buyPlan',
        hidden:true,
        meta: { title: '扩展容量',icon:'nested' },
      }
    ]
  },




  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
