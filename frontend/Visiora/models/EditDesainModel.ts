export interface EditDesignModel {
  designImage: string;
  caption: string;
  template: string;
  element: string;
  text: string;
  gallery: string;
  upload: string;
  elements?: DesignElement[];
}

/**
 * Model untuk setiap element dalam design
 */
export interface DesignElement {
  id: number;
  type: "text" | "price" | "emoji" | "square" | "circle" | "star" | "line" | "image";
  
  // Properties untuk text
  text?: string;
  emoji?: string;
  color?: string;
  fontFamily?: string;
  
  // Properties untuk shape
  shapeType?: string;
  
  // Properties untuk image element
  imageUrl?: string;
  imageWithoutBg?: string; // URL gambar setelah remove background
  
  // Position & size
  x: number;
  y: number;
  width?: number;
  height?: number;
  
  // State
  selected?: boolean;
  rotation?: number; // Angle rotasi dalam derajat
  opacity?: number; // 0-1
  
  // Metadata
  isBackgroundImage?: boolean; // true jika ini background utama
  zIndex?: number; // untuk layering
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
    elements: data?.elements ?? [],
  };
};