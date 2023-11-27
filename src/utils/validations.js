export function validateEmail(email) {
	const rex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;

	return rex.test(email);
}
