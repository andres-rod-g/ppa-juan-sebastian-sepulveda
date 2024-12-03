import { Request, Response, Router } from 'express';
import authController from '@/controllers/auth.controller';
import jwtMiddleware from '@/middlewares/jwt.middleware';
import { body, query } from 'express-validator';
import UserModel from '@/models/user.model';

import expressValidatorMiddleware from '@/middlewares/expressValidator.middleware';

const router = Router();

// Ruta para iniciar sesión
router.post(
  '/login', 
  [
    body("email").isEmail().withMessage("Correo electrónico es requerido."),
    body("password").isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres."),
  ],
  expressValidatorMiddleware.responseWithErrors,
  authController.login
);

// Ejemplo de ruta protegida que requiere autenticación
router.get('/protected', jwtMiddleware.jwtMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId, userRole: req.userRole });
});

router.get(
  '/',
  [
    query("userId").notEmpty().withMessage("Campo requerido")
  ],
  expressValidatorMiddleware.responseWithErrors,
  authController.getUserData
)

// Endpoint para registro
router.post(
  '/register',
  [
    // Validaciones
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  expressValidatorMiddleware.responseWithErrors,
  authController.register
);

// Endpoint para registro
router.post(
  '/fastRegister',
  [
    // Validaciones
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  expressValidatorMiddleware.responseWithErrors,
  authController.registerAndLogin
);


export default router;
