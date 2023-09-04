import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';

const StaffNavbar = () => {
  const router = useRouter();

  if (router.pathname === '/registerHome') {
    return (
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/abac_logo.png" alt="Logo" width={40} height={40} />
              <div className={styles.logoText}>
                AU Scholarship
              </div>
          </div>
          <div className={styles['imge-container']}>
            <Link href={'/'}>
            <div className={styles['text2']}>Log Out</div>
            </Link>
            <Image src="/work_upload.png" alt="Another Image" width={35} height={35} />
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default StaffNavbar;
