export interface EditDesignModel {
  designImage: string;
  caption: string;
  template: string;
  element: string;
  text: string;
  gallery: string;
  upload: string;
}

export const mapEditDesignData = (
  data: any
): EditDesignModel => {
  return {
    designImage: data?.designImage ?? "",
    caption: data?.caption ?? "",
    template: data?.template ?? "",
    element: data?.element ?? "",
    text: data?.text ?? "",
    gallery: data?.gallery ?? "",
    upload: data?.upload ?? "",
  };
};