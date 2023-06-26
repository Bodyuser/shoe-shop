import { FC, forwardRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { IAuthFields } from '@/components/Auth/Auth'

import { TypeIcon } from '@/shared/types/ui/icon.types'

import IconComponent from '../IconComponent/IconComponent'

import styles from './AuthField.module.scss'

interface IAuthField {
	type: string
	placeholder: string
	icon: TypeIcon
	error?: any
}

const AuthField = forwardRef<HTMLInputElement, IAuthField>(
	({ placeholder, error, type, icon, ...rest }, ref) => {
		const [authType, setAuthType] = useState(type)
		return (
			<div className={styles.field}>
				<div className={styles.input}>
					<IconComponent name={icon} />
					<input
						{...rest}
						type={authType}
						placeholder={placeholder}
						ref={ref}
					/>
					{type === 'password' && (
						<button
							onClick={() =>
								setAuthType((prev) => (prev === 'text' ? 'password' : 'text'))
							}
							type="button"
						>
							<IconComponent
								name={authType === 'text' ? 'BsEyeSlash' : 'BsEye'}
							/>
						</button>
					)}
				</div>
				{error?.message && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

AuthField.displayName = 'Field'

export default AuthField
