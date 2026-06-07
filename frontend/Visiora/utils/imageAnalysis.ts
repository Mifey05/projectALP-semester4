/**
 * Utility untuk menganalisis dan mendeteksi jenis gambar
 */

interface ImageColorDistribution {
  dominantColors: string[];
  colorVariance: number;
  hasEdges: boolean;
}

/**
 * Deteksi apakah gambar adalah background atau object/makanan
 * Background: warna solid/gradient, variance rendah
 * Object: banyak detail, variance tinggi, banyak edge
 */
export const detectImageType = async (
  imageUri: string
): Promise<"background" | "object"> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve("background"); // fallback
          return;
        }

        canvas.width = 100; // resize untuk performa
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;

        // Hitung variance warna
        let r = 0,
          g = 0,
          b = 0;
        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);

        // Hitung variance
        let variance = 0;
        for (let i = 0; i < data.length; i += 4) {
          variance += Math.pow(data[i] - r, 2);
          variance += Math.pow(data[i + 1] - g, 2);
          variance += Math.pow(data[i + 2] - b, 2);
        }
        variance = Math.sqrt(variance / (pixelCount * 3));

        // Threshold: jika variance > 50, kemungkinan adalah object
        // jika < 50, kemungkinan adalah background solid/gradient
        resolve(variance > 50 ? "object" : "background");
      } catch (error) {
        console.log("Error analyzing image:", error);
        resolve("background");
      }
    };
    img.onerror = () => resolve("background");
    img.src = imageUri;
  });
};

/**
 * Utility untuk crop image dan memastikan aspect ratio
 */
export const cropImageToSquare = async (
  imageUri: string
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(imageUri);
        return;
      }

      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;

      const x = (img.width - size) / 2;
      const y = (img.height - size) / 2;

      ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(imageUri);
    img.src = imageUri;
  });
};
