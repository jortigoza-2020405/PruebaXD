//Configurar el servidor express (HTTP)
'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import { ensureDefaultCategory } from '../src/category/category.defautl.js';
import authRoutes from '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import roomRoutes from '../src/room/room.routes.js'
import userRoutes from '../src/user/user.routes.js'
import eventRoutes from '../src/event/event.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import reservationRoutes from '../src/reservation/reservation.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'
import paymentRoutes from '../src/payment/payment.routes.js'
import reportRoutes from '../src/report/report.routes.js'
 
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
    
}

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);

        // Ejecutar antes de levantar el servidor
        await ensureDefaultCategory();

        app.listen(process.env.PORT);
        console.log(`Server running in port ${process.env.PORT}`);

    } catch (err) {
        console.error('Servidor init failed', err);
    }
};

const routes = (app)=>{
    app.use('/api/auth', authRoutes);
    app.use('/api/hotels', hotelRoutes);
    app.use('/api/rooms', roomRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/events', eventRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/reservations', reservationRoutes);
    app.use('/api/invoices', invoiceRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/reports', reportRoutes);
}