import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastr } from 'react-redux-toastr'

import {
	IInputForResetPassword,
	IInputForSignIn,
	IInputForSignUp,
} from '@/shared/types/auth/input.types'
import { IDataResponseForToken } from '@/shared/types/services/auth.types'
import { IUserProfile } from '@/shared/types/users/user.types'

import { AuthService } from '@/services/auth/auth.service'

import { ToastError } from '@/utils/ToastrError'

import { ReturnError } from '@/helpers/api.helper'

export const SignIn = createAsyncThunk<IUserProfile, IInputForSignIn>(
	'auth/signin',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.SignIn(email, password)
			toastr.success('Sign In', 'Completed successfully')
			return response.user
		} catch (error) {
			ToastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const SignUp = createAsyncThunk<IUserProfile, IInputForSignUp>(
	'auth/signup',
	async ({ email, password, name }, thunkApi) => {
		try {
			const response = await AuthService.SignUp(email, password, name)
			toastr.success('Sign Up', 'Completed successfully')
			return response.user
		} catch (error) {
			console.log(error)
			ToastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const LogOut = createAsyncThunk('auth/logout', async (_, thunkApi) => {
	try {
		await AuthService.LogOut()
		toastr.success('Log Out', 'Completed successfully')
		return
	} catch (error) {
		ToastError(error)
		return thunkApi.rejectWithValue(error)
	}
})

export const GetNewToken = createAsyncThunk<IDataResponseForToken>(
	'auth/get-new-token',
	async (_, thunkApi) => {
		try {
			return await AuthService.GetNewTokens()
		} catch (error) {
			if (ReturnError(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorizaiton is finished, plz sign in again'
				)
				thunkApi.dispatch(LogOut())
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const ResetPassword = createAsyncThunk<string, IInputForResetPassword>(
	'auth/reset-password',
	async ({ password, resetPasswordLink }, thunkApi) => {
		try {
			const response = await AuthService.ResetPassword(
				resetPasswordLink,
				password
			)
			toastr.success('Reset password', 'Completed successfully')
			return response
		} catch (error) {
			ToastError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)
