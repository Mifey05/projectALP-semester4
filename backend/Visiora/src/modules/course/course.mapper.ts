type AllCourse = {
    course_id: number;
    title: string;
    thumbnail_url: string;
};

type IdCourse = {
    course_id: number;
    title: string;
    description: string;
    tier_required: number;
    delivery_type: DeliveryType;
    location: string;
    meeting_url: string;
    start_date: Date;
    end_date: Date;
};
type DeliveryType = "ONLINE" | "OFFLINE" | "HYBRID";

export const toCourseResponse = (course: AllCourse) => {
	return {
		course_id: course.course_id,
        title: course.title,
        thumbnail_url: course.thumbnail_url,
	};
};

export const toCourseListResponse = (courses: AllCourse[]) => {
	return courses.map(toCourseResponse);
};

export const toCourseIdResponse = (course: IdCourse) => {
    return {
        course_id: course.course_id,
        title: course.title,
        description: course.description,
        tier_required: course.tier_required,
        location: course.location,
        meeting_url: course.meeting_url,
        start_date: course.start_date,
        end_date: course.end_date,
    };
};

export const toCourseIdListResponse = (courses: IdCourse[]) => {
    return courses.map(toCourseIdResponse);
};