export interface HistoryDesignModel {
  designImage: string;
  designTitle: string;
  designDescription: string;
}

export const mapHistoryDesignData = (
  data: any
): HistoryDesignModel => {
  return {
    designImage: data?.designImage ?? "",
    designTitle: data?.designTitle ?? "",
    designDescription: data?.designDescription ?? "",
  };
};