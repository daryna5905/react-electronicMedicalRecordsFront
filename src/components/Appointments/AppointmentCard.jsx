import { useGetPatientsQuery } from '@/store/slices/patientsApi';
import styles from './AppointmentCard.module.css';
import { useGetDoctorsQuery } from '@/store/slices/doctorsApi';
import { useCreateAppointmentMutation } from '@/store/slices/appointmentsApi';
import { useNavigate } from 'react-router';

function AppointmentCard() {
  const navigate = useNavigate();
  const {
    data: patientData,
    isLoading: patientLoading,
    isError: patientError,
  } = useGetPatientsQuery();
  const {
    data: doctorData,
    isLoading: doctorLoading,
    isError: doctorError,
  } = useGetDoctorsQuery();

  const [
    createAppoinment,
    { isLoading: appointmentLoading, isError: appointmentError },
  ] = useCreateAppointmentMutation();

  if (patientLoading || doctorLoading) return <div>Loading...</div>;
  if (patientError || doctorError) return <div>Error</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    createAppoinment(data);
    await navigate('/appointments');
  };

  return (
    <>
      <h1>Новий запис</h1>
      <form onSubmit={handleSubmit}>
        <select name='patientId'>
          <label>Пацієнт</label>
          {patientData.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.fullName}
            </option>
          ))}
        </select>
        <select name='doctorId'>
          <label>Лікар</label>
          {doctorData.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName}
            </option>
          ))}
        </select>
        <label>Дата</label>
        <input name='date' type='date' required />
        <label>Причина</label>
        <input type='text' name='reason' />
        <label>Статус</label>
        <select name='status'>
          <option value='completed'>completed</option>
          <option value='scheduled'>scheduled</option>
        </select>
        <button type='submit' disabled={appointmentLoading}>
          {appointmentLoading ? 'Збереження...' : 'Створити'}
        </button>
      </form>
    </>
  );
}

export default AppointmentCard;

// {
//   "id": "a003",
//   "patientId": "p003",
//   "doctorId": "d002",
//   "date": "2025-08-02T10:30:00Z",
//   "reason": "Біль у серці",
//   "status": "completed"
// },
