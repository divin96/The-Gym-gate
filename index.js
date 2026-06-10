let currentTab = 'university';
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

    document.querySelectorAll('.desk-tab').forEach(b => {
        b.classList.remove('text-white', 'bg-[#3C67FF]');
        b.classList.add('text-[#6E6E6E]', 'bg-white', 'border-b', 'border-[#D5DEE2]');
    });
    btn.classList.remove('text-[#6E6E6E]', 'bg-white', 'border-b', 'border-[#D5DEE2]');
    btn.classList.add('text-white', 'bg-[#3C67FF]');

    ['university', 'language', 'summer'].forEach(t => {
        const el = document.getElementById(`desk-filters-${t}`);
        if (el) el.classList.toggle('hidden', t !== tab);
    });

    switchTab(tab);
}


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


class Carousel {
    /*
     * @param {string} name  — matches the data-carousel attribute value
     * @param {object} [opts] — optional overrides
     */
    constructor(name, opts = {}) {
        this.name = name;
        this.currentPage = 0;

        // Resolve DOM elements
        this.track = document.querySelector(`[data-carousel-track="${name}"]`);
        this.dotsEl = document.querySelector(`[data-carousel-dots="${name}"]`);
        this.prevBtn = document.querySelector(`[data-carousel-prev="${name}"]`);
        this.nextBtn = document.querySelector(`[data-carousel-next="${name}"]`);
        this.cards = Array.from(document.querySelectorAll(`[data-carousel-card="${name}"]`));

        if (!this.track || this.cards.length === 0) return;

        const container = document.querySelector(`[data-carousel="${name}"]`);
        let dataOpts = {};
        if (container && container.dataset.carouselOptions) {
            try { dataOpts = JSON.parse(container.dataset.carouselOptions); } catch (_) { /* ignore */ }
        }
        this.options = Object.assign({ perView: { 1280: 3, 640: 2, 0: 1 } }, opts, dataOpts);

        this._bindEvents();
        this.buildDots();
    }

  
    perView() {
        const breakpoints = this.options.perView;
        // Sort breakpoints descending so we match the largest first
        const sorted = Object.keys(breakpoints).map(Number).sort((a, b) => b - a);
        for (const bp of sorted) {
            if (window.innerWidth >= bp) return breakpoints[bp];
        }
        return 1;
    }

    totalPages() {
        return Math.max(1, this.cards.length - this.perView() + 1);
    }

    buildDots() {
        if (!this.dotsEl) return;
        this.dotsEl.innerHTML = '';
        const pages = this.totalPages();
        for (let i = 0; i < pages; i++) {
            const d = document.createElement('button');
            d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === this.currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
            d.addEventListener('click', () => this.goTo(i));
            this.dotsEl.appendChild(d);
        }
    }

    goTo(page) {
        const pages = this.totalPages();
        this.currentPage = Math.max(0, Math.min(page, pages - 1));
        const targetCard = this.cards[this.currentPage];
        if (targetCard) {
            this.track.scrollTo({ left: targetCard.offsetLeft, behavior: 'smooth' });
        }
        this._updateDots();
    }

    reset() {
        this.buildDots();
        this.goTo(0);
    }


    _updateDots() {
        if (!this.dotsEl) return;
        Array.from(this.dotsEl.children).forEach((d, i) => {
            d.className = `w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === this.currentPage ? 'bg-gray-800' : 'bg-gray-300'}`;
        });
    }

    _bindEvents() {
        // Prev / Next buttons
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.goTo(this.currentPage - 1));
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goTo(this.currentPage + 1));

        this.track.addEventListener('scroll', () => {
            const scrollLeft = this.track.scrollLeft;
            let closest = 0;
            let minDist = Infinity;
            this.cards.forEach((c, i) => {
                const dist = Math.abs(c.offsetLeft - scrollLeft);
                if (dist < minDist) {
                    minDist = dist;
                    closest = i;
                }
            });
            if (closest !== this.currentPage) {
                this.currentPage = closest;
                this._updateDots();
            }
        }, { passive: true });
    }
}

const carousels = [];
document.querySelectorAll('[data-carousel]').forEach(container => {
    const name = container.dataset.carousel;
    carousels.push(new Carousel(name));
});

// On resize, reset every carousel
window.addEventListener('resize', () => {
    carousels.forEach(c => c.reset());
});