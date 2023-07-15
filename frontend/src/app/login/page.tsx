"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';



export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    
    console.log('Username:', username);
    console.log('Password:', password);
    
    setUsername('');
    setPassword('');
  };

  return (
    
    <main>
      <div>
        <h1 className={styles.titleLoginPage}>Money Minder</h1>
        <p>Income & Expense Tracker</p>

        <div className={styles.navigation}>
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
        </div>

        <div className={styles.container}>
          <Card title="User Login" className={styles.card}>
            <div className={styles.usernameLogin}>
              <label>Username:</label>
              <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div className={styles.passwordLogin}>
              <label>Password:</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button className={styles.loginButton}onClick={handleLogin}>Login</button>
          </Card>
        </div>
      
    </main>
  );
};
