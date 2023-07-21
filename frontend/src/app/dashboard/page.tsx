"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { MyContext } from "../../context/contextProvider";
import Head from 'next/head'

const fetcher = (url: any) => fetch(url).then(res => res.json())

const dashboard = [
    {
      name: "User name",
      balance: 200
    },
    
  ];
  
  export default function DashboardPage() {

    const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);
    
    

    const { data: transactionData, error, isLoading } = useSWR(`http://localhost:3001/transaction//transaction-by-user?userName=${userName}`, fetcher)
  
    return (
     

      <div>
       {loggedIn?
       <div>
        <p>Hello {userName}</p>
        <button onClick={()=>updateLoggedIn(false)}>Logout</button>
        </div>
        :
        <p>Please login</p>
        }
        <div>
          <Image
            className={styles.logoCategoriesPage}
            loader={({ src }) => src}
            src="/image/logomoneyminder.jpg"
            alt="Logo Money Minder"
            width={80}
            height={80}
            />
        </div>
       
        <h1>Dashboard</h1>
        
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
  
          
        
        {/* Demo to show backend data */}
        {!isLoading&&transactionData.transactions.map((transaction:any)=>{
          return(<div key={transaction._id}>{transaction.description}</div>)
        })}

        <ul>
          {dashboard.map((dashboard, index) => (
            <li key={index}>
              <p>Name: {dashboard.name}</p>
              <p>Balance: {dashboard.balance}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
      
  