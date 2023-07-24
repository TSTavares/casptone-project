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
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';

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

    if (!isLoading) {
      console.log(transactionData.transactions, typeof transactionData.transactions)

      // reset summary
      expensesData.forEach(category => {
        category.amount = 0
        category.note = '';
      })

      transactionData.transactions.forEach((transaction:any)=>{
        console.log(transaction.amount)
        expensesData.forEach((currentExpenseCategory)=>{
          // check for same category
          if(currentExpenseCategory.category===transaction.category){
            // add to amount
            currentExpenseCategory.amount += transaction.amount;
            // add to note
            if (currentExpenseCategory.note && transaction.note) {
              currentExpenseCategory.note += '; '
            }
            currentExpenseCategory.note += transaction.note 
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
        title: <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'calibri' }}>Color</span>,
       
      },
      {
        title: 'Category' ,
        dataIndex: 'category',
        key: 'category',
        title: <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'calibri' }}>Category</span>,
        
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        title: <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'calibri' }}>Amount</span>,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        title: <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'calibri' }}>Note</span>,
      
      },
      
    ];

    const tableData = expensesData.map((expense) => ({
      ...expense,
      key: expense.category,
    }));

    const totalExpenses = expensesData.reduce((total, expense) => total + expense.amount, 0);

    const donutChartData = expensesData.map((expense) => ({
      name: expense.category,
      value: (expense.amount / totalExpenses) * 100,
      fill: expense.color,
    }));
    

  
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


        <div className={styles.body}>
          <h1 className={styles.titleDashboard}>Dashboard</h1>
        </div>

        <div className={styles.tableAndDonutContainer}>

            <div className={styles.pieChartContainer}>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={donutChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  fill="#8884d8"
                  label={false}
                >
                  {donutChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label value="Expenses" position="center" />
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                <Legend layout="vertical" align="center" verticalAlign="bottom" />

              </PieChart>
            
            <div className={styles.tableStyle}>  
              <Table dataSource={tableData} columns={columns} pagination={false} />
            </div>

          </div>

        </div>

          
      </div>
    );
  }
      
  