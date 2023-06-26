import { UserRole } from './../../enum/userRole.enum'

export interface IUser {
	id: number
	email: string
	username: string
	password: string
	name: string
	code: number
	role: UserRole
	createdAt: string
	updatedAt: string
	activateLink: string
	isActivated: boolean
	avatarPath: string
	resetLink: string
	products: any
}

export interface IUserProfile
	extends Omit<IUser, 'password' | 'resetLink' | 'activateLink' | 'code'> {}

export interface IGlobalUser
	extends Omit<IUserProfile, 'email' | 'isActivated'> {}
