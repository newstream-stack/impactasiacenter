import { useState } from 'react'
import styles from './FAQ.module.css'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'

const ChevronIcon = ({ open }) => (
  <svg
    className={`${styles.chevron} ${open ? styles.open : ''}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.question} onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{question}</span>
        <ChevronIcon open={open} />
      </button>
      <div className={styles.answerWrapper} style={{ maxHeight: open ? '600px' : '0' }}>
        <div className={styles.answer}>{children}</div>
      </div>
    </div>
  )
}

function Letter() {
  const { t } = useI18n()

  return (
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
        <div className={styles.letterSignatureMarks}>
          <img src="/洪.png" alt="" className={styles.letterSignatureMark} />
          <img src="/忠.png" alt="" className={styles.letterSignatureMark} />
        </div>
        <div className={styles.letterSignatureNames}>
          <div className={styles.letterSignatureBlock}>
            <p className={styles.letterSignatureName}>{t('letter.signature1Name')}</p>
            <p className={styles.letterSignatureTitle}>{t('letter.signature1Title1')}</p>
            <p className={styles.letterSignatureTitle}>{t('letter.signature1Title2')}</p>
          </div>
          <div className={styles.letterSignatureBlock}>
            <p className={styles.letterSignatureName}>{t('letter.signature2Name')}</p>
            <p className={styles.letterSignatureTitle}>{t('letter.signature2Title1')}</p>
            <p className={styles.letterSignatureTitle}>{t('letter.signature2Title2')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useI18n()

  const groups = [
    {
      title: t('faqGroup1Title'),
      items: [
        { q: t('faqQ1'), a: t('faqA1') },
        {
          q: t('faqQ3'),
          custom: (
            <div className={styles.refundBlock}>
              <p>{t('faqA3Intro')}</p>
              <ul>
                <li dangerouslySetInnerHTML={{ __html: t('faqA3B1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('faqA3B2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('faqA3B3') }} />
              </ul>
              <p className={styles.refundFooter}>{t('faqA3Footer')}</p>
            </div>
          ),
        },
      ],
    },
  ]

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <Letter />
        <SectionHeader
          eyebrow={t('faqEyebrow')}
          title={t('faqTitle')}
          showLine
        />
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <div className={styles.list}>
              {group.items.map((item) => (
                <FaqItem key={item.q} question={item.q}>
                  {item.custom ?? <p>{item.a}</p>}
                </FaqItem>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
