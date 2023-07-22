"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Modal, Table, Form, Input, Tag, Row, Col } from 'antd';
import { Progress } from 'antd';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext, useState } from "react";
import { MyContext } from "../../context/contextProvider";
import Head from 'next/head'

const fetcher = (url: any) => fetch(url).then(res => res.json())

const expensesData = [
  { category: 'Rent or Mortgage', amount: '$300', color: '#ff6b6b' },
  { category: 'Household Bills', amount: '$100', color: '#ffc078' },
  { category: 'Groceries', amount: '$200', color: '#8fd3f4'},
  { category: 'Transport', amount: '$50', color: '#dcb0ed'},
  { category: 'Medical Healthcare', amount: '$50', color: '#80cc88'},
  { category: 'Education', amount: '$100', color: '#6fc3df'},
  { category: 'Personal Care', amount: '$100', color: '#ffd699'},
  { category: 'Entertainment', amount: '$100', color: '#ffb3ba'},

];
  
  export default function DashboardPage() {

    const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);
    
    

    const { data: transactionData, error, isLoading } = useSWR(`http://localhost:3001/transaction//transaction-by-user?userName=${userName}`, fetcher)

   


    const columns = [
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        render: (color: any) => <div className={styles.tableColor} style={{ backgroundColor: color }} />,
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
    ];

    const tableData = expensesData.map((expense) => ({
      ...expense,
      key: expense.category,
    }));

  
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
            
          <Table dataSource={tableData} columns={columns} pagination={false} />

      </div>
    );
  }
      
  