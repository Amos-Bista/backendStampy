import { Router } from 'express';
import businessController from '../modules/business/business.controller';
// import businessController from '../business/business.controller.ts';

// console.log('businessController:', businessController);
const router = Router();
router.post('/', (req, res, next) => {
    console.log('POST /api/v1/businesses hit');
    next();
}, businessController.create);

router.post('/', businessController.create);

router.get('/:id', businessController.get);

router.put('/:id', businessController.update);

router.delete('/:id', businessController.delete);

export default router;