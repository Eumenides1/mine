import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Login/LoginPage.vue') },
    {
      path: '/Home',
      component: () => import('@/views/User/HomePage.vue'),
      redirect: '/Books/BookPage',
      children: [
        {
          path: '/Books/BookPage',
          component: () => import('@/views/Books/BookPage.vue')
        },
        {
          path: '/Layout/LayoutPage',
          component: () => import('@/views/Layout/LayoutPage.vue')
        },

        {
          path: '/Book/LiteratureBook/LiteratureBook',
          component: () =>
            import('@/views/Book/LiteratureBook/LiteratureBook.vue')
        },
        {
          path: '/Book/HotBook/HotBook',
          component: () => import('@/views/Book/HotBook/HotBook.vue')
        },
        {
          path: '/Book/ArtBook/ArtBook',
          component: () => import('@/views/Book/ArtBook/ArtBook.vue')
        },
        {
          path: '/Book/YouthBook/YouthBook',
          component: () => import('@/views/Book/YouthBook/YouthBook.vue')
        },
        {
          path: '/Book/FunnyBook/FunnyBook',
          component: () => import('@/views/Book/FunnyBook/FunnyBook.vue')
        },
        {
          path: '/Book/BrightBook/BrightBook',
          component: () => import('@/views/Book/BrightBook/BrightBook.vue')
        },
        {
          path: '/Book/ChildrenBook/ChildrenBook',
          component: () => import('@/views/Book/ChildrenBook/ChildrenBook.vue')
        },
        {
          path: '/Book/ComicBook/ComicBook',
          component: () => import('@/views/Book/ComicBook/ComicBook.vue')
        },
        {
          path: '/Book/OtherBook/OtherBook',
          component: () => import('@/views/Book/OtherBook/OtherBook.vue')
        },
        {
          path: '/Book/MyBook/MyBook',
          component: () => import('@/views/Book/MyBook/MyBook.vue')
        }
      ]
    },
    {
      path: '/Layout',
      component: () => import('@/views/Layout/LayoutPage.vue')
    },
    {
      path: '/Collect',
      component: () => import('@/views/Collect/BookCollect.vue')
    },
    {
      path: '/AddBook',
      component: () => import('@/views/AddBook/AddBook.vue')
    },
    {
      path: '/Service',
      component: () => import('@/views/Service/ServicePage.vue')
    },
    {
      path: '/Search',
      component: () => import('@/views/Search/SearchBook.vue')
    },
    {
      path: '/Shang',
      component: () => import('@/views/Shang/Shangjia.vue')
    },
    { path: '/More', component: () => import('@/views/More/MorePage.vue') },
    {
      path: '/Personal',
      component: () => import('@/views/Personal/PersonalCenter.vue'),
      children: [
        {
          path: '/MyInformation/Name/OwnName',
          component: () => import('@/views/MyInformation/Name/OwnName.vue')
        },
        {
          path: '/MyInformation/Phone/OwnPhone',
          component: () => import('@/views/MyInformation/Phone/OwnPhone.vue')
        },
        {
          path: '/MyInformation/Emile/OwnEmile',
          component: () => import('@/views/MyInformation/Emile/OwnEmile.vue')
        },
        {
          path: '/MyInformation/Hobby/OwnHobby',
          component: () => import('@/views/MyInformation/Hobby/OwnHobby.vue')
        },
        {
          path: '/MyInformation/Many/OwnMany',
          component: () => import('@/views/MyInformation/Many/OwnMany.vue')
        },
        {
          // 当访问 '/Personal/MyInformation' 时，重定向到 '/Personal/MyInformation/Name'
          path: '',
          redirect: '/MyInformation/Name/OwnName'
        }
      ]
    }
  ]
})

export default router
