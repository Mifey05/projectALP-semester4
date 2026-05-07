export interface TemplateModel {
  id: number;
  title: string;
  thumbnail: string;
  caption: string;
  category: string;
}

export const mapTemplateData = (data: any): TemplateModel => {
  return {
    id: data?.template_id ?? 0,
    title: data?.title ?? "",
    thumbnail: data?.thumbnail_url ?? "",
    caption: data?.caption ?? "",
    category: data?.category ?? "",
  };
};