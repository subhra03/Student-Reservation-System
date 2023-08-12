let reservations = [];

function validateInput(name, grade, guests, date) {
  let errors = [];
  
  if (name.trim() === '') {
    errors.push('Name cannot be empty');
  }
  
  if (grade.trim() === '') {
    errors.push('Grade cannot be empty');
  }
  
  if (isNaN(guests) || guests < 0) {
    errors.push('Number of guests must be a non-negative number');
  }
  
  const currentDate = new Date().toISOString().split('T')[0];
  if (date < currentDate) {
    errors.push('Event date cannot be in the past');
  }

  return errors;
}

function addReservation(name, grade, guests, date) {
  const reservation = {
    name,
    grade,
    guests: parseInt(guests),
    date,
  };
  
  reservations.push(reservation);
  updateReservationList();
}

function updateReservationList() {
  const reservationListElement = document.getElementById('reservationList');
  reservationListElement.innerHTML = '';

  let totalStudents = 0;
  let totalGuests = 0;

  reservations.forEach((reservation, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span><b>Name:</b> ${reservation.name}</span>
      <span><b>Grade:</b> ${reservation.grade}</span>
      <span><b>Guests:</b> ${reservation.guests}</span>
      <span><b>Date:</b> ${reservation.date}</span>
      <button onclick="cancelReservation(${index})">Cancel</button>
    `;
    reservationListElement.appendChild(listItem);

    totalStudents++;
    totalGuests += reservation.guests;
  });

  document.getElementById('totalStudents').textContent = totalStudents;
  document.getElementById('totalGuests').textContent = totalGuests;
}

function cancelReservation(index) {
  reservations.splice(index, 1);
  updateReservationList();
}

function handleSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const grade = document.getElementById('grade').value;
  const guests = document.getElementById('guests').value;
  const date = document.getElementById('event-date').value;
  
  const errors = validateInput(name, grade, guests, date);
  
  if (errors.length === 0) {
    addReservation(name, grade, guests, date);
    document.getElementById('reservation-form').reset();
  } else {
    const errorElement = document.getElementById('error-message');
    errorElement.innerHTML = errors.join('<br>');
  }
}

document.getElementById('reservation-form').addEventListener('submit', handleSubmit);

 AOS.init({
    Offset: 300,
    duration: 1000,
  }
  );

  function handleSearch() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    const filteredReservations = reservations.filter((reservation) => {
      return (
        reservation.name.toLowerCase().includes(searchQuery) ||
        reservation.grade.toLowerCase().includes(searchQuery) ||
        reservation.guests.toString().includes(searchQuery) ||
        reservation.date.includes(searchQuery)
      );
    });

    updateReservationList(filteredReservations);
  }


  function updateReservationList(reservationData = reservations) {
    const reservationListElement = document.getElementById('reservationList');
    reservationListElement.innerHTML = '';

    let totalStudents = 0;
    let totalGuests = 0;

    reservationData.forEach((reservation, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span><b>Name:</b> ${reservation.name}</span>
        <span><b>Grade:</b> ${reservation.grade}</span>
        <span><b>Guests:</b> ${reservation.guests}</span>
        <span><b>Date:</b> ${reservation.date}</span>
        <button onclick="cancelReservation(${index})">Cancel</button>
      `;
      reservationListElement.appendChild(listItem);

      totalStudents++;
      totalGuests += reservation.guests;
    });


    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalGuests').textContent = totalGuests;
  }