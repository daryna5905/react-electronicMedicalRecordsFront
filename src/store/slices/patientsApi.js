import { data } from 'react-router';
import { medicalApi } from '../api';

export const patientApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: () => 'patients',
      providesTags: ['Patients'],
    }),
    createPatient: builder.mutation({
      query: (data) => ({
        url: 'patients',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Patients'],
    }),
    getPatientById: builder.query({
      query: (id) => `/patients/${id}`,
      providesTags: (res, error, id) => [{ type: 'Patient', id }],
    }),
    updatePatient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `patients/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (res, error, { id }) => [
        'Patients',
        { type: 'Patient', id },
      ],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, id) => [
        { type: 'Patient', id },
        'Patients',
      ],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useCreatePatientMutation,
  useDeletePatientMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} = patientApi;
