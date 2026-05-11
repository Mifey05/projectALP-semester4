import * as courseRepo from "./course.repository.js";
import * as courseMapper from "./course.mapper.js";

export const getCourses = async () => {
    const rawCourses = await courseRepo.findAll();
    return courseMapper.toCourseListResponse(rawCourses);
};

export const getCourseById = async (courseId: number) => {
    const rawCourse = await courseRepo.findById(courseId);
    if (!rawCourse) throw new Error("Course not found");
    return courseMapper.toCourseIdResponse(rawCourse);
};