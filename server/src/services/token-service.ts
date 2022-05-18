import TokenModel from "../models/token-model";
import {ObjectId} from "mongoose";

export interface TokenInfo {
    userId: ObjectId,
    refreshToken: string
}

class TokenService {
    async saveTokens({userId, refreshToken}: TokenInfo): Promise<TokenInfo> {
        const tokenData = await TokenModel.findOne({ userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken

            return tokenData.save()
        }

        return await TokenModel.create({userId, refreshToken})
    }
}

export default new TokenService()
