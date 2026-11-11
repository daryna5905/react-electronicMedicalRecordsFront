import PatientCard from '@/components/PatientCard';
import { useGetPatientsQuery } from '@/store/slices/patientsApi';
import { Link } from 'react-router';
import styles from './PatientsList.module.css';

function PatientsList() {
  const { data: patients, isLoading, isError } = useGetPatientsQuery();
  if (isLoading) return <div className={styles.status}>Loading..</div>;
  if (isError) return <div className={styles.status}>Error..</div>;
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>МЕДИЧНІ ЗАПИСИ</p>
          <h1 className={styles.title}>Patients List</h1>
        </div>
        <Link className={styles.addButton} to='/patients/new'>
          + Додати пацієнта
        </Link>
      </header>
      {patients?.length === 0 ? (
        <div className={styles.emptyState}>Список поржній</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableHead}>
                <th className={styles.headingCell}>fullName</th>
                <th className={styles.headingCell}>phone</th>
                <th className={styles.headingCell}>address</th>
                <th className={styles.headingCell}>Дії над пацієнтами</th>
              </tr>
              {patients.map((patient) => (
                <PatientCard data={patient} key={patient.id}>
                  {patient.fullName}
                </PatientCard>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default PatientsList;
