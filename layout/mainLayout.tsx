import React from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'

interface ILayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: ILayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Three js - build a box</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{props.children}</main>
    </div>
  )
}

export default MainLayout
