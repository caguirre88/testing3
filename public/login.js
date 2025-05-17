document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('error')) {
    document.getElementById('error').textContent = 'Invalid credentials';
  }
});
