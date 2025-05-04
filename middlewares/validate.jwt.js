'use strict'

import jwt from 'jsonwebtoken';
import { findUserById } from '../helpers/db.validators.js';

export const validateJwt = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY;

        // Obtener el token desde el header Authorization
        let { authorization } = req.headers;

        if (!authorization) return res.status(401).send({ message: 'No autorizado. No hay token' });

        // Si viene con Bearer, separamos el token
        let token = authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : authorization;

        // Verificar el token
        const decoded = jwt.verify(token, secretKey);

        // Buscar el usuario por ID
        const user = await findUserById(decoded.uid);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Usuario no encontrado - No autorizado'
            });
        }

        // Agregar el usuario completo al request
        req.user = user;

        next();

    } catch (err) {
        console.error('Error en JWT:', err);
        return res.status(401).send({ message: 'Token inválido o expirado' });
    }
};

export const isAdminPlataforma = (req, res, next) => {
    try {
        if (req.user?.role !== 'adminPlataforma') {
            return res.status(403).send({
                message: 'Acceso denegado. Solo administradores de plataforma',
                success: false
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al verificar rol de administrador', success: false });
    }
};
