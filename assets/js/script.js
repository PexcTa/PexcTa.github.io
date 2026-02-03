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
        Fractal structures exhibit <i>self-similarity</i>. There has been a lot of interest in algorithms that can accurately model aggregation of particles into fractal structures.
        <br><br>
        One such algorithm is the Porous Eden model for mass fractal aggregates, described in detail by 
        <span class="tooltip-container"><span class="tooltip-trigger">Guesnet and colleagues (2019)</span><span class="tooltip-content">Guesnet, E.; Dendievel, R.; Jauffrès, D.; Martin, C. L.; Yrieix, B. A Growth Model for the Generation of Particle Aggregates with Tunable Fractal Dimension. Physica A: Statistical Mechanics and its Applications 2019, 513, 63–73.</span></span>. 
        The model's main strong point is that judicious choice of parameters allows the user to generate aggregates with a controllable degree of branching.
        This property of the model allows a wide range of structures - and, hence, physical processes - to be generated. This flexibility is achieved through an 
        <span class="tooltip-container"><span class="tooltip-trigger">inactivation parameter</span><span class="tooltip-content">Takes values from 0 to 1.</span></span>, which defines a random chance that a randomly chosen particle gets deactivated during growth. A deactivated particle 
        does not accept any new particles in its vicinity. A particle cannot be deactivated if it is the last active particle. With high deactivation, only a handful of particles are active at any given time, and therefore attachment happens preferentially, creating branched structures.
        <br><br>
        The figure below illustrates the difference between an <span class="tooltip-container"><span class="tooltip-trigger">aggregate</span><span class="tooltip-content">10,000 particles.</span></span> simulated with <span class="tooltip-container"><span class="tooltip-trigger">low</span><span class="tooltip-content">p = 0.00</span></span> and <span class="tooltip-container"><span class="tooltip-trigger">high</span><span class="tooltip-content">p = 0.95</span></span> deactivation, respectively.</p>
        <br>
        <figure>
          <img src="assets/images/aggregates_comparison.png" alt="Aggregates with low and high inactivation probability, side-by-side. The aggregate generated with high inactivation probability is much more branched." class="fractal-aggregates-img0">
          <figcaption><i>Low inactivation probability (left) versus high (right). Visualised with OVITO<sup>2</sup></i>.</figcaption>
        </figure>
        <br>
        <p>One use of simulations such as this one is that they allow us to calculate and model a quantity known as structure factor. The structure factor is a mathematical function describing the pattern in which particles are arranged. For aggregates of tiny particles (e.g. nanoparticles or molecules)
        this quantity is experimentally accessible with a method called <span class="tooltip-container"><span class="tooltip-trigger">small-angle X-ray scattering (SAXS)</span><span class="tooltip-content">Primarily sensitive to particle size and shape, the technique relies on elastic scattering of X-rays by the electrons in the sample.</span></span>. The method is powerful, but extracting structural information from it is challenging. One challenge is that the same SAXS dataset may be well-described by multiple models. Another challenge
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
        <p><sup>1 </sup> Guesnet, E.; Dendievel, R.; Jauffrès, D.; Martin, C. L.; Yrieix, B. A Growth Model for the Generation of Particle Aggregates with Tunable Fractal Dimension. Physica A: Statistical Mechanics and its Applications 2019, 513, 63–73. <a href="https://doi.org/10.1016/j.physa.2018.07.061">doi.org/10.1016/j.physa.2018.07.061</a>.
        </p>
        <p><sup>2 </sup><a href="https://www.ovito.org/">www.ovito.org</a></p>
        <p><sup>3 </sup><a href="https://debyer.readthedocs.io/en/latest/">debyer.readthedocs.io/en/latest by wojdyr</a></p>
      </div>
    `,
    "thorium-phosphates": `
      <div class="project-detail">
        <h2>Phase Evolution in the Thorium Dioxide - Phosphate System</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i> Mar 2024 - Jan 2025</span>
          <span><i class="far fa-flask"></i> Research Project</span>
        </div>
        <i>The figures presented below are reproduced from the author's manuscript published<sup>1</sup> in Dalton Transactions. Copyright Royal Society of Chemistry, 2025.</i>
        <br>
        <h3>All the Phosphate Phases</h3>
        <p>Nanoscale thorium dioxide, ThO<sub>2</sub>, is the dominant form of <span class="tooltip-container"><span class="tooltip-trigger">thorium</span><span class="tooltip-content">A chemical element with the atomic number 90; of interest due to the emerging thorium fuel cycle. Weakly radioactive.</span></span> under conditions close to those in the natural environment.
        One reason we were interested in the behaviour of <span class="tooltip-container"><span class="tooltip-trigger">nanoscale</span><span class="tooltip-content">Particles under 100 nm in size.</span></span> ThO<sub>2</sub> is that it can be used to predict behaviour of far more toxic <span class="tooltip-container"><span class="tooltip-trigger">plutonium</span><span class="tooltip-content">A chemical element with atomic number 94. Strongly radioactive, toxic, common component of nuclear waste.</span></span> dioxide, PuO<sub>2</sub>.
        Nanoscale oxides easily migrate in the natural environment and may undergo chemical transformations. <span class="tooltip-container"><span class="tooltip-trigger">Phosphate</span><span class="tooltip-content">A species with the formula PO₄³⁻; a common anion in biological systems and agriculture.</span></span> is a very common <span class="tooltip-container"><span class="tooltip-trigger">anion</span><span class="tooltip-content">A negatively charged ion.</span></span> and an agricultural effluent. Historically,
        phosphate has been actively used to treat nuclear waste to sequester high-valent actinides. In this work, carried out at Lomonosov Moscow State University, I explored some of the 
        chemistry in the thorium dioxide - phosphate system. Unexpectedly, we were able to expand on work done as far back as 1960s.<br></br>
        We found that ThO<sub>2</sub>, exposed to high concentrations of phosphate, reformed into an unknown phase with a high water content. The structure of the phase could not be immediately determined. 
        The closest match based on the <span class="tooltip-container"><span class="tooltip-trigger">X-ray diffraction</span><span class="tooltip-content">Method sensitive to periodic (crystalline) structure.</span></span> (XRD) pattern was <i>grayite</i>, a thorium-bearing mineral described by Dooley and Hathaway in a paper from 1961.<sup>2</sup> The match was not perfect, but appeared to be close enough. Unfortunately, we could not locate more recent reports, and the structure of grayite was never solved.</p>
        <br>
        <figure>
          <img src="assets/images/thorium-phos-xrd-tem.png" alt="XRD patterns showing the similarity between experimental data and grayite pattern; transmission electron microscopy images of two hydrated phosphate samples." class="thorium-phos-img0">
          <figcaption><i>(left) Comparison of XRD patterns with key peaks highlighted in red dashed lines. The ThPhos-8 and ThPhos-5 labels refer to samples obtained at pH of 8 and 5, respectively. These samples are shown in TEM images (center, right). Both are nanosized.</i>.</figcaption>
        </figure>
        <p>One way to understand a phase is to try and convert it to a better defined product, then work retroactively. We heated the phase in air to a maximum temperature of 1000 degrees Celcius and recorded structural information using <i>X-ray diffraction</i> and <i><span class="tooltip-container"><span class="tooltip-trigger">thermal gravimetric analysis</span><span class="tooltip-content">Method which records mass lost as the sample is heated.</span></span></i>. As I reviewed the data, I realised
        that the final product obtained after thermal treatment was, in fact, a mix of dry crystalline phosphates characterised in the 1970-1980s. 
        It followed that our hydrated phase is a previously unknown precursor phase with a similar chemical composition. 
        <b>In other words, we have shown that even under environmental conditions there is a direct pathway from thorium dioxide to stable crystalline phosphates.</b></p> 
        <figure>
          <img src="assets/images/thorium-phos-sem-eds.png" alt="Scanning electron microscopy images and XRD patterns for the materials obtained following heating to 1000 degrees Celcius." class="thorium-phos-img1">
          <figcaption><i>Color-coded: SEM and XRD for ThPhos-5 (yellow) and ThPhos-8 (blue). XRD patterns are plotted with patterns calculated for the phases described in 1960s by Matković and coworkers. The major products are different.</i></figcaption>
        </figure>
        <p>The two calcined phases are shown in the figure above. Both were composed of compounds described by B. Matković and coworkers.<sup>3,4</sup> 
        I used <span class="tooltip-container"><span class="tooltip-trigger">Rietveld refinement</span><span class="tooltip-content">An advanced method for refining crystal structures from X-ray diffraction data.</span></span> to confirm these assignments, and was able to show that the pH used to prepare the intermediate phase determined the identity of the major calcination product. There remained, however, a key question. XRD, shown earlier, indicated that the hydrated intermediate phosphate phase
        looks largely the same regardless of pH: the <span class="tooltip-container"><span class="tooltip-trigger">morphology</span><span class="tooltip-content">Sizes and shapes.</span></span> might have been different, but the peak positions were the same, equally similar to grayite. How was it that the hydrated intermediate then reformed into distinct products during calcination? </p>
        <br>
        <h3>Exploring the Hydrated Phase</h3>
        <p>We knew something about the hydrated phosphate phase changes when environmental variables, such as synthesis pH, change. However, this change was not reflected in the X-ray diffraction pattern. We needed a closer look at the immediate environment around the atoms comprising the structure. One method suitable for the task is extended X-ray absorption fine structure
        spectroscopy <b>(<span class="tooltip-container"><span class="tooltip-trigger">EXAFS</span><span class="tooltip-content">A technique sensitive to the local atomic environment.</span></span>)</b>, which provides a direct interpretation of the arrangement of atoms in space. Another method is X-ray pair distribution function (PDF), which identifies the most common pairwise distances present in the sample under study. These methods are effective for short- and medium-range structural interpretation, respectively. EXAFS analysis, which I carried out, required
        extensive <span class="tooltip-container"><span class="tooltip-trigger">Fourier</span><span class="tooltip-content">A powerful mathematical technique which extracts main frequencies from an oscillatory signal. EXAFS signal oscillates along the energy axis, and the "frequencies" making up the oscillations represent interatomic distances.</span></span> signal processing, <span class="tooltip-container"><span class="tooltip-trigger">wavelet</span><span class="tooltip-content">A powerful mathematical technique which transforms the input signal into a collection of wavelets with varying frequencies and power.</span></span> transform and error analysis. PDF analysis, done by my collaborators Dmitry Tsymbarenko and Maria Shaulskaya, revealed that the hydrated phase was similar in structure to one of the compounds obtained post-calcination; this was revealed through modelling and Pearson correlation analysis.
        The methods confirmed our initial guesses that the thorium is surrounded by oxygen atoms and other species are present in <span class="tooltip-container"><span class="tooltip-trigger">channels</span><span class="tooltip-content">Extended tunnels through the structure.</span></span> and <span class="tooltip-container"><span class="tooltip-trigger">cavities</span><span class="tooltip-content">Enclosed empty spaces in the structure.</span></span> between the thorium atoms. Nevertheless, EXAFS and PDF were still blind to the causes of divergent structural evolution during calcination. Changes in pH did <emph>something</emph> to this material - something that was not reflected in the structure,
        but was wholly responsible for thermal behaviour.</p>
        <br>
        <p>This key detail was not a periodic, well-defined structural feature. X-ray methods could not "see" it. So we turned to other methods: Nuclear Magnetic Resonance <b>(<span class="tooltip-container"><span class="tooltip-trigger">NMR</span><span class="tooltip-content">A technique which provides information on the immediate chemical environment for an element, based on its behaviour in a magnetic field.</span></span>)</b> spectrometry and Fourier-transform Infrared Spectroscopy <b>(<span class="tooltip-container"><span class="tooltip-trigger">FTIR</span><span class="tooltip-content">A technique which provides information on the immediate chemical environment for an element, based on interactions between chemical bonds and infrared radiation.</span></span>)</b>.</p>
        <br>
        <p>NMR was used to definitively demonstrate that the phosphate (PO<sub>4</sub><sup>3-</sup>) groups in the hydrated sample were just that: <i>monomeric</i> phosphates, i.e. they did not form extended chains either before or after calcination.
        There were no major differences between the hydrated phases obtained at different pH values.</p>
        <br>
        <p>FTIR told us more about these phosphate groups, as well as the water. The environment observed by phosphate groups in the higher pH sample (ThPhos-8) was richer, more diverse; water, too, was present in a wider variety of <span class="tooltip-container"><span class="tooltip-trigger">conformations</span><span class="tooltip-content">Geometries. An open palm and a fist are two conformations of a hand.</span></span>.</p>
        <br>
        <p>Armed with these insights, we went back to the structural analysis. We noted that one of the final calcined phases, <b>NaTh<sub>2</sub>(PO<sub>4</sub>)<sub>3</sub></b>, contained long channels; the material could be described as a <span class="tooltip-container"><span class="tooltip-trigger">framework</span><span class="tooltip-content">A three-dimensional, porous structure composed of repeating units, channels and/or cavities.</span></span>. 
        Our X-ray analysis results agreed that while the hydrated phases aren't quite the same as this crystalline material, they are similar. We supposed that the channels in the hydrated phase could house an excess of phosphate, sodium and water; these reagents, invisible to X-ray methods, 
        would be consumed during calcination, severely affecting the outcome of the calcination procedure. We tested this hypothesis by altering synthetic conditions further and checking the elemental composition of the samples using energy-dispersive spectroscopy (<span class="tooltip-container"><span class="tooltip-trigger">EDS</span><span class="tooltip-content">A technique which provides information on the elemental composition of a sample.</span></span>).</p>
        <br>
        <p>Once again, the <b>structure</b> of the intermediate phase was found to be consistent across the entire range of studied conditions. However, like a sponge
        , it absorbed extra reagents from the solution; during calcination, these extra trapped reagents pushed it towards a favoured major product.
        This can be thought of as <b>chemical memory</b>: the hydrated phase "remembers" its original synthetic conditions, and the original synthetic conditions guide structural evolution during heating. The figure below summarises the study.</p>
        <figure>
          <img src="assets/images/thorium-phos-scheme.png" alt="A scheme summarising the reforming of thorium dioxide into hydrated phase and subsequent calcination to crystalline ceramics. pH of the first step influences outcome of the second step." class="thorium-phos-img2">
          <figcaption><i>Thorium dioxide in a phosphate solution reforms into the hydrated phase. The structure of the solid part of the hydrated phase is the same regardless of pH, but the channels are filled with variable chemical species. During calcination, the hydrated phase reforms into different crystalline phosphates.</i></figcaption>
        </figure>
        <h3>Conclusions</h3>
        <p>Thorium dioxide in the natural environment rich in phosphate may evolve into a hydrated phase, which, if aged, may form a stable, crystalline compound.</p>
        <p>A new synthetic pathway for a crystalline thorium-based phase has been identified. The crystalline phase is a ceramic that can be used to immobilise thorium or other radiotoxic elements.</p>
        <br>
        <h3>Bibliography</h3>
        <p><sup>1 </sup>Kramar, B. V.; Plakhova, T. V.; Kuzenkova, A. S.; Trigub, A. L.; Svetogorov, R. D.; Shiryaev, A. A.; Nevolin, I. M.; Yapryntsev, A. D.; Baranchikov, A. E.; Peters, G. S.; Yapaskurt, V. O.; Egorov, A. V.; Kostyukov, I. A.; Shaulskaya, M. D.; Tsymbarenko, D. M.; Romanchuk, A. Y.; Kalmykov, S. N. Formation of a New Hydrated Sodium–Thorium Phosphate from Thorium Dioxide and Its Subsequent Phase Evolution. Dalton Trans. 2025, 54 (18), 7360–7375. <a href = "https://doi.org/10.1039/D5DT00276A">https://doi.org/10.1039/D5DT00276A</a>.</p>
        <p><sup>2 </sup>Dooley Jr, J.; Hathaway, J. Two Occurrences of Thorium-Bearing Minerals with Rhabdophane-like Structure. US Geological Survey Professional Paper 1961, 424, 339–341.</p>
        <p><sup>3 </sup>Matković, B.; Kojić-Prodić, B.; Šlijukić, M.; Topić, M.; Willett, R. D.; Pullen, F. The Crystal Structure of a New Ferroelectric Compound, NaTh2(PO4)3. Inorganica Chimica Acta 1970, 4, 571–576.
