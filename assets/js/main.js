document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Impact Stats & Chart
    renderImpactSection();

    // 2. Render Skills Section (Text & Chart)
    renderSkillsSection();

    // 3. Render Content
    renderTimelineDesktop();
    renderTimelineMobile();
    renderProjects('all');
    renderEducationAndCerts();

    // Select first role by default for Desktop
    selectRoleDesktop(0);
});

// --- Impact Render Logic ---
function renderImpactSection() {
    const gridContainer = document.getElementById('impact-stats-grid');
    if (gridContainer) {
        gridContainer.innerHTML = impactData.map(item => `
            <div class="p-4 sm:p-6 bg-${item.color}-50 rounded-xl border border-${item.color}-100">
                <div class="text-3xl sm:text-4xl font-extrabold text-${item.color}-600 mb-2">${item.value}${item.suffix}</div>
                <div class="text-xs sm:text-sm font-semibold text-${item.color}-900">${item.label}</div>
            </div>
        `).join('');
    }

    const ctxImpact = document.getElementById('impactChart').getContext('2d');
    new Chart(ctxImpact, {
        type: 'bar',
        data: {
            labels: impactData.map(d => d.label),
            datasets: [{
                label: 'Improvement %',
                data: impactData.map(d => d.value),
                backgroundColor: [
                    'rgba(37, 99, 235, 0.7)',  // Blue
                    'rgba(16, 185, 129, 0.7)', // Emerald
                    'rgba(147, 51, 234, 0.7)', // Purple
                    'rgba(245, 158, 11, 0.7)'   // Amber
                ],
                borderWidth: 0,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { display: true, color: '#f1f5f9' } },
                x: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// --- Skills Render Logic ---
function renderSkillsSection() {
    // 1. Render Text List
    const textContainer = document.getElementById('skills-text-container');
    if (textContainer) {
        textContainer.innerHTML = skillsTextData.map(skill => `
            <div>
                <h3 class="font-bold text-lg text-slate-800 mb-2 flex items-center">
                    <span class="mr-2">${skill.icon}</span> ${skill.title} (${skill.level})
                </h3>
                <p class="text-slate-600 text-sm">${skill.desc}</p>
            </div>
        `).join('');
    }

    // 2. Initialize Radar Chart (Using Data from data.js)
    const ctxSkills = document.getElementById('skillsRadar').getContext('2d');
    new Chart(ctxSkills, {
        type: 'radar',
        data: skillsChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#e2e8f0' },
                    grid: { color: '#e2e8f0' },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: { display: false }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// --- Desktop Timeline Logic ---
function renderTimelineDesktop() {
    const container = document.getElementById('role-list-desktop');
    if (!container) return;

    experienceData.forEach((role, index) => {
        const item = document.createElement('div');
        item.className = `relative pl-12 py-4 cursor-pointer group`;
        item.onclick = () => selectRoleDesktop(index);
        item.innerHTML = `
            <div class="absolute left-[15px] top-5 w-5 h-5 bg-white border-4 border-slate-300 rounded-full group-hover:border-blue-500 transition-colors z-10 role-dot" id="dot-${index}"></div>
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 group-hover:border-blue-400 group-hover:shadow-md transition-all">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">${role.period}</span>
                    <span class="text-xl">${role.icon}</span>
                </div>
                <h3 class="font-bold text-slate-800">${role.role}</h3>
                <p class="text-sm text-slate-500">${role.company}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

function selectRoleDesktop(index) {
    document.querySelectorAll('.role-dot').forEach((d, i) => {
        d.classList.remove('border-blue-600');
        d.classList.add('border-slate-300');
        if (i === index) {
            d.classList.remove('border-slate-300');
            d.classList.add('border-blue-600');
        }
    });

    const role = experienceData[index];
    const panel = document.getElementById('role-detail-panel-desktop');
    if (!panel) return;

    let storiesHtml = role.stories.map(s => `
        <div class="mb-4 pb-4 border-b border-slate-100 last:border-0">
            <h4 class="font-bold text-slate-800 text-sm mb-1">🔹 ${s.title}</h4>
            <p class="text-slate-600 text-sm leading-relaxed">${s.desc}</p>
        </div>
    `).join('');

    let stackHtml = role.stack.map(tech =>
        `<span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium mr-2 mb-2 inline-block border border-slate-200">${tech}</span>`
    ).join('');

    panel.innerHTML = `
        <div class="animate-fadeIn">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h3 class="text-2xl font-bold text-slate-900">${role.role}</h3>
                    <p class="text-lg text-blue-600 font-medium">${role.company}</p>
                </div>
                <div class="text-right">
                    <span class="px-3 py-1 ${role.typeColor} text-xs font-bold uppercase rounded-full tracking-wider border border-blue-100 inline-block mb-1">${role.type}</span>
                    <span class="text-xs text-slate-400 font-medium block">${role.focus}</span>
                </div>
            </div>
            
            <div class="mb-6">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Deep Dive Stories</h4>
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    ${storiesHtml}
                </div>
            </div>

            <div>
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</h4>
                <div class="flex flex-wrap">
                    ${stackHtml}
                </div>
            </div>
        </div>
    `;
}

// --- Mobile Timeline Logic ---
function renderTimelineMobile() {
    const container = document.getElementById('role-list-mobile');
    if (!container) return;

    experienceData.forEach((role, index) => {
        let storiesHtml = role.stories.map(s => `
            <div class="mb-3 pb-3 border-b border-slate-100 last:border-0">
                <h4 class="font-bold text-slate-800 text-xs mb-1">🔹 ${s.title}</h4>
                <p class="text-slate-600 text-xs leading-relaxed">${s.desc}</p>
            </div>
        `).join('');

        let stackHtml = role.stack.map(tech =>
            `<span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-medium mr-1 mb-1 inline-block border border-slate-200">${tech}</span>`
        ).join('');

        const item = document.createElement('div');
        item.className = "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden";
        item.innerHTML = `
            <div class="p-4 cursor-pointer flex justify-between items-center" onclick="toggleMobileAccordion(${index})">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold text-blue-600 uppercase tracking-wide">${role.period}</span>
                        <span class="text-lg">${role.icon}</span>
                    </div>
                    <h3 class="font-bold text-slate-900 text-sm">${role.role}</h3>
                    <p class="text-xs text-slate-500">${role.company}</p>
                </div>
                <div class="text-slate-400 transition-transform duration-300" id="chevron-${index}">▼</div>
            </div>
            <div id="mobile-detail-${index}" class="hidden bg-slate-50 border-t border-slate-100 p-4 transition-all duration-300">
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <span class="px-2 py-1 ${role.typeColor} text-[10px] font-bold uppercase rounded-full border border-blue-100">${role.type}</span>
                        <span class="text-[10px] text-slate-400 font-medium">${role.focus}</span>
                    </div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Stories</h4>
                    ${storiesHtml}
                </div>
                <div>
                    <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack</h4>
                    <div class="flex flex-wrap">
                        ${stackHtml}
                    </div>
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

function toggleMobileAccordion(index) {
    const detail = document.getElementById(`mobile-detail-${index}`);
    const chevron = document.getElementById(`chevron-${index}`);
    if (detail.classList.contains('hidden')) {
        detail.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    } else {
        detail.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// --- UPDATED PROJECT RENDER LOGIC ---
function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' ? projectData : projectData.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover flex flex-col h-full";

        const stackTags = p.stack.map(s => `<span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded mr-1">${s}</span>`).join('');

        // 1. Logic for Modal Button vs Normal Link
        let linkHtml = '';
        if (p.action === 'openArchitecture') {
            linkHtml = `
                <button onclick="openArchModal(event)" class="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center mt-auto transition-colors cursor-pointer">
                    ${p.linkText || 'View Architecture'} <span class="ml-1">→</span>
                </button>
            `;
        } else if (p.link) {
            linkHtml = `<a href="${p.link}" target="_blank" class="text-sm font-semibold text-blue-600 hover:underline flex items-center mt-auto">View Project <span class="ml-1">→</span></a>`;
        } else {
            linkHtml = `<span class="text-sm text-slate-400 italic mt-auto">Internal Project</span>`;
        }

        card.innerHTML = `
            <div class="mb-4">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">${p.category}</span>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">${p.title}</h3>
                <p class="text-sm text-slate-600 mb-4 line-clamp-3">${p.desc}</p>
                <div class="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4">
                    <p class="text-xs text-amber-900"><strong>💡 The Secret Sauce:</strong> ${p.secret}</p>
                </div>
            </div>
            <div class="mt-auto">
                <div class="mb-4 flex flex-wrap gap-1">${stackTags}</div>
                ${linkHtml}
            </div>
        `;
        grid.appendChild(card);
    });

    // Update Filter Buttons
    document.querySelectorAll('.project-filter').forEach(btn => {
        if (btn.textContent.toLowerCase().includes(filter) || (filter === 'all' && btn.textContent === 'All')) {
            btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
            btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
        } else {
            btn.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
            btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
        }
    });
}

function filterProjects(category) { renderProjects(category); }

// --- EDUCATION & CERTS RENDER LOGIC ---
function renderEducationAndCerts() {
    const eduContainer = document.getElementById('education-list');
    const certContainer = document.getElementById('certification-list');

    if (eduContainer) {
        eduContainer.innerHTML = educationData.map(edu => `
            <div class="${edu.colorClass} hover:shadow-md transition-shadow duration-300">
                <h3 class="font-bold text-lg text-slate-900">${edu.degree}</h3>
                <div class="text-blue-600 font-medium text-sm">${edu.institution}</div>
                <p class="text-slate-500 text-sm mt-1">${edu.period}</p>
                <p class="text-slate-600 text-sm mt-2">${edu.details}</p>
            </div>
        `).join('');
    }

    if (certContainer) {
        certContainer.innerHTML = certificationData.map(cert => {
            const linkHtml = cert.link
                ? `<a href="${cert.link}" target="_blank" class="font-medium text-slate-800 hover:text-blue-600 underline decoration-dotted">${cert.title}</a>`
                : `<span class="font-medium text-slate-800">${cert.title}</span>`;

            const platformHtml = cert.platform
                ? `<span class="text-xs text-slate-500 block">${cert.platform}</span>`
                : '';

            return `
                <li class="flex items-start">
                    <span class="text-green-500 mr-2 font-bold">✓</span>
                    <div>
                        ${linkHtml}
                        ${platformHtml}
                    </div>
                </li>
            `;
        }).join('');
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// --- NEW MODAL CONTROLS ---
function openArchModal(e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('archModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeArchModal() {
    const modal = document.getElementById('archModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
        closeArchModal();
    }
});