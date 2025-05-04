import Reservation from './reservation.model.js';

// Crear reserva
export const createReservation = async (req, res) => {
    try {
        const data = req.body;
        const reservation = new Reservation(data);
        await reservation.save();
        return res.status(201).send({ message: 'Reserva creada exitosamente', reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear reserva', error });
    }
};

// Obtener todas las reservas
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('user', 'firstName lastName email')
            .populate('hotel', 'name')
            .populate('room', 'roomNumber');
        return res.send({ reservations });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener reservas', error });
    }
};

// Obtener reserva por ID
export const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id)
            .populate('user', 'firstName lastName email')
            .populate('hotel', 'name')
            .populate('room', 'roomNumber');
        if (!reservation) return res.status(404).send({ message: 'Reserva no encontrada' });
        return res.send({ reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener reserva', error });
    }
};

// Actualizar reserva
export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedReservation = await Reservation.findByIdAndUpdate(id, data, { new: true });
        if (!updatedReservation) return res.status(404).send({ message: 'Reserva no encontrada' });
        return res.send({ message: 'Reserva actualizada', updatedReservation });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar reserva', error });
    }
};

// Eliminar reserva
export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);
        if (!deletedReservation) return res.status(404).send({ message: 'Reserva no encontrada' });
        return res.send({ message: 'Reserva eliminada correctamente', deletedReservation });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar reserva', error });
    }
};