<a href = "https://doi.org/10.1016/S0020-1693(00)93352-8">https://doi.org/10.1016/S0020-1693(00)93352-8</a></p>
        <p><sup>4 </sup>Galešić, N.; Matković, B.; Topić, M.; Coffou, E.; Šljukić, M. The Crystal Structure of Disodium Thorium Bisphosphate, Na2Th(PO4)2. Croatica Chemica Acta 1984, 57 (4), 597–608.</p>
      </div>
    `,
    "nu601-excited-state": `
      <div class="project-detail">
        <h2>Excited State Equilibrium in a Zirconium-Based Metal-Organic Framework</h2>
        <div class="meta">
          <span><i class="far fa-calendar"></i>Aug 2022 - Nov 2023</span>
          <span><i class="far fa-flask"></i>Research Project</span>
        </div>
        <i>Some of the figures presented below are reproduced from the author's manuscript published<sup>1</sup> in The Journal of Physical Chemistry Letters. Copyright American Chemical Society, 2024.</i>
        <h3>At a Glance: Scope, Methodology, and Key Findings</h3>
        <p>In this project, I investigated a novel porous material called NU-601. NU-601 is a metal-organic framework interesting from the standpoint of solar energy conversion.<br> I carried out <b>organic</b> and <b>inorganic synthesis</b>, including under <b>high pressure</b> conditions. I tested quality with <b>X-ray diffraction (XRD)</b>, <b>scanning electron microscopy (SEM)</b>, <b>UV-Vis spectroscopy</b>, <b>fluorescence spectroscopy</b>, <b>BET surface area analysis</b>, and <b>time-resolved fluorescence spectroscopy</b>.<br> I managed the project from start to finish, including experimental design, data collection, analysis, visualisation, and report writing. I also collaborated with computational chemists and microscopists.<br> I carried out <b>target analysis></b> by reducing dimensionality of a large dataset, then imposing a <b>population model</b> to characterise the dataset as a combination of 3 key components.<br> My study enabled fundamental understanding and opened a new direction of research, helping secure another large grant from the U.S. Department of Energy Solar program.</p>
        <br>
        <h3>NU-601: The Structure Under Study</h3>
        <p><b>Metal-organic frameworks (MOFs)</b> are modular materials composed of metal-oxo clusters called <b>nodes</b> and organic molecules referred to as <b>linkers</b>. 
        One application for MOFs is light harvesting. The term originates from natural photosynthesis, where light energy is captured by large collections of pigments. The linkers in a MOF can also be thought of as pigments. To predict if they would do well as light harvesters, we need to understand how they interact with light. I used a MOF called NU-601 as a test case.</p>
        <p>The figure below depicts a zirconium node, one of the secondary building units in NU-601. The node is composed of six zirconium atoms connected by oxygen atoms. In the image, it is depicted coated (<i>ligated</i>) by a collection of acetate groups. Acetates are <i>carboxylates</i>, ions containing a carboxyl group (-COO<sup>-</sup>).</p>
        <figure>
          <img src="assets/images/nu601_img0_zrnode.png" alt="An image of the zirconium node, depicted with 12 ligating acetates." class="nu601-img1">
          <figcaption><i>In this depiction of the zirconium node, zirconium atoms are shown in dark teal, oxygen in red, and carbon in brown.</i></figcaption>
        </figure>
        <p>The node, as depicted, has a formal chemical formula of Zr<sub>6</sub>O<sub>4</sub>(OH)<sub>4</sub>(CH<sub>3</sub>COO)<sub>12</sub>. The "(CH<sub>3</sub>COO)<sub>12</sub>" part describes the acetates. This acetate-ligated zirconium node representation was built from a crystal structure reported earlier.<sup>2</sup> The node is very <i>stable</i>: it is resistant to chemicals and heat. It is assumed to be <b>insulating</b> and not to interact with light very much. This assumption will be substantiated in a section below.</p>
        <p>Let us take a look at the part that does interact with light, the linker.</p>
        <figure>
          <img src="assets/images/nu601_img1_total.png" alt="A depiction of the organic linker in NU-601: a pyrene core with benzoate groups in positions 4,5,9,10." class="nu601-img2">
          <figcaption><i>In this depiction of the organic linker, the molecule is viewed from two different angles.</i></figcaption>
        </figure>
        <p>The linker is a <b>tetra-phenylcarboxylate</b> The linker is sometimes referred to as <b>iso-H<sub>4</sub>TBAPy</b>. Just like the acetate, the linker is a carboxylate. Unlike the acetate, the linker has 4 carboxylate groups. Also, it does not bend. This means that the linker can connect (link) 4 nodes. The nodes, in turn, can bind up to 12 linkers (same as with acetates). In reality, this linker is too big, and 12 of them will not fit around the node.</p>
        <p>The node can carry a combination of linkers and small carboxylates. Small carboxylates can be replaced by other small molecules, like hydroxyl (OH<sup>-</sup>) and water (H<sub>2</sub>O). In NU-601, each node bears 6 linkers, leaving 6 sites be occupied with hydroxyl and water groups. Water is often referred to as aqua.</p>
        A representation of the framework is shown in the next figure.</p>
        <figure>
          <img src="assets/images/nu601_img3_assembled.png" alt="Self-assembly of the NU-601 framework, with a cutout of the extended structure." class="nu601-img3">
          <figcaption><i>(Top part) The node and the linker combine into extended, three-dimensional structure. (Bottom part) This three-dimensional structure can extend many "cells", forming a framework and resulting in the formation of large, accessible channels.</i></figcaption>
        </figure>
        <p>The importance of those hydroxyl and water groups is that they engender <i>acid-base</i> chemistry to the node. The <b>H</b> atoms in the hydroxo and water groups can dissociate as <b>H<sup>+</sup></b>, and will do so if the environment is sufficiently alkaline.</p>
        <p><b>To recap</b>, NU-601 is a Zr-based MOF composed of Zr-based nodes and tetra-phenylcarboxylate linkers. Each linker is connected to 4 nodes. Each node supports 6 linkers with 6 more occupied by hydroxyl and water groups. The linkers and nodes align into a large, three-dimensional structure. When aqua and hydroxo groups are present on the node, they can lose their protons (H<sup>+</sup>) in alkaline conditions. This does not affect the linker-node connections.</p>
        <p>Look back at the image depicting the framework and note how large the channels are compared to solid material; this means that the nodes and the linkers are exposed to whatever environment the framework finds itself in. External air and water can access the insides of the framework.</p>
        <br>
        <h3>The Excited State</h3>
        <p>In the above discussion of NU-601's structure, we have observed that the formation of the framework locks a large collection of molecules - the linkers - into close proximity. Their rigid connections with the nodes hold them in place. They may absorb incoming light. Absorption of light usually boils down to an interaction between a molecule (or a cluster, like the node) and a photon. For absorption to occur, the energy of this photon needs to match an <i>energy gap</i> between <i>energy levels</i> present in the material. We talk about this in terms of <i>ground</i> and <i>excited</i> states; the difference in their energies is equal to that gap.<br>It turns out that the ground-excited energy gap for the zirconium node is far larger than that for the linker. If the ground and excited states were like banks of a river, and you wished to connect them with a bridge, you would find it much easier for the linker than for the node. As a result, a common assumption in zirconium MOF science is that the node is <b>inert</b>. Very high energy light ("hard UV") would be required to excite it.<br>
        The properties of the excited state have to be determined in order to quantitatively assess a material's light harvesting potential.<br>
        One simple method that can yield information about the excited state is fluorescence spectroscopy. First, the material is excited with UV light. The excited state cannot exist indefinitely, so it eventually decays (relaxes) back to the ground state. This relaxation often results in light being emitted back. Glow-in-the-dark materials work on this principle.</p>
        <p>Here is a helpful diagram summarising excited states and fluorescence. <i>(You will notice that the linker excited state has a few sub-levels indicated with thinner lines. A full explanation for the presence of these lines is beyond the scope of this piece, but, if you are curious, you should look up vibrational energy levels and the Stokes shift).</i></p>
        <figure>
          <img src="assets/images/nu601_img4_gsesDiagram.png" alt="A simplified Jablonski diagram showing that a UV photon can excite the linker, but not the node. Fluorescence also shown." class="nu601-img4">
          <figcaption><i>A UV photon (purple) can excite the linker but not the node. Excitation will eventually decay through fluorescence. Fluorescence is slightly lower in energy than the initial photon; this phenomenon is known as the Stokes shift.</i></figcaption>
        </figure>
        <p>Therefore, in a fluorescence experiment, we first <i>excite</i> the material with monochromatic UV light, then use a spectrometer to measure the signal, i.e. the light given off by the material. The signal can be described in terms of intensity and energy. Intensity describes the number of photons emitted, i.e. how bright the fluorescence is. The energy describes the colour of the fluorescence. Typically, the colours will be confined to a small region of the visible light spectrum. When multiple colours or hues are present, the <i>monochromator</i> inside the <i>fluorometer</i> will separate them. The fluorescence spectrum, therefore, is a statistical distribution and can be plotted on an x-y graph, where the x-axis describes energy (same as wavelength or colour) and the y-axis describes intensity (same as brightness or number of photons). In studies like this one, we are not interested in absolute intensity and want only the distribution, so spectra are often <i>normalised</i> to have a maximum intensity of 1 or 100%. The figure below shows normalised fluorescence spectra for the NU-601 MOF and the linker.</p> 
        <figure>
          <img src="assets/images/nu601_img5_fluorescenceSpectra.png" alt="A figure showing overlaid fluorescence spectra for NU-601 and its linker. The spectrum of the MOF is concentrated on the lower energy side." class="nu601-img5">
          <figcaption><i>Fluorescence spectra for the linker (red, dashed) and NU-601 (purple, solid).</i></figcaption>
        </figure>
        <p>The fluorescence spectrum of the MOF is markedly different from that of the linker on its own. This feature of NU-601 is unusual. It shows that the excited state in NU-601 relaxes, or decays, through a pathway different from that of the linker. Since the linkers within the MOF are chemically equivalent to free linkers, and do not interact among themselves, the reason has to lie with the node. This is unusual, because the node's high <b>energy gap</b> should render it inert, and it should not affect the excited state. And yet it did.</p> 
        <p>Here's my proof.</p>
        <br>
        <h3>The Node's Role in the Excited State Equilibrium</h3>
        <p>Earlier, I showed that the node in NU-601 is connected to only 6 linkers. The remaining binding sites are chemically active. This means they can interact with the environment. Most notably, the hydroxyl (OH<sup>-</sup>) and aqua (H<sub>2</sub>O) groups can lose protons (H<sup>+</sup>) in alkaline conditions. We can drive (de)protonation of the node by changing the properties of the solution that the MOF is immmersed in. <b>Important reminder</b>: the linkers <b>lack</b> the functionality to interact with the solution, because the carboxylate groups are bound, and the organic backbone, composed of hexagonal phenyl rings, is hydrophobic and highly stable. <br>The easiest way to change the properties of the solution is to change its <b>pH</b>.<br>The pH scale is a logarithmic scale describing the concentration of protons (H<sup>+</sup>) in solution. Low pH values (0-6) correspond to high proton concentrations; high pH values (8-14) correspond to low proton concentrations. A pH of 7 is considered neutral.<br>The logic we are applying here is as follows: if the node affects the excited state of the linker, then changing the protonation state of the node should affect the fluorescence spectrum of the MOF. If the node does not affect the excited state, then changing its protonation state should have no effect on the fluorescence spectrum. Notably, my colleagues working on the computational theoretical side of the project predicted that there <b>should</b> be an effect.</p>
        <p>Furthermore, we could even predict at <i>which</i> pH values the effect should be most pronounced. The interactions between the nodes and the protons in solution as a function of pH can be summarised with a set of mathematical relationships, the Henderson-Hasselbalch equations. These equations relate the pH of the solution to the ratio of protonated and deprotonated species on the node surface. To apply the equations, one needs to know how likely the different oxygen-containing groups are to (de)protonate at a given pH. This likelihood is captured in a constant called pK<sub>a</sub>. The pK<sub>a</sub> values for the zirconium nodes are known from literature<sup>3</sup>. By plugging these values into the equations, we can visualise the populations of different (de)protonated node species versus pH.</p>
        <figure>
          <img src="assets/images/nu601_img6_populations.png" alt="A figure showing relative populations of different protonated node species changing as a function of pH. There are 4 different protonation states accessible in the 0-14 range." class="nu601-img6">
          <figcaption><i>(Top panel) Relative populations of different protonated node species changing as a function of pH. The intersection points correspond to known pK<sub>a</sub> values. (Bottom panel) Protonation states of the node, color-coded to match the curves.</i></figcaption>
        </figure>
        <p>From this expected distribution of species, we can make initial predictions. If (de)protonation of the node affects the linker-centered excited state, then the changes in the fluorescence spectrum should be most drastic when the pH values correspond to the points at which population curves intersect. This is under the assumption that the changes in the node protonation state have any effect on the linker at all; if they do not, then the fluorescence spectrum should remain unchanged regardless of the pH.</p> 
        <p>Therefore, we had a hypothesis, and a concrete prediction for what pH range we should cover. We needed experimental data. So I immersed the MOF into water and systematically changed the pH, causing protons (H<sup>+</sup>) to move between the surface of the node and the solution. These operations required precisely <b>calibrated</b> pH measurements, careful weight measurements on an <b>analytical balance</b>, and a lot of patience. The final dataset contained fluorescence spectra of the NU-601 MOF at 81 different pH values between ~2 (strongly acidic) and 9 (weakly basic). These spectra are reproduced below.</p>
        <figure>
          <img src="assets/images/nu601_img7_spectra.png" alt="The first panel is a heatmap plot with energy on the x-axis, pH on the y-axis, and colour indicating intensity. The second panel is an x-y plot with energy on the x-axis, intensity on the y-axis. There are 4 curves obtained by averaging all spectra in the ranges of pH of 0 to 3.3, 3.3 to 5.8, 5.8 to 8.2, and 8.2 to 8.5." class="nu601-img7">
          <figcaption><i>(Left panel) A heatmap plot showing all the fluorescence spectra. Energy is on x-axis, pH is on y-axis, and colour indicates intensity. (Right panel) Representative fluorescence spectra obtained by averaging all spectra recorded in the pH ranges shown on the legend.</i></figcaption>
        </figure>
        <p>A heatmap plot, used here, highlights that fluorescence spectra change significantly as pH increases. These changes can also be visualised on simple x-y plots, where instead of showing all 81 spectra I simply averaged the ones that fall into the 4 pH ranges or bins. The bins match to the population curves I'd shown earlier. To sum it up, these plots clearly show that the fluorescence gets stronger and the shape of the spectrum changes. We can conclude that the changes in pH, which affect the node chemistry, have a direct effect on the excited state of the linker.</p>
        <p>But why? Put simply, the linker and the node actually act together through a special kind of excited state delocalised over both of them. When protons are removed from the node, this shared excited state ceases to exist, and is replaced by one centered purely on the linker. As a consequence, by changing the pH we can actually change the electronic properties of the entire system.</p>
        <p>There is one more insight to be found here. In the last figure, I have binned the spectra into 4 groups chosen based on the population curves. There is a caveat here: The population curves are built from equilibrium thermodynamics, while the excited state is a dynamic, non-equilibrium phenomenon. Therefore, the pH values at which the most drastic changes in fluorescence occur may not exactly match the intersection points of the population curves. We can cast this in terms of the equations we had used to build those population curves. Those depended on the pK<sub>a</sub> values, which corresponded to the ground state. The excited state will have its own pK<sub>a</sub> values, pK<sub>a</sub><sup>*</sup>. They can be determined through target analysis.</p>
        <p>In target analysis, we take the data, reduce its dimensionality through singular value decomposition, then fit the resulting components to a chemically-informed model. We'll use the same population equations, but treat the pK<sub>a</sub> values as fitting parameters. In the last figure, shown below, I demonstrate the decomposition of our experimental spectra into componennts, the relative proportions of which change the pH. As you can see, the intersection points of the population curves have moved to about 2.0 and 6.6, respectively, indicating that the excited state is more acidic than the ground state, which is consistent with expectations.</p>
        <figure>
          <img src="assets/images/nu601_img8_target.png" alt="Target analysis shows 3 unique components. They have pH-dependent populations with intersections at 2 and 6.6. They reproduce experimental spectra well." class="nu601-img7">
          <figcaption><i>(Left panel) A series of rebinned fluorescence spectra with fits plotted over them in black dashed line. The color indicates pH (red = low, blue = high). (Right, top panel) Unique spectral components identified through target analysis. (Right, bottom panel) Populations of unique spectral components, changing with pH.</i></figcaption>
        </figure>
        <p>Such decomposition is a powerful tool for understanding complex datasets. Here, it has allowed us to determine the acidity of the excited state, which is a rare and valuable insight.</p>
        <br>
        <h3>Summary and Conclusions</h3>
        <p>In this large-scale project, I have studied the excited state properties in a zirconium-based metal-organic framework, NU-601. I have demonstrated that the node, previously assumed to be inert, actually plays a crucial role in determining the properties of the excited state. By changing the pH of the solution surrounding the MOF, I was able to drive (de)protonation of the node surface, which in turn affected the fluorescence spectrum of the linker-centered excited state. This finding challenges existing assumptions about zirconium MOFs and opens up new avenues for tuning their photophysical properties through surface chemistry
        .</p>
        <br>
        <h3>Some Pretty Images</h3>
        <br>
        <h3>Bibliography</h3>
        <ul>
          <li><strong>[1] Kramar, B. V.; Bondarenko, A. S.; Koehne, S. M.; Diroll, B. T.; Wang, X.; Yang, H.; Schanze, K. S.; Chen, L. X.; Tempelaar, R.; Hupp, J. T. Unexpected Photodriven Linker-to-Node Hole Transfer in a Zirconium-Based Metal–Organic Framework. J. Phys. Chem. Lett. 2024, 15 (46), 11496–11503. https://doi.org/10.1021/acs.jpclett.4c02848.
