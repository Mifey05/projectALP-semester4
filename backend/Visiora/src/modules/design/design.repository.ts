import db from "../../config/db.js";

type Design = {
    design_id: number;
    user_id: number;
    template_id: number;
    title: string;
    category: string;
    thumbnail_url: string;
    design_json: string;
    caption: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
};
type CreateDesignInput = {
  user_id: number;
  template_id: number;
  title: string;
  category: string;
  thumbnail_url: string;
  design_json: unknown;
  caption: string;
  is_active: boolean;
};

type UpdateDesignInput = {
    template_id: number;
    title: string;
    category: string;
    thumbnail_url: string;
    design_json: unknown;
    caption: string;
};

export const create = async(data: CreateDesignInput) => {
    const [result] = await db.query(
        `INSERT INTO designs
     (user_id, template_id, title, category, thumbnail_url, design_json, caption, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            data.user_id,
            data.template_id,
            data.title,
            data.category,
            data.thumbnail_url,
            JSON.stringify(data.design_json),
            data.caption,
            data.is_active,
        ]
    );
    return (result as any).insertId;
};

export const findByUser = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM designs WHERE user_id = ?", [userId]
    );
    const result = rows as Design[];
    return result;
};

export const update = async (
    designId: number,
    data: UpdateDesignInput
): Promise<void> => {
    await db.query(
        `UPDATE designs
        SET
            template_id = ?,
            title = ?,
            category = ?,
            thumbnail_url = ?,
            design_json = ?,
            caption = ?,
            updated_at = NOW()
        WHERE design_id = ?`,
        [
            data.template_id,
            data.title,
            data.category,
            data.thumbnail_url,
            JSON.stringify(data.design_json),
            data.caption,
            designId,
        ]
    );
};

export const findById = async(designId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM designs WHERE design_id = ?", [designId]
    );
    const result = rows as Design[];
    return result[0] || null;
};

export const findByIdAndUser = async(designId: number, userId: number) => {
    const [rows] = await db.query(
        "SELECT * FROM designs WHERE design_id = ? AND user_id = ?", [designId, userId]
    );
    const result = rows as Design[];
    return result[0] || null;
};
