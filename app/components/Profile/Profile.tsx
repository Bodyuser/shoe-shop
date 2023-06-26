import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

import Heading from '@/ui/Heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { UsersService } from '@/services/users/users.service'

import { ConvertDateToString } from '@/utils/ConvertDateToString'
import { ToastError } from '@/utils/ToastrError'

import styles from './Profile.module.scss'
import ProfileItem from './ProfileItem/ProfileItem'

const Profile: FC = () => {
	const { user } = useAuth()
	const { LogOut } = useActions()

	const { mutateAsync } = useMutation(
		'delete profile',
		() => UsersService.DeleteProfile(),
		{
			onError(error) {
				ToastError(error, 'Delete profile')
			},
			onSuccess() {
				toastr.success('Delete profile', 'Delete was successful')
			},
		}
	)

	useEffect(() => {
		!user?.isActivated &&
			toastr.warning('Activate account', 'No activated', {
				timeOut: 60000,
				progressBar: false,
				className: styles.warning,
			})
		user?.isActivated &&
			toastr.success('Activate account', 'You activated account', {
				progressBar: false,
			})
		return () => toastr.removeByType('warning')
	}, [])
	return (
		<div className={styles.profile}>
			<Heading Tag="h3" title="Profile" />
			<div className={styles.image}>
				<Image
					draggable={false}
					src={String(user?.avatarPath)}
					height={200}
					width={200}
					alt={String(user?.name)}
				/>
				<span>{user?.role}</span>
			</div>
			<div className={styles.info}>
				<ProfileItem text={String(user?.email)} title="Email" />
				<ProfileItem text={String(user?.name)} title="Name" />
				<ProfileItem text={String(user?.username)} title="Username" />
				<ProfileItem
					text={ConvertDateToString(String(user?.createdAt))}
					title="Account created"
				/>
			</div>
			<div className={styles.btns}>
				<button className={styles.logout} onClick={() => LogOut()}>
					Log Out
				</button>
				<button
					className={styles.delete}
					onClick={async () => {
						await mutateAsync()
						await LogOut()
					}}
				>
					Delete
				</button>
			</div>
			<Link href={'/profile/edit'} legacyBehavior>
				<a className={styles.link}>Edit Profile</a>
			</Link>
			<Link href={'/profile/create'} legacyBehavior>
				<a style={{ marginTop: '20px' }} className={styles.link}>
					Create Product
				</a>
			</Link>
		</div>
	)
}

export default Profile