</li>
          <li><strong>[2] Lu, Z.; Wang, R.; Liao, Y.; Farha, O. K.; Bi, W.; Sheridan, T. R.; Zhang, K.; Duan, J.; Liu, J.; Hupp, J. T. Isomer of Linker for NU-1000 Yields a New She-Type, Catalytic, and Hierarchically Porous, Zr-Based Metal–Organic Framework. Chem. Commun. 2021, 57 (29), 3571–3574. https://doi.org/10.1039/D0CC07974J.
</li>
          <li><strong>[3] Klet, R. C.; Liu, Y.; Wang, T. C.; Hupp, J. T.; Farha, O. K. Evaluation of Brønsted Acidity and Proton Topology in Zr- and Hf-Based Metal–Organic Frameworks Using Potentiometric Acid–Base Titration. J. Mater. Chem. A 2016, 4 (4), 1479–1485. https://doi.org/10.1039/C5TA07687K.
</li>
        </ul>
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
      // After setting modalContent.innerHTML
      setTimeout(setupTooltips, 50);
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // 👇 ADD EDGE DETECTION HERE 👇
      // Force reflow to trigger proper scrolling
      modalContent.offsetHeight;
      // Add slight delay for perfect calculation
      setTimeout(() => {
        setupTooltips();
      }, 100);
      
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

