import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';

const StaffNavbar = () => {
  const router = useRouter();

  if (router.pathname === '/staffHome') {
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
            <Link href={'/create'}>
            <div className={styles['text2']}>Submission Status</div>
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
