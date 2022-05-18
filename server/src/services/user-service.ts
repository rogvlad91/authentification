import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user-model";

import tokenService from "./token-service";

import UserDto from "../dtos/user-dto";
import {createTokens, JwtTokens} from '../libs/jwt'
import {sendEmail} from "../utils/send-email";
import ApiError from "../exceptions/api-error";

type UserInfoRegistration = JwtTokens & UserDto

class UserService {
    async registration (email: string, password: string): Promise<UserInfoRegistration> {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequesError('User with such credentials already exists')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink: string = uuidv4();

        const userData = {
            email,
            password: hashPassword,
            activationLink
        }

        const user = await UserModel.create(userData)
        await sendEmail({
            html: `Hello and welcome to Testing!<br><br>
                   To activate your profile use this link: ${process.env.API_URL}/api/v1/activate?=${user.activationLink}
                   <br><br>
                   Kind regards,<br>
                   Vladislav`,
            emailTo: user.email,
            subject: 'Activation Link'
        })

        const userDto: UserDto = {
            email: user.email,
            id: user._id,
            isActivated: user.isActivated
        }
        const tokens: JwtTokens = await createTokens({...userDto})
        await tokenService.saveTokens({userId: user._id, refreshToken: tokens.refreshToken})

        return {
            ...tokens,
            ...userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequesError('Incorrect activation link')
        }

        user.isActivated = true
        await user.save()
    }
}

export default new UserService()
