// Get the logout button element
const logoutBtn = document.getElementById('logout-button');

// Function to show/hide logout button based on login state
function updateLogoutButton() {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  if (isLoggedIn) {
    logoutBtn.classList.remove('hidden'); // show logout
  } else {
    logoutBtn.classList.add('hidden'); // hide logout
  }
}

// Initial check
updateLogoutButton();

// Logout action
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn'); // remove login flag
  alert('Logged out successfully!');
  updateLogoutButton(); // update button visibility
});
