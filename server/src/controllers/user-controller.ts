import { Context, Next } from "koa";

import userService from "../services/user-service";

class UserController {
    async registration(ctx: Context, next: Next){
        try {
            const { email, password } = ctx.request.body
            const userData = await userService.registration(email, password)

            ctx.cookies.set('refreshToken', userData.refreshToken, {maxAge: 1000 * 3600 * 24 * 30, httpOnly: true})
            ctx.body = {
                userData
            }
        } catch (err) {
            await next(err)
        }
    }

    async login(ctx: Context, next: Next){
        try {
        } catch (err){
            next()
        }
    }

     async logout(ctx: Context, next: Next){
            try {
            } catch (err){
                next()
            }
        }

     async activate(ctx: Context, next: Next){
            try {
                const activationLink = ctx.request.query.link
                await userService.activate(activationLink)
                ctx.redirect(process.env.CLIENT_URL)
            } catch (err){
                next()
            }
        }

     async refresh(ctx: Context, next: Next){
            try {
            } catch (err){
                next()
            }
        }

     async getUsers(ctx: Context, next: Next){
            try {
                ctx.body = {
                    response: ['14488', '1337']
                }
            } catch (err){
                next()
            }
        }

}

export default new UserController()
