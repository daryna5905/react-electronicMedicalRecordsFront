import {
  useCreatePatientMutation,
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from '@/store/slices/patientsApi';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './PatientForm.module.css';

const emptyPatientsData = {
  fullName: '',
  birthDate: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
};

function PatientForm() {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();

  const [createPatient, { isLoading: createLoading, isError: createError }] =
    useCreatePatientMutation();
  const {
    data: loadedData,
    isLoading: patientLoading,
    isError: patientError,
  } = useGetPatientByIdQuery(id, { skip: !id });

  const [updatePatient, { isLoading: updateLoading, isError: updateError }] =
    useUpdatePatientMutation();

  const form = formData ?? loadedData ?? emptyPatientsData;

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prevData) => ({
      ...(prevData ?? loadedData ?? emptyPatientsData),
      [e.target.name]: e.target.value,
    }));

  const onSave = async (e) => {
    e.preventDefault();
    if (id) await updatePatient(formData);
    else await createPatient(formData);
    setFormData({ ...emptyPatientsData });
    navigate('/patients');
  };

  if (patientLoading) return <div className={styles.status}>Loading...</div>;
  if (patientError) return <div className={styles.status}>Error</div>;

  const isProcessing = updateLoading || createLoading;
  const buttonLabel = `${id ? 'Зберегти' : 'Створити'} ${isProcessing ? '...' : ''}`;
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>КАРТКА ПАЦІЄНТА</p>
        <h1 className={styles.title}>
          {id ? 'Редагування пацієнта' : 'Створення нового пацієнта'}
        </h1>
      </header>
      <form className={styles.form} onSubmit={onSave}>
        <div className={styles.field}>
          <label className={styles.label}>
            Ім'я пацієнта
            <input
              className={styles.input}
              type='text'
              name='fullName'
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Дата народження
            <input
              className={styles.input}
              type='date'
              name='birthDate'
              value={form.birthDate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Стать
            <input
              className={styles.input}
              type='text'
              name='gender'
              value={form.gender}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Телефон
            <input
              className={styles.input}
              type='tel'
              name='phone'
              value={form.phone}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Пошта
            <input
              className={styles.input}
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Адреса
            <input
              className={styles.input}
              type='text'
              name='address'
              value={form.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={`${styles.field} ${styles.fieldWide}`}>
          <label className={styles.label}>
            Примітки
            <textarea
              className={styles.input}
              rows='4'
              name='notes'
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.submit}
            type='submit'
            disabled={isProcessing}
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </main>
  );
}

export default PatientForm;
