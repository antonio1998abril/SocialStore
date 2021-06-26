import styles from '../styles/Home.module.css'
import SearchComponent from '../component/Search'


function Home() {
  return (
    <div className={styles.container}>
      <main >
      <h3 className={styles.h1logo}><span>MaGo NetStore</span></h3> 
        <SearchComponent/>
      </main>
 
    </div>
    
  )
}
export default Home

/* 
 export const getServerSideProps = function () { 
  const user = true

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
} 
 */

