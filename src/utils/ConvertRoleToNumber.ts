import { UserRole } from '@/shared/enum/userRole.enum'

export const ConvertRoleToNumber = (role: UserRole | null | undefined) => {
	if (role === null || role === undefined) return 0
	return role === UserRole.ADMIN ? 2 : role === UserRole.USER ? 1 : 0
}
