<!-- SECTION: Experience Timeline -->
<section id="experience" class="py-12 bg-slate-50 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Professional Journey</h2>
            <p class="text-slate-600 mt-2 text-sm sm:text-base">Tap on any role to see the <span class="font-semibold text-blue-600">"Deep Dive Stories"</span>.</p>
        </div>

        <!-- Desktop: Side-by-Side (Hidden on Mobile) -->
        <div class="hidden lg:grid lg:grid-cols-3 gap-8">
            <!-- List (Populated via JS) -->
            <div class="lg:col-span-1 space-y-4 relative" id="role-list-desktop">
                <div class="timeline-line"></div>
            </div>

            <!-- Detail Panel (Populated via JS) -->
            <div class="lg:col-span-2">
                <div id="role-detail-panel-desktop" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 sticky top-24 transition-all duration-300 min-h-[300px]">
                    <div class="flex items-center justify-center h-full text-slate-400">
                        Select a role to view details
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile: Accordion List (Visible only on Mobile) -->
        <div class="lg:hidden space-y-4" id="role-list-mobile">
            <!-- Populated via JS -->
        </div>
    </div>
</section>