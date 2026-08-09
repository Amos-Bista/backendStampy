import { Request, Response } from "express";
import customerService from "./customer.service.js";

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
}

export default new CustomerController();