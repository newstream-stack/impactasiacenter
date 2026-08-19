import styles from './Letter.module.css'
import { useI18n } from '../../i18n/I18nContext'

export default function Letter() {
  const { t } = useI18n()

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.letter}>
          <p className={styles.letterGreeting}>{t('letter.greeting')}</p>

          <div className={styles.letterBlock}>
            {t('letter.paragraphs1').map((p) => <p key={p}>{p}</p>)}
          </div>

          <p className={styles.letterHeading}>{t('letter.heading1')}</p>
          <div className={styles.letterBlock}>
            <p>{t('letter.paragraph2')}</p>
          </div>

          <blockquote className={styles.letterQuoteBlock}>
            {t('letter.quotes').map((q) => <p key={q}>{q}</p>)}
          </blockquote>

          <div className={styles.letterBlock}>
            <p>{t('letter.paragraph3')}</p>
            <p>{t('letter.paragraph4Intro')}</p>
          </div>

          <ul className={styles.letterPrayerList}>
            {t('letter.prayerList').map((item) => <li key={item}>{item}</li>)}
          </ul>

          <p className={styles.letterHeading}>{t('letter.heading2')}</p>
          <ol className={styles.letterReflectionList}>
            {t('letter.reflectionList').map((item) => <li key={item}>{item}</li>)}
          </ol>

          <p className={styles.letterEmphasis}>{t('letter.closingBold')}</p>

          <div className={styles.letterBlock}>
            {t('letter.paragraphs5').map((p) => <p key={p}>{p}</p>)}
          </div>

          <div className={styles.letterSignature}>
            <div className={styles.letterSignatureBlock}>
              <img src="/signature-1.png" alt="" className={styles.letterSignatureMark} />
              <div className={styles.letterSignatureText}>
                <p className={styles.letterSignatureName}>{t('letter.signature1Name')}</p>
                <p className={styles.letterSignatureTitle}>{t('letter.signature1Title1')}</p>
                <p className={styles.letterSignatureTitle}>{t('letter.signature1Title2')}</p>
              </div>
            </div>
            <div className={styles.letterSignatureBlock}>
              <img src="/signature-2.png" alt="" className={styles.letterSignatureMark} />
              <div className={styles.letterSignatureText}>
                <p className={styles.letterSignatureName}>{t('letter.signature2Name')}</p>
                <p className={styles.letterSignatureTitle}>{t('letter.signature2Title1')}</p>
                <p className={styles.letterSignatureTitle}>{t('letter.signature2Title2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
