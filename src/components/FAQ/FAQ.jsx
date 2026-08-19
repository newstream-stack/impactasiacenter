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

export default function FAQ() {
  const { t, language } = useI18n()

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
        <img
          className={styles.banner}
          src={language === 'zh' ? '/992.jpg' : '/993.jpg'}
          alt=""
        />
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
