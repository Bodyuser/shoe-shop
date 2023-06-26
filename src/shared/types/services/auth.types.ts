import { IUserProfile } from '@/shared/types/users/user.types'

export interface IDataResponseForSignIn {
	user: IUserProfile
	token: string
}

export interface IDataResponseForSignUp {
	user: IUserProfile
	token: string
}

export interface IDataResponseForToken {
	token: string
	user: IUserProfile
}

export interface IDataResponseForResetPassword {
	message: string
}
