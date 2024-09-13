const APP_ID = 'zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN';
const JAVASCRIPT_KEY = '08h3KTkweA8TpKcRAyn5x9kPbM3hPBKjbwM6IXIA';

Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com';

async function createReservation(roomNumber, reservationTime, reservedBy) {
    const Reservation = Parse.Object.extend('Reservations');
    const newReservation = new Reservation();

    newReservation.set('roomNumber', roomNumber);
    newReservation.set('reservationTime', reservationTime);
    newReservation.set('reservedBy', reservedBy);
    newReservation.set('status', true); // Ativa por padrão

    try {
        await newReservation.save();
        alert('Reserva criada com sucesso!');
        fetchReservations();
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
    }
}

async function fetchReservations() {
    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);
    try {
        const results = await query.find();
        const reservationList = document.getElementById('reservationList');
        reservationList.innerHTML = '';

        results.forEach(reservation => {
            const roomNumber = reservation.get('roomNumber');
            const reservationTime = reservation.get('reservationTime');
            const reservedBy = reservation.get('reservedBy');
            
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <p>Sala: ${roomNumber} - Horário: ${reservationTime} - Reservado por: ${reservedBy}</p>
                <button onclick="deleteReservation('${reservation.id}')">Cancelar</button>
                <button onclick="editReservation('${reservation.id}')">Editar</button>
            `;
            reservationList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
    }
}

async function deleteReservation(id) {
    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);
    try {
        const reservation = await query.get(id);
        await reservation.destroy();
        alert('Reserva cancelada!');
        fetchReservations();
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
    }
}

async function editReservation(id) {
    const newRoomNumber = prompt('Novo número da sala:');
    const newReservationTime = prompt('Novo horário da reserva:');
    
    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);
    try {
        const reservation = await query.get(id);
        reservation.set('roomNumber', newRoomNumber);
        reservation.set('reservationTime', new Date(newReservationTime));
        await reservation.save();
        alert('Reserva atualizada!');
        fetchReservations();
    } catch (error) {
        console.error('Erro ao atualizar reserva:', error);
    }
}

document.getElementById('reservationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const roomNumber = document.getElementById('roomNumber').value;
    const reservationTime = new Date(document.getElementById('reservationTime').value);
    const reservedBy = document.getElementById('reservedBy').value;

    createReservation(roomNumber, reservationTime, reservedBy);
});

window.onload = fetchReservations;
