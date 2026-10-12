const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileMenu.hidden = open;
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

const productContent = {
  workflows: {
    sidebar: 'Workflows',
    breadcrumb: 'WORKFLOWS',
    title: 'Good morning, team',
    copy: 'Your work is moving. Here’s what’s happening today.',
  },
  agents: {
    sidebar: 'Agents',
    breadcrumb: 'AGENTS',
    title: 'Ask your business anything',
    copy: 'Answers grounded in the knowledge your team trusts.',
  },
  knowledge: {
    sidebar: 'Knowledge Base',
    breadcrumb: 'KNOWLEDGE BASE',
    title: 'Your company knowledge, connected',
    copy: 'Keep the information your people need in one searchable place.',
  },
  meetings: {
    sidebar: 'Meetings',
    breadcrumb: 'MEETINGS',
    title: 'Every conversation, ready to use',
    copy: 'Meeting notes become useful context for your next step.',
  },
};

document.querySelectorAll('.product-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.product-tab').forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    const content = productContent[tab.dataset.product];
    document.querySelector('[data-sidebar-label]').textContent = content.sidebar;
    document.querySelector('[data-breadcrumb]').textContent = content.breadcrumb;
    document.querySelector('[data-screen-title]').textContent = content.title;
    document.querySelector('[data-screen-copy]').textContent = content.copy;
  });
});

const teamTrack = document.querySelector('[data-team-track]');
const previousButton = document.querySelector('[data-carousel-prev]');
const nextButton = document.querySelector('[data-carousel-next]');

function updateCarouselButtons() {
  const maxScroll = teamTrack.scrollWidth - teamTrack.clientWidth;
  previousButton.disabled = teamTrack.scrollLeft <= 2;
  nextButton.disabled = teamTrack.scrollLeft >= maxScroll - 2;
}

previousButton.addEventListener('click', () => teamTrack.scrollBy({ left: -teamTrack.clientWidth * 0.8, behavior: 'smooth' }));
nextButton.addEventListener('click', () => teamTrack.scrollBy({ left: teamTrack.clientWidth * 0.8, behavior: 'smooth' }));
teamTrack.addEventListener('scroll', updateCarouselButtons, { passive: true });
window.addEventListener('resize', updateCarouselButtons);
updateCarouselButtons();

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const note = form.querySelector('.form-note');
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    note.textContent = 'Demo request preview — connect a form endpoint to receive inquiries.';
    form.reset();
  });
});
