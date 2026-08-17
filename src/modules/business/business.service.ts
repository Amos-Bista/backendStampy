import jwt from 'jsonwebtoken';
import businessRepository from './business.repository.js';
import { CreateBusinessDto } from '../business/business.validation.js';
import bcrypt from 'bcryptjs';

class BusinessService {
    async createBusiness(data: CreateBusinessDto) {
        const businessInput = data as CreateBusinessDto & { password: string };

        // 1. Check if business already exists
        const exists = await businessRepository.findByEmail(businessInput.email);

        if (exists) {
            throw new Error('Business already exists');
        }

        // 2. Hash password before saving
        const hashedPassword = await bcrypt.hash(businessInput.password, 10);

        const businessData = {
            ...businessInput,
            password: hashedPassword,
        };

        // 3. Save business
        const business =
            await businessRepository.create(businessData);

        // 4. Generate JWT
        const JWT_SECRET =
            process.env.JWT_SECRET || 'your_jwt_secret_key';

        const token = jwt.sign(
            {
                id: business._id.toString(),
                businessId: business._id.toString(),
                email: business.email,
                slug: business.slug,
                role: 'BUSINESS',
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return {
            business,
            token,
        };
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