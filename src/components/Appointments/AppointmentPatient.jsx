import { useGetPatientByIdQuery } from '@/store/slices/patientsApi';

function AppointmentPatient({ appointment }) {
  const { data: patientData } = useGetPatientByIdQuery(appointment.patientId);
  if (!patientData) return null;
  return <td>{patientData.fullName}</td>;
}

export default AppointmentPatient;
