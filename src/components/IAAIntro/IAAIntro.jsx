import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './IAAIntro.module.css'

export default function IAAIntro({ onBlockClick }) {
  const { t } = useI18n()
  const data = t('iaaIntro')

  if (!data) return null

  return (
    <section id="iaa-intro" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          title={data.title}
          subtitle={data.subtitle}
          accent
          style={{ marginBottom: '5rem' }}
        />

        <div className={styles.grid}>
          {data.blocks.map((block, index) => (
            <div 
              key={index} 
              className={styles.card}
              onClick={() => onBlockClick(block)}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{block.title}</h3>
                <div className={styles.cardText}>
                  {block.paragraphs[0]}
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.learnMore}>
                  {t('about.btnMore')} <span className={styles.arrow}>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
