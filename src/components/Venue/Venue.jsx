import { useState, useEffect, useCallback } from 'react'
import styles from './Venue.module.css'
import { useI18n } from '../../i18n/I18nContext'
import SectionHeader from '../SectionHeader/SectionHeader'

const VENUE_IMAGES = [
  '/Venue/venue-1.jpg',
  '/Venue/venue-2.jpg',
  '/Venue/venue-3.jpg',
  '/Venue/venue-4.jpg',
  '/Venue/venue-5.jpg',
  '/Venue/venue-6.jpg',
  '/Venue/venue-7.jpg',
  '/Venue/venue-8.jpg',
  '/Venue/venue-9.jpg',
  '/Venue/venue-10.jpg',
]

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const HotelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

export default function Venue() {
  const { t } = useI18n()
  const venue = t('venue')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + VENUE_IMAGES.length) % VENUE_IMAGES.length)
  }, [])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % VENUE_IMAGES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  return (
    <section id="venue" className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={venue.title} />
        <div className={styles.showcase}>
          <div
            className={styles.carousel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {VENUE_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`venue-${i + 1}`}
                className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
              />
            ))}

            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
              <ChevronLeft />
            </button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
              <ChevronRight />
            </button>

            <div className={styles.dots}>
              {VENUE_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className={styles.tag}>{venue.name}</div>

            <div className={styles.counter}>{current + 1} / {VENUE_IMAGES.length}</div>
          </div>

          <div className={styles.info}>
            <h3>{venue.heading}</h3>
            <p>{venue.desc}</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.listIcon}><PinIcon /></span>
                <span className={styles.listText}>{venue.name}</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.listIcon}><CalIcon /></span>
                <span className={styles.listText}>{venue.date}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.066479018446!2d-111.9100067!3d33.3768853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b05cf14e7a78b%3A0x8a3ec1d720adb80e!2sFirst%20Baptist%20Church%20Tempe!5e0!3m2!1sen!2stw!4v1713687350000!5m2!1sen!2stw"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of First Baptist Church Tempe"
          ></iframe>
        </div>

        <div className={styles.hotelsSection}>
          <div className={styles.hotelsSectionHeader}>
            <span className={styles.hotelsIcon}><HotelIcon /></span>
            <div>
              <h3 className={styles.hotelsTitle}>{venue.hotelsTitle}</h3>
              <p className={styles.hotelsSubtitle}>{venue.hotelsSubtitle}</p>
            </div>
          </div>

          <div className={styles.hotelsLayout}>
            <div className={styles.hotelsMapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13324.265!2d-111.9100067!3d33.3768853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b05cf14e7a78b%3A0x8a3ec1d720adb80e!2sFirst%20Baptist%20Church%20Tempe!5e0!3m2!1sen!2stw!4v1713687350000!5m2!1sen!2stw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotels near First Baptist Church Tempe"
              ></iframe>
            </div>

            <div className={styles.hotelsList}>
              {(venue.hotels || []).map((hotel, i) => (
                <a
                  key={i}
                  href={hotel.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.hotelCard}
                >
                  <div className={styles.hotelCardLeft}>
                    <div className={styles.hotelNumber}>{i + 1}</div>
                  </div>
                  <div className={styles.hotelCardBody}>
                    <div className={styles.hotelName}>{hotel.name}</div>
                    <div className={styles.hotelAddress}>
                      <span className={styles.hotelPin}><PinIcon /></span>
                      {hotel.address}
                    </div>
                  </div>
                  <div className={styles.hotelCardRight}>
                    <span className={styles.hotelDistance}>{hotel.distance}</span>
                    <span className={styles.hotelLink}><ExternalLinkIcon /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
