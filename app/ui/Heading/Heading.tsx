import cn from 'classnames'
import { CSSProperties, FC } from 'react'

import styles from './Heading.module.scss'

interface IHeading {
	title: string
	Tag: string
	className?: string
	style?: CSSProperties
}

const Heading: FC<IHeading> = ({ title, className, style, Tag }) => {
	return (
		// @ts-ignore
		<Tag
			style={style}
			className={cn(styles.heading, styles[String(className)])}
		>
			{title}
		</Tag>
	)
}

export default Heading
