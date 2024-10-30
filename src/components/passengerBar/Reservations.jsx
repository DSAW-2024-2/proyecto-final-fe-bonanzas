// src/components/trip/MyReservations.jsx

import React, { useEffect, useState } from 'react';
import CustomButton from '../reusable/CustomButton';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://wheels-backend-rafaelsavas-projects.vercel.app/api/my-reservations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setReservations(data.reservations || []);
    };

    fetchReservations();
  }, []);

  const handleModify = (reservationId) => {
    // Lógica para modificar la reserva
    console.log('Modificar reserva:', reservationId);
  };

  const handleDelete = (reservationId) => {
    // Lógica para eliminar la reserva
    console.log('Eliminar reserva:', reservationId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] p-6">
      <h1 className="text-white text-3xl font-semibold mb-6">Mis Reservas</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div key={reservation.id} className="bg-white p-4 rounded-lg mb-4 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p><strong>Inicio:</strong> {reservation.initialPoint}</p>
                <p><strong>Fin:</strong> {reservation.finalPoint}</p>
                <p><strong>Ruta:</strong> {reservation.route}</p>
                <p><strong>Cupos:</strong> {reservation.seats}</p>
                <p><strong>Tarifa:</strong> {reservation.price}</p>
              </div>
              <div className="flex gap-2">
                <CustomButton onClick={() => handleModify(reservation.id)} className="bg-blue-500 text-white">
                  Modificar
                </CustomButton>
                <CustomButton onClick={() => handleDelete(reservation.id)} className="bg-red-500 text-white">
                  Eliminar
                </CustomButton>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No tienes reservas</p>
      )}
    </div>
  );
};

export default MyReservations;