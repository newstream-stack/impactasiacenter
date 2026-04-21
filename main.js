const themeData = {
    ai: {
        title: "數位轉型與 AI 未來",
        content: `
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--accent-orange);">數位曠野中的重生</h2>
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem; opacity: 0.9;">當今 AI 技術如同狂風橫掃荒原，在 Phoenix 亞利桑那州的烈日下，我們探討核心問題：科技是否能真正賦予心靈自由？</p>
            <ul style="list-style: none; padding-left: 0; margin-top: 2rem;">
                <li style="margin-bottom: 1.5rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-orange);">
                    <strong style="display: block; font-size: 1.2rem; margin-bottom: 0.3rem;">人工智慧與信仰倫理的交鋒</strong>
                    <span style="opacity: 0.7;">探討在演算法主導的時代，人類尊嚴與創造力的神聖來源。</span>
                </li>
                <li style="margin-bottom: 1.5rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-orange);">
                    <strong style="display: block; font-size: 1.2rem; margin-bottom: 0.3rem;">從繁雜數據到生命智慧的體悟</strong>
                    <span style="opacity: 0.7;">如何在資訊爆炸的時代，保持專注於國度的永續視野。</span>
                </li>
                <li style="margin-bottom: 1.5rem; padding-left: 1.5rem; border-left: 2px solid var(--accent-orange);">
                    <strong style="display: block; font-size: 1.2rem; margin-bottom: 0.3rem;">企業治理中的 AI 聖約模式</strong>
                    <span style="opacity: 0.7;">實踐數據公義，讓技術成為服務眾人的僕人。</span>
                </li>
            </ul>
        `
    },
    leadership: {
        title: "國度影響力領導力",
        content: `
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--accent-orange);">僕人式領導的當代挑戰</h2>
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">在多變、不確定且混亂的商業環境中，真正的領導力來自於靈魂的穩定性。</p>
            <div style="margin-top: 2rem;">
                <p style="margin-bottom: 1rem;">• 荒漠中的生命綠洲：工作與靈性的融合</p>
                <p style="margin-bottom: 1rem;">• 連結兩代：如何傳承跨文化的國度視野</p>
                <p style="margin-bottom: 1rem;">• 逆境成長：荒野經驗如何塑造堅韌品格</p>
            </div>
        `
    },
    stewardship: {
        title: "土地管理與永續發展",
        content: `
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--accent-orange);">管家職分的再思</h2>
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem;">Phoenix 的沙漠地貌提醒我們：每一滴水、每一吋土地都是承接自造物主的託付。</p>
            <ul style="list-style: none; margin-top: 2rem;">
                <li style="margin-bottom: 1.5rem;">聖經視野下的 ESG 實踐路徑</li>
                <li style="margin-bottom: 1.5rem;">供應鏈透明化與勞工正義</li>
                <li style="margin-bottom: 1.5rem;">荒漠綠化：商業模式如何回饋受造界</li>
            </ul>
        `
    }
};

// Selectors
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');
const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const closeBtn = document.getElementById('close-btn');

const videoModal = document.getElementById('video-modal');
const playVideoBtn = document.getElementById('play-video-btn');
const closeVideoBtn = document.getElementById('close-video');
const videoIframe = document.getElementById('video-iframe');

// Sticky Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// SPA Side Slide Logic
document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('click', () => {
        const themeKey = card.getAttribute('data-theme');
        const data = themeData[themeKey];
        if (data) {
            detailContent.innerHTML = data.content;
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.classList.add('active');
                detailView.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeDetail() {
    overlay.classList.remove('active');
    detailView.classList.remove('active');
    setTimeout(() => { overlay.style.display = 'none'; }, 400);
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeDetail);
overlay.addEventListener('click', closeDetail);

// Video Modal Logic
const openVideo = () => {
    videoIframe.src = "https://www.youtube.com/embed/2IvNbOhBPwA?autoplay=1";
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

playVideoBtn.addEventListener('click', openVideo);
document.getElementById('trailer-click').addEventListener('click', openVideo);

function closeVideo() {
    videoModal.style.display = 'none';
    videoIframe.src = "";
    document.body.style.overflow = 'auto';
}

closeVideoBtn.addEventListener('click', closeVideo);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideo();
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});
