document.addEventListener('DOMContentLoaded', () => {
  // Tab navigation
  document.querySelectorAll('.nav-tabs a[data-tab]').forEach(tabLink => {
    tabLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active tab in nav
      document.querySelectorAll('.nav-tabs a').forEach(link => {
        link.classList.remove('active');
      });
      tabLink.classList.add('active');
      
      // Show corresponding content section
      const tabName = tabLink.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(tabName).classList.add('active');
      
      // Update URL hash
      history.pushState(null, null, `#${tabName}`);
    });
  });
  
  // Handle direct links with hash
  if (window.location.hash) {
    const tabName = window.location.hash.substring(1);
    const tabLink = document.querySelector(`.nav-tabs a[data-tab="${tabName}"]`);
    if (tabLink) {
      tabLink.click();
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]:not([data-tab])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});