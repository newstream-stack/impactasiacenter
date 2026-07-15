import { useI18n } from '../../i18n/I18nContext';
import styles from './Countdown.module.css';

export default function Countdown() {
  const { t } = useI18n();
  const pricing = t('registrationPricing');

  return (
    <section className={`${styles.pricingWrapper} reveal`} aria-label={pricing.title}>
      <div className={styles.frame}>
        <p className={styles.title}>{pricing.title}</p>
        <div className={styles.pricingRow}>
          {pricing.tiers.map((tier) => (
            <article className={styles.tier} key={tier.name}>
              <p className={styles.tierName}>{tier.name}</p>
              <p className={styles.price}>{tier.price}</p>
              <p className={styles.period}>{tier.period}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
