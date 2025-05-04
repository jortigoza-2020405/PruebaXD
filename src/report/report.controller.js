import Reservation from '../reservation/reservation.model.js';
import Payment from '../payment/payment.model.js';
import Invoice from '../invoice/invoice.model.js';

// 🔎 Reporte 1: Reservas por usuario
export const getReservationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await Reservation.find({ user: userId })
            .populate('hotel', 'name')
            .populate('room', 'roomNumber');
        return res.send({ reservations });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener reservas por usuario', error });
    }
};

// 🔎 Reporte 2: Reservas por hotel
export const getReservationsByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const reservations = await Reservation.find({ hotel: hotelId })
            .populate('user', 'firstName lastName email')
            .populate('room', 'roomNumber');
        return res.send({ reservations });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener reservas por hotel', error });
    }
};

// 🔎 Reporte 3: Pagos por hotel
export const getPaymentsByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const payments = await Payment.find()
            .populate({
                path: 'reservation',
                match: { hotel: hotelId },
                populate: [
                    { path: 'hotel', select: 'name' },
                    { path: 'user', select: 'firstName lastName' }
                ]
            });

        // Filtrar pagos que sí tienen reserva del hotel
        const filtered = payments.filter(p => p.reservation);

        return res.send({ payments: filtered });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener pagos por hotel', error });
    }
};

// 🔎 Reporte 4: Facturas por usuario
export const getInvoicesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Buscar todas las reservas del usuario
        const reservations = await Reservation.find({ user: userId }).select('_id');

        const invoices = await Invoice.find({ reservation: { $in: reservations } })
            .populate('reservation');

        return res.send({ invoices });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener facturas por usuario', error });
    }
};
