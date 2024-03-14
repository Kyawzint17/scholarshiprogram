import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './home.module.css';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const RegisterNavbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    console.log('Session before signOut:', session); // Log the session before signOut
    await signOut({ callbackUrl: '/' }); // Sign the user out and redirect to the home page
  };

  if (router.pathname === '/registerHome') {
    console.log('Session:', session);

    return (
      <nav className={styles.navBar}>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/abac_logo.png" alt="Logo" width={80} height={80} />
            <div className={styles.logoText}>AU Scholarship Registrar</div>
          </div>
          <div className={styles['imge-container']}>
            {session ? (
              <div className={styles['text2']} onClick={handleLogout}>Log Out</div>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default RegisterNavbar;
