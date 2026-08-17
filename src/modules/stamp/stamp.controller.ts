import { Request, Response, NextFunction } from "express";
import stampService from "./stamp.service.js";

class StampController {

    async claimStamp(req: Request, res: Response, next: NextFunction) {
        try {
            // 1. Get IDs from URL params or token or body
            const businessId = req.params.businessId || req.body.businessId;
            const offerId = req.params.offerId || req.body.offerId;
            const customerId =
                req.params.customerId ||
                (req as any).user?.id ||
                (req as any).user?.customerId ||
                req.body.customerId;

            if (!businessId || !offerId || !customerId) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required parameters: businessId, offerId, or customerId",
                });
            }

            // 2. Call Service
            const stamp = await stampService.claimStamp({
                customerId,
                businessId,
                offerId,
            });

            return res.status(201).json({
                success: true,
                message: "Stamp claimed successfully!",
                data: stamp,
                customerId,
            });
        } catch (error) {
            next(error);
        }
    }


    async createStamp(req: Request, res: Response, next: NextFunction) {
        try {
            const stamp = await stampService.createStamp(req.body);

            return res.status(201).json({
                success: true,
                data: stamp,
            });
        } catch (error) {
            return next(error);
        }
    }

    async getCustomerStamps(req: Request, res: Response) {

        const customerId = Array.isArray(req.params.customerId)
            ? req.params.customerId[0]
            : req.params.customerId;

        const stamps =
            await stampService.getCustomerStamps(customerId);

        return res.json({
            success: true,
            data: stamps,
        });
    }

    async getBusinessStamps(req: Request, res: Response) {

        const businessId = Array.isArray(req.params.businessId)
            ? req.params.businessId[0]
            : req.params.businessId;

        const stamps =
            await stampService.getBusinessStamps(businessId);

        return res.json({
            success: true,
            data: stamps,
        });
    }

    async getTotalStamps(req: Request, res: Response) {

        const customerId = Array.isArray(req.params.customerId)
            ? req.params.customerId[0]
            : req.params.customerId;

        const total =
            await stampService.getTotalStamps(customerId);

        return res.json({
            success: true,
            total,
        });
    }


    async getBusinessCustomers(
        req: Request,
        res: Response
    ) {
        try {
            const businessId = req.user?.businessId;

            if (!businessId) {
                return res.status(401).json({
                    success: false,
                    message: "Business context is missing",
                });
            }

            const customers =
                await stampService.getCustomersByBusinessId(
                    businessId
                );

            return res.status(200).json({
                success: true,
                data: {
                    customers,
                },
            });

        } catch (error: any) {
            console.error(
                'Get business customers error:',
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    error.message ||
                    'Failed to fetch customers',
            });
        }
    }
}

export default new StampController();