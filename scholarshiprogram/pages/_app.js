import React from 'react'
import NavBar from '@/components/Navbar'
import '@/styles/globals.css'


export default function App({ Component, pageProps }) {
  
  return (
  <>
    <NavBar />
    <Component {...pageProps} />
  </>
  

  )
}
