import { Request, Response } from 'express';
import businessService from './business.service.js';
// console.log('Request body:',); // Log the request body for debugging

class BusinessController {

    private getId(req: Request): string {
        const { id } = req.params;
        return Array.isArray(id) ? id[0] : id;
    }

    async create(req: Request, res: Response) {
        // console.log('Request body:', req.body); // Log the request body for debugging
        const business = await businessService.createBusiness(req.body);

        res.status(201).json({
            success: true,
            message: 'Business created successfully',
            data: business,
        });
    }

    async get(req: Request, res: Response) {
        const business = await businessService.getBusiness(this.getId(req));

        res.json({
            success: true,
            data: business,
        });
    }

    async update(req: Request, res: Response) {
        const business = await businessService.updateBusiness(
            this.getId(req),
            req.body,
        );

        res.json({
            success: true,
            data: business,
        });
    }

    async delete(req: Request, res: Response) {
        await businessService.deleteBusiness(this.getId(req));

        res.json({
            success: true,
        });
    }
}

export default new BusinessController();