import { useState } from 'react';
import Link from 'next/link';
import styles from '../components/login.module.css';
import Image from 'next/image';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform your login logic here
    // For simplicity, let's just display the entered email and password
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <div className={styles['login-content']}>
          <Image src="/abac_logo.png" alt="Image" width={40} height={40} className={styles['logo-image']}/>
          <div className={styles['login-heading-container']}>
            <div className={styles['login-heading']}>Scholarship
            </div>
          </div>
        </div>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label className={styles['label']}>Email</label>
          <div className={styles['input-group']}>
          <input type="email" value={email} onChange={handleEmailChange} />
          </div>
        </div>
        <div className={styles['form-group']}>
          <label className={styles['label']}>Password</label>
          <div className={styles['input-group']}>
          <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        <div className={styles['buttons-container']}>
        <button className={styles['loginbutton']} type="submit">
          <Link href="/studentHome">
              Login
          </Link>
        </button>
        <button className={styles['registerbutton']}>
          <Link href ="/registerHome">
              Register
          </Link>
        </button>
        <button className={styles['staffbutton']}>
        <Link href="/staffHome">
              Staff
        </Link>
        </button>
        </div>
      </form>
      </div>
    </div>
    
  );
  
}

