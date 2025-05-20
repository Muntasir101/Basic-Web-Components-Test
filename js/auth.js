document.addEventListener('DOMContentLoaded', () => {
    const usersKey = 'app_users';
    const sessionKey = 'app_session';

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutLink = document.getElementById('logout-link');
    const footerLogoutLink = document.getElementById('footer-logout-link');
    const registerMessageDiv = document.getElementById('register-message');
    const loginMessageDiv = document.getElementById('login-message');

    function getUsers() {
        return JSON.parse(localStorage.getItem(usersKey)) || [];
    }

    function saveUsers(users) {
        localStorage.setItem(usersKey, JSON.stringify(users));
    }

    function displayMessage(element, message, type = 'error') {
        if (!element) return;
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    // Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const dob = document.getElementById('dob').value;
            const genderRadio = document.querySelector('input[name="gender"]:checked');
            const terms = document.getElementById('terms').checked;
            const newsletter = document.getElementById('newsletter-toggle').checked;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;


            if (password !== confirmPassword) {
                displayMessage(registerMessageDiv, "Passwords do not match!");
                return;
            }
            if (!terms) {
                displayMessage(registerMessageDiv, "You must agree to the terms and conditions!");
                return;
            }
            if (!genderRadio) {
                displayMessage(registerMessageDiv, "Please select your gender.");
                return;
            }
            const gender = genderRadio.value;

            let users = getUsers();
            if (users.find(user => user.username === username)) {
                displayMessage(registerMessageDiv, "Username already exists!");
                return;
            }
            if (users.find(user => user.email === email)) {
                displayMessage(registerMessageDiv, "Email already registered!");
                return;
            }

            const newUser = { fullname, username, email, password, dob, gender, newsletter, address, city, id: Date.now().toString() };
            users.push(newUser);
            saveUsers(users);
            displayMessage(registerMessageDiv, "Registration successful! You can now log in.", 'success');
            registerForm.reset();
            setTimeout(() => {
                 window.location.href = 'login.html';
            }, 2000);
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('login-identifier').value.trim(); // Can be username or email
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            const users = getUsers();
            const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);

            if (user) {
                const sessionData = { userId: user.id, username: user.username, fullname: user.fullname };
                if (rememberMe) {
                    localStorage.setItem(sessionKey, JSON.stringify(sessionData));
                } else {
                    sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
                }
                displayMessage(loginMessageDiv, "Login successful! Redirecting...", 'success');
                window.location.href = 'users.html';
            } else {
                displayMessage(loginMessageDiv, "Invalid username/email or password.");
            }
        });
    }

    // Logout
    function handleLogout() {
        localStorage.removeItem(sessionKey);
        sessionStorage.removeItem(sessionKey);
        window.location.href = 'login.html';
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
    if (footerLogoutLink) {
         footerLogoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }


    // Check session on protected pages
    if (window.location.pathname.endsWith('users.html')) {
        const session = JSON.parse(localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey));
        if (!session) {
            window.location.href = 'login.html';
        } else {
            const welcomeMessageDiv = document.getElementById('welcome-message');
            if (welcomeMessageDiv) {
                welcomeMessageDiv.textContent = `Welcome, ${session.fullname || session.username}!`;
            }
        }
    }
    console.log("Auth System Initialized (auth.js)");
});