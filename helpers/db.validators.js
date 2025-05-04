import User from '../src/user/user.model.js';
import Hotel from '../src/hotel/hotel.model.js';
import Room from '../src/room/room.model.js';
import Event from '../src/event/event.model.js';
import Invoice from '../src/invoice/invoice.model.js';
import Payment from '../src/payment/payment.model.js';
import Reservation from '../src/reservation/reservation.model.js';

// ===== USUARIOS =====

export const existEmail = async(email) => {
    const emailExist = await User.findOne({ email });
    if(emailExist){
        console.error(`El email ${email} ya está registrado`);
        throw new Error(`El email ${email} ya está registrado`);
    }
};

export const findUserById = async(id) => {
    const user = await User.findById(id);
    if(!user){
        console.error(`No existe un usuario con ID ${id}`);
        throw new Error(`No existe un usuario con ID ${id}`);
    }
    return user;
};

// ===== HOTEL =====

export const existHotelByName = async(name) => {
    const hotel = await Hotel.findOne({ name });
    if(hotel){
        console.error(`Ya existe un hotel con el nombre ${name}`);
        throw new Error(`Ya existe un hotel con el nombre ${name}`);
    }
};

export const findHotelById = async(id) => {
    const hotel = await Hotel.findById(id);
    if(!hotel){
        console.error(`No existe un hotel con ID ${id}`);
        throw new Error(`No existe un hotel con ID ${id}`);
    }
    return hotel;
};

// ===== ROOM =====

export const existRoomNumber = async(roomNumber, hotelId) => {
    const room = await Room.findOne({ roomNumber, hotel: hotelId });
    if(room){
        console.error(`Ya existe una habitación con número ${roomNumber} en este hotel`);
        throw new Error(`Ya existe una habitación con número ${roomNumber} en este hotel`);
    }
};

export const findRoomById = async(id) => {
    const room = await Room.findById(id);
    if(!room){
        console.error(`No existe una habitación con ID ${id}`);
        throw new Error(`No existe una habitación con ID ${id}`);
    }
    return room;
};

// ===== EVENT =====

export const existEventNameInHotel = async(name, hotelId) => {
    const event = await Event.findOne({ name, hotel: hotelId });
    if(event){
        console.error(`Ya existe un evento llamado ${name} en este hotel`);
        throw new Error(`Ya existe un evento llamado ${name} en este hotel`);
    }
};

export const findEventById = async(id) => {
    const event = await Event.findById(id);
    if(!event){
        console.error(`No existe un evento con ID ${id}`);
        throw new Error(`No existe un evento con ID ${id}`);
    }
    return event;
};

// ===== RESERVATION =====

export const findReservationById = async(id) => {
    const reservation = await Reservation.findById(id);
    if(!reservation){
        console.error(`No existe una reserva con ID ${id}`);
        throw new Error(`No existe una reserva con ID ${id}`);
    }
    return reservation;
};

// ===== INVOICE =====

export const findInvoiceById = async(id) => {
    const invoice = await Invoice.findById(id);
    if(!invoice){
        console.error(`No existe una factura con ID ${id}`);
        throw new Error(`No existe una factura con ID ${id}`);
    }
    return invoice;
};

// ===== PAYMENT =====

export const findPaymentById = async(id) => {
    const payment = await Payment.findById(id);
    if(!payment){
        console.error(`No existe un pago con ID ${id}`);
        throw new Error(`No existe un pago con ID ${id}`);
    }
    return payment;
};
