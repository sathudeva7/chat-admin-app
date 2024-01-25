import AppLayout from '../components/AppLayout'
import useAuth from '../hooks/useAuth';
import AppRouter from './AppRouter'
import AuthRouter from './AuthRouter';

function UserApp() {
   const { currentUser, login, logout, isLoading } = useAuth();

	if (!currentUser) {
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