// export interface CourseModel {
//   course_id: number;
//   title: string;
//   description: string;
//   tier_required: string | number;
//   thumbnail_url: string;
//   delivery_type: string;
//   location: string;
//   meeting_url?: string | null;
//   start_date?: string | null;
//   end_date?: string | null;
//   created_at?: string;
//   updated_at?: string;
// }

// export const mapCourseData = (data: any): CourseModel => {
//   return {
//     course_id: data?.course_id ?? 0,
//     title: data?.title ?? "",
//     description: data?.description ?? "",
//     tier_required: data?.tier_required ?? "0",
//     thumbnail_url: data?.thumbnail_url ?? "",
//     delivery_type: data?.delivery_type ?? "",
//     location: data?.location ?? "",
//     meeting_url: data?.meeting_url ?? null,
//     start_date: data?.start_date ?? null,
//     end_date: data?.end_date ?? null,
//     created_at: data?.created_at ?? undefined,
//     updated_at: data?.updated_at ?? undefined,
//   };
// };
