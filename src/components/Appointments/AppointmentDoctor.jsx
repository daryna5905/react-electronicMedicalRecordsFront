import { useGetDoctorByIdQuery } from '@/store/slices/doctorsApi';

function AppointmentDoctor({ appointment }) {
  const { data: doctorData } = useGetDoctorByIdQuery(appointment.doctorId);
  if (!doctorData) return null;
  return <td>{doctorData.fullName}</td>;
}

export default AppointmentDoctor;
