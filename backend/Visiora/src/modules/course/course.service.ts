import * as courseRepo from "./course.repository.js";
import { mapCourse, mapCourses } from "./course.mapper.js";

export const getCourses = async () => {
	const courses = await courseRepo.findAll();
	return mapCourses(courses);
};

export const getCourseById = async (courseId: number) => {
	const course = await courseRepo.findById(courseId);
	return course ? mapCourse(course) : null;
};
