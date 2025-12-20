document.addEventListener('DOMContentLoaded', () => {
  // ===== TAB NAVIGATION (existing) =====
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
  
  // ===== MODAL SYSTEM (new) =====
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.querySelector('.close-modal');
  
  // Project content definitions (ADD YOUR PROJECTS HERE)
  const projectContent = {
    "fractal-generator": `
      <div class="project-detail">
        <h2>Porous Eden Mass Fractal Aggregate Generator</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Jan 2023 - Present</span>
          <span><i class="far fa-flask"></i> Research Project</span>
        </div>
        
        <div class="problem-statement">
          <h3>The Challenge</h3>
          <p>Traditional methods for generating fractal aggregates in porous media simulations lack intuitive parameter control and real-time visualization, slowing research iteration cycles.</p>
        </div>
        
        <div class="solution">
          <h3>My Approach</h3>
          <p>Developed an interactive Streamlit application that implements the Eden growth model with mass diffusion aggregation (MDA), enabling researchers to:</p>
          <ul>
            <li>Adjust parameters like sticking probability and particle flux in real-time</li>
            <li>Visualize 3D aggregate growth with Plotly</li>
            <li>Export simulation data for further analysis</li>
          </ul>
          <img src="assets/images/fractal-detail.jpg" alt="Fractal generator interface showing parameter controls and 3D visualization">
        </div>
        
        <div class="results">
          <h3>Impact</h3>
          <p>Adopted by 3 research groups at [University] for sediment transport modeling, reducing simulation setup time by 70% and enabling new insights into pore-scale dynamics.</p>
          
          <div class="deliverables">
            <div class="deliverable-card">
              <h4>Interactive Tool</h4>
              <p>Streamlit app with intuitive UI for parameter tuning</p>
              <a href="https://fractal-demo.streamlit.app" target="_blank" class="btn">Live Demo</a>
            </div>
            <div class="deliverable-card">
              <h4>Technical Report</h4>
              <p>Comprehensive documentation of algorithms and validation</p>
              <a href="assets/documents/fractal-report.pdf" target="_blank" class="btn">Read Report</a>
            </div>
          </div>
        </div>
      </div>
    `,
    
    // ADD MORE PROJECTS HERE (duplicate structure)
    "supply-chain": `
      <div class="project-detail">
        <h2>Supply Chain Risk Dashboard</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Mar 2024 - Aug 2024</span>
          <span><i class="far fa-building"></i> Logistics Startup</span>
        </div>
        
        <div class="problem-statement">
          <h3>The Challenge</h3>
          <p>Global supply chain disruptions cost our client $2.1M monthly in delays and expediting fees due to inability to predict port congestion and weather impacts.</p>
        </div>
        
        <div class="solution">
          <h3>My Approach</h3>
          <p>Built a real-time risk scoring system using:</p>
          <ul>
            <li>PyTorch LSTM models trained on 5 years of port data</li>
            <li>D3.js visualizations showing risk hotspots</li>
            <li>AWS Lambda for serverless data processing</li>
          </ul>
          <img src="assets/images/supply-chain-detail.jpg" alt="Dashboard showing global supply chain risk heatmap">
        </div>
        
        <div class="results">
          <h3>Impact</h3>
          <p>Reduced unexpected delays by 35% and saved $180K monthly in operational costs. System now monitors 12,000+ global shipments monthly.</p>
          
          <div class="deliverables">
            <div class="deliverable-card">
              <h4>Production System</h4>
              <p>Deployed on AWS with 99.95% uptime</p>
            </div>
            <div class="deliverable-card">
              <h4>Technical Architecture</h4>
              <p>Full system diagram and MLOps pipeline</p>
              <a href="assets/documents/supply-chain-architecture.pdf" target="_blank" class="btn">View Architecture</a>
            </div>
          </div>
        </div>
      </div>
    `
  };

  // Open modal when project card is clicked
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = card.getAttribute('data-project');
      
      if (projectContent[projectId]) {
        modalContent.innerHTML = projectContent[projectId];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        
        // Add close handlers
        closeModalBtn.onclick = () => closeModal();
        modal.onclick = (e) => {
          if (e.target === modal) closeModal();
        };
      }
    });
  });

  // Close modal function
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
});