import Axios from './Api';
import { setLoginCookie, getLoginCookie, setJwtToken } from '../utils/Auth';

export const LoginUser = async (email, password) => {
	const response = await Axios().post('/login', { email, password });
	if (response.data.success) {
		setLoginCookie(response.data.auth.access_token);
		setJwtToken(response.data.jwt_token);
	}
	return response.data;
};
export const checkUserAuthentication = async () => {
	if (!getLoginCookie()) return false;
	const response = await Axios().post('/validate_login');
	return response.data.success;
};

export const logoutUser = async () => {
	const response = await Axios().post('/logout');
	return response.data;
}