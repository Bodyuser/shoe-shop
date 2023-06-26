import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthField } from '@/shared/types/page.types'

import { ConvertRoleToNumber } from '@/utils/ConvertRoleToNumber'

const CheckRoleProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const Children = () => <>{children}</>

	const router = useRouter()

	const { user, isLoading } = useAuth()

	const role = ConvertRoleToNumber(user?.role)

	console.log(role)

	if (!isLoading) {
		if (router.pathname === '/auth' && role >= 1) {
			// @ts-ignore
			router.pathname !== '/profile' && router.replace('/profile')
		}
		if (isOnlyUser && role === 0) {
			router.pathname !== '/auth' && router.replace('/auth')
			return null
		}
		if (isOnlyAdmin && (!user || role <= 1)) {
			router.pathname !== '/404' && router.replace('/404')
			return null
		}

		if (!isOnlyAdmin && !isOnlyUser) return <Children />
		if (role >= 2) return <Children />
		if (role >= 1 && isOnlyUser) return <Children />
	}
	return null
}

export default CheckRoleProvider
