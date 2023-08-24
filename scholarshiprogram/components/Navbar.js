// components/NavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';

const NavBar = () => {
  const router = useRouter();

  // Define the list of page paths where the navigation bar should be visible
//  const visiblePaths = ['/studentHome'];

//  if (!visiblePaths.includes(router.pathname)) {
//    return null; // Don't render the navigation bar on other pages
//  }
  if (router.pathname === '/studentHome') {
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
        <div  className={styles['text2']}>Apply Status</div>
        <Image src="/profile_pic.png" alt="Another Image" width={35} height={35} />
        </div>
        <div className={styles['text-container']}>
        <Link href={'/profile'}>
        <div className={styles['text']}>Profile Name</div>
        </Link>
        </div>
        
      </div>
    </nav>
  );
}
  return null;
};

export default NavBar;
