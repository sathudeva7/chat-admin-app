import AppLayout from '../components/AppLayout'
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter';

function UserApp() {
	const isLoggedIn  = localStorage.getItem("isLoggedIn") ? localStorage.getItem("isLoggedIn") : false;

	if (!isLoggedIn) {
		return (
			<AuthRouter />
		)
	} else {
		return (
			<>
				<AppLayout>
					<AppRouter />
				</AppLayout>
			</>
		)
	}
}

export default UserApp