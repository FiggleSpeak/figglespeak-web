import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import CourseSelectionView from '@/views/CourseSelectionView.vue'
import AppView from '@/views/AppView.vue'
import HomeView from '@/views/HomeView.vue'
import OralExamCoachView from '@/views/OralExamCoachView.vue'
import AccountView from '@/views/AccountView.vue'
import PracticeView from '@/views/PracticeView.vue'
import WordPronunciationView from '@/views/WordPronunciationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/course-selection',
      name: 'course-selection',
      component: CourseSelectionView
    },
    {
      path: '/app',
      name: 'app',
      component: AppView,
      children: [
        {
          path: 'practice',
          component: HomeView
        },
        {
          path: 'oral-exam-coach',
          component: OralExamCoachView
        },
        {
          path: 'account',
          component: AccountView
        }
      ]
    },
    {
      path: '/practice/:id',
      component: PracticeView
    },
    {
      path: '/word-pronunciation',
      component: WordPronunciationView
    }
  ]
})

export default router
