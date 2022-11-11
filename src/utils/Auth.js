import { setCookie, getCookie } from './Cookie';

export const setLoginCookie = (value) => {
	setCookie('sa_access_token', value, 3650);
};

export const setJwtToken= (value) => {
	setCookie('sa_jwt_token', value, 3650);
};

export const getLoginCookie = () => {
	return getCookie('sa_access_token');
};

export const getJwtToken = (value) => {
	return getCookie('sa_jwt_token');
}
