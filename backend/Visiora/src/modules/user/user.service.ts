export const getUsers = async () => {
	// TODO: replace with DB retrieval
	return [];
};

export const getUserById = async (id: string) => {
	return null;
};

export const createUser = async (data: any) => {
	return { id: Date.now(), ...data };
};

export const updateUser = async (id: string, data: any) => {
	return { id, ...data };
};

export const deleteUser = async (id: string) => {
	return { deleted: true, id };
};
