export interface KelasModel {
  classImage: string;
  classTitle: string;
  classDescription: string;
  classDuration: string;
}

export const mapKelasData = (
  data: any
): KelasModel => {
  return {
    classImage: data?.classImage ?? "",
    classTitle: data?.classTitle ?? "",
    classDescription: data?.classDescription ?? "",
    classDuration: data?.classDuration ?? "",
  };
};