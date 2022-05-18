import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string
}

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String,
    },
})

export default model<IUser>('user', UserSchema)
