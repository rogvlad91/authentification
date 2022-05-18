import jwt from 'jsonwebtoken'

export interface JwtTokens {
    accessToken: string
    refreshToken: string
}

export async function createTokens(payload = {}): Promise<JwtTokens> {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '15m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})

    return {
        accessToken,
        refreshToken
    }
}

