import { products, designerSpotlights } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    renderProducts();
    renderHotProducts();
    renderDesignerSpotlights();
    renderDesignerArchive();
    initContactForm();
    lucide.createIcons();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!navbar || !mobileBtn || !mobileMenu) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            mobileBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            mobileBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
        }
        lucide.createIcons();
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            mobileBtn.innerHTML = '<i data-lucide="menu" class="w-8 h-8"></i>';
            lucide.createIcons();
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}


// Render Hot Drops products
function renderHotProducts() {
    const grid = document.getElementById('hot-products-grid');
    if (!grid) return;
    
    // Get first 4 products for hot drops
    const hotProducts = products.slice(0, 4);
    
    grid.innerHTML = hotProducts.map(product => `
        <a href="${product.link}" target="_blank" class="group block bg-brand-dark rounded-xl overflow-hidden hover:shadow-lg hover:shadow-brand-turquoise/20 transition-all duration-300 hover:-translate-y-1">
            <div class="relative aspect-square overflow-hidden">
                <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                ${product.badge ? `<span class="absolute top-2 left-2 bg-brand-turquoise text-black text-xs font-bold px-2 py-1 rounded">${product.badge}</span>` : ''}
            </div>
            <div class="p-3">
                <h3 class="font-bold text-white text-sm truncate">${product.title}</h3>
                <p class="text-brand-turquoise font-bold mt-1">${product.price}</p>
            </div>
        </a>
    `).join('');
}


function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products
        .map(product => `
        <article class="group relative bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 reveal-on-scroll flex flex-col h-full">
            <div class="relative aspect-square overflow-hidden bg-gray-100">
                <img src="${product.image}" alt="${product.title}" loading="lazy" class="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="absolute top-4 left-4 bg-white/95 backdrop-blur text-brand-brown text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm z-10">
                    ${product.badge}
                </span>
                <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                    <a href="${product.link}" target="_blank" class="block w-full bg-brand-turquoise text-white text-center py-3 font-bold uppercase tracking-widest text-xs hover:bg-brand-darkTurquoise rounded-sm shadow-lg">
                        View on eBay
                    </a>
                </div>
            </div>
            <div class="p-6 relative bg-white flex flex-col flex-grow z-10">
                <p class="text-xs text-brand-turquoise font-bold uppercase tracking-widest mb-1">${product.category}</p>
                <h3 class="font-serif text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-brown transition-colors line-clamp-1">${product.title}</h3>
                <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                    <span class="text-lg font-medium text-gray-900">${product.price}</span>
                    <a href="${product.link}" target="_blank" class="md:hidden text-brand-brown hover:text-brand-turquoise p-2">
                        <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
        </article>
    `)
        .join('');

    setTimeout(() => lucide.createIcons(), 100);
}

function renderDesignerSpotlights() {
    const grid = document.getElementById('designer-spotlight-grid');
    if (!grid) return;

    grid.innerHTML = designerSpotlights
        .map(designer => `
        <article class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur flex flex-col">
            <div class="relative h-64 overflow-hidden">
                <img src="${designer.image}" alt="${designer.name}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <span class="absolute top-4 left-4 bg-white/20 text-white text-[10px] uppercase tracking-[0.3em] px-4 py-1 rounded-full">
                    ${designer.discipline}
                </span>
            </div>
            <div class="p-6 flex flex-col gap-4 flex-1">
                <p class="text-sm text-white/70 italic">${designer.quote}</p>
                <div>
                    <h3 class="font-serif text-2xl font-bold">${designer.name}</h3>
                    <p class="text-white/70 text-sm mt-2 leading-relaxed">${designer.culturalContext}</p>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-[0.4em] text-white/50 mb-2">Milestones</p>
                    <div class="flex flex-wrap gap-2">
                        ${designer.timeline
                            .map(item => `<span class="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">${item.year} · ${item.highlight}</span>`)
                            .join('')}
                    </div>
                </div>
                <div class="mt-auto flex flex-col gap-2">
                    <a href="${designer.officialLink}" target="_blank" class="inline-flex items-center justify-between gap-2 px-4 py-3 bg-brand-turquoise text-brand-black font-semibold uppercase tracking-[0.3em] text-xs rounded-full hover:bg-white">
                        ${designer.officialLabel}
                        <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                    </a>
                    <p class="text-[11px] text-white/50">${designer.imageCredit}</p>
                </div>
            </div>
        </article>
    `)
        .join('');

    setTimeout(() => lucide.createIcons(), 0);
}

