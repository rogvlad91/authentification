import Router from 'koa-router'

import userController from "./controllers/user-controller";
const router = new Router({prefix: '/api/v1'})

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

export default router
