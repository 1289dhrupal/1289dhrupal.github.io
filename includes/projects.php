<!-- SECTION: Project Portfolio -->
<section id="projects" class="py-12 bg-slate-50 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Project Portfolio</h2>
                <p class="text-slate-600 mt-1 text-sm">Select a category to filter.</p>
            </div>
            <div class="flex space-x-2 mt-4 md:mt-0 overflow-x-auto pb-2 scrollbar-hide">
                <button onclick="filterProjects('all')" class="project-filter active-filter px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 border border-slate-200 whitespace-nowrap">All</button>
                <button onclick="filterProjects('professional')" class="project-filter px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 border border-slate-200 whitespace-nowrap">Professional</button>
                <button onclick="filterProjects('academic')" class="project-filter px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 border border-slate-200 whitespace-nowrap">Academic</button>
                <button onclick="filterProjects('freelance')" class="project-filter px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 border border-slate-200 whitespace-nowrap">Freelance</button>
            </div>
        </div>

        <div id="projects-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Project Cards Injected via JS -->
        </div>
    </div>
</section>

<div id="archModal" class="fixed inset-0 z-[100] hidden" role="dialog" aria-modal="true">

    <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm modal-backdrop" onclick="closeArchModal()"></div>

    <div class="relative z-10 flex items-center justify-center h-screen p-4 sm:p-6 pointer-events-none">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-modal-in pointer-events-auto">

            <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h3 class="text-lg font-bold text-slate-900 font-sans">System Architecture</h3>
                    <p class="text-sm text-slate-500 font-sans">Interactive Data Flow Diagram</p>
                </div>
                <button onclick="closeArchModal()" class="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="flex-1 bg-slate-50 relative modal-content-scroll overflow-hidden">
                <iframe src="diagram.html" class="w-full h-full border-0" title="Architecture Diagram"></iframe>
            </div>
        </div>
    </div>
</div>