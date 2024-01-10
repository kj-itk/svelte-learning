export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const value = data.get('value');

		console.log(value);

		return {
			success: true
		};
	}
};
