import Category from './category.model.js';

export const ensureDefaultCategory = async () => {
    try {
        const defaultCategoryName = 'Sin categoría';
        let defaultCategory = await Category.findOne({ name: defaultCategoryName });

        if (!defaultCategory) {
            defaultCategory = new Category({
                name: defaultCategoryName,
                description: 'Categoría por defecto para habitaciones o hoteles sin categoría'
            });
            await defaultCategory.save();
            console.log('✅ Categoría por defecto creada.');
        } else {
            console.log('✅ Categoría por defecto ya existe.');
        }

    } catch (error) {
        console.error('❌ Error al asegurar la categoría por defecto:', error);
    }
};
