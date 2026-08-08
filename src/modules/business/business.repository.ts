import BusinessModel from './business.model';
import { CreateBusinessDto } from '../business/business.validation';

export class BusinessRepository {
    async create(data: CreateBusinessDto) {
        return BusinessModel.create(data);
    }

    async findById(id: string) {
        return BusinessModel.findById(id);
    }

    async findByEmail(email: string) {
        return BusinessModel.findOne({ email });
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