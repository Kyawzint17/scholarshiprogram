import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';

const StaffNavbar = () => {
  const router = useRouter();

  if (router.pathname === '/profile') {
    return (
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
          <Image src="/abac_logo.png" alt="Logo" width={80} height={80} />
            <Link href={'/'}>
              <div className={styles.logoText}>
                AU Scholarship
              </div>
            </Link>
          </div>
          <div className={styles['imge-container']}>
            <Link href={'/studentHome'}>
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