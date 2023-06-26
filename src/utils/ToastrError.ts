import { toastr } from 'react-redux-toastr'

import {ReturnError} from "@/helpers/api.helper"

export const ToastError = (error: any, title?: string) => {
	const message = ReturnError(error)
	toastr.error(title || 'Error request', message)
	throw message
}
