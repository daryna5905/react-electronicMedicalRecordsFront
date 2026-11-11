import { medicalApi } from '../api';

export const appointmentsApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => `appointments`,
      providesTags: [`Appointments`],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: `appointments`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const { useGetAppointmentsQuery, useCreateAppointmentMutation } =
  appointmentsApi;
