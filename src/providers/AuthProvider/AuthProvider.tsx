import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'

import { TypeComponentAuthField } from '@/shared/types/page.types'

const DynamicCheckRole = dynamic(
	() => import('../CheckRoleProvider/CheckRoleProvider'),
	{ ssr: false }
)

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children,
}) => {
	const { GetNewToken } = useActions()
	const { pathname } = useRouter()

	useEffect(() => {
		GetNewToken()
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
