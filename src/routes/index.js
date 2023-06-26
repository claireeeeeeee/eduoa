import Index from '@/views/index'
import Signin from '@/views/signin'
import Signup from '@/views/signup'
import Update from '@/views/update'
import App from '@/views/app'

const Routes = [
  {
    path: ['/', '/index'],
    component: Index,
    exact: true
  },
  {
    path: '/signin',
    component: Signin,
    exact: true
  },
  {
    path: '/signup',
    component: Signup,
    exact: true
  },
  {
    path: '/update',
    component: Update,
    exact: true
  },
  {
    path: '/app',
    component: App,
    exact: true
  }
]

export default Routes
