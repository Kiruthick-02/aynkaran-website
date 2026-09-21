// backend/routes/companyRoutes.js
import { Router } from 'express';
import { CompanyController } from '../controllers/companyController.js';
// use your existing multer fields helper
import { companyUpload } from '../middleware/uploadMiddleware.js';

export function companyRoutes(db) {
  const router = Router();
  const ctrl = new CompanyController(db);

  router.get('/', ctrl.list);

  router.post(
    '/',
    companyUpload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'backgroundImage', maxCount: 1 },
    ]),
    ctrl.create
  );

  router.put(
    '/:id',
    companyUpload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'backgroundImage', maxCount: 1 },
    ]),
    ctrl.update
  );

  router.post('/:companyId/policies', companyUpload.single('brochure'), ctrl.addPolicy);
  router.put('/:companyId/policies/:schemeId', companyUpload.single('brochure'), ctrl.updatePolicy);
  router.delete('/:companyId/policies/:schemeId', ctrl.deletePolicy);

  return router;
}