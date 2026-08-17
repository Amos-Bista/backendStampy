import BusinessModel from './business.model.js';
import { CreateBusinessDto } from '../business/business.validation.js';

export class BusinessRepository {
    async create(data: CreateBusinessDto) {
        return BusinessModel.create(data);
    }

    async findById(id: string) {
        return BusinessModel.findById(id);
    }


    async findByEmail(email: string) {
        return BusinessModel
            .findOne({
                email: email.toLowerCase().trim(),
            })
            .select("+password");
    }

    async findByPhone(phone: string) {
        return BusinessModel
            .findOne({
                phone: phone.trim(),
            })
            .select("+password");
    }

    async findByEmailOrPhone(identifier: string) {
        const value = identifier.trim();

        return BusinessModel
            .findOne({
                $or: [
                    {
                        email: value.toLowerCase(),
                    },
                    {
                        phone: value,
                    },
                ],
            })
            .select("+password");
    }

    async findBySlug(slug: string) {
        return BusinessModel.findOne({ slug });
    }

    async update(id: string, data: Partial<CreateBusinessDto>) {
        return BusinessModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async delete(id: string) {
        return BusinessModel.findByIdAndDelete(id);
    }
}

export default new BusinessRepository();