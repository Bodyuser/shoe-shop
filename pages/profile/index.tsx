import Profile from '@/components/Profile/Profile'

import { NextPageAuth } from '@/shared/types/page.types'

const ProfilePage: NextPageAuth = () => {
	return <Profile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
