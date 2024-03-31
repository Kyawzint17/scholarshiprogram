import Head from 'next/head';
import Image from 'next/image';
import styles from '../components/login.module.css';
import { useSession, signOut  } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Menu() {
    const router = useRouter();
    const { data: session } = useSession();

    const handleLogout = async () => {
        console.log('Session before signOut:', session); // Log the session before signOut
        await signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <main className={styles['menu-page']}>
                <div className={styles['menu-container']}>
                    <Image src="/abac_logo.png" alt="Image" width={100} height={100} className={styles['logo-image']} />
                    <h2 className={styles['custom1-h2']}>AU Scholarship</h2>
                    <div className={styles['buttons-container2']}>
                        <Link href={'/registerHome'}>
                        <button className={styles['custom-button']}>Registrar</button>
                        </Link>
                        <Link href={'/staffHome'}>
                        <button className={styles['custom-button']}>Organizer</button>
                        </Link>
                    </div>
                    <div className={styles['buttons-container']}>
                    {session ? (
                        <button className={styles['logoutbutton']} onClick={handleLogout} >Log out</button>
                        ) : null}
                    </div>
                </div>
            </main>
        </>
    );
}
