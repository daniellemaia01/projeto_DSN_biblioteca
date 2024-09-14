// Inicializar Back4App com suas chaves (substitua com as suas)
Parse.initialize("zQ8GBmAbVEIGSPmbMMKKYZHPiN3stv2Ou9ZyGoqN", "Bpkjzp40fafbzqZ8xGq9vM0TbwBJC5WawcMApOvp");
Parse.serverURL = 'https://parseapi.back4app.com/';

// Função para criar uma nova reserva
async function createReservation(roomNumber, reservationTime, reservedBy) {
    const Reservation = Parse.Object.extend('Reservations');
    const newReservation = new Reservation();

    newReservation.set('roomNumber', roomNumber);
    newReservation.set('reservationTime', reservationTime);
    newReservation.set('reservedBy', reservedBy);
    newReservation.set('status', true); // Reserva ativa por padrão

    try {
        await newReservation.save();  // Salva no Back4App
        alert('Reserva criada com sucesso!');
        fetchReservations();  // Atualiza a lista de reservas
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
    }
}

// Função para buscar e listar as reservas
async function fetchReservations() {
    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);

    try {
        const results = await query.find();  // Busca todas as reservas
        const reservationList = document.getElementById('reservationList');
        reservationList.innerHTML = '';  // Limpa a lista anterior

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
            reservationList.appendChild(listItem);  // Exibe a lista de reservas
        });
    } catch (error) {
        console.error('Erro ao buscar reservas:', error);
    }
}

// Função para deletar uma reserva
async function deleteReservation(id) {
    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);

    try {
        const reservation = await query.get(id);  // Busca a reserva pelo ID
        await reservation.destroy();  // Exclui a reserva
        alert('Reserva cancelada!');
        fetchReservations();  // Atualiza a lista de reservas
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
    }
}

// Função para editar uma reserva
async function editReservation(id) {
    const newRoomNumber = prompt('Novo número da sala:');
    const newReservationTime = prompt('Novo horário da reserva:');

    const Reservation = Parse.Object.extend('Reservations');
    const query = new Parse.Query(Reservation);

    try {
        const reservation = await query.get(id);  // Busca a reserva pelo ID
        reservation.set('roomNumber', newRoomNumber);  // Atualiza o número da sala
        reservation.set('reservationTime', new Date(newReservationTime));  // Atualiza o horário
        await reservation.save();  // Salva a alteração no Back4App
        alert('Reserva atualizada!');
        fetchReservations();  // Atualiza a lista de reservas
    } catch (error) {
        console.error('Erro ao atualizar reserva:', error);
    }
}

// Lida com o envio do formulário de reservas
document.getElementById('reservationForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Previne o envio padrão do formulário

    const roomNumber = document.getElementById('roomNumber').value;
    const reservationTime = new Date(document.getElementById('reservationTime').value);
    const reservedBy = document.getElementById('reservedBy').value;

    createReservation(roomNumber, reservationTime, reservedBy);
});

// Chama a função para listar as reservas ao carregar a página
window.onload = fetchReservations;
