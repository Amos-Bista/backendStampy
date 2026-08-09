import { Request, Response } from "express";
import offerService from "./offer.service.js";

class OfferController {
    private getParamValue(param: string | string[]): string {
        return Array.isArray(param) ? param[0] : param;
    }

    createOffer = async (req: Request, res: Response) => {
        try {
            const offer = await offerService.createOffer(req.body);

            return res.status(201).json({
                success: true,
                data: offer,
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error?.message || 'Failed to create offer.',
            });
        }
    };

    getOffers = async (req: Request, res: Response) => {
        const businessId = this.getParamValue(req.params.businessId);

        const offers = await offerService.getOffers(businessId);

        return res.json({
            success: true,
            data: offers,
        });
    };

    getOffer = async (req: Request, res: Response) => {
        const id = this.getParamValue(req.params.id);

        const offer = await offerService.getOffer(id);

        return res.json({
            success: true,
            data: offer,
        });
    };

    updateOffer = async (req: Request, res: Response) => {
        const id = this.getParamValue(req.params.id);

        const offer = await offerService.updateOffer(id, req.body);

        return res.json({
            success: true,
            data: offer,
        });
    };

    deleteOffer = async (req: Request, res: Response) => {
        const id = this.getParamValue(req.params.id);

        await offerService.deleteOffer(id);

        return res.json({
            success: true,
            message: "Offer deleted successfully.",
        });
    };
}

export default new OfferController();