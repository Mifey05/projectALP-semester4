export interface SearchTemplateModel {
  templateImage: string;
}

export const mapSearchTemplateData = (
  data: any
): SearchTemplateModel => {
  return {
    templateImage: data?.templateImage ?? "",
  };
};