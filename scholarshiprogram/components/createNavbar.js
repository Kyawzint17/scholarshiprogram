import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';

const StaffNavbar = () => {
  const router = useRouter();

  if (router.pathname === '/create') {
    return (
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/abac_logo.png" alt="Logo" width={40} height={40} />
            <Link href={'/'}>
              <div className={styles.logoText}>
                AU Scholarship
              </div>
            </Link>
          </div>
          <div className={styles['imge-container']}>
            <Link href={'/staffHome'}>
            <div className={styles['text2']}>Home</div>
            </Link>
            <Image src="/Home.png" alt="Another Image" width={40} height={40} />
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default StaffNavbar;
