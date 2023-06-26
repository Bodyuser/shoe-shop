export const ConvertDateToString = (date: string) => {
	return new Date(date).toLocaleDateString('ru')
}
