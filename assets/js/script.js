document.addEventListener('DOMContentLoaded', () => {
  // ===== TAB NAVIGATION =====
  document.querySelectorAll('.nav-tabs a[data-tab]').forEach(tabLink => {
    tabLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active tab
      document.querySelectorAll('.nav-tabs a').forEach(link => {
        link.classList.remove('active');
      });
      tabLink.classList.add('active');
      
      // Show section
      document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(tabLink.getAttribute('data-tab')).classList.add('active');
      
      // Update URL
      history.pushState(null, null, `#${tabLink.getAttribute('data-tab')}`);
    });
  });
  
  // Handle direct links
  if (window.location.hash) {
    const tabName = window.location.hash.substring(1);
    document.querySelector(`.nav-tabs a[data-tab="${tabName}"]`)?.click();
  }
  
  // ===== MODAL SYSTEM (Delegated Events) =====
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.querySelector('.close-modal');
  
  // Project content (KEEP YOUR EXISTING CONTENT HERE)
  const projectContent = {
    "fractal-generator": `
      <div class="project-detail">
        <h2>Porous Eden Mass Fractal Aggregate Generator</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Jul 2025 - Dec 2025</span>
          <span><i class="far fa-flask"></i> Modelling and Simulations</span>
        </div>
        <p>This is a test without images.</p>
      </div>
    `,
    "thorium-phosphates": `
      <div class="project-detail">
        <h2>Phase Evolution in the Thorium Dioxide - Sodium Phosphate System</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Mar 2024 - Jan 2025</span>
          <span><i class="far fa-flask"></i> Research Project</span>
        </div>
        <p>Nanoscale thorium dioxide, ThO$_2$, is the dominant form of thorium under conditions close to that in the natural environment.
        One reason we were interested in the behaviour of nanoscale ThO$_2$ is that it can be used to predict behaviour of far more toxic plutonium dioxide, PuO$_2$.
        Nanoscale oxides easily migrate in the natural environment and may undergo chemical transformations.</p>
      </div>
    `
    // ... your other projects
    // ... your other projects
  };

  // DELEGATED EVENT LISTENER (works even if cards are hidden!)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.project-card')) {
      e.preventDefault();
      const card = e.target.closest('.project-card');
      const projectId = card.getAttribute('data-project');
      
      if (projectContent[projectId]) {
        modalContent.innerHTML = projectContent[projectId];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
          closeBtn.onclick = () => closeModal();
        }
        modal.onclick = (e) => {
          if (e.target === modal) closeModal();
        };
      }
    }
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
});