import { IUserProfile } from '@/shared/types/users/user.types'

export interface IInitialState {
	error: any
	isLoading: boolean
	user: IUserProfile | null
}

export const initialState: IInitialState = {
	error: '',
	isLoading: false,
	user: null,
}
