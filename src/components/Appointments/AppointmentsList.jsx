import { useGetAppointmentsQuery } from '@/store/slices/appointmentsApi';
import styles from './AppointmentsList.module.css';

import AppointmentPatient from './AppointmentPatient';
import AppointmentDoctor from './AppointmentDoctor';
import { Link } from 'react-router';
function AppointmentsList() {
  const { data, isLoading, isError } = useGetAppointmentsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <Link to='/appointments/newAppointment'>+ Додати Запис </Link>
      <table>
        <tbody>
          <tr>
            <td>Пацієнт</td>
            <td>Лікар</td>
            <td>Дата</td>
            <td>Причина</td>
            <td>Статус</td>
          </tr>
          {data.map((appointment) => (
            <tr key={appointment.id}>
              <AppointmentDoctor appointment={appointment} />
              <AppointmentPatient appointment={appointment} />
              <td>{appointment.date}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentsList;
