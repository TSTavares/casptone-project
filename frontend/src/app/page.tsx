"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { Card, Button, Modal, Table, Form, Input, Tag, Row, Col } from 'antd';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { MyContext } from "../context/contextProvider";

const fetcher = (url: any) => fetch(url).then(res => res.json())


export default function HomePage() {

  const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);

  const { data: transactionData, error, isLoading } = useSWR(`http://localhost:3001/transaction//transaction-by-user?userName=${userName}`, fetcher)
 

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
        <div className={styles.body}>
          <Card className={styles.homeCard}>
            <div className={styles.cardTitle}>
              <h1 className={styles.titleLoginPage}>Money Minder</h1>
              <h2 className={styles.secondTitle}>Income & Expense Tracker</h2>
            </div>
            <div className={styles.cardImage}>
              <Image
                loader={({ src }) => src}
                src="/image4/Image14 - home image.jpg"
                alt="Home page Image"
                width={400}
                height={300}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
    
  )
};




