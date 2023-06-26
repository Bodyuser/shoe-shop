import { FC } from 'react'

import IconComponent from '../IconComponent/IconComponent'

import styles from './SearchField.module.scss'

interface ISearchField {
	placeholder: string
}

const SearchField: FC<ISearchField> = ({ placeholder }) => {
	return (
		<div className={styles.search}>
			<IconComponent name="BsSearch" />
			<input placeholder={placeholder} />
			<div>
				<IconComponent name="BsSliders" />
			</div>
		</div>
	)
}

export default SearchField
