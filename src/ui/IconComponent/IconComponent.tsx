import { FC } from 'react'
import * as BootstrapIcons from 'react-icons/bs'

import { useRenderToClient } from '@/hooks/useRenderToClient'

import { TypeIcon } from '@/shared/types/ui/icon.types'

interface IIconComponent {
	name: TypeIcon
}

const IconComponent: FC<IIconComponent> = ({ name }) => {
	const { isRenderClient } = useRenderToClient()

	const IconComponent = BootstrapIcons[name]

	if (isRenderClient) return <IconComponent />
	else return null
}

export default IconComponent
