import React, { useState, useEffect } from 'react';

const Client = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', description: '' });
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setMessage('Failed to load appointments.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage('Appointment booked!');
      setAppointments([...appointments, data]);
      setForm({ date: '', time: '', description: '' });
    } catch (err) {
      setMessage('Failed to book appointment.');
    }
  };

  return (
    <div>
      <h1>Client Dashboard</h1>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleBook}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appt) => (
          <li key={appt._id || appt.id}>
            {appt.date} {appt.time} - {appt.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Client;
