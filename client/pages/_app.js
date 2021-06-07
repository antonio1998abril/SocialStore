import '../styles/globals.css'
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';
import {DataProvider} from '../component/GlobalState'

function MyApp({ Component, pageProps }) {
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




