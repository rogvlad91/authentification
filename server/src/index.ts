import Koa from 'koa'
import 'dotenv/config'
import koaBody from 'koa-body'
import koaCors from 'koa-cors'

import router from "./router";
import mongo from './libs/mongo'
import ApiError from "./exceptions/api-error";

const app = new Koa()

app.use(koaCors())
app.use(koaBody({ multipart: true }))

app.use(router.allowedMethods())
app.use(router.middleware())

const port = Number(process.env.PORT) || 3002

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof ApiError) {
            ctx.throw(ApiError)
        }
        ctx.response.status = 500
        ctx.response.body = {
            message: 'Some error occured'
        }
    }
})

async function run (): Promise<void> {
    try {
        await mongo()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }

    app.listen(port, () => {
        console.log(`SERVER LISTENING ON PORT: ${port}`)
    })
}

void run()