// 👇 PLACE THE setupTooltips FUNCTION HERE (outside the event listener) 👇
function setupTooltips() {
  const modalContent = document.querySelector('.modal-content');
  const modalRect = modalContent.getBoundingClientRect();
  
  document.querySelectorAll('.tooltip-container').forEach(container => {
    const trigger = container.querySelector('.tooltip-trigger');
    const tooltip = container.querySelector('.tooltip-content');
    const triggerRect = trigger.getBoundingClientRect();
    
    // Reset edge classes
    container.classList.remove('left-edge', 'right-edge', 'bottom-edge');
    
    // Get tooltip dimensions
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Check boundaries
    const spaceAbove = triggerRect.top - modalRect.top;
    const spaceBelow = modalRect.bottom - triggerRect.bottom;
    const spaceLeft = triggerRect.left - modalRect.left;
    const spaceRight = modalRect.right - triggerRect.right;
    
    // Bottom edge detection (not enough space above)
    if (spaceAbove < tooltipRect.height + 20) {
      container.classList.add('bottom-edge');
    }
    
    // Right edge detection
    if (spaceRight < tooltipRect.width/2) {
      container.classList.add('right-edge');
    } 
    // Left edge detection
    else if (spaceLeft < tooltipRect.width/2) {
      container.classList.add('left-edge');
    }
  });
  
  // Re-enable tooltips
  document.querySelectorAll('.tooltip-content').forEach(t => {
    t.style.visibility = 'visible';
    t.style.opacity = '0';
  });
}

// Close modal function
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Escape key handler
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});
});

