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
        <p>Particle aggregation is an incredibly common phenomenon. Bits of soot coming together in exhaust pipes is particle aggregation. Uncontrollable cell growth in cancerous tumours also resembles particle aggregation.
        Aggregation tends to cause formation of fractal structures - that is, structures that look the same regardless of magnification. In other words, it is not unusual for the aggregate to resemble the individual particles it's made of.
        We call this property self-similarity. There has been a lot of interest in algorithms that can accurately model aggregation.
        <br><br>
        One such algorithm is the Porous Eden model for mass fractal aggregates, described in detail by <span class="tooltip"> Guesnet and colleagues (2019) <span class="tooltip-text"> test tooltip text </span> </span>. The model's main strong point is that judicious choice of parameters allows the user to generate aggregates with a controllable degree of branching.
        This property of the model allows a wide range of structures - and, hence, physical processes - to be generated. This flexibility is achieved through an inactivation parameter, which defines a random chance that a randomly chosen particle gets deactivated during growth. A deactivated particle 
        does not accept any new particles in its vicinity. Consequently, high deacivation makes it harder for new particles to attach in random spots.
        <br><br>
        The figure below illustrates the difference between an aggregate simulated with low and high deactivation, respectively.</p>
        <br>
        <figure>
          <img src="assets/images/aggregates_comparison.png" alt="Aggregates with low and high inactivation probability, side-by-side. The aggregate generated with high inactivation probability is much more branched." class="fractal-aggregates-img0">
          <figcaption><i>Low inactivation probability (left) versus high (right). Visualised with OVITO<sup>2</sup></i>.</figcaption>
        </figure>
        <br>
        <p>One use of simulations such as this one is that they allow us to calculate and model a quantity known as structure factor. The structure factor is a mathematical function describing the pattern in which particles are arranged. For aggregates of tiny particles (e.g. nanoparticles or molecules)
        this quantity is experimentally accessible with a method called small-angle X-ray scattering (SAXS). The method is powerful, but extracting structural information from it is challenging. One challenge is that the same SAXS dataset may be well-described by multiple models. Another challenge
        is that the mathematical parameters extracted from SAXS analysis are not always intuitively interpretable.
        <br><br>
        These are the exact reasons I turned towards the Porous Eden model and implemented Guesnet's algorithm for simulations.
        <br><br>
        I studied aggregation in hydrated thorium dioxides. One motivation to study thorium dioxide is the rising interest to thorium-based nuclear energy cycle. Nuclear energy generates waste. Having waste on your hands necessitates having a plan for how to deal with a potential leak. In the natural environment, 
        thorium easily forms hydrated oxides. The mobility of thorium in the environment - i.e. how easily will it dissolve and get carried by natural waters - depends on its morphology. Morphology is best understood as physical forms: shapes and sizes of particles. We want to describe shapes and sizes, and we want to know
        if particles stick together, because that will determine their mobility and inform our waste management efforts.
        <br><br>
        At this time, the SAXS data collected on our thorium dioxides should not be shared publicly since it's not published yet. However, a large set of SAXS data collected on hydrated thorium dioxide allowed us to describe the morphology of this material in different environments. The simulations, very much like the ones shown above, 
        allowed me to validate results of SAXS analysis by computing structure factors. The next figure shows how significant the difference can be for structure factors of different aggregates. The data shown corresponds to the aggregates visualised in Fig. 1.</p>
        <br>
        <figure>
          <img src="assets/images/aggregates_SF.png" alt="Structure factors for the aggregates described in the previous figure. The aggregate that exhibits more branching has a much smoother structure factor. The aggregate with less branching exhibits sharp negative peaks, or 'fringes'." class="fractal-aggregates-img1">
          <figcaption><i>Structure factors for the two aggregates. Calculated using Debyer<sup>3</sup></i>.</figcaption>
        </figure>
        <br>
        <p>Check back in a few months and I hope to share a paper on the topic! In the meantime, I invite you to check out a demo version of my Porous Eden Mass Fractal Aggregate Simulation Framework via <a href="https://kramar-pemfa.streamlit.app/">my Streamlit-hosted app.</a></p>
        <br>
        <p><sup>1 </sup> Guesnet, E.; Dendievel, R.; Jauffrès, D.; Martin, C. L.; Yrieix, B. A Growth Model for the Generation of Particle Aggregates with Tunable Fractal Dimension. Physica A: Statistical Mechanics and its Applications 2019, 513, 63–73. <a href = "https://doi.org/10.1016/j.physa.2018.07.061">doi.org/10.1016/j.physa.2018.07.061</a>.
</p>
        <p><sup>2 </sup><a href = "https://www.ovito.org/">www.ovito.org</a></p>
        <p><sup>3 </sup><a href = "https://debyer.readthedocs.io/en/latest/">debyer.readthedocs.io/en/latest by wojdyr</a></p>
      </div>
    `,
    "thorium-phosphates": `
      <div class="project-detail">
        <h2>Phase Evolution in the Thorium Dioxide - Phosphate System</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Mar 2024 - Jan 2025</span>
          <span><i class="far fa-flask"></i> Research Project</span>
        </div>
        <p>Nanoscale thorium dioxide, ThO<sub>2</sub>, is the dominant form of thorium under conditions close to that in the natural environment.
        One reason we were interested in the behaviour of nanoscale ThO<sub>2</sub> is that it can be used to predict behaviour of far more toxic plutonium dioxide, PuO<sub>2</sub>.
        Nanoscale oxides easily migrate in the natural environment and may undergo chemical transformations. Phosphate is a very common anion and an agricultural effluent. Historically,
        phosphate has been actively used to treat nuclear waste to sequester high-valent actinides. In this work, carried out at Lomonosov Moscow State University, I explored some of the 
        chemistry in the thorium dioxide - phosphate system.<br></br>
        We found that ThO<sub>2</sub>, exposed to high concentrations of phosphate, reformed into an unknown phase with a high water content. The structure of the phase could not be immediately determined. One way to understand a phase is to study what else can be made 
        from it. I heated the phase in air to a maximum temperature of 1000 degrees Celcius and recorded structural information using <emph>X-ray diffraction</emph> and <emph>thermal gravimetric analysis</emph></p> 
        The key
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

