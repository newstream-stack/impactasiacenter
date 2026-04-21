import styles from './Footer.module.css'

export default function Footer() {
  const handleSmoothScroll = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>IMPACT ASIA 2026</div>
            <p>連結亞洲影響力，轉化國度價值觀。</p>
          </div>
          <div className={styles.links}>
            <h4>快速連結</h4>
            <a href="#vision" onClick={(e) => handleSmoothScroll(e, '#vision')}>年會異象</a>
            {/* <a href="#speakers" onClick={(e) => handleSmoothScroll(e, '#speakers')}>大會講員</a> */}
            <a href="#themes" onClick={(e) => handleSmoothScroll(e, '#themes')}>專題議題</a>
            <a href="#venue" onClick={(e) => handleSmoothScroll(e, '#venue')}>會場資訊</a>
          </div>
          <div className={styles.contact}>
            <h4>聯繫我們</h4>
            <p>Email: contact@impactasiacenter.com</p>
            <p>Phone: +886-2-XXXX-XXXX</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2026 Impact Asia Center. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
