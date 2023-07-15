"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const categories = [
  {
    name: "Rent or Mortgage",
    balance: -130.0
  },
  {
    name: "Household bills",
    balance: -25.0
  }
];

export default function CategoriesPage() {
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

      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <p>Name: {category.name}</p>
            <p>Balance: {category.balance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



