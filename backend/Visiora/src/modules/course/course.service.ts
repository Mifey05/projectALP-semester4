import * as courseRepo from "./course.repository.js";
import * as courseMapper from "./course.mapper.js";

export const getCourses = async () => {
    const rawCourses = await courseRepo.findAll();
    return courseMapper.toCourseListResponse(rawCourses);
};

export const getCourseById = async (courseId: number) => {
    const rawCourse = await courseRepo.findById(courseId);
    if (!rawCourse) {
        const err = new Error("Course not found");
        (err as any).statusCode = 404;
        throw err;
    }
    return courseMapper.toCourseIdResponse(rawCourse);
};