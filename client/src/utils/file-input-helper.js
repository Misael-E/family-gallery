const convertFileToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

export const fileToBase64Handler = async (files) => {
	const filePathsPromises = [];

	files.forEach((file) => {
		filePathsPromises.push(convertFileToBase64(file));
	});
	const filePaths = await Promise.all(filePathsPromises);
	return filePaths;
};
