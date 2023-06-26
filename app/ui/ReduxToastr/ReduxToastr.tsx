import { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

const ReduxToastr: FC = () => {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn="fadeIn"
			className="modal"
			transitionOut="fadeOut"
		/>
	)
}

export default ReduxToastr
