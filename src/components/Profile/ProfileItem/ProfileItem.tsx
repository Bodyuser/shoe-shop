import { FC } from 'react'

import styles from './ProfileItem.module.scss'
import { IProfileItem } from './profileItem.interface'

const ProfileItem: FC<IProfileItem> = ({ text, title }) => {
	return (
		<div className={styles.item}>
			<span className={styles.title}>{title}: </span>
			<span className={styles.text}>{text}</span>
		</div>
	)
}

export default ProfileItem
