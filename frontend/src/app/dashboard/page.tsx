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
  { category: 'Rent or Mortgage', amount: 0, color: '#ff6b6b', note: ""},
  { category: 'Household Bills', amount: 0, color: '#ffc078', note: ""},
  { category: 'Groceries', amount: 0, color: '#8fd3f4', note: ""},
  { category: 'Transport', amount: 0, color: '#dcb0ed', note: ""},
  { category: 'Medical Healthcare', amount: 0, color: '#80cc88', note: ""},
  { category: 'Education', amount: 0, color: '#6fc3df', note: ""},
  { category: 'Personal Care', amount: 0, color: '#ffd699', note: ""},
  { category: 'Entertainment', amount: 0, color: '#ffb3ba', note: ""},

];
  
  export default function DashboardPage() {

    const {userName,updateUserName, loggedIn, updateLoggedIn} = useContext(MyContext);
    
    const { data: transactionData, error, isLoading } = useSWR(`http://localhost:3001/transaction//transaction-by-user?userName=${userName}`, fetcher)

    if(!isLoading){
      console.log(transactionData.transactions, typeof transactionData.transactions)
      transactionData.transactions.forEach((transaction:any)=>{
        console.log(transaction.amount)
        expensesData.forEach((currentExpenseCategory)=>{
          // check for same category
          if(currentExpenseCategory.category===transaction.category){
            // add to amount
            currentExpenseCategory.amount += transaction.amount;
            // add to note
            currentExpenseCategory.note===transaction.note
          
          }
        })
      })
    }

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
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
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

            
          <Table dataSource={tableData} columns={columns} pagination={false} />

      </div>
    );
  }
      
  