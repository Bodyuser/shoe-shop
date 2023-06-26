import { TypeIcon } from '@/shared/types/ui/icon.types'

export interface IFooterData {
	title: string
	link: string
	icon: TypeIcon
}

export const footerData: IFooterData[] = [
	{
		title: 'Home',
		icon: 'BsHouse',
		link: '/',
	},
	{
		title: 'Explore',
		icon: 'BsGrid1X2',
		link: '/explore',
	},
	{
		title: 'Save',
		icon: 'BsBookmarkDash',
		link: '/saved',
	},
	{
		title: 'Profile',
		icon: 'BsPerson',
		link: '/profile',
	},
]
