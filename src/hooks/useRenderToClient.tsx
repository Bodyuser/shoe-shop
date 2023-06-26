import { useEffect, useState } from "react"

export const useRenderToClient = () => {
    const [isRenderClient, setIsRenderClient] = useState(false)

	useEffect(() => {
		!isRenderClient && setIsRenderClient(true)
	}, [isRenderClient])

	return { isRenderClient }
}