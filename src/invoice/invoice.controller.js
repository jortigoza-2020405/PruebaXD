import Invoice from './invoice.model.js';

// Crear factura
export const createInvoice = async (req, res) => {
    try {
        const data = req.body;

        // Calcular total automáticamente si no lo manda el cliente
        if (!data.total && data.items) {
            data.total = data.items.reduce((acc, item) => acc + Number(item.price), 0);
        }

        const invoice = new Invoice(data);
        await invoice.save();
        return res.status(201).send({ message: 'Factura creada exitosamente', invoice });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear factura', error });
    }
};

// Obtener todas las facturas
export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('reservation');
        return res.send({ invoices });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener facturas', error });
    }
};

// Obtener factura por ID
export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id).populate('reservation');
        if (!invoice) return res.status(404).send({ message: 'Factura no encontrada' });
        return res.send({ invoice });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener factura', error });
    }
};

// Actualizar factura
export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, data, { new: true });
        if (!updatedInvoice) return res.status(404).send({ message: 'Factura no encontrada' });
        return res.send({ message: 'Factura actualizada', updatedInvoice });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar factura', error });
    }
};

// Eliminar factura
export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        if (!deletedInvoice) return res.status(404).send({ message: 'Factura no encontrada' });
        return res.send({ message: 'Factura eliminada correctamente', deletedInvoice });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar factura', error });
    }
};
