import React, { createContext, useContext, useState } from 'react';

// Data that was in timeline.js
const timelineImg = [
  'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/77945_64f14b306e7bb.jpg',
  'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/85525_64f1918b31877.jpg',
  'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/18181_674d2d6b99f05.jpg',
  'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/39637_海報.jpg',
  'https://media.ct.org.tw/upload/news_article_cms/2026/04/21/30209_632906082_1387636540070401_4268236876262369224_n.jpg'
];

const translations = {
  zh: {
    // Header
    navVision: '年會異象',
    navThemes: '專題研討',
    navVenue: '會場資訊',
    navSupport: '奉獻',
    // Hero
    heroSubtitle: 'Phoenix, Arizona | Oct 2026',
    heroTitle: '曠野中的重生',
    heroEventName: 'IMPACT ASIA ALLIANCE SUMMIT',
    btnRegister: '立即報名',
    btnSupportOnline: '奉獻',
    // Vision
    vision: {
      verse1: '「看哪，我要做一件新事；如今就要顯明，你們豈不知道嗎？',
      verse2: '我必在曠野開道路，在沙漠開江河。」',
      ref: '— 以賽亞書 43:19 —'
    },
    // Timeline
    timelineSection: {
      title: '亞洲信仰新世代',
      subtitle: 'OUR JOURNEY (2022 - 2026)'
    },
    timeline: [
      { year: '2022', region: '馬來西亞 吉隆坡', title: '馬來西亞', description: '風起雲湧', img: timelineImg[0] },
      { year: '2023', region: '印尼 雅加達', title: '印尼', description: '祂踏浪而來', img: timelineImg[1] },
      { year: '2024', region: '台灣 高雄', title: '台灣', description: '往水深之處', img: timelineImg[2] },
      { year: '2025', region: '日本 東京', title: '日本', description: '日出東方', img: timelineImg[3] },
      { year: '2026', region: '美國 鳳凰城', title: '美國', description: '曠野中的重生', img: timelineImg[4], active: true }
    ],
    // Trailer
    trailer: {
      title: '官方前導預告',
      subtitle: 'OFFICIAL TRAILER 2026'
    },
    // Themes
    themesSection: {
      title: '大會議題'
    },
    themes: [
      {
        id: 'ai', title: '數位轉型與 AI 未來', summary: '探討人工智慧如何在信仰基礎上引領企業變革，實現曠野中的技術突破。',
        detail: { heading: '數位曠野中的重生', intro: '當今 AI 技術如同狂風橫掃荒原，在 Phoenix 亞利桑那州的烈日下，我們探討核心問題：科技是否能真正賦予心靈自由？', points: [{ title: '人工智慧與信仰倫理的交鋒', desc: '探討在演算法主導的時代，人類尊嚴與創造力的神聖來源。' }, { title: '從繁雜數據到生命智慧的體悟', desc: '如何在資訊爆炸的時代，保持專注於國度的永續視野。' }, { title: '企業治理中的 AI 聖約模式', desc: '實踐數據公義，讓技術成為服務眾人的僕人。' }] }
      },
      {
        id: 'leadership', title: '國度影響力領導力', summary: '在高壓競爭的商業叢林中，如何保持靈性生命力，發揮僕人領導者的價值。',
        detail: { heading: '僕人式領導的當代挑戰', intro: '在多變、不確定且混亂的商業環境中，真正的領導力來自於靈魂的穩定性。', points: [{ title: '荒漠中的生命綠洲', desc: '工作與靈性的融合。' }, { title: '連結兩代', desc: '如何傳承跨文化的國度視野。' }, { title: '逆境成長', desc: '荒野經驗如何塑造堅韌品格。' }] }
      },
      {
        id: 'stewardship', title: '土地管理與永續發展', summary: '以管家的身分守護受造界，連結 ESG 與永續商業模式的實踐與委身。',
        detail: { heading: '管家職分的再思', intro: 'Phoenix 的沙漠地貌提醒我們：每一滴水、每一吋土地都是承接自造物主的託付。', points: [{ title: '聖經視野下的 ESG 實踐路徑', desc: '從聖約神學建立永續策略。' }, { title: '供應鏈透明化與勞工正義', desc: '商業倫理的全球在地化落地。' }, { title: '荒漠綠化', desc: '商業模式如何回饋受造界。' }] }
      }
    ],
    // Venue
    venue: {
      title: '會場資訊',
      name: 'First Baptist Church Tempe',
      heading: '曠野中的奢華靜謐',
      desc: '2026年前往北美鳳凰城，祝福北美地區與亞太教會的聯合，邀請您與我們一同見證神在沙漠開江河、曠野開道路的奇妙作為！',
      date: '2026 年 10 月 20-23 日'
    },
    // Footer
    footer: {
      brandDesc: '連結亞洲影響力，轉化國度價值觀。',
      quickLinks: '快速連結',
      contact: '聯繫我們',
      email: 'Email: service@ct.org.tw',
      phone: 'Phone: 0800096101 謝秘書',
      copyright: '© 2026 Impact Asia Center. All Rights Reserved.'
    }
  },
  en: {
    // Header
    navVision: 'Vision',
    navThemes: 'Themes',
    navVenue: 'Venue',
    navSupport: 'Support',
    // Hero
    heroSubtitle: 'Phoenix, Arizona | Oct 2026',
    heroTitle: 'Rebirth in the Wilderness',
    heroEventName: 'IMPACT ASIA ALLIANCE SUMMIT',
    btnRegister: 'Register Now',
    btnSupportOnline: 'Support',
    // Vision
    vision: {
      verse1: '"See, I am doing a new thing! Now it springs up; do you not perceive it?',
      verse2: 'I am making a way in the wilderness and streams in the wasteland."',
      ref: '— Isaiah 43:19 —'
    },
    // Timeline
    timelineSection: {
      title: 'A New Generation of Faith in Asia',
      subtitle: 'OUR JOURNEY (2022 - 2026)'
    },
    timeline: [
      { year: '2022', region: 'Kuala Lumpur, Malaysia', title: 'Malaysia', description: 'Winds of Change', img: timelineImg[0] },
      { year: '2023', region: 'Jakarta, Indonesia', title: 'Indonesia', description: 'He Walks on Waves', img: timelineImg[1] },
      { year: '2024', region: 'Kaohsiung, Taiwan', title: 'Taiwan', description: 'Into the Deep', img: timelineImg[2] },
      { year: '2025', region: 'Tokyo, Japan', title: 'Japan', description: 'Sunrise in the East', img: timelineImg[3] },
      { year: '2026', region: 'Phoenix, USA', title: 'USA', description: 'Rebirth in the Wilderness', img: timelineImg[4], active: true }
    ],
    // Trailer
    trailer: {
      title: 'Official Trailer',
      subtitle: 'OFFICIAL TRAILER 2026'
    },
    // Themes
    themesSection: {
      title: 'Conference Themes'
    },
    themes: [
      {
        id: 'ai', title: 'Digital Transformation & AI Future', summary: 'Exploring how AI can lead corporate transformation based on faith, achieving technological breakthroughs in the wilderness.',
        detail: { heading: 'Rebirth in the Digital Wilderness', intro: 'As AI technology sweeps across the wasteland like a storm, under the scorching sun of Phoenix, Arizona, we explore the core question: Can technology truly bring freedom to the soul?', points: [{ title: 'The Clash of AI and Faith Ethics', desc: 'Exploring the divine source of human dignity and creativity in an era dominated by algorithms.' }, { title: 'From Complex Data to Life Wisdom', desc: 'How to maintain focus on the sustainable vision of the Kingdom in an age of information explosion.' }, { title: 'The Covenant Model of AI in Corporate Governance', desc: 'Practicing data justice, making technology a servant to all.' }] }
      },
      {
        id: 'leadership', title: 'Kingdom Impact Leadership', summary: 'How to maintain spiritual vitality and exercise the value of servant leadership in a high-pressure competitive business jungle.',
        detail: { heading: 'Contemporary Challenges of Servant Leadership', intro: 'In a volatile, uncertain, and chaotic business environment, true leadership stems from the stability of the soul.', points: [{ title: 'Oasis in the Desert', desc: 'The integration of work and spirituality.' }, { title: 'Connecting Generations', desc: 'How to pass on a cross-cultural Kingdom vision.' }, { title: 'Growth in Adversity', desc: 'How wilderness experiences shape resilient character.' }] }
      },
      {
        id: 'stewardship', title: 'Land Stewardship & Sustainability', summary: 'Guarding creation as stewards, connecting ESG with the practice and commitment of sustainable business models.',
        detail: { heading: 'Rethinking Stewardship', intro: 'The desert landscape of Phoenix reminds us: every drop of water, every inch of land is entrusted to us by the Creator.', points: [{ title: 'ESG Practices from a Biblical Perspective', desc: 'Building sustainable strategies from covenant theology.' }, { title: 'Supply Chain Transparency & Labor Justice', desc: 'The glocalized implementation of business ethics.' }, { title: 'Greening the Desert', desc: 'How business models can give back to creation.' }] }
      }
    ],
    // Venue
    venue: {
      title: 'Venue Information',
      name: 'First Baptist Church Tempe',
      heading: 'Luxurious Tranquility in the Wilderness',
      desc: 'Heading to Phoenix, North America in 2026 to bless the union of North American and Asia-Pacific churches. We invite you to witness with us Gods wondrous work of making streams in the desert and paths in the wilderness!',
      date: 'October 20-23, 2026'
    },
    // Footer
    footer: {
      brandDesc: 'Connecting Asian impact, transforming Kingdom values.',
      quickLinks: 'Quick Links',
      contact: 'Contact Us',
      email: 'Email: service@ct.org.tw',
      phone: 'Phone: +886 800-096-101 Sec. Hsieh',
      copyright: '© 2026 Impact Asia Center. All Rights Reserved.'
    }
  }
};

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return (
    <I18nContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
