import { Dispatch, FC } from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form'
import ReactSelect, { OnChangeValue, Options } from 'react-select'
import makeAnimated from 'react-select/animated'

import styles from './Select.module.scss'

export interface IOption {
	label: string
	value: string
}

interface ISelect {
	value: ControllerRenderProps<any, any>
	isMulti?: boolean
	placeholder?: string
	options: Options<IOption> | any
	error?: FieldError | undefined
}

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	placeholder,
	options,
	value,
	isMulti,
	error,
}) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		value.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (value.value) {
			return isMulti
				? options.filter(
						(option: any) => value.value.indexOf(option.value) >= 0
				  )
				: options.find((option: any) => option.value === value.value)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}
	return (
		<div className={styles.select}>
			{placeholder && <span>{placeholder}</span>}
			<ReactSelect
				value={getValue()}
				onChange={onChange}
				options={options}
				classNamePrefix="custom-select"
				isMulti={isMulti}
				placeholder={isMulti && placeholder}
				components={animatedComponents}
			/>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
