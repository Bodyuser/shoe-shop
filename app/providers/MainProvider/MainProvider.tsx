import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import Layout from '@/screens/Layout/Layout'

import ReduxToastr from '@/ui/ReduxToastr/ReduxToastr'

import { TypeComponentAuthField } from '@/shared/types/page.types'

import { store } from '@/redux/store'

import AuthProvider from '../AuthProvider/AuthProvider'
import StatusBarProvider from '../StatusBarProvider/StatusBarProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthField>> = ({
	Component,
	children,
}) => {
	return (
		<StatusBarProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToastr />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</StatusBarProvider>
	)
}

export default MainProvider
