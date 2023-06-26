import { FC } from 'react'

import Heading from '@/ui/Heading/Heading'

import EditForm from './EditForm/EditForm'
import styles from './EditProfile.module.scss'

const EditProfile: FC = () => {
	return (
		<div className={styles.edit}>
			<Heading Tag="h3" title="Edit profile" />
			<EditForm />
		</div>
	)
}

export default EditProfile
