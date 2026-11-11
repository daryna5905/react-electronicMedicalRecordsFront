import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const medicalApi = createApi({
  reducerPath: 'medicalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-electronicmedicalrecordsbackend.onrender.com',
  }),
  tagTypes: ['Patients', 'Patient', 'Doctors', 'Doctor', 'Appointments'],
  endpoints: (builder) => ({}),
});
