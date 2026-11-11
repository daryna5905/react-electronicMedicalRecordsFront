import { useDeleteDoctorMutation } from '@/store/slices/doctorsApi';
import { Link } from 'react-router';
import styles from './DoctorCard.module.css';

function DoctorCard({ data }) {
  const [deleteDoctor, { isLoading }] = useDeleteDoctorMutation();
  const onDelete = async () => {
    await deleteDoctor(data.id);
  };

  const buttonLabel = isLoading ? 'Видалення...' : 'Видалити';
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{data.fullName}</td>
      <td className={styles.cell}>{data.specialty}</td>
      <td className={styles.cell}>{data.room}</td>
      <td className={`${styles.cell} ${styles.notes}`}>{data.notes}</td>
      <td className={`${styles.cell} ${styles.actions}`}>
        <Link className={styles.editLink} to={`/doctors/${data.id}`}>
          Редагувати
        </Link>
        <button
          className={styles.deleteButton}
          disabled={isLoading}
          onClick={onDelete}
        >
          {buttonLabel}
        </button>
      </td>
    </tr>
  );
}

export default DoctorCard;
