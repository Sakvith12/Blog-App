function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

//  Keep only ONE checkAuth()
async function checkAuth() {
    try {
        const res = await fetch('/blog-app2/backend/api/auth/check.php', {
            credentials: 'same-origin',
            method: 'GET',
            headers: { 'Cache-Control': 'no-cache' } 
        });
        const data = await res.json();
        return data.user || null;
    } catch {
        return null;
    }
}

//  keep logout as:
async function logout(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    
    try {
        const res = await fetch('/blog-app2/backend/api/auth/logout.php', {
            method: 'POST',
            credentials: 'same-origin'
        });
        
    } catch (err) {
        console.warn("Logout API failed, redirecting anyway");
    }
    
    window.location.href = 'login.html';
}

// render modern header buttons
function renderNavButtons(user) {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    if (user) {
        navButtons.innerHTML = `
            <div class="welcome-text">
                <i class="fas fa-user"></i>
                <span>${user.username}</span>
            </div>
            <button class="btn btn-primary" id="newPostBtn">New Post</button>
            <button class="btn btn-secondary" id="logoutBtn">Logout</button>
        `;
        
        // add event listeners
        document.getElementById('newPostBtn').onclick = () => {
            window.location.href = 'create.html';
        };
        
        document.getElementById('logoutBtn').onclick = logout;
    } else {
        navButtons.innerHTML = `
            <a href="login.html" class="auth-link">Login</a>
            <a href="register.html" class="auth-link">Register</a>
        `;
    }
}

// update all pages to use this
// In index.html, view.html,..
checkAuth().then(user => {
    renderNavButtons(user);
    
});