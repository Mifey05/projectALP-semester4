import db from "../../config/db.js";

type Template = {
    template_id: number;
    title: string;
    category: Category;
    thumbnail_url: string;
    design_json: string;
    caption: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
};

type Category = "FnB" | "Fashion" | "Beauty" | "Agribusiness" | "Automotive" | "Trading" | "Processing Industry" | "Agriculture" | "Plantation" | "Farm" | "Fishery" | "Service" | "Other";

export const findAll = async (): Promise<Template[]> => {
    const [rows] = await db.query(
        "SELECT * FROM templates WHERE is_active = true"
    );
    return rows as Template[];
};

export const findById = async(id : number): Promise<Template | null> => {
    const [rows] = await db.query(
        "SELECT * FROM templates WHERE template_id = ?", [id]
    );
    const result = rows as Template[];
    return result[0] || null;
};