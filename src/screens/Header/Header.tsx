import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useState } from 'react'

import Heading from '@/ui/Heading/Heading'
import IconComponent from '@/ui/IconComponent/IconComponent'
import SearchField from '@/ui/SearchField/SearchField'

import { useAuth } from '@/hooks/useAuth'

import image from '../../../public/thirteen.svg'

import styles from './Header.module.scss'

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { user } = useAuth()
	return (
		<div className={styles.header}>
			<div>
				<div className={styles.menu} onClick={() => setIsOpen(!open)}>
					<IconComponent name="BsGrid" />
				</div>
				<Link href={'/profile'} legacyBehavior>
					<a className={styles.profile}>
						{user ? (
							<Image
								src={String(user.avatarPath)}
								alt={String(user.name)}
								width={100}
								height={100}
							/>
						) : (
							'Auth'
						)}
					</a>
				</Link>
			</div>
			<div>
				<Heading
					Tag="h1"
					title="Get Your Favorite Shoe"
					style={{ maxWidth: '270px' }}
				/>
				<SearchField placeholder="Search Product" />
			</div>
		</div>
	)
}

export default Header
