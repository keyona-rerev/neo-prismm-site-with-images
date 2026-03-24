document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('nav--scrolled', window.scrollY > 20));

  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      const spans = toggle.querySelectorAll('span');
      if (open) { spans[0].style.transform='rotate(45deg) translate(5px,5px)'; spans[1].style.opacity='0'; spans[2].style.transform='rotate(-45deg) translate(5px,-5px)'; }
      else spans.forEach(s => { s.style.transform='none'; s.style.opacity='1'; });
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform='none'; s.style.opacity='1'; });
    }));
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => obs.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form), v = {};
    d.forEach((val,key) => v[key]=val);
    const btn = form.querySelector('button[type="submit"]'), orig = btn.textContent;
    btn.textContent = 'Sending...'; btn.disabled = true;
    const subj = encodeURIComponent('Strategic Briefing Request from ' + (v.name||'Website'));
    const body = encodeURIComponent('Name: '+v.name+'\nTitle: '+(v.title||'N/A')+'\nOrganization: '+v.organization+'\nEmail: '+v.email+'\nPhone: '+(v.phone||'N/A')+'\nInstitution Size: '+(v.size||'N/A')+'\n\nMessage:\n'+(v.message||'N/A'));
    window.location.href = 'mailto:support@getprismm.com?subject='+subj+'&body='+body;
    setTimeout(() => { btn.textContent='Message sent'; btn.style.background='#059669'; setTimeout(() => { btn.textContent=orig; btn.style.background=''; btn.disabled=false; form.reset(); }, 2500); }, 500);
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  }));
});
