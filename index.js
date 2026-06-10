let currentTab = 'university';
const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const cards = Array.from(document.querySelectorAll('.card'));
let currentPage = 0;

/* Tab Switching (Mobile) */
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll(`input[type="radio"][value="${tab}"]`).forEach(r => r.checked = true);
    ['university', 'language', 'summer'].forEach(t => {
        const el = document.getElementById(`filters-${t}`);
        if (el) el.classList.toggle('hidden', t !== tab);
    });
}

/* Desktop Tab Switching */
function switchDesktopTab(tab, btn) {
    currentTab = tab;
    // Update tab styles
    document.querySelectorAll('.desk-tab').forEach(b => {
        b.classList.remove('text-white', 'bg-[#3C67FF]');
        b.classList.add('text-[#6E6E6E]', 'bg-white', 'border-b', 'border-[#D5DEE2]');
    });
    btn.classList.remove('text-[#6E6E6E]', 'bg-white', 'border-b', 'border-[#D5DEE2]');
    btn.classList.add('text-white', 'bg-[#3C67FF]');
    // Show/hide filter groups
    ['university', 'language', 'summer'].forEach(t => {
        const el = document.getElementById(`desk-filters-${t}`);
        if (el) el.classList.toggle('hidden', t !== tab);
    });
    // Sync mobile tabs
    switchTab(tab);
}

/* Modal */
function openModal() {
    document.querySelectorAll(`input[name="modal-tab"][value="${currentTab}"]`).forEach(r => r.checked = true);
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeOnBackdrop(e) {
    if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').classList.add('hidden');
        document.getElementById('modal').classList.remove('flex');
    }
}

/* Carousel */
function perView() {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function totalPages() {
    return cards.length - perView() + 1;
}

function buildDots() {
    dotsEl.innerHTML = '';
    const pages = totalPages();
    for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
    }
}

function goTo(page) {
    const pages = totalPages();
    currentPage = Math.max(0, Math.min(page, pages - 1));
    const targetCard = cards[currentPage];
    track.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth'
    });
    Array.from(dotsEl.children).forEach((d, i) => {
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
    });
}

prevBtn.addEventListener('click', () => goTo(currentPage - 1));
nextBtn.addEventListener('click', () => goTo(currentPage + 1));

track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft - scrollLeft);
        if (dist < minDist) {
            minDist = dist;
            closest = i;
        }
    });
    if (closest !== currentPage) {
        currentPage = closest;
        Array.from(dotsEl.children).forEach((d, i) => {
            d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
        });
    }
}, {
    passive: true
});

window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
    buildDots2();
    goTo2(0);
    buildDots3();
    goTo3(0);
});

buildDots();

/* Carousel 2 */
const track2 = document.getElementById('track2');
const dotsEl2 = document.getElementById('dots2');
const prevBtn2 = document.getElementById('prev2');
const nextBtn2 = document.getElementById('next2');
const cards2 = Array.from(document.querySelectorAll('.card2'));
let currentPage2 = 0;

function totalPages2() {
    return cards2.length - perView() + 1;
}

function buildDots2() {
    if (!dotsEl2) return;
    dotsEl2.innerHTML = '';
    const pages = totalPages2();
    for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage2 ? 'bg-gray-800' : 'bg-gray-300'}`;
        d.addEventListener('click', () => goTo2(i));
        dotsEl2.appendChild(d);
    }
}

function goTo2(page) {
    if (!track2) return;
    const pages = totalPages2();
    currentPage2 = Math.max(0, Math.min(page, pages - 1));
    const targetCard = cards2[currentPage2];
    if (targetCard) track2.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth'
    });
    Array.from(dotsEl2.children).forEach((d, i) => {
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage2 ? 'bg-gray-800' : 'bg-gray-300'}`;
    });
}

if (prevBtn2) prevBtn2.addEventListener('click', () => goTo2(currentPage2 - 1));
if (nextBtn2) nextBtn2.addEventListener('click', () => goTo2(currentPage2 + 1));

if (track2) {
    track2.addEventListener('scroll', () => {
        const scrollLeft = track2.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        cards2.forEach((c, i) => {
            const dist = Math.abs(c.offsetLeft - scrollLeft);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        if (closest !== currentPage2) {
            currentPage2 = closest;
            Array.from(dotsEl2.children).forEach((d, i) => {
                d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage2 ? 'bg-gray-800' : 'bg-gray-300'}`;
            });
        }
    }, {
        passive: true
    });
}

buildDots2();

/* Carousel 3 */
const track3 = document.getElementById('track3');
const dotsEl3 = document.getElementById('dots3');
const prevBtn3 = document.getElementById('prev3');
const nextBtn3 = document.getElementById('next3');
const cards3 = Array.from(document.querySelectorAll('.card3'));
let currentPage3 = 0;

function totalPages3() {
    return cards3.length - perView() + 1;
}

function buildDots3() {
    if (!dotsEl3) return;
    dotsEl3.innerHTML = '';
    const pages = totalPages3();
    for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage3 ? 'bg-gray-800' : 'bg-gray-300'}`;
        d.addEventListener('click', () => goTo3(i));
        dotsEl3.appendChild(d);
    }
}

function goTo3(page) {
    if (!track3) return;
    const pages = totalPages3();
    currentPage3 = Math.max(0, Math.min(page, pages - 1));
    const targetCard = cards3[currentPage3];
    if (targetCard) track3.scrollTo({
        left: targetCard.offsetLeft,
        behavior: 'smooth'
    });
    Array.from(dotsEl3.children).forEach((d, i) => {
        d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage3 ? 'bg-gray-800' : 'bg-gray-300'}`;
    });
}

if (prevBtn3) prevBtn3.addEventListener('click', () => goTo3(currentPage3 - 1));
if (nextBtn3) nextBtn3.addEventListener('click', () => goTo3(currentPage3 + 1));

if (track3) {
    track3.addEventListener('scroll', () => {
        const scrollLeft = track3.scrollLeft;
        let closest = 0;
        let minDist = Infinity;
        cards3.forEach((c, i) => {
            const dist = Math.abs(c.offsetLeft - scrollLeft);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });
        if (closest !== currentPage3) {
            currentPage3 = closest;
            Array.from(dotsEl3.children).forEach((d, i) => {
                d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === currentPage3 ? 'bg-gray-800' : 'bg-gray-300'}`;
            });
        }
    }, {
        passive: true
    });
}

buildDots3();