function renderDesignerArchive() {
    const archiveGrid = document.getElementById('designer-archive-grid');
    const archiveTimeline = document.getElementById('designer-archive-timeline');

    if (archiveGrid) {
        archiveGrid.innerHTML = designerSpotlights
            .map(designer => `
            <article class="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
                <div class="relative h-64 overflow-hidden">
                    <img src="${designer.image}" alt="${designer.name}" loading="lazy" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span class="font-semibold">${designer.name}</span>
                        <span class="text-white/70">${designer.discipline}</span>
                    </div>
                </div>
                <div class="p-8 flex flex-col gap-5 flex-1">
                    <p class="text-gray-600 leading-relaxed">${designer.culturalContext}</p>
                    <div>
                        <p class="text-xs uppercase tracking-[0.4em] text-gray-400 mb-3">Timeline</p>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            ${designer.timeline
                                .map(item => `
                                    <div class="rounded-2xl border border-gray-100 p-3">
                                        <p class="text-xs font-semibold text-brand-brown">${item.year}</p>
                                        <p class="text-sm text-gray-600">${item.highlight}</p>
                                    </div>
                                `)
                                .join('')}
                        </div>
                    </div>
                    <div class="text-xs text-gray-400">${designer.imageCredit}</div>
                    <a href="${designer.officialLink}" target="_blank" class="inline-flex items-center gap-2 mt-auto px-5 py-3 border border-gray-900 text-gray-900 uppercase tracking-[0.4em] text-[11px] rounded-full hover:bg-gray-900 hover:text-white transition">
                        ${designer.officialLabel}
                        <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
                    </a>
                </div>
            </article>
        `)
            .join('');
    }

    if (archiveTimeline) {
        const flattened = designerSpotlights
            .flatMap(designer => designer.timeline.map(item => ({
                ...item,
                designer: designer.name
            })))
            .sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));

        archiveTimeline.innerHTML = flattened
            .map(entry => `
            <div class="flex flex-col md:flex-row md:items-center gap-4 border border-white/10 rounded-2xl p-5">
                <div class="text-brand-turquoise font-semibold text-lg w-full md:w-24">${entry.year}</div>
                <div class="flex-1">
                    <p class="text-white font-semibold">${entry.highlight}</p>
                    <p class="text-white/60 text-sm">${entry.designer}</p>
                </div>
            </div>
        `)
            .join('');

        setTimeout(() => lucide.createIcons(), 0);
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusMsg = document.getElementById('formStatus');
    if (!form || !statusMsg) return;

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error-border')) {
                validateField(input);
            }
        });
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });

        if (isValid) {
            const btn = form.querySelector('button');
            if (!btn) return;

            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;
            btn.classList.add('opacity-75');

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.classList.replace('bg-brand-turquoise', 'bg-green-500');
                statusMsg.textContent = "Thanks for reaching out! We'll get back to you shortly.";
                statusMsg.classList.remove('hidden', 'text-red-500');
                statusMsg.classList.add('text-green-600', 'font-medium');
                form.reset();
                inputs.forEach(input => input.classList.remove('success-border'));

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove('opacity-75', 'bg-green-500');
                    btn.classList.add('bg-brand-turquoise');
                    statusMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        } else {
            statusMsg.textContent = 'Please correct the errors above.';
            statusMsg.classList.remove('hidden', 'text-green-600');
            statusMsg.classList.add('text-red-500');
        }
    });
}

function validateField(input) {
    const errorSpan = input.parentElement?.querySelector('.error-msg');
    let valid = true;

    if (input.hasAttribute('required') && !input.value.trim()) {
        valid = false;
    }

    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) valid = false;
    }

    if (valid) {
        input.classList.remove('error-border');
        input.classList.add('success-border');
        if (errorSpan) errorSpan.classList.add('hidden');
    } else {
        input.classList.add('error-border');
        input.classList.remove('success-border');
        if (errorSpan) errorSpan.classList.remove('hidden');
    }

    return valid;
}
