import * as service from "./template.service.js";

export const getTemplates = async(req, res, next) => {
    try {
        const data = await service.getTemplates();
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const useTemplate = async(req, res, next) => {
    try {
        const { id } = req.params;
        const userId = 1; // temp

        const result = await service.useTemplate(id, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};