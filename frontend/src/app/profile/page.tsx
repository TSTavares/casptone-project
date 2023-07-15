"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const profile = [
    {
      name: "User name",
      balance: 200
    },
    
  ];
  
  export default function ProfilePage() {
    return (
      <div>
        <div className={styles.navigation}>
          <Link href="/">
              <Button>Home</Button>
          </Link>
          <Link href="categories">
              <Button>Categories</Button>
          </Link>
          <Link href="/profile">
              <Button>Profile</Button>
          </Link>
          <Link href="/login">
              <Button>Login</Button>
          </Link>
          </div>
  
        <h1>Profile</h1>
        <ul>
          {profile.map((profile, index) => (
            <li key={index}>
              <p>Name: {profile.name}</p>
              <p>Balance: {profile.balance}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }