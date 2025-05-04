import { Router } from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from './category.controller.js';

import { validateJwt, isAdminPlataforma } from '../../middlewares/validate.jwt.js';
import { categoryValidator } from '../../helpers/validators.js';

const router = Router();

// Crear categoría (solo adminPlataforma)
router.post('/', [validateJwt, isAdminPlataforma, categoryValidator], createCategory);

// Obtener todas las categorías
router.get('/', getCategories);

// Obtener categoría por ID
router.get('/:id', getCategoryById);

// Actualizar categoría (solo adminPlataforma)
router.put('/:id', [validateJwt, isAdminPlataforma], updateCategory);

// Eliminar categoría (solo adminPlataforma)
router.delete('/:id', [validateJwt, isAdminPlataforma], deleteCategory);

export default router;
