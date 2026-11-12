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

// ===== Menyu: soya va faol bo'lim =====
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navSections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 8);

  // Ekranning yuqori uchdan biridan o'tgan oxirgi bo'lim — faol bo'lim
  const line = window.innerHeight / 3;
  let current = null;
  navSections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= line) current = sec;
  });
  // Sahifa oxiriga yetganda oxirgi bo'limni belgilaymiz
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = navSections[navSections.length - 1] || current;
  }

  navLinks.forEach(a => {
    const on = current && a.getAttribute('href') === '#' + current.id;
    if (on && !a.classList.contains('active') && navList.scrollWidth > navList.clientWidth) {
      // Telefonda faol havola ko'rinadigan joyga suriladi
      navList.scrollTo({ left: a.offsetLeft - navList.offsetLeft - 20, behavior: 'smooth' });
    }
    a.classList.toggle('active', !!on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
window.addEventListener('resize', updateNav);
updateNav();

// ===== Til: UZ | RU =====
// O'zbekcha matn HTML ichida turadi, bu yerda faqat ruscha tarjima.
const ru = {
  'title': 'Асилбек Курбонов — Научные услуги',
  'desc': 'Асилбек Курбонов — 4 года опыта. Помощь студентам и преподавателям со статьями, диссертациями и самостоятельными работами.',
  'name': 'Асилбек Курбонов',
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
  'nav.works': 'Работы',
  'works.title': 'Мои работы',
  'works.sub': 'Примеры выполненных работ',
  'work1.tag': 'Слайды · на русском',
  'work1.title': 'Жизнь и творчество Пушкина и Лермонтова',
  'work1.text': 'Две презентации на русском языке о жизни и творчестве поэтов.',
  'work2.tag': 'Слайды',
  'work2.title': 'Технические и программные средства компьютера',
  'work2.text': 'Презентация об устройствах и программах компьютера.',
  'work3.tag': 'Слайды · 8 шт.',
  'work3.title': '8 презентаций в одном заказе',
  'work3.text': 'Бухгалтерия, налог на прибыль, финансовые ресурсы, аудиторская выборка и другие темы.',
  'nav.reviews': 'Отзывы',
  'reviews.title': 'Отзывы клиентов',
  'reviews.sub': 'Из переписки в Telegram',
  'review1.text': 'Вау, отлично получилось, большое спасибо! Удачи в работе.',
  'review1.who': 'Студент · слайды на русском',
  'review2.text': 'Вау, отлично вышло! Спасибо, расскажу и однокурсникам.',
  'review2.who': 'Студент · 8 презентаций',
  'review3.text': 'Большое спасибо! Пусть ваше дело процветает.',
  'review3.who': 'Студент · слайды',
  'reviews.more': 'Все отзывы в Telegram →',
  'nav.faq': 'Вопросы',
  'faq.title': 'Вопросы и ответы',
  'faq.sub': 'Часто задаваемые вопросы',
  'faq1.q': 'Сколько времени занимает работа?',
  'faq1.a': 'Слайды и реферат будут готовы за 10 минут, курсовая работа — за 10 часов.',
  'faq2.q': 'Сколько это стоит?',
  'faq2.a': 'Цена зависит от вида работы, объёма и требований.',
  'faq3.q': 'Как происходит оплата?',
  'faq3.a': 'Половина — заранее, вторая половина — после готовности работы. Через Click или банковскую карту.',
  'faq4.q': 'А если преподаватель попросит исправления?',
  'faq4.a': 'Исправления вносятся бесплатно.',
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
  updateNav(); // matn uzunligi o'zgaradi, faol bo'limni qayta tekshiramiz
}

langButtons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

let startLang = null;
try { startLang = localStorage.getItem('lang'); } catch (e) {}
setLang(startLang === 'ru' ? 'ru' : 'uz');
