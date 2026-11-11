import DoctorCard from '@/components/DoctorCard/DoctorCard';
import { useGetDoctorsQuery } from '@/store/slices/doctorsApi';
import { Link } from 'react-router';
import styles from './DoctorsList.module.css';

function DoctorsList() {
  const { data: doctors, isLoading, isError } = useGetDoctorsQuery();
  if (isLoading) return <div className={styles.status}>Завантаження...</div>;
  if (isError)
    return (
      <div className={styles.status}>
        Не вдалося завантажити список лікарів.
      </div>
    );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>МЕДИЧНА КОМАНДА</p>
          <h1 className={styles.title}>Лікарі</h1>
        </div>
        <Link className={styles.addButton} to='/doctors/newDoctor'>
          + Додати лікаря
        </Link>
      </header>
      {doctors.length === 0 ? (
        <div className={styles.emptyState}>Список лікарів поки порожній</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.headingCell}>Лікар</th>
                <th className={styles.headingCell}>Спеціальність</th>
                <th className={styles.headingCell}>Кабінет</th>
                <th className={styles.headingCell}>Примітки</th>
                <th className={styles.headingCell}>Дії</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <DoctorCard data={doctor} key={doctor.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default DoctorsList;
