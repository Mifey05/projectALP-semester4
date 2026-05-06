type Course = {
	course_id: number;
	title: string;
	description: string;
	tier_required: number;
	location: string;
	meeting_url: string;
	start_date: Date;
	end_date: Date;
	created_at: Date;
	updated_at: Date;
};

export type CourseDto = Course;

export const mapCourse = (course: Course): CourseDto => ({
	...course,
});

export const mapCourses = (courses: Course[]): CourseDto[] =>
	courses.map(mapCourse);
