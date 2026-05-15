import db from "../../config/db.js";

type Enterprise = {
    enterprise_id: number;
    user_id: number;
    enterprise_name: string;
    enterprise_type: EnterpriseType;
    address: string;
    tiktok: string;
    instagram: string;
    whatsapp: string;
    created_at: Date;
    updated_at: Date;
};

type UpsertEnterpriseInput = {
    user_id: number;
    enterprise_name?: string;
    enterprise_type?: EnterpriseType;
    address?: string;
    tiktok?: string;
    instagram?: string;
    whatsapp?: string;
};

type EnterpriseType = "FnB" | "Fashion" | "Beauty" | "Agribusiness" | "Automotive" | "Trading" | "Processing Industry" | "Agriculture" | "Plantation" | "Farm" | "Fishery" | "Service" | "Other";

export const findByUserId = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM user_enterprises WHERE user_id = ?", [userId]
    );
    const result = rows as Enterprise[];
    return result[0] || null;
};

export const upsert = async (
  data: UpsertEnterpriseInput
): Promise<void> => {
  await db.query(
    `INSERT INTO user_enterprises 
    (user_id, enterprise_name, enterprise_type, address, tiktok, instagram, whatsapp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      enterprise_name = VALUES(enterprise_name),
      enterprise_type = VALUES(enterprise_type),
      address = VALUES(address),
      tiktok = VALUES(tiktok),
      instagram = VALUES(instagram),
      whatsapp = VALUES(whatsapp)`,
    [
      data.user_id,
      data.enterprise_name,
      data.enterprise_type,
      data.address,
      data.tiktok ?? null,
      data.instagram ?? null,
      data.whatsapp ?? null,
    ]
  );
};