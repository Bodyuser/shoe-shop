import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { FilesService } from '@/services/files/files.service'

import { ToastError } from '@/utils/ToastrError'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder: string
) => {
	upload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => FilesService.SaveFile(data, folder),
		{
			onSuccess({ url }) {
				onChange(url)
			},
			onError(error) {
				ToastError(error, 'Upload image')
			},
		}
	)
	const upload = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)
			const files = e.target.files
			if (files?.length) {
				const formData = new FormData()
				formData.append('file', files[0])
				await mutateAsync(formData)
				setTimeout(() => {
					setIsLoading(false)
				}, 500)
			}
		},
		[mutateAsync]
	)
	return useMemo(() => ({ upload, isLoading }), [upload, isLoading])
}
