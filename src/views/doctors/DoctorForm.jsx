import {
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
} from '@/store/slices/doctorsApi';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './DoctorForm.module.css';

const emptyDoctorData = {
  fullName: '',
  specialty: '',
  room: '',
  notes: '',
};

function DoctorForm() {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: loadedData,
    isLoading: doctorLoading,
    isError: doctorError,
  } = useGetDoctorByIdQuery(id, { skip: !id });
  const [createDoctor, { isLoading: createLoading, isError: createError }] =
    useCreateDoctorMutation();
  const [updateDoctor, { isLoading: updateLoading, isError: updateError }] =
    useUpdateDoctorMutation();

  const form = formData ?? loadedData ?? emptyDoctorData;
  const isProcessing = createLoading || updateLoading;

  const handleChange = (event) => {
    setFormData((previousData) => ({
      ...(previousData ?? loadedData ?? emptyDoctorData),
      [event.target.name]: event.target.value,
    }));
  };

  const onSave = async (event) => {
    event.preventDefault();
    try {
      if (id) await updateDoctor({ ...form, id }).unwrap();
      else await createDoctor(form).unwrap();
      navigate('/doctors');
    } catch {
      return;
    }
  };

  if (doctorLoading)
    return <div className={styles.status}>Завантаження...</div>;
  if (doctorError)
    return (
      <div className={styles.status}>Не вдалося завантажити дані лікаря.</div>
    );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>МЕДИЧНА КОМАНДА</p>
        <h1 className={styles.title}>
          {id ? 'Редагування лікаря' : 'Новий лікар'}
        </h1>
      </header>
      <form className={styles.form} onSubmit={onSave}>
        <div className={styles.field}>
          <label className={styles.label}>
            Ім'я та прізвище
            <input
              className={styles.input}
              type='text'
              name='fullName'
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Спеціальність
            <input
              className={styles.input}
              type='text'
              name='specialty'
              value={form.specialty}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Кабінет
            <input
              className={styles.input}
              type='text'
              name='room'
              value={form.room}
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
            />
          </label>
        </div>
        {(createError || updateError) && (
          <p className={styles.error} role='alert'>
            Не вдалося зберегти дані. Спробуйте ще раз.
          </p>
        )}
        <div className={styles.actions}>
          <button
            className={styles.submit}
            type='submit'
            disabled={isProcessing}
          >
            {isProcessing
              ? 'Збереження...'
              : id
                ? 'Зберегти зміни'
                : 'Створити лікаря'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default DoctorForm;
