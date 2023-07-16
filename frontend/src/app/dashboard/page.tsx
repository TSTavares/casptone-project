"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const dashboard = [
    {
      name: "User name",
      balance: 200
    },
    
  ];
  
  export default function DashboardPage() {
    return (
      <div>
        <div className={styles.navigation}>
          <Link href="/">
              <Button>Home</Button>
          </Link>
          <Link href="categories">
              <Button>Categories</Button>
          </Link>
          <Link href="/dashboard">
              <Button>Dashboard</Button>
          </Link>
          <Link href="/login">
              <Button>Login</Button>
          </Link>
          </div>
  
        <h1>Dashboard</h1>
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