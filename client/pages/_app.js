import '../styles/globals.css'
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';
import {DataProvider} from '../component/GlobalState'

/* LOADER */
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
/* import { useState } from 'react';
import Loader from '../component/Loader/Loader' */
/* ******* */

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done()); 

function MyApp({ Component, pageProps }) {
  
/* const [loading,setLoading]=useState(false)
Router.onRouteChangeComplete = (url) => {setLoading(true)};
Router.routeChangeStart = (url) => {setLoading(true) };
Router.routeChangeError = (url) => {setLoading(true)};
if(!loading) return <Loader/>   */

  return (
    <>
    <DataProvider>
        <Header />
            <Component {...pageProps} />
        <Footer />
    </DataProvider>
    </>
    )
  }

export default MyApp




