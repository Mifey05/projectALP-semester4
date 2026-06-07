/**
 * Enhanced upload controller
 * Support:
 * 1. Upload background
 * 2. Upload element dengan remove background
 * 3. Upload dengan deteksi tipe gambar
 */

import type {
  Request,
  Response,
  NextFunction,
} from "express";

import * as uploadService from "./upload.service.js";
import * as bgRemovalService from "../../services/backgroundRemoval.service.js";

import { v2 as cloudinary } from "cloudinary";

/**
 * Upload dengan deteksi tipe gambar
 * Query:
 * ?removeBackground=true
 */
export const uploadWithDetection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const shouldRemoveBg =
      req.query.removeBackground === "true";

    const uploadResult =
      await uploadService.uploadImage(
        req.file.path
      );

    let finalUrl = uploadResult.url;

    let imageType:
      | "background"
      | "object" =
      "background";

    if (shouldRemoveBg) {
      try {
        const removedBgResult =
          await bgRemovalService.removeBackground(
            uploadResult.url
          );

        const cloudinaryUpload =
          await cloudinary.uploader.upload(
            removedBgResult.url,
            {
              folder: "visiora/elements",
              format: "png",
            }
          );

        finalUrl =
          cloudinaryUpload.secure_url;

        imageType = "object";

      } catch (bgError) {
        console.log(
          "Background removal failed:",
          bgError
        );

        imageType = "object";
      }
    }

    return res.status(201).json({
      success: true,
      url: finalUrl,
      imageType,
      originalUrl: uploadResult.url,
      public_id: uploadResult.public_id,
    });

  } catch (err) {
    next(err);
  }
};

/**
 * Upload background design
 */
export const uploadDesignBackground = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const result =
      await uploadService.uploadImage(
        req.file.path
      );

    return res.status(201).json({
      success: true,
      type: "background",
      url: result.url,
      public_id: result.public_id,
    });

  } catch (err) {
    next(err);
  }
};

/**
 * Upload element
 * (makanan, produk, logo, benda)
 */
export const uploadDesignElement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const originalUpload =
      await uploadService.uploadImage(
        req.file.path
      );

    let removedBgUrl: string | null = null;

    try {

      const removedBgResult =
        await bgRemovalService.removeBackground(
          originalUpload.url
        );

      const cloudinaryUpload =
        await cloudinary.uploader.upload(
          removedBgResult.url,
          {
            folder: "visiora/elements",
            format: "png",
          }
        );

      removedBgUrl =
        cloudinaryUpload.secure_url;

    } catch (bgError) {

      console.log(
        "Remove background gagal:",
        bgError
      );
    }

    return res.status(201).json({
      success: true,
      type: "element",

      url: originalUpload.url,

      removedBgUrl,

      public_id:
        originalUpload.public_id,
    });

  } catch (err) {
    next(err);
  }
};