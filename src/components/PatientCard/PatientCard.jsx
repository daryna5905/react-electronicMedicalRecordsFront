import { useDeletePatientMutation } from '@/store/slices/patientsApi';
import { Link } from 'react-router';
import styles from './PatientCard.module.css';

function PatientCard({ data }) {
  const [deletePatient, { isLoading, isError }] = useDeletePatientMutation();
  const onDelete = async () => {
    await deletePatient(data.id);
  };

  const buttonLabel = `Delete  ${isLoading ? '...' : ''}`;
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{data.fullName}</td>
      <td className={styles.cell}>{data.phone}</td>
      <td className={styles.cell}>{data.address}</td>
      <td className={`${styles.cell} ${styles.actions}`}>
        <Link className={styles.editLink} to={`/patients/${data.id}`}>
          Edit
        </Link>
        <button
          className={styles.deleteButton}
          onClick={onDelete}
          disabled={isLoading}
        >
          {buttonLabel}
        </button>
      </td>
    </tr>
  );
}

export default PatientCard;
