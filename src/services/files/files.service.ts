import { IDataResponseForFile } from '@/shared/types/files/response.types'

import axios from '@/api/axios'

export const FilesService = {
	async SaveFile(file: FormData, folder: string) {
		const response = await axios.post<IDataResponseForFile>('/files', file, {
			params: {
				folder,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},
}
