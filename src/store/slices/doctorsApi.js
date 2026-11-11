import { medicalApi } from '../api';

export const doctorsApi = medicalApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => `admin/doctors`,
      providesTags: ['Doctors'],
    }),
    createDoctor: builder.mutation({
      query: (data) => ({
        url: 'admin/doctors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Doctors'],
    }),
    getDoctorById: builder.query({
      query: (id) => `admin/doctors/${id}`,
      providesTags: (res, error, id) => [{ type: 'Doctor', id }],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `admin/doctors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (res, error, { id }) => [
        'Doctors',
        { type: 'Doctor', id },
      ],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `admin/doctors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, id) => [{ type: 'Doctor', id }, 'Doctors'],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;
