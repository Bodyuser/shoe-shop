import { FC, PropsWithChildren } from 'react'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<div className={styles.main}>{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
