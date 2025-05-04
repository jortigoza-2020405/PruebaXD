import Room from './room.model.js';

// Crear habitación
export const createRoom = async (req, res) => {
    try {
        const data = req.body;
        const room = new Room(data);
        await room.save();
        return res.status(201).send({ message: 'Habitación creada exitosamente', room });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear la habitación', error });
    }
};

// Obtener todas las habitaciones
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel', 'name');
        return res.send({ rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener habitaciones', error });
    }
};

// Obtener habitación por ID
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id).populate('hotel', 'name');
        if (!room) return res.status(404).send({ message: 'Habitación no encontrada' });
        return res.send({ room });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener habitación', error });
    }
};

// Actualizar habitación
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(id, data, { new: true });
        if (!updatedRoom) return res.status(404).send({ message: 'Habitación no encontrada' });
        return res.send({ message: 'Habitación actualizada correctamente', updatedRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar habitación', error });
    }
};

// Eliminar habitación
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) return res.status(404).send({ message: 'Habitación no encontrada' });
        return res.send({ message: 'Habitación eliminada correctamente', deletedRoom });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar habitación', error });
    }
};
