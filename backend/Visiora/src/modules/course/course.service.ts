export const getCourses = async () => {
	// TODO: replace with DB retrieval
	return [];
};

export const getCourseById = async (id: string) => {
	// TODO: replace with DB lookup
	return null;
};

export const createCourse = async (data: any) => {
	// TODO: insert into DB and return created record
	return { id: Date.now(), ...data };
};

export const updateCourse = async (id: string, data: any) => {
	// TODO: update DB record and return updated record
	return { id, ...data };
};

export const deleteCourse = async (id: string) => {
	// TODO: delete from DB and return result
	return { deleted: true, id };
};
