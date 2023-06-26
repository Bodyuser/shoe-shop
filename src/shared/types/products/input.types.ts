export interface IInputForProducts {
	title: string
	model: string
	backgroundColor: string
	brand: string
	imagePath: string
	price: number
}

export interface IProductOptions {
	brand?: string[]
	price?: {
		min?: number
		max?: number
	}
	created?: 'old' | 'new'
}
