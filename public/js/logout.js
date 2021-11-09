// This script is simply responsible for ending a session and replacing the current page with the login page
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('#logout')
    .addEventListener('click', logout);