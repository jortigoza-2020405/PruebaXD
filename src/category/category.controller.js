import Category from './category.model.js';

// Crear categoría
export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = new Category(data);
        await category.save();
        return res.status(201).send({ message: 'Categoría creada exitosamente', category });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear categoría', error });
    }
};

// Obtener todas las categorías
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('hotel', 'name').populate('rooms', 'roomNumber');
        return res.send({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener categorías', error });
    }
};

// Obtener categoría por ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate('hotel', 'name').populate('rooms', 'roomNumber');
        if (!category) return res.status(404).send({ message: 'Categoría no encontrada' });
        return res.send({ category });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener categoría', error });
    }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCategory) return res.status(404).send({ message: 'Categoría no encontrada' });
        return res.send({ message: 'Categoría actualizada', updatedCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar categoría', error });
    }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).send({ message: 'Categoría no encontrada' });
        return res.send({ message: 'Categoría eliminada correctamente', deletedCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar categoría', error });
    }
};
