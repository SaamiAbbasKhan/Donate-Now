// js/main.js

// --- Helper Function for Title Formatting ---
/**
 * Capitalizes the first letter of a string, leaving the rest as is.
 * @param {string} str - The input string.
 * @returns {string} The formatted string.
 */
function toSentenceCase(str) {
    if (!str || typeof str !== 'string') {
        return ''; // Return empty if input is invalid
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// --- Wait for DOM to be ready ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Global DOM Element References ---
    const organizationsListContainer = document.getElementById('organizations-list');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const regionFiltersContainer = document.getElementById('region-filters');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noResultsContainer = document.getElementById('no-results');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    // --- State Variables ---
    let currentSearchQuery = '';
    let currentSort = 'name-asc';
    let activeCategoryFilters = [];
    let activeRegionFilters = [];

    // --- Initialization ---

    // Check if we are on the browse page before initializing browse-specific elements/logic
    if (document.getElementById('organizations-list-area')) {
        populateFilters();
        filterAndDisplayOrganizations(); // Initial Display
        addBrowseEventListeners();
    }

    // Handle Navigation Link Highlighting on ALL pages
    highlightActiveNavLink();
    // Update Footer Year Dynamically
    updateFooterYear();

    // --- Event Listener Setup Functions ---

    function addBrowseEventListeners() {
        if (!searchInput || !sortSelect || !clearFiltersBtn || !categoryFiltersContainer || !regionFiltersContainer || !organizationsListContainer) {
             console.warn("Browse page elements not found. Skipping browse event listeners.");
             return;
        }
        searchInput.addEventListener('input', handleSearchInput);
        sortSelect.addEventListener('change', handleSortChange);
        clearFiltersBtn.addEventListener('click', resetFiltersAndSearch);
        categoryFiltersContainer.addEventListener('click', handleFilterClick);
        regionFiltersContainer.addEventListener('click', handleFilterClick);
        organizationsListContainer.addEventListener('click', handleCardClick);
    }

    // --- Event Handlers ---

    function handleSearchInput() {
        currentSearchQuery = searchInput.value;
        filterAndDisplayOrganizations();
    }

    function handleSortChange() {
        currentSort = sortSelect.value;
        filterAndDisplayOrganizations();
    }

     function handleFilterClick(event) {
        if (event.target.classList.contains('filter-btn')) {
            const button = event.target;
            const type = button.dataset.filterType;
            const value = button.dataset.filterValue;
            const isActive = button.classList.toggle('active', !button.classList.contains('active'));
            if (isActive) {
                button.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                button.classList.add('bg-blue-500', 'text-white', 'border-blue-500', 'hover:bg-blue-600');
             } else {
                 button.classList.remove('bg-blue-500', 'text-white', 'border-blue-500', 'hover:bg-blue-600');
                 button.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
             }
            const filterList = (type === 'category') ? activeCategoryFilters : activeRegionFilters;
             if (isActive) {
                 if (!filterList.includes(value)) filterList.push(value);
             } else {
                 const index = filterList.indexOf(value);
                 if (index > -1) filterList.splice(index, 1);
            }
            filterAndDisplayOrganizations();
        }
    }

     function handleCardClick(event) {
        const button = event.target.closest('button[data-action="toggle-favorite"]');
        if (button) {
            const orgId = button.dataset.orgId;
            if (orgId) {
                 toggleFavorite(orgId); // Function from data/organizations.js
                 filterAndDisplayOrganizations(); // Re-render
            }
        }
    }

    // --- Core Logic Functions ---

    function resetFiltersAndSearch() {
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'name-asc';
        currentSearchQuery = '';
        currentSort = 'name-asc';
        activeCategoryFilters = [];
        activeRegionFilters = [];
        document.querySelectorAll('.filter-btn.active').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-500', 'text-white', 'border-blue-500', 'hover:bg-blue-600');
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
        });
        filterAndDisplayOrganizations();
    }

    function populateFilters() {
        if (!categoryFiltersContainer || !regionFiltersContainer) return;
        const allCategories = new Set();
        const allRegions = new Set();
        try {
            organizations.forEach(org => {
                if (org.category && Array.isArray(org.category)) { org.category.forEach(cat => allCategories.add(cat)); }
                if (org.region) allRegions.add(org.region);
             });
         } catch (e) { console.error("Error accessing organizations data:", e); /* handle error display */ return; }
        categoryFiltersContainer.innerHTML = [...allCategories].sort().map(cat => createFilterButtonHTML(cat, 'category')).join('');
        regionFiltersContainer.innerHTML = [...allRegions].sort().map(reg => createFilterButtonHTML(reg, 'region')).join('');
    }

    function createFilterButtonHTML(value, type) {
        return `<button class="filter-btn bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 px-3 py-1 rounded-full text-sm mr-2 mb-2" data-filter-type="${type}" data-filter-value="${value}">${value}</button>`;
    }

    function filterAndDisplayOrganizations() {
        if (!organizationsListContainer) return;
        showLoading();
        setTimeout(() => {
            let filteredOrgs = organizations;
             const lowerCaseQuery = currentSearchQuery.toLowerCase().trim();
            if (lowerCaseQuery) {
                 filteredOrgs = organizations.filter(org => {
                     const nameMatch = org.name.toLowerCase().includes(lowerCaseQuery);
                     const focusMatch = org.focus.toLowerCase().includes(lowerCaseQuery);
                     const regionMatch = org.region && org.region.toLowerCase().includes(lowerCaseQuery);
                     const categoryMatch = org.category && Array.isArray(org.category) && org.category.some(cat => cat.toLowerCase().includes(lowerCaseQuery));
                     return nameMatch || focusMatch || regionMatch || categoryMatch; });
            }
            if (activeCategoryFilters.length > 0) {
                 filteredOrgs = filteredOrgs.filter(org => org.category && Array.isArray(org.category) && activeCategoryFilters.every(filterCat => org.category.includes(filterCat)));
            }
            if (activeRegionFilters.length > 0) {
                filteredOrgs = filteredOrgs.filter(org => org.region && activeRegionFilters.includes(org.region));
            }
            filteredOrgs.sort((a, b) => {
                const isAFav = a.isFavorite ?? false; const isBFav = b.isFavorite ?? false;
                if (currentSort === 'favorites') { if (isAFav && !isBFav) return -1; if (!isAFav && isBFav) return 1; }
                switch (currentSort) {
                    case 'name-asc': case 'favorites': return a.name.localeCompare(b.name);
                    case 'name-desc': return b.name.localeCompare(a.name);
                    case 'verified-desc': try { const dateA = new Date(a.lastVerified); const dateB = new Date(b.lastVerified); if (isNaN(dateA) && isNaN(dateB)) return 0; if (isNaN(dateA)) return 1; if (isNaN(dateB)) return -1; return dateB - dateA; } catch { return 0; } default: return 0;
                } });
            displayOrganizations(filteredOrgs);
         }, 50);
    }

    // --- Display & UI Functions ---

    function displayOrganizations(orgsToDisplay) {
        if (!organizationsListContainer) return;
        hideLoadingAndNoResults();
        if (!orgsToDisplay || orgsToDisplay.length === 0) {
             showNoResults(); organizationsListContainer.innerHTML = '';
        } else {
             organizationsListContainer.innerHTML = orgsToDisplay.map(createOrganizationCardHTML).join('');
             hideLoadingAndNoResults(); // Ensure list is visible
         }
    }

    // ***** THIS IS THE UPDATED FUNCTION *****
    function createOrganizationCardHTML(org) {
        const websiteLink = (org.website && (org.website.startsWith('http://') || org.website.startsWith('https://'))) ? org.website : '#';
        const linkTarget = (websiteLink !== '#') ? '_blank' : '_self';
        const linkRel = (websiteLink !== '#') ? 'noopener noreferrer' : '';

        const categoryTagsHTML = (org.category && Array.isArray(org.category))
            ? `<div class="tag-scroll-container overflow-x-auto whitespace-nowrap pb-1 mb-4">` + // Wrapper for scrolling
                 org.category.map(cat => `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">${cat}</span>`).join('') +
              `</div>`
            : '<div class="mb-4 h-[26px]"></div>'; // Placeholder if no tags

        const isFavorite = org.isFavorite ?? false;
        const favoriteButtonClasses = `favorite-btn absolute top-3 right-3 p-1 rounded-full transition-colors duration-200 ${
            isFavorite ? 'text-red-500 bg-red-100 hover:bg-red-200' : 'text-gray-400 bg-gray-100 hover:text-red-500 hover:bg-red-100'}`;
        const favoriteTooltip = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        const heartIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>`;

        const verifiedBadgeHTML = org.verified ? `
           <span class="tooltip inline-block align-middle ml-2">
                <span class="text-green-500">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.292a.75.75 0 00-1.06-1.06L8.5 11.63l-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" clip-rule="evenodd" /></svg>
                </span>
                <span class="tooltiptext invisible absolute z-10 w-max max-w-xs px-3 py-1 text-sm font-medium text-white transition-opacity duration-300 bg-gray-800 rounded-lg shadow-sm opacity-0 -mt-8 ml-2">Verified: ${org.lastVerified || 'N/A'}</span>
            </span>` : '';

        // Apply sentence case to name, ensure focus and tags don't have comments
        return `
           <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative">
               <div class="p-5 flex-grow">
                   <h3 class="text-lg font-semibold text-gray-900 mb-1 pr-10">
                        ${toSentenceCase(org.name)} ${verifiedBadgeHTML}
                    </h3>
                    <p class="text-xs text-gray-500 mb-3">
                        Region: ${org.region || 'N/A'}
                   </p>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                        ${org.focus}
                   </p>
                    ${categoryTagsHTML}
                </div>
               <div class="p-5 pt-3 bg-gray-50 border-t border-gray-100 mt-auto">
                    <a href="${websiteLink}" target="${linkTarget}" rel="${linkRel}"
                       class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 ${websiteLink === '#' ? 'opacity-50 cursor-not-allowed hover:bg-blue-600 hover:-translate-y-0' : ''}">
                        Visit & Donate Directly
                   </a>
                </div>
               <button class="${favoriteButtonClasses}" title="${favoriteTooltip}" data-action="toggle-favorite" data-org-id="${org.id}">
                    ${heartIconSVG}
               </button>
            </div>
       `;
    }
    // ***** END OF UPDATED FUNCTION *****


    function showLoading() {
        if (loadingIndicator) loadingIndicator.classList.remove('hidden');
        if (organizationsListContainer) organizationsListContainer.classList.add('hidden');
        if (noResultsContainer) noResultsContainer.classList.add('hidden');
    }

    function showNoResults() {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        if (noResultsContainer) noResultsContainer.classList.remove('hidden');
        if (organizationsListContainer) { organizationsListContainer.innerHTML = ''; organizationsListContainer.classList.add('hidden'); /* Keep hidden if no results */ }
    }

    function hideLoadingAndNoResults() {
        if (loadingIndicator) loadingIndicator.classList.add('hidden');
        if (noResultsContainer) noResultsContainer.classList.add('hidden');
        if (organizationsListContainer) organizationsListContainer.classList.remove('hidden');
    }

    // --- Utility Functions ---

    function highlightActiveNavLink() {
        const currentPath = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = document.querySelectorAll('header nav a');
        const activeClasses = ['font-semibold', 'text-blue-600'];
        const inactiveClasses = ['font-normal', 'text-gray-600', 'hover:text-gray-900', 'transition-colors', 'duration-200'];
        navLinks.forEach(link => {
            if (link.classList.contains('text-2xl')) return;
            const linkPath = link.getAttribute('href').split("/").pop() || 'index.html';
            link.classList.remove(...activeClasses, ...inactiveClasses, 'font-semibold', 'font-normal'); // Clear styles
            if (linkPath === currentPath) { link.classList.add(...activeClasses); }
            else { link.classList.add(...inactiveClasses); }
        });
    }

     function updateFooterYear() {
         const yearSpan = document.querySelector('[id^="current-year"]'); // Find any span starting with current-year
         if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }
    }

}); // End DOMContentLoaded Listener