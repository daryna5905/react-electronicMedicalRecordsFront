import AppointmentCard from '@/components/Appointments/AppointmentCard';
import AppointmentsList from '@/components/Appointments/AppointmentsList';
import MainLayout from '@/MainLayout/MainLayout';
import About from '@/views/About';
import DoctorForm from '@/views/doctors/DoctorForm';
import DoctorsList from '@/views/doctors/DoctorsList';
import Home from '@/views/Home';
import PatientForm from '@/views/patients/PatientForm';
import PatientsList from '@/views/patients/PatientsList';
import { createBrowserRouter } from 'react-router';
export const routes = [
  {
    Component: MainLayout,
    children: [
      {
        path: '/',
        Component: Home,
        meta: {
          title: 'Головна',
        },
      },
      {
        path: '/patients',
        children: [
          {
            index: true,
            Component: PatientsList,
          },
          {
            path: 'new',
            Component: PatientForm,
          },
          {
            path: ':id',
            Component: PatientForm,
          },
        ],
        meta: {
          title: 'Пацієнти',
        },
      },
      {
        path: '/doctors',
        children: [
          {
            index: true,
            Component: DoctorsList,
          },
          {
            path: 'newDoctor',
            Component: DoctorForm,
          },
          {
            path: ':id',
            Component: DoctorForm,
          },
        ],
        meta: {
          title: 'Лікарі',
        },
      },
      {
        path: '/appointments',
        children: [
          {
            index: true,
            Component: AppointmentsList,
          },
          {
            path: 'newAppointment',
            Component: AppointmentCard,
          },
        ],
        meta: {
          title: 'Записи',
        },
      },
      {
        path: '/about',
        Component: About,
        meta: {
          title: 'Про програму',
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/react-electronicMedicalRecordsFront',
});
export default router;
