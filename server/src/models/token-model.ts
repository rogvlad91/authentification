import { Document, Schema, model, ObjectId, Types } from 'mongoose'

export interface IToken extends Document{
    userId: ObjectId,
    refreshToken: string
}

const TokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    refreshToken: {
        type: String,
        required: true
    },

})
export default model<IToken>('token', TokenSchema)
