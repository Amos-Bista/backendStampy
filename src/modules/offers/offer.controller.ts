import { Request, Response } from "express";
import offerService from "./offer.service.js";

class OfferController {
    private getIdParam = (req: Request): string => {
        const id = req.params.id;
        return Array.isArray(id) ? id[0] : id;
    };

    createOffer = async (req: Request, res: Response) => {
        try {
            const businessId = req.user?.businessId;

            if (!businessId) {
                return res.status(401).json({
                    success: false,
                    message: "Business context is missing",
                });
            }

            const offer = await offerService.createOffer({
                ...req.body,
                businessId,
            });

            return res.status(201).json({
                success: true,
                data: offer,
            });

        } catch (error: any) {
            console.error("Create offer error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error?.message ||
                    "Failed to create offer.",
            });
        }
    };


    getOffers = async (req: Request, res: Response) => {
        try {
            const businessId = req.user?.businessId;

            if (!businessId) {
                return res.status(401).json({
                    success: false,
                    message: "Business context is missing",
                });
            }

            console.log(
                "Fetching offers for business:",
                businessId
            );

            const offers =
                await offerService.getOffers(businessId);

            return res.status(200).json({
                success: true,
                data: offers,
            });

        } catch (error: any) {
            console.error("Get offers error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error?.message ||
                    "Failed to fetch offers.",
            });
        }
    };


    getOffer = async (req: Request, res: Response) => {
        try {
            const id = this.getIdParam(req);

            const offer = await offerService.getOffer(id);

            if (!offer) {
                return res.status(404).json({
                    success: false,
                    message: "Offer not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: offer,
            });

        } catch (error: any) {
            console.error("Get offer error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error?.message ||
                    "Failed to fetch offer.",
            });
        }
    };


    updateOffer = async (req: Request, res: Response) => {
        try {
            const id = this.getIdParam(req);

            const offer = await offerService.updateOffer(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                data: offer,
            });

        } catch (error: any) {
            console.error("Update offer error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error?.message ||
                    "Failed to update offer.",
            });
        }
    };


    deleteOffer = async (req: Request, res: Response) => {
        try {
            const id = this.getIdParam(req);

            await offerService.deleteOffer(id);

            return res.status(200).json({
                success: true,
                message: "Offer deleted successfully.",
            });

        } catch (error: any) {
            console.error("Delete offer error:", error);

            return res.status(500).json({
                success: false,
                message:
                    error?.message ||
                    "Failed to delete offer.",
            });
        }
    };
}

export default new OfferController();