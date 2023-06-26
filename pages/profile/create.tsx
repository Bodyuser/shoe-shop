import CreateProducts from '@/components/CreateProducts/CreateProducts'

import { NextPageAuth } from '@/shared/types/page.types'

const CreateProductsPage: NextPageAuth = () => {
	return <CreateProducts />
}

CreateProductsPage.isOnlyUser = true

export default CreateProductsPage
