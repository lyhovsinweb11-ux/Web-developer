const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function render() {
    const d = portfolioData;
    $('#history-list').innerHTML = d.history.map(item => `<article class="timeline-item reveal"><div class="timeline-year">${item[0]}</div><div><span class="tag">${item[3]}</span><h3>${item[1]}</h3><p>${item[2]}</p></div></article>`).join('');
    $('#skills').innerHTML = d.skills.map(skill => `<div class="skill"><div class="skill-name">${skill[0]} <span>${skill[1]}</span></div><div class="skill-bar"><i style="--level:${skill[1]}"></i></div></div>`).join('');
    $('#jobs').innerHTML = d.jobs.map(job => `<article class="job reveal"><div class="job-top"><span class="eyebrow">Experience</span><span class="meta">${job[2]}</span></div><h3>${job[0]}</h3><div class="job-company">${job[1]}</div><p>${job[3]}</p><div class="chip-row">${job[4].map(tech => `<span class="chip">${tech}</span>`).join('')}</div></article>`).join('');
    $('#positions').innerHTML = d.positions.map(item => `<article class="position reveal"><span class="position-icon">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><strong>${item[3]}</strong></article>`).join('');
    $('#project-list').innerHTML = d.projects.map(project => `<article class="project reveal" data-category="${project[3]}"><div class="project-image"><img loading="lazy" src="${project[4]}" alt="${project[1]} project preview"><span class="project-number">${project[0]}</span></div><div class="project-body"><span class="tag">${project[3]}</span><h3>${project[1]}</h3><p>${project[2]}</p><div class="project-links"><a href="#" aria-label="View ${project[1]} code">GitHub ↗</a><a href="#" aria-label="View ${project[1]} live demo">Live Demo ↗</a></div></div></article>`).join('');
    $('#gallery-list').innerHTML = d.gallery.map(item => `<figure class="gallery-item reveal"><img loading="lazy" src="${item[2]}" alt="${item[0]}"><figcaption class="gallery-caption">${item[0]}<small>${item[1]}</small></figcaption></figure>`).join('');
}

function initInteractions() {
    const nav = $('.nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
    const menu = $('.menu-btn');
    menu.addEventListener('click', () => $('.nav-links').classList.toggle('open'));
    $$('.nav-links a').forEach(link => link.addEventListener('click', () => $('.nav-links').classList.remove('open')));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
    $$('.reveal').forEach(element => observer.observe(element));
    $$('.filter').forEach(filter => filter.addEventListener('click', () => { $$('.filter').forEach(item => item.classList.remove('active')); filter.classList.add('active'); const category = filter.dataset.filter; $$('.project').forEach(project => project.style.display = category === 'All' || project.dataset.category === category ? '' : 'none'); }));
    const lightbox = $('.lightbox');
    $$('.gallery-item').forEach(item => item.addEventListener('click', () => { $('.lightbox img').src = $('img', item).src; $('.lightbox img').alt = $('img', item).alt; lightbox.classList.add('open'); }));
    $('.close').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', event => event.target === lightbox && lightbox.classList.remove('open'));
    document.addEventListener('keydown', event => event.key === 'Escape' && lightbox.classList.remove('open'));
    const words = ['Web Developer', 'Frontend Developer', 'Creative Coder', 'Problem Solver']; let wordIndex = 0; let charIndex = 0; let deleting = false;
    function type() { const word = words[wordIndex]; $('.typed').textContent = word.slice(0, charIndex); if (!deleting && charIndex < word.length) charIndex++; else if (deleting && charIndex > 0) charIndex--; else { deleting = !deleting; if (!deleting) wordIndex = (wordIndex + 1) % words.length; } setTimeout(type, deleting ? 60 : 115); }
    type();
}

render();
initInteractions();