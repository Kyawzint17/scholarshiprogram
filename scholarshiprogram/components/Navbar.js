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
          <Image src="/abac_logo.png" alt="Logo" width={80} height={80} />
          <div className={styles.logoText}>
            AU Scholarship
          </div>
        </div>
        <div className={styles['imge-container']}>
        <Link href={'/'}>
        <div  className={styles['text2']}>Log Out</div>
        </Link>
        <Image src="/profile_red.png" alt="Another Image" width={35} height={35} style={{ borderRadius: '50%' }}/>
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