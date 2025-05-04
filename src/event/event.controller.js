import Event from './event.model.js';

// Crear evento
export const createEvent = async (req, res) => {
    try {
        const data = req.body;
        const event = new Event(data);
        await event.save();
        return res.status(201).send({ message: 'Evento creado exitosamente', event });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear evento', error });
    }
};

// Obtener todos los eventos
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('hotel', 'name');
        return res.send({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener eventos', error });
    }
};

// Obtener evento por ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('hotel', 'name');
        if (!event) return res.status(404).send({ message: 'Evento no encontrado' });
        return res.send({ event });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener evento', error });
    }
};

// Actualizar evento
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true });
        if (!updatedEvent) return res.status(404).send({ message: 'Evento no encontrado' });
        return res.send({ message: 'Evento actualizado', updatedEvent });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar evento', error });
    }
};

// Eliminar evento
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).send({ message: 'Evento no encontrado' });
        return res.send({ message: 'Evento eliminado correctamente', deletedEvent });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar evento', error });
    }
};
