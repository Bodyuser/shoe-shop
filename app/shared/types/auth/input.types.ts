export interface IInputForSignUp {
	email: string
	password: string
	name: string
}

export interface IInputForResetPassword {
	password: string
	resetPasswordLink: string
}

export interface IInputForSignIn {
	email: string
	password: string
}
