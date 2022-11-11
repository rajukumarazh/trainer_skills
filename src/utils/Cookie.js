export const setCookie = (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const getCookie = (cname) => {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	let cookies = [];
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			cookies.push(c.substring(name.length, c.length));
		}
	}
	if (cookies.length === 0) {
		return null;
	} else {
		return cookies[cookies.length - 1];
	}
};
