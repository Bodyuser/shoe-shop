import EditProfile from '@/components/Profile/EditProfile/EditProfile'

import { NextPageAuth } from '@/shared/types/page.types'

const EditProfilePage: NextPageAuth = () => {
	return <EditProfile />
}

EditProfilePage.isOnlyUser = true

export default EditProfilePage
