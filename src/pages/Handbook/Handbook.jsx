import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nContext';
import styles from './Handbook.module.css';

const FLIP_MS = 720;

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Portrait({ src, name, className }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || '').trim().charAt(0);
  if (!src || failed) {
    return <span className={`${className} ${styles.thumbFallback}`} aria-hidden="true">{initial}</span>;
  }
  return (
    <img
      className={className}
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function PageBody({ page, t }) {
  switch (page.type) {
    case 'cover':
      return (
        <div className={`${styles.leafInner} ${styles.cover}`}>
          <span className={styles.coverKicker}>{page.kicker}</span>
          <h1 className={styles.coverTitle}>
            {page.title.split('\n').map((line, i) => <span key={i}>{line}</span>)}
          </h1>
          <span className={styles.coverSub}>{page.subtitle}</span>
          <div className={styles.coverMeta}>
            <span>{page.dates}</span>
            <span>{page.city}</span>
          </div>
        </div>
      );

    case 'back':
      return (
        <div className={`${styles.leafInner} ${styles.back}`}>
          <p className={styles.backLine}>{page.line}</p>
          <div className={styles.backOrg}>
            <span>{page.org}</span>
            <span>{page.contact}</span>
          </div>
        </div>
      );

    case 'facts':
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <dl className={styles.facts}>
            {page.items.map((it, i) => (
              <div className={styles.factRow} key={i}>
                <dt>{it.k}</dt>
                <dd>{it.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case 'schedule':
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <div className={styles.schedule}>
            {page.days.map((d, i) => (
              <div className={styles.schedDay} key={i}>
                <p className={styles.schedDate}>{d.date}</p>
                {d.sessions.map((s, j) => (
                  <p className={styles.schedRow} key={j}>
                    <span className={styles.schedTime}>{s.time}</span>
                    <span>{s.title}</span>
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    case 'themeList':
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <ol className={styles.themeList}>
            {page.items.map((it, i) => (
              <li key={i}>
                <p className={styles.themeTitle}>{it.title}</p>
                <p className={styles.themeSummary}>{it.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'presidium': {
      const p = t('presidium');
      const coChairs = (p.coChairs || []).filter((c) => !c.hidden);
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <div className={styles.people}>
            {(p.main || []).map((m, i) => (
              <div className={styles.personLead} key={i}>
                <Portrait src={m.image} name={m.name} className={styles.thumbLg} />
                <div className={styles.personText}>
                  <span className={styles.roleTag}>{m.role}</span>
                  <p className={styles.personName}>{m.name}</p>
                  <p className={styles.personTitle}>{m.title}</p>
                </div>
              </div>
            ))}
          </div>
          {coChairs.length > 0 && (
            <>
              <p className={styles.groupLabel}>{p.coChairsTitle}</p>
              <ul className={styles.personList}>
                {coChairs.map((c, i) => (
                  <li key={i}>
                    <Portrait src={c.image} name={c.name} className={styles.thumb} />
                    <div className={styles.personText}>
                      <span className={styles.personNameSm}>{c.name}</span>
                      <span className={styles.personTitleSm}>{c.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    }

    case 'speakers': {
      const list = (t('speakers') || []).filter((s) => !s.hidden);
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <ul className={styles.speakerGrid}>
            {list.map((s) => (
              <li key={s.id}>
                <Portrait src={s.img} name={s.name} className={styles.thumb} />
                <div className={styles.personText}>
                  <span className={styles.personNameSm}>{s.name}</span>
                  <span className={styles.personTitleSm}>{s.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case 'qa':
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <div className={styles.qa}>
            {page.items.map((it, i) => (
              <div className={styles.qaRow} key={i}>
                <p className={styles.qaQ}>{it.q}</p>
                <p className={styles.qaA}>{it.a}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'text':
    default:
      return (
        <div className={styles.leafInner}>
          <span className={styles.pageNum}>{page.num}</span>
          <h2 className={styles.pageHeading}>{page.heading}</h2>
          <div className={styles.prose}>
            {page.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      );
  }
}

export default function Handbook() {
  const { t, language, toggleLanguage } = useI18n();
  const book = t('handbook');
  const meta = book.meta;
  const pages = book.pages;
  const total = pages.length;

  const { hash } = useLocation();
  const initial = Math.min(Math.max(parseInt(hash.replace('#', ''), 10) || 1, 1), total) - 1;

  const [index, setIndex] = useState(initial);
  const [turn, setTurn] = useState(null); // { dir: 'next'|'prev', from: number }
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!turn) window.history.replaceState(null, '', `#${index + 1}`);
  }, [index, turn]);

  const go = useCallback((dir) => {
    if (turn) return;
    const target = dir === 'next' ? index + 1 : index - 1;
    if (target < 0 || target >= total) return;

    if (prefersReducedMotion()) {
      setIndex(target);
      return;
    }

    if (dir === 'next') {
      // reveal the destination underneath, flip the page we're leaving on top
      setIndex(target);
      setTurn({ dir, from: index });
    } else {
      // keep current underneath, flip the destination page in from the left
      setTurn({ dir, from: index });
    }

    timer.current = setTimeout(() => {
      if (dir === 'prev') setIndex(target);
      setTurn(null);
    }, FLIP_MS);
  }, [turn, index, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go('next');
      if (e.key === 'ArrowLeft') go('prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const bookRef = useRef(null);
  const swipe = useRef(null); // { x, y, lockedAxis: null | 'x' | 'y' }

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;

    const LOCK_THRESHOLD = 10;
    const SWIPE_THRESHOLD = 40;

    const onStart = (e) => {
      const t = e.touches[0];
      swipe.current = { x: t.clientX, y: t.clientY, lockedAxis: null };
    };

    const onMove = (e) => {
      const s = swipe.current;
      if (!s) return;
      const t = e.touches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;

      if (!s.lockedAxis) {
        if (Math.abs(dx) < LOCK_THRESHOLD && Math.abs(dy) < LOCK_THRESHOLD) return;
        s.lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (s.lockedAxis === 'x') e.preventDefault();
    };

    const onEnd = (e) => {
      const s = swipe.current;
      swipe.current = null;
      if (!s || s.lockedAxis !== 'x') return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      go(dx < 0 ? 'next' : 'prev');
    };

    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
    };
  }, [go]);

  const underneath = pages[index];
  const leafFrontPage = turn
    ? (turn.dir === 'next' ? pages[turn.from] : pages[turn.from - 1])
    : null;

  const pageLabel = meta.pageOf
    .replace('{n}', String(index + 1))
    .replace('{total}', String(total));

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.home} to="/">{meta.backHome}</Link>
        <span className={styles.label}>{meta.label}</span>
        <button type="button" className={styles.lang} onClick={toggleLanguage}>
          {language === 'zh' ? 'EN' : '中文'}
        </button>
      </header>

      <div className={styles.stage}>
        <button
          type="button"
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={() => go('prev')}
          disabled={index === 0 || !!turn}
          aria-label={meta.prev}
        >
          ‹
        </button>

        <div className={styles.book} ref={bookRef}>
          <div className={styles.staticPage}>
            <PageBody page={underneath} t={t} />
          </div>

          {turn && (
            <div className={`${styles.leaf} ${turn.dir === 'next' ? styles.leafNext : styles.leafPrev}`}>
              <div className={`${styles.leafFace} ${styles.leafFront}`}>
                <PageBody page={leafFrontPage} t={t} />
              </div>
              <div className={`${styles.leafFace} ${styles.leafBack}`} />
            </div>
          )}

          {/* click zones on the page edges */}
          <button
            type="button"
            className={`${styles.edge} ${styles.edgeLeft}`}
            onClick={() => go('prev')}
            disabled={index === 0 || !!turn}
            aria-label={meta.prev}
            tabIndex={-1}
          />
          <button
            type="button"
            className={`${styles.edge} ${styles.edgeRight}`}
            onClick={() => go('next')}
            disabled={index === total - 1 || !!turn}
            aria-label={meta.next}
            tabIndex={-1}
          />
        </div>

        <button
          type="button"
          className={`${styles.nav} ${styles.navNext}`}
          onClick={() => go('next')}
          disabled={index === total - 1 || !!turn}
          aria-label={meta.next}
        >
          ›
        </button>
      </div>

      <footer className={styles.bottombar}>
        <span className={styles.counter}>{pageLabel}</span>
        <div className={styles.dots}>
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotOn : ''}`}
              onClick={() => !turn && setIndex(i)}
              aria-label={`${i + 1}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
