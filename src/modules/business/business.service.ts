import businessRepository from './business.repository.js';
import { CreateBusinessDto } from '../business/business.validation.js';

class BusinessService {
    async createBusiness(data: CreateBusinessDto) {
        const exists = await businessRepository.findByEmail(data.email);

        if (exists) {
            throw new Error('Business already exists');
        }

        return businessRepository.create(data);
    }

    async getBusiness(id: string) {
        return businessRepository.findById(id);
    }

    async updateBusiness(
        id: string,
        data: Partial<CreateBusinessDto>,
    ) {
        return businessRepository.update(id, data);
    }

    async deleteBusiness(id: string) {
        return businessRepository.delete(id);
    }
}

export default new BusinessService();