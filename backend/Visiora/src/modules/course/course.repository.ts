import db from "../../config/db.js";

type Course = {
    course_id: number;
    title: string;
    description: string;
    tier_required: number;
    location: string;
    meeting_url: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
};

export const findAll = async(): Promise<Course[]> => {
    const [rows] = await db.query(
        "SELECT * FROM courses"
    );
    return rows as Course[];
};

export const findById = async(id: number): Promise<Course | null> => {
    const [rows] = await db.query(
        "SELECT * FROM courses WHERE course_id = ?", [id]
    );
    const result = rows as Course[];
    return result[0] || null;
};