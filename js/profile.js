document.addEventListener('DOMContentLoaded', () => {
    // Ensure this runs only on profile.html and after auth check (auth.js handles redirect if not logged in)
    if (!window.location.pathname.endsWith('profile.html')) return;

    const usersKey = 'app_users'; // Same key as in auth.js
    const sessionKey = 'app_session'; // To ensure user is logged in

    // DOM Elements for profile data
    const profileViewContainer = document.getElementById('profile-view-container');
    const profileNotFoundDiv = document.getElementById('profile-not-found');
    const fullNameEl = document.getElementById('profile-fullname');
    const usernameEl = document.getElementById('profile-username');
    const emailEl = document.getElementById('profile-email');
    const dobEl = document.getElementById('profile-dob');
    const genderEl = document.getElementById('profile-gender');
    const addressEl = document.getElementById('profile-address');
    const cityEl = document.getElementById('profile-city');
    const newsletterEl = document.getElementById('profile-newsletter');
    const userIdEl = document.getElementById('profile-id');
    const breadcrumbProfileNameEl = document.getElementById('breadcrumb-profile-name');


    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem(usersKey)) || [];
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function displayUserProfile(user) {
        if (!user) {
            if (profileViewContainer) profileViewContainer.style.display = 'none';
            if (profileNotFoundDiv) profileNotFoundDiv.style.display = 'block';
            return;
        }

        if (profileNotFoundDiv) profileNotFoundDiv.style.display = 'none';
        if (profileViewContainer) profileViewContainer.style.display = 'block';

        if (fullNameEl) fullNameEl.textContent = user.fullname || 'N/A';
        if (usernameEl) usernameEl.textContent = user.username || 'N/A';
        if (emailEl) emailEl.textContent = user.email || 'N/A';
        if (dobEl) dobEl.textContent = user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A';
        if (genderEl) genderEl.textContent = user.gender || 'N/A';
        if (addressEl) addressEl.textContent = user.address || 'N/A';
        if (cityEl) cityEl.textContent = user.city || 'N/A';
        if (newsletterEl) newsletterEl.textContent = user.newsletter ? 'Subscribed' : 'Not Subscribed';
        if (userIdEl) userIdEl.textContent = user.id;
        if (breadcrumbProfileNameEl) breadcrumbProfileNameEl.textContent = user.fullname || 'Profile';
    }

    // --- Main ---
    // First, check if the user is logged in (auth.js should handle redirection if not)
    const session = JSON.parse(localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey));
    if (!session) {
        // This check is technically redundant if auth.js is loaded first and redirects,
        // but good for safety if script loading order changes.
        window.location.href = 'login.html';
        return; // Stop further execution
    }

    const userIdToView = getQueryParam('id');

    if (userIdToView) {
        const users = getUsersFromStorage();
        const userToDisplay = users.find(user => user.id === userIdToView);
        displayUserProfile(userToDisplay);
    } else {
        // No ID in URL, treat as not found
        displayUserProfile(null);
    }

    console.log("Profile Page Initialized (profile.js)");
});