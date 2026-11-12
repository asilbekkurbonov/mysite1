// Footer'dagi yilni avtomatik qo'yish
document.getElementById('year').textContent = new Date().getFullYear();

// Rasm topilmasa, uni olib tashlab "A" harfini qoldirish
const photo = document.querySelector('.photo img');
if (photo) {
  if (photo.complete && photo.naturalWidth === 0) {
    photo.remove();
  } else {
    photo.addEventListener('error', () => photo.remove());
  }
}

// Qorong'i / yorug' rejim
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');

function savedTheme() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}
function saveTheme(theme) {
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

// Avval saqlangan tanlov, bo'lmasa qurilma sozlamasi
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = savedTheme() || (systemDark ? 'dark' : 'light');

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  saveTheme(next);
});

// ===== Til: UZ | RU =====
// O'zbekcha matn HTML ichida turadi, bu yerda faqat ruscha tarjima.
const ru = {
  'title': 'Асилбек Курбонов — Научные услуги',
  'desc': 'Асилбек Курбонов — 4 года опыта. Помощь студентам и преподавателям со статьями, диссертациями и самостоятельными работами.',
  'name': 'Асилбек Курбонов',
  'nav.home': 'Главная',
  'nav.services': 'Услуги',
  'nav.contact': 'Связаться',
  'theme': 'Тёмная / светлая тема',
  'hello': 'Научный консультант · 4 года опыта',
  'h1': 'Надёжный помощник в научной работе',
  'lead': 'Помогаю студентам и преподавателям с научными статьями, диссертациями и самостоятельными работами — качественно, в срок и надёжно.',
  'btn.contact': 'Связаться',
  'btn.call': 'Позвонить',
  'stat.years': 'лет опыта',
  'stat.works': 'выполненных работ',
  'stars': '5 звёзд',
  'stat.reviews': 'Отзывы клиентов →',
  'scroll': 'Перейти к услугам',
  'ring': 'знакомьтесь с услугами • вниз •',
  'svc.article': 'Научная статья',
  'svc.diss': 'Диссертация',
  'svc.indep': 'Самостоятельная работа',
  'svc.course': 'Курсовая работа',
  'svc.essay': 'Реферат',
  'svc.diploma': 'Дипломная работа',
  'svc.slides': 'Слайды',
  'services.title': 'Услуги',
  'services.sub': 'Чем я могу помочь',
  'card.article': 'Подготовка, редактирование и оформление статей для журналов и конференций по требованиям.',
  'card.diss': 'Составление, оформление и консультации по магистерским и докторским диссертациям.',
  'card.indep': 'Помощь в качественном и своевременном выполнении рефератов, курсовых и самостоятельных работ.',
  'note': 'Есть вопросы — пишите, я отвечу.',
  'footer': 'Асилбек Курбонов · Научные услуги'
};

// Tarjima qilinadigan joylar: matn, aria-label, alt va meta description
const targets = [
  ['data-i18n', el => el.textContent, (el, v) => { el.textContent = v; }],
  ['data-i18n-aria', el => el.getAttribute('aria-label'), (el, v) => el.setAttribute('aria-label', v)],
  ['data-i18n-alt', el => el.alt, (el, v) => { el.alt = v; }],
  ['data-i18n-content', el => el.content, (el, v) => { el.content = v; }]
];

// O'zbekcha asl matnlarni bir marta eslab qolamiz
const uz = { title: document.title };
targets.forEach(([attr, get]) => {
  document.querySelectorAll('[' + attr + ']').forEach(el => {
    const key = el.getAttribute(attr);
    if (!(key in uz)) uz[key] = get(el);
  });
});

const langButtons = document.querySelectorAll('.lang-switch button');

function setLang(lang) {
  const dict = lang === 'ru' ? ru : uz;
  targets.forEach(([attr, , set]) => {
    document.querySelectorAll('[' + attr + ']').forEach(el => {
      const key = el.getAttribute(attr);
      if (dict[key] != null) set(el, dict[key]);
    });
  });
  document.title = dict.title;
  root.lang = lang;
  langButtons.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

langButtons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

let startLang = null;
try { startLang = localStorage.getItem('lang'); } catch (e) {}
setLang(startLang === 'ru' ? 'ru' : 'uz');
