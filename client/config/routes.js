// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
const Todo = () => import('../views/todo/todo.vue')
const Login = () => import('../views/login/login.vue')

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    meta: {
      title: 'TodoApp'
    }
  },
  {
    path: '/login',
    component: Login
  }
]
