export interface IApiError{
    status?: number
    message: string
    errors?: Error[]
}

export default class ApiError extends Error{
    status: number
    errors: Error[]
    constructor({status, message, errors = []}: IApiError) {
        super(message);
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError({status: 401,
            message: 'User not Authorized'})
    }

    static BadRequesError(message, errors = []) {
        return new ApiError({status: 400,
            message, errors})
    }

}
