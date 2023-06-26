import { IUser } from './../users/user.types'

export interface iProduct {
	id: number
	title: string
	model: string
	price: number
	createdAt: string
	updatedAt: string
	imagePath: string
	brand: string
	user: IUser
	slug: string
	backgroundColor: string
}
