<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dhrupal Shah | Senior Software Engineer</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">

    <!-- Navigation (Mobile Optimized) -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <span class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Dhrupal<span class="text-blue-600">.Dev</span></span>
                </div>
                <!-- Desktop Nav -->
                <div class="hidden md:flex space-x-8 items-center">
                    <button onclick="scrollToSection('impact')" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">Impact</button>
                    <button onclick="scrollToSection('experience')" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">Experience</button>
                    <button onclick="scrollToSection('skills')" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">Skills</button>
                    <button onclick="scrollToSection('projects')" class="text-slate-600 hover:text-blue-600 font-medium transition-colors">Projects</button>
                    <a href="mailto:dhrupal.shah@outlook.in" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20">Contact</a>
                </div>
                <!-- Mobile Nav Button (Simple Scroll) -->
                <div class="md:hidden flex space-x-4 text-sm font-medium">
                    <button onclick="scrollToSection('experience')" class="text-blue-600">Exp</button>
                    <button onclick="scrollToSection('projects')" class="text-blue-600">Proj</button>
                </div>
            </div>
        </div>
    </nav>