import cn from 'classnames'
import { Dispatch, FC, PropsWithChildren } from 'react'
import {
	AccordionBody,
	Accordion as AccordionComponent,
	AccordionHeader,
	AccordionItem,
} from 'react-headless-accordion'

import styles from './Accordion.module.scss'

interface IAccordion {
	title: string
	isOpen: boolean
	setIsOpen: Dispatch<boolean>
}

const Accordion: FC<PropsWithChildren<IAccordion>> = ({
	isOpen,
	title,
	children,
	setIsOpen,
}) => {
	return (
		<AccordionComponent
			className={cn(styles.accordion, {
				[styles.open]: isOpen,
			})}
		>
			<AccordionItem isActive={isOpen}>
				<AccordionHeader
					className={styles.title}
					onClick={() => setIsOpen(!isOpen)}
					as="div"
				>
					<>{title}</>
				</AccordionHeader>

				<AccordionBody className={styles.content}>
					<>{children}</>
				</AccordionBody>
			</AccordionItem>
		</AccordionComponent>
	)
}

export default Accordion
