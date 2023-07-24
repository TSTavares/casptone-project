"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Modal, Table, Form, Input, Tag, Row, Col } from 'antd';
import UseSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { MyContext } from "../../context/contextProvider";

const fetcher = (url: any) => fetch(url).then(res => res.json())

export default function LoginPage() {

  const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);

  // For the login form 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // To tell SWR when to fetch
  const [shouldFetch, setShouldFetch] = useState(false)

  // For router (Once logged in)
  const router = useRouter()

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Set state to true to execute fetch function
    setShouldFetch(true)

  };

  // swr / API call backend to check email & password
  const { data: username, error, isLoading } = UseSWR(shouldFetch ? `http://localhost:3001/user/check-email-and-password?email=${email}&password=${password}` : null, fetcher)
 
  if (error) {
    // (If error) Then Alert user wrong login details
    console.log(error)
  }

  if (username !== undefined) {
    // (If user doesn't exist)
    if (!username.userName) {
      alert("Email or Password is wrong!")
    } else {
      // (If username is ok) 
      // Then Login User - update userName in context
      updateUserName(username.userName)
      updateLoggedIn(true)
      
      //(Navigate to categories)
      router.push('/categories')
    }
  }

  return (

    <div>

      <div className={styles.head}>

        <div className={styles.userInfo}>

          <Image
            className={styles.logoCategoriesPage}
            loader={({ src }) => src}
            src="/image/logomoneyminder.jpg"
            alt="Logo Money Minder"
            width={80}
            height={80}
          
          />

          {loggedIn ? (

            <div className={styles.userName}>
              <p>Hello {userName}</p>
              <button onClick={() => updateLoggedIn(false)}>Logout</button>
            </div>

          ) : (

            <p className={styles.loginSuggestion}>Welcome! Please login</p>
          )}

        </div>

        <div className={styles.navigation}>
         
          <Link href="/">
            <Button className={styles.navigationButton}>Home</Button>
          </Link>
          <Link href="categories">
            <Button className={styles.navigationButton}>Categories</Button>
          </Link>
          <Link href="/dashboard">
            <Button className={styles.navigationButton}>Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button className={styles.navigationButton}>Login</Button>
          </Link>
        </div>
      </div>
   

    <div>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.logoContainer}>
            <h1 className={styles.titleLoginPage}>Money Minder</h1>
            <p className={styles.secondTitle}>Income &amp; Expense Tracker</p>
            <Image
              className={styles.LoginImage}
              loader={({ src }) => src}
              src="/image2/Image14 - money.png"
              alt="Photo Money Minder"
              width={400}
              height={400}
              
            />
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.loginContainer}>

            <Card className={styles.card}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'calibri' }}>
              Login Here
            </h2>
              
              <div className={styles.usernameLogin}>
                <label>Email:<br></br></label>
                <input type="text" value={email} onChange={handleEmailChange} />
              </div>
              <div className={styles.passwordLogin}>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <button className={styles.loginButton} onClick={handleLogin}>
                Login
              </button>
            </Card>

          </div>

        </div>

      </div>
    </div>
    </div>
  );
}