export const getDesigns = async () => {
	// TODO: replace with DB retrieval
	return [];
};

export const getDesignById = async (id: string) => {
	return null;
};

export const createDesign = async (data: any) => {
	return { id: Date.now(), ...data };
};

export const updateDesign = async (id: string, data: any) => {
	return { id, ...data };
};

export const deleteDesign = async (id: string) => {
	return { deleted: true, id };
};
