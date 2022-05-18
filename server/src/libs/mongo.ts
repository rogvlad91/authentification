import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URI

export default async (): Promise<void> => {
    const options = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectInterval: 500,
        reconnectTries: Number.MAX_VALUE,
    }

    await mongoose.connect(mongoUrl, options)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useFindAndModify', false)

    mongoose.connection
        .on('connected', () => console.info('mongo connection'))
        .on('error', err => console.error('mongo connection error: ', err))
        .on('disconnected', () => console.error('mongo connection disconnected'))

    process.on('SIGINT', () => {
        void mongoose.connection.close(() => {
            console.info('mongo connection disconnected through app termination')
            process.exit(0)
        })
    })
}
