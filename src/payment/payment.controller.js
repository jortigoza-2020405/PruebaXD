import Payment from './payment.model.js';

// Crear pago
export const createPayment = async (req, res) => {
    try {
        const data = req.body;
        const payment = new Payment(data);
        await payment.save();
        return res.status(201).send({ message: 'Pago creado exitosamente', payment });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al crear pago', error });
    }
};

// Obtener todos los pagos
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('reservation');
        return res.send({ payments });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener pagos', error });
    }
};

// Obtener pago por ID
export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('reservation');
        if (!payment) return res.status(404).send({ message: 'Pago no encontrado' });
        return res.send({ payment });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener pago', error });
    }
};

// Actualizar pago
export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedPayment = await Payment.findByIdAndUpdate(id, data, { new: true });
        if (!updatedPayment) return res.status(404).send({ message: 'Pago no encontrado' });
        return res.send({ message: 'Pago actualizado', updatedPayment });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar pago', error });
    }
};

// Eliminar pago
export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) return res.status(404).send({ message: 'Pago no encontrado' });
        return res.send({ message: 'Pago eliminado correctamente', deletedPayment });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar pago', error });
    }
};
