import React from 'react';
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

function Footer() {
    return (
      <div className={styles.foobefore}>
        <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer" >
          <div className={styles.logofooter}>Made by</div> {' '}
          <span className={styles.logo}>
            <Image src="/logo.png" alt="Vercel Logo" width={99} height={95} />
          </span>
          
          <div className={styles.logofooter}>Barrientos Brothers </div>
        </a>
      </footer>
      </div> 
    )
}

export default Footer
