import { Request, Response } from "express";
import customerService from "./customer.service.js";
import stampService from "../stamp/stamp.service.js";

class CustomerController {

    async create(req: Request, res: Response) {
        const customer = await customerService.createCustomer(req.body);

        return res.status(201).json(customer);
    }

    async getAll(req: Request, res: Response) {
        const customers = await customerService.getCustomers();

        return res.json(customers);
    }

    async getOne(req: Request, res: Response) {
        const customer = await customerService.getCustomer(
            req.params.id as string
        );

        return res.json(customer);
    }

    async update(req: Request, res: Response) {
        const customer = await customerService.updateCustomer(
            req.params.id as string,
            req.body
        );

        return res.json(customer);
    }

    async delete(req: Request, res: Response) {
        await customerService.deleteCustomer(
            req.params.id as string
        );

        return res.json({
            success: true,
        });
    }

    async getBusinessCustomers(req: Request, res: Response) {
        try {
            const businessId = (req as Request & { user?: { businessId?: string } }).user?.businessId;

            if (!businessId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
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
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch customers',
            });
        }
    }
}

export default new CustomerController();