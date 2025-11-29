<!-- SECTION: Impact Dashboard -->
<section id="impact" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10">
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900">Impact Analytics</h2>
            <p class="text-slate-600 mt-2 text-sm sm:text-base">Quantifiable achievements from my professional career.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Text Stats Grid (Populated via JS) -->
            <div id="impact-stats-grid" class="grid grid-cols-2 gap-4 sm:gap-6">
                <!-- JS injects stats here -->
            </div>

            <!-- Visualization -->
            <div class="chart-container hidden sm:block">
                <canvas id="impactChart"></canvas>
            </div>
        </div>
    </div>
</section>