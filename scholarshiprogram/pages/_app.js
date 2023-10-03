import React from 'react'
import NavBar from '@/components/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  
  return (
    <>
    <NavBar />
    <SessionProvider session={session}>
    <Component {...pageProps} />
   </SessionProvider>
   </>

  )
}