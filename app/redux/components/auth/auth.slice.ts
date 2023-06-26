import { createSlice } from '@reduxjs/toolkit'

import { IUserProfile } from '@/shared/types/users/user.types'

import { initialState } from '@/redux/components/state'

import {
	GetNewToken,
	LogOut,
	ResetPassword,
	SignIn,
	SignUp,
} from './auth.actions'

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SetUser: (state, { payload }: { payload: IUserProfile }) => {
			state.user = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(SignUp.pending, (state) => {
				state.isLoading = true
			})
			.addCase(SignUp.fulfilled, (state, { payload }) => {
				state.error = ''
				state.isLoading = false
				state.user = payload
			})
			.addCase(SignUp.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload
			})
			.addCase(SignIn.pending, (state) => {
				state.isLoading = true
			})
			.addCase(SignIn.fulfilled, (state, { payload }) => {
				state.error = ''
				state.isLoading = false
				state.user = payload
			})
			.addCase(SignIn.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload
			})
			.addCase(GetNewToken.pending, (state) => {
				state.isLoading = true
			})
			.addCase(GetNewToken.fulfilled, (state, { payload }) => {
				state.error = ''
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(GetNewToken.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload
			})
			.addCase(LogOut.pending, (state) => {
				state.isLoading = true
			})
			.addCase(LogOut.fulfilled, (state) => {
				state.error = ''
				state.isLoading = false
				state.user = null
			})
			.addCase(LogOut.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload
			})
			.addCase(ResetPassword.pending, (state) => {
				state.isLoading = true
			})
			.addCase(ResetPassword.fulfilled, (state) => {
				state.error = ''
				state.isLoading = false
			})
			.addCase(ResetPassword.rejected, (state, { payload }) => {
				state.error = payload
			})
	},
})

export const { reducer } = AuthSlice
export const { SetUser } = AuthSlice.actions
