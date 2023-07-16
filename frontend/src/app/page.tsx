"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { Card, Button, Table, Tag } from 'antd';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';


export default function HomePage() {
 

  return (
    
    <main>
      <div>

        <div className={styles.imageContainer}>
          <Image className={styles.logoHomePage}
            loader={({ src }) => src}
            src="/image/logomoneyminder.jpg" 
            alt="Logo Money Minder" 
            layout="fill"
            objectFit="cover" 
          />
          </div>

        <div className={styles.navigation}>
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      
      </div>
    </main>
  )
};




