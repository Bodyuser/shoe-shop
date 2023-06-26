import cn from 'classnames'
import { PropsWithChildren } from 'react'
import { FC } from 'react'

import Heading from '../Heading/Heading'

import styles from './Menu.module.scss'
import { CSSProperties } from 'react'

interface IMenu {
	type: 'scale' | 'opacity'
	headingTitle?: string
    style?: CSSProperties
    isOpen: boolean
}

const Menu: FC<PropsWithChildren<IMenu>> = ({
	headingTitle,
	type,
	children,
    style,
    isOpen
}) => {
	return (
		<div className={styles.menu} style={style}>
			{headingTitle && <Heading Tag="h4" title={headingTitle} />}
			<div className={cn(styles.menu, styles[type], {
                [styles.open]: isOpen
            })}>
                {
                    children
                }
            </div>
		</div>
	)
}

export default Menu
