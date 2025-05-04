import Hotel from './hotel.model.js';

// Crear hotel
export const createHotel = async (req, res) => {
    try {
        const data = req.body;
        const hotel = new Hotel(data);
        await hotel.save();
        return res.status(201).send({ message: 'Hotel creado exitosamente', hotel });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear el hotel', error });
    }
};

// Obtener todos los hoteles
export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        return res.send({ hotels });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener hoteles', error });
    }
};

// Obtener hotel por ID
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) return res.status(404).send({ message: 'Hotel no encontrado' });
        return res.send({ hotel });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener hotel', error });
    }
};

// Actualizar hotel
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedHotel = await Hotel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedHotel) return res.status(404).send({ message: 'Hotel no encontrado' });
        return res.send({ message: 'Hotel actualizado correctamente', updatedHotel });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar hotel', error });
    }
};

// Eliminar hotel
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) return res.status(404).send({ message: 'Hotel no encontrado' });
        return res.send({ message: 'Hotel eliminado correctamente', deletedHotel });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar hotel', error });
    }
};
