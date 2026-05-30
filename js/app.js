// ============================================================
// APP.JS — MAIN APPLICATION ENGINE
// Robotics Academy — Complete Learning Platform
// ============================================================

class RoboticsAcademy {
    constructor() {
        this.phases = {
            3: phase3Content,
            4: phase4Content,
            5: phase5Content,
            6: phase6Content
        };
        this.currentPhase = 3;
        this.currentSection = null;
        this.currentTopic = null;
        this.completedTopics = new Set(JSON.parse(localStorage.getItem('completedTopics') || '[]'));
        this.searchIndex = [];
        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.bindEvents();
        this.loadPhase(3, true);
        this.updateProgress();
    }

    // ── Build Search Index ──────────────────────────────────
    buildSearchIndex() {
        Object.values(this.phases).forEach(phase => {
            phase.sections.forEach(section => {
                section.topics.forEach(topic => {
                    this.searchIndex.push({
                        phase: phase.phaseNumber,
                        sectionId: section.id,
                        topicId: topic.id,
                        title: topic.title,
                        text: topic.content.replace(/<[^>]+>/g, ' ').toLowerCase()
                    });
                });
            });
        });
    }

    // ── Event Bindings ──────────────────────────────────────
    bindEvents() {
        // Phase tabs
        document.querySelectorAll('.phase-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const phase = parseInt(tab.dataset.phase);
                this.loadPhase(phase);
                // Close sidebar on mobile
                document.getElementById('sidebar')?.classList.remove('open');
            });
        });

        // Mobile sidebar toggle button
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }

        // Search
        const searchInput = document.getElementById('sidebarSearch');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => this.handleSearch(e.target.value), 200);
        });

        // Back to top
        const backToTop = document.getElementById('backToTop');
        const contentArea = document.getElementById('contentArea');
        contentArea.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', contentArea.scrollTop > 400);
        });
        backToTop.addEventListener('click', () => {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Code copy buttons (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('code-copy')) {
                const pre = e.target.closest('.code-block').querySelector('pre');
                navigator.clipboard.writeText(pre.textContent).then(() => {
                    e.target.textContent = 'Copied!';
                    setTimeout(() => e.target.textContent = 'Copy', 1500);
                });
            }
        });

        // Content tab switching (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('content-tab')) {
                const tabGroup = e.target.closest('.tab-group');
                tabGroup.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
                tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const targetId = e.target.dataset.target;
                tabGroup.querySelector(`#${targetId}`)?.classList.add('active');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'ArrowRight') this.loadPhase(Math.min(6, this.currentPhase + 1));
            if (e.altKey && e.key === 'ArrowLeft')  this.loadPhase(Math.max(3, this.currentPhase - 1));
        });
    }

    // ── Load a Phase ────────────────────────────────────────
    loadPhase(phaseNum, initial = false) {
        if (!this.phases[phaseNum]) return;
        this.currentPhase = phaseNum;
        const phase = this.phases[phaseNum];

        // Update phase tabs
        document.querySelectorAll('.phase-tab').forEach(tab => {
            tab.classList.toggle('active', parseInt(tab.dataset.phase) === phaseNum);
        });

        // Update sidebar title
        document.getElementById('sidebarTitle').textContent = `Phase ${phaseNum}: ${phase.title}`;

        // Render sidebar nav
        this.renderSidebar(phase);

        // Render content
        this.renderPhaseContent(phase);

        // Auto-select first topic
        if (phase.sections[0]?.topics[0]) {
            setTimeout(() => {
                const firstTopicId = phase.sections[0].topics[0].id;
                this.scrollToTopic(firstTopicId);
                this.setActiveNavItem(firstTopicId);
            }, 100);
        }

        this.updateProgress();
    }

    // ── Render Sidebar ──────────────────────────────────────
    renderSidebar(phase) {
        const nav = document.getElementById('sidebarNav');
        nav.innerHTML = '';

        phase.sections.forEach((section, sIdx) => {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'nav-section expanded';
            sectionEl.dataset.sectionId = section.id;

            const header = document.createElement('div');
            header.className = 'nav-section-header';
            header.innerHTML = `
                <span class="chevron">›</span>
                <span>${section.title}</span>
            `;
            header.addEventListener('click', () => {
                sectionEl.classList.toggle('expanded');
            });

            const items = document.createElement('div');
            items.className = 'nav-section-items';

            section.topics.forEach(topic => {
                const item = document.createElement('div');
                item.className = 'nav-item';
                item.dataset.topicId = topic.id;
                const isComplete = this.completedTopics.has(`${phase.phaseNumber}-${topic.id}`);
                if (isComplete) item.classList.add('completed');

                item.innerHTML = `
                    <span class="dot"></span>
                    <span>${topic.title}</span>
                `;
                item.addEventListener('click', () => {
                    this.scrollToTopic(topic.id);
                    this.setActiveNavItem(topic.id);
                    this.markTopicComplete(phase.phaseNumber, topic.id);
                    // Close sidebar on mobile
                    document.getElementById('sidebar')?.classList.remove('open');
                });
                items.appendChild(item);
            });

            sectionEl.appendChild(header);
            sectionEl.appendChild(items);
            nav.appendChild(sectionEl);
        });
    }

    // ── Render Full Phase Content ────────────────────────────
    renderPhaseContent(phase) {
        const contentArea = document.getElementById('contentArea');
        contentArea.scrollTo({ top: 0 });

        const wrapper = document.createElement('div');
        wrapper.className = 'content-wrapper';
        wrapper.innerHTML = this.buildPhaseHero(phase);

        phase.sections.forEach(section => {
            const sectionEl = document.createElement('div');
            sectionEl.className = `section-block`;
            sectionEl.id = `section-${section.id}`;

            const phaseClass = `phase-${phase.phaseNumber}`;
            sectionEl.innerHTML = `
                <h2>
                    <span class="section-number">${section.title.split(' ')[0]}</span>
                    ${section.title.split(' ').slice(1).join(' ')}
                </h2>
                <div class="section-divider ${phaseClass}"></div>
            `;

            section.topics.forEach(topic => {
                const topicEl = document.createElement('div');
                topicEl.className = 'topic-block';
                topicEl.id = `topic-${topic.id}`;
                topicEl.innerHTML = topic.content;
                sectionEl.appendChild(topicEl);
            });

            wrapper.appendChild(sectionEl);
        });

        // Intersection Observer to update nav on scroll
        contentArea.innerHTML = '';
        contentArea.appendChild(wrapper);

        this.setupScrollSpy(phase);
        this.addSyntaxHighlighting();
    }

    // ── Phase Hero Banner ───────────────────────────────────
    buildPhaseHero(phase) {
        const icons = { 3: '⚡', 4: '🔧', 5: '📡', 6: '⚙️' };
        const descriptions = {
            3: 'The foundation of all robotics. Master voltage, current, power electronics, and batteries before touching any mechanical system.',
            4: 'Give your robot a brain. From bare-metal registers to FreeRTOS tasks, UART to CAN — the complete embedded software stack.',
            5: 'Robots need to perceive the world. IMUs, LiDARs, cameras, encoders, GPS — every sensing modality explained from physics to code.',
            6: 'Make things move. Motor physics, FOC, harmonic drives, ball screws — the mechanical power that turns computation into motion.'
        };
        return `
            <div class="phase-hero phase-${phase.phaseNumber}">
                <div class="phase-hero-content">
                    <div class="phase-badge">
                        ${icons[phase.phaseNumber]} Phase ${phase.phaseNumber}
                    </div>
                    <h1>${phase.title}</h1>
                    <p>${descriptions[phase.phaseNumber]}</p>
                    <div style="margin-top:20px; display:flex; gap:12px; flex-wrap:wrap;">
                        ${phase.sections.map(s => `
                            <span class="chip" style="cursor:pointer" onclick="app.scrollToSection('${s.id}')">
                                ${s.title}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // ── Scroll Spy ──────────────────────────────────────────
    setupScrollSpy(phase) {
        const contentArea = document.getElementById('contentArea');
        const allTopics = phase.sections.flatMap(s => s.topics);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const topicId = entry.target.id.replace('topic-', '');
                    this.setActiveNavItem(topicId);
                }
            });
        }, {
            root: contentArea,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        });

        allTopics.forEach(topic => {
            const el = document.getElementById(`topic-${topic.id}`);
            if (el) observer.observe(el);
        });
    }

    // ── Navigation Helpers ──────────────────────────────────
    scrollToTopic(topicId) {
        const el = document.getElementById(`topic-${topicId}`);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    scrollToSection(sectionId) {
        const el = document.getElementById(`section-${sectionId}`);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setActiveNavItem(topicId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeItem = document.querySelector(`.nav-item[data-topic-id="${topicId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    // ── Progress Tracking ───────────────────────────────────
    markTopicComplete(phaseNum, topicId) {
        const key = `${phaseNum}-${topicId}`;
        this.completedTopics.add(key);
        localStorage.setItem('completedTopics', JSON.stringify([...this.completedTopics]));

        // Update nav item
        const item = document.querySelector(`.nav-item[data-topic-id="${topicId}"]`);
        if (item) item.classList.add('completed');

        this.updateProgress();
    }

    updateProgress() {
        let totalTopics = 0;
        let completedCount = 0;

        Object.values(this.phases).forEach(phase => {
            phase.sections.forEach(section => {
                section.topics.forEach(topic => {
                    totalTopics++;
                    if (this.completedTopics.has(`${phase.phaseNumber}-${topic.id}`)) {
                        completedCount++;
                    }
                });
            });
        });

        const pct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
        const dasharray = pct;
        document.getElementById('progressPath').setAttribute('stroke-dasharray', `${dasharray}, 100`);
        document.getElementById('progressText').textContent = `${pct}%`;
    }

    // ── Search ──────────────────────────────────────────────
    handleSearch(query) {
        query = query.trim().toLowerCase();
        const nav = document.getElementById('sidebarNav');

        if (!query) {
            this.renderSidebar(this.phases[this.currentPhase]);
            return;
        }

        const results = this.searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.text.includes(query)
        ).slice(0, 15);

        nav.innerHTML = '';

        if (results.length === 0) {
            nav.innerHTML = `<div style="padding:20px;color:var(--text-tertiary);font-size:13px;text-align:center">No results found</div>`;
            return;
        }

        const header = document.createElement('div');
        header.style.cssText = 'padding:8px 12px;font-size:11px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.06em;';
        header.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
        nav.appendChild(header);

        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.innerHTML = `
                <span class="dot"></span>
                <div>
                    <div style="font-size:13px;color:var(--text-primary)">${this.highlight(result.title, query)}</div>
                    <div style="font-size:11px;color:var(--text-tertiary)">Phase ${result.phase}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                document.getElementById('sidebarSearch').value = '';
                if (result.phase !== this.currentPhase) {
                    this.loadPhase(result.phase);
                    setTimeout(() => {
                        this.scrollToTopic(result.topicId);
                        this.setActiveNavItem(result.topicId);
                    }, 300);
                } else {
                    this.scrollToTopic(result.topicId);
                    this.setActiveNavItem(result.topicId);
                }
                this.renderSidebar(this.phases[this.currentPhase]);
            });
            nav.appendChild(item);
        });
    }

    highlight(text, query) {
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark style="background:rgba(108,99,255,0.3);color:var(--accent-primary);border-radius:2px;padding:0 2px">$1</mark>');
    }

    // ── Syntax Highlighting (Lightweight) ───────────────────
    addSyntaxHighlighting() {
        document.querySelectorAll('.code-block pre code').forEach(block => {
            let html = block.innerHTML;

            // Comments
            html = html.replace(/(\/\/[^\n]*)/g, '<span style="color:#8b949e">$1</span>');
            html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#8b949e">$1</span>');
            html = html.replace(/(#[^\n<]*)/g, '<span style="color:#8b949e">$1</span>');

            // Strings
            html = html.replace(/(&quot;[^&]*&quot;|'[^']*'|`[^`]*`)/g, '<span style="color:#a5d6ff">$1</span>');

            // Keywords
            const keywords = ['void', 'int', 'float', 'double', 'bool', 'char', 'long', 'uint8_t',
                'uint16_t', 'uint32_t', 'int16_t', 'int32_t', 'const', 'static', 'volatile',
                'struct', 'typedef', 'return', 'if', 'else', 'while', 'for', 'break', 'continue',
                'true', 'false', 'NULL', 'nullptr', 'new', 'delete', 'class', 'public', 'private',
                'void', 'setup', 'loop', 'include', 'define', 'import', 'from', 'def', 'pass',
                'try', 'except', 'finally', 'with', 'as', 'in', 'not', 'and', 'or'];
            keywords.forEach(kw => {
                html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span style="color:#ff7b72">$1</span>');
            });

            // Numbers
            html = html.replace(/\b(\d+\.?\d*[fFuUlL]*)\b/g, '<span style="color:#79c0ff">$1</span>');

            // Preprocessor / decorators
            html = html.replace(/(\$[A-Z_]+)/g, '<span style="color:#d2a8ff">$1</span>');

            block.innerHTML = html;
        });
    }
}

// ── Splash / Loading Screen ─────────────────────────────────
function showSplash() {
    const loader = document.getElementById('contentLoader');
    if (loader) loader.style.display = 'flex';
}

function hideSplash() {
    const loader = document.getElementById('contentLoader');
    if (loader) loader.style.display = 'none';
}

// ── Initialize App ──────────────────────────────────────────
let app;
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to let fonts load
    setTimeout(() => {
        app = new RoboticsAcademy();

        // Keyboard shortcut hints
        console.log('%c🤖 Robotics Academy', 'color:#6C63FF;font-size:20px;font-weight:bold');
        console.log('%cShortcuts: Alt+→ Next Phase | Alt+← Prev Phase', 'color:#9ca3af');
        console.log('%cType in the search box to find any topic instantly.', 'color:#9ca3af');
    }, 150);
});
