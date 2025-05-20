document.addEventListener('DOMContentLoaded', () => {
    // Ensure this runs only on users.html and after auth check
    if (!window.location.pathname.endsWith('users.html')) return;

    const usersKey = 'app_users'; // Same key as in auth.js
    const userTableBody = document.getElementById('user-table-body');
    const paginationControls = document.getElementById('pagination-controls');
    const noUsersMessage = document.getElementById('no-users-message');
    const filterNameInput = document.getElementById('filter-name');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');


    let allUsers = [];
    let filteredUsers = [];
    let currentPage = 1;
    const itemsPerPage = 5; // Display 5 users per page

    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem(usersKey)) || [];
    }

    function displayUsers(usersToDisplay, page = 1) {
        if (!userTableBody) return;
        userTableBody.innerHTML = ''; // Clear existing rows

        if (!usersToDisplay || usersToDisplay.length === 0) {
            if (noUsersMessage) noUsersMessage.style.display = 'block';
            if (document.getElementById('user-table')) document.getElementById('user-table').style.display = 'none';
            if (paginationControls) paginationControls.innerHTML = '';
            return;
        }

        if (noUsersMessage) noUsersMessage.style.display = 'none';
        if (document.getElementById('user-table')) document.getElementById('user-table').style.display = '';


        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedUsers = usersToDisplay.slice(startIndex, endIndex);

        paginatedUsers.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell().textContent = user.fullname || 'N/A';
            row.insertCell().textContent = user.username || 'N/A';
            row.insertCell().textContent = user.email || 'N/A';
            row.insertCell().textContent = user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A';
            row.insertCell().textContent = user.gender || 'N/A';
            row.insertCell().textContent = user.city || 'N/A';
        });

        renderPagination(usersToDisplay.length, page);
    }

    function renderPagination(totalItems, page) {
        if (!paginationControls) return;
        paginationControls.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages <= 1) return; // No pagination needed for 1 or 0 pages

        const ul = document.createElement('ul');

        // Page Info
        const pageInfo = document.createElement('span');
        pageInfo.className = 'page-info';
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        paginationControls.appendChild(pageInfo);


        // Previous Button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&laquo; Prev';
        prevButton.disabled = page === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayUsers(filteredUsers, currentPage);
            }
        });
        ul.appendChild(prevButton);

        // Page Number Buttons (Simplified: show a few pages around current)
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, page + 2);

        if (page <= 3) { // if near the beginning
            endPage = Math.min(totalPages, 5);
        }
        if (page >= totalPages - 2) { // if near the end
            startPage = Math.max(1, totalPages - 4);
        }


        if (startPage > 1) {
            const firstPageButton = document.createElement('button');
            firstPageButton.textContent = '1';
            firstPageButton.addEventListener('click', () => {
                currentPage = 1;
                displayUsers(filteredUsers, currentPage);
            });
            ul.appendChild(firstPageButton);
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '8px';
                ul.appendChild(dots);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === page) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayUsers(filteredUsers, currentPage);
            });
            ul.appendChild(pageButton);
        }

         if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '8px';
                ul.appendChild(dots);
            }
            const lastPageButton = document.createElement('button');
            lastPageButton.textContent = totalPages;
            lastPageButton.addEventListener('click', () => {
                currentPage = totalPages;
                displayUsers(filteredUsers, currentPage);
            });
            ul.appendChild(lastPageButton);
        }


        // Next Button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next &raquo;';
        nextButton.disabled = page === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayUsers(filteredUsers, currentPage);
            }
        });
        ul.appendChild(nextButton);
        paginationControls.appendChild(ul);
    }

    function applyFilter() {
        const filterText = filterNameInput ? filterNameInput.value.toLowerCase() : '';
        if (filterText) {
            filteredUsers = allUsers.filter(user =>
                (user.fullname && user.fullname.toLowerCase().includes(filterText)) ||
                (user.username && user.username.toLowerCase().includes(filterText))
            );
        } else {
            filteredUsers = [...allUsers]; // No filter, show all
        }
        currentPage = 1; // Reset to first page after filtering
        displayUsers(filteredUsers, currentPage);
    }
    // ... (rest of the existing users_list.js code) ...

    function displayUsers(usersToDisplay, page = 1) {
        if (!userTableBody) return;
        userTableBody.innerHTML = ''; // Clear existing rows

        if (!usersToDisplay || usersToDisplay.length === 0) {
            if (noUsersMessage) noUsersMessage.style.display = 'block';
            if (document.getElementById('user-table')) document.getElementById('user-table').style.display = 'none';
            if (paginationControls) paginationControls.innerHTML = '';
            return;
        }

        if (noUsersMessage) noUsersMessage.style.display = 'none';
        if (document.getElementById('user-table')) document.getElementById('user-table').style.display = '';


        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedUsers = usersToDisplay.slice(startIndex, endIndex);

        paginatedUsers.forEach(user => {
            const row = userTableBody.insertRow();

            // Make Full Name a link to the profile page
            const nameCell = row.insertCell();
            const profileLink = document.createElement('a');
            profileLink.href = `profile.html?id=${user.id}`; // Pass user ID as query parameter
            profileLink.textContent = user.fullname || 'N/A';
            profileLink.classList.add('link-text'); // Use existing link style
            nameCell.appendChild(profileLink);

            row.insertCell().textContent = user.username || 'N/A';
            row.insertCell().textContent = user.email || 'N/A';
            row.insertCell().textContent = user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A';
            row.insertCell().textContent = user.gender || 'N/A';
            row.insertCell().textContent = user.city || 'N/A';
        });

        renderPagination(usersToDisplay.length, page);
    }

// ... (rest of the existing users_list.js code) ...

    // Initial load
    allUsers = getUsersFromStorage();
    filteredUsers = [...allUsers]; // Initially, filtered users are all users
    displayUsers(filteredUsers, currentPage);

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilter);
    }
    if (filterNameInput) { // Allow filtering on Enter key press
        filterNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilter();
            }
        });
    }

    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', () => {
            if (filterNameInput) filterNameInput.value = '';
            applyFilter(); // Re-apply with empty filter to show all
        });
    }


    console.log("User List & Pagination Initialized (users_list.js)");
});