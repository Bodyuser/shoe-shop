import Image from 'next/image'
import { CSSProperties, FC, useEffect } from 'react'
import { FieldError, UseFormSetValue } from 'react-hook-form'

import { IEditProfile } from '@/components/Profile/EditProfile/editProfile.interface'

import { useUpload } from '@/hooks/useUpload'

import styles from './UploadField.module.scss'

export interface IUploadField {
	folder: string
	image?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

const UploadField: FC<IUploadField> = ({
	placeholder,
	error,
	style,
	image,
	folder,
	onChange,
	isNoImage = false,
}) => {
	const { isLoading, upload } = useUpload(onChange, folder)

	return (
		<div style={style} className={styles.upload}>
			<label>
				<span>{placeholder}</span>
				<input type="file" onChange={upload} name="avatarPath" />
				<span className={styles.btn}>{image ? 'Change' : 'Select'}</span>
				{error && <p>{error.message}</p>}
			</label>
			{!isNoImage && (
				<div>
					{image && <Image src={image} alt="" height={100} width={300} />}
				</div>
			)}
		</div>
	)
}

export default UploadField
