type DesignHistory = {
	design_id: number;
    title: string;
    thumbnail_url: string;
    created_at: Date;
};

type UpdateDesignInput = {
    template_id: number;
    title: string;
    category: string;
    thumbnail_url: string;
    design_json: unknown;
    caption: string;
};

export const toDesignHistoryResponse = (designHistory: DesignHistory) => {
	return {
		design_id: designHistory.design_id,
        title: designHistory.title,
        thumbnail_url: designHistory.thumbnail_url,
        created_at: designHistory.created_at,
	};
};

export const toDesignListResponse = (designs: DesignHistory[]) => {
	return designs.map(toDesignHistoryResponse);
};

export const toUpdateDesignResponse = (design: any) => {
    return {
        template_id: design.template_id,
        title: design.title,
        category: design.category,
        thumbnail_url: design.thumbnail_url,
        design_json: design.design_json,
        caption: design.caption,
    };
};

export const toDesignDetailResponse = (design: any) => {
    return toUpdateDesignResponse(design);
};