/**
 * Auth Logic for Kitchen Assistant
 * Handles login, registration, and session management.
 */

function validateEmail(email) {
    return email.toLowerCase().endsWith('@gmail.com');
}

function login() {
    const email = document.getElementById('li-email').value;
    const pass = document.getElementById('li-pass').value;

    if (!email || !pass) {
        alert('Please enter both email and password.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Access denied. Only @gmail.com emails are allowed.');
        return;
    }

    const savedAcc = localStorage.getItem('chefOS_account');
    if (savedAcc) {
        const acc = JSON.parse(savedAcc);
        if (acc.email !== email || acc.pass !== pass) {
            alert('Invalid credentials. Please try again or sign up.');
            return;
        }
    } else if (email !== 'admin@gmail.com' || pass !== 'password') {
        // Default admin account updated to follow the gmail rule
        alert('Invalid credentials. Please sign up first.');
        return;
    }

    localStorage.setItem('chefOS_auth', 'true');
    window.location.href = 'index.html';
}

function signup() {
    const name = document.getElementById('su-name').value.trim();
    const kid = document.getElementById('su-kid').value.trim();
    const email = document.getElementById('su-email').value.trim();
    const pass = document.getElementById('su-pass').value.trim();

    if (!name || !kid || !email || !pass) {
        alert('Please fill all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Registration failed. Email must end with @gmail.com.');
        return;
    }

    localStorage.setItem('chefOS_account', JSON.stringify({ name, kid, email, pass }));
    localStorage.setItem('chefOS_auth', 'true');
    window.location.href = 'index.html';
}

function logout() {
    localStorage.removeItem('chefOS_auth');
    window.location.href = 'login.html';
}

function checkAuth(isProtectedPage = true) {
    const isAuthed = localStorage.getItem('chefOS_auth') === 'true';
    const currentPage = window.location.pathname.split('/').pop();

    if (isProtectedPage && !isAuthed) {
        if (currentPage !== 'login.html' && currentPage !== 'register.html') {
            window.location.href = 'login.html';
        }
    } else if (!isProtectedPage && isAuthed) {
        // If on login/register but already authed, go to dashboard
        window.location.href = 'index.html';
    }
}
