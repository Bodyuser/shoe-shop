import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import IconComponent from '@/ui/IconComponent/IconComponent'

import styles from './Footer.module.scss'
import { footerData } from './footer.data'

const Footer: FC = () => {
	const { pathname } = useRouter()
	return (
		<div className={styles.footer}>
			{footerData.map((item) => (
				<li key={item.title}>
					<Link href={item.link} legacyBehavior>
						<a
							className={cn({
								[styles.active]:
									item.link === '/'
										? item.link === pathname
										: pathname.startsWith(item.link),
							})}
						>
							<IconComponent name={item.icon} />
							<span>{item.title}</span>
						</a>
					</Link>
				</li>
			))}
		</div>
	)
}

export default Footer
