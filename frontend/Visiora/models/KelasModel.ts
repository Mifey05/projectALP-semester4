export interface KelasModel {
  courseId: number;
  classImage: string;
  classTitle: string;
  classDescription: string;
  classDuration: string;
  tierRequired: number;
  deliveryType: string;
  location: string;
  meetingUrl: string;
  startDate: string;
  endDate: string;
}

const formatDate = (value: any): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const mapKelasData = (data: any): KelasModel => {
  const startDate = formatDate(data?.start_date ?? data?.startDate);
  const endDate = formatDate(data?.end_date ?? data?.endDate);

  return {
    courseId: data?.course_id ?? 0,
    classImage: data?.thumbnail_url ?? "",
    classTitle: data?.title ?? "",
    classDescription: data?.description ?? "",
    classDuration:
      startDate && endDate
        ? `${startDate} - ${endDate}`
        : data?.delivery_type ?? "",
    tierRequired: data?.tier_required ?? 0,
    deliveryType: data?.delivery_type ?? "",
    location: data?.location ?? "",
    meetingUrl: data?.meeting_url ?? "",
    startDate,
    endDate,
  };
};