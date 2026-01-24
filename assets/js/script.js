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
        <h3>NU-601: The Structure Under Study</h3>
        <p><b>Metal-organic frameworks</b> have recently won a Nobel Prize in Chemistry. These modular materials are composed of metal-oxo clusters and organic molecules referred to as linkers or struts. 
        Nodes and linkers are referred to as secondary building units (SBUs). Chemists have developed a lot of different SBUs; by mixing and matching them, many different MOF structures can be created. 
        The materials offer some of the highest surface areas ever reported for solids. The modularity of MOFs allows researchers to tune the materials towards specific applications. One such application is light harvesting. The term originates from natural photosynthesis, where light energy is captured and converted into chemical energy. In natural photosynthesis, light harvesting is driven by pigment molecules acting as a coherent network of antennas.
        In this work, I explored the potential of a zirconium-based MOF, NU-601,<sup>1</sup> to act as a light-harvesting antenna. To understand whether the material is suitable, we first need to understand the fundamental mechanism by which it interacts with light.</p>
        <br>
        <p>The figure below depicts a zirconium node, one of the secondary building units in NU-601. The node is composed of six zirconium atoms connected by oxygen atoms. In the image, it is depicted coated (<i>ligated</i>) 
        by a collection of carboxylate molecules.</p>
        <br>
        <figure>
          <img src="assets/images/nu601_img0_zrnode.png" alt="An image of the zirconium node, depicted with 6 carboxylate groups and 6 hydroxide/aqua pairs." class="nu601-img0">
          <figcaption><i>In this depiction of the zirconium node, zirconium atoms are shown in dark teal, oxygen in red, and carbon in brown.</i></figcaption>
        </figure>
        <br>
        <p>The node, as depicted, has a formal chemical formula of Zr<sub>6</sub>O<sub>4</sub>(OH)<sub>4</sub>(CH<sub>3</sub>COO)<sub>12</sub>. The [Zr<sub>6</sub>O<sub>4</sub>(OH)<sub>4</sub>] part is referred to as the <i>core</i>. It has a total formal charge of +12. The 12 carboxylate (more specifically, <i>acetate</i>) groups form the <i>ligand shell</i> around the core and carry a total charge of -12. 
        This acetate-ligated zirconium node representation was built from a crystal structure reported earlier.<sup>2</sup> Before we move on, there are two important details that must be highlighted. First, the node is very <b>stable</b>: it is resistant to chemicals and heat. Second, and particularly important in the context of light harvesting, it is generally assumed to be <b>insulating</b>. Complex theoretical and experimental work has shown that the node does not participate in the collection and conversion of light into energy. Consequently, the 
        properties of MOFs pertaining to light harvesting are usually ascribed to the organic linkers.</p>
        <br>
        <p>Speaking of, let us take a look at the linker in NU-601.</p>
        <br>
        <figure>
          <img src="assets/images/nu601_img1_total.png" alt="A depiction of the organic linker in NU-601: a pyrene core with benzoate groups in positions 4,5,9,10." class="nu601-img1">
          <figcaption><i>In this depiction of the organic linker, the molecule is viewed from two different angles.</i></figcaption>
        </figure>
        <br>
        <p>The linker is a <b>tetra-phenylcarboxylate</b> based on a pyrene core. The pyrene core is a flat, aromatic molecule composed of four fused benzene rings. The phenylcarboxylate groups are attached in positions 4, 5, 9 and 10 of the pyrene core. The linker is sometimes referred to as <b>iso-H<sub>4</sub>TBAPy</b>.  
        The attachment between the linker and the MOF occurs through the carboxylate (-COO) groups. The linker has 4 of them. Therefore, the linker is capable of connecting 4 nodes. The have enough attachment points for up to 12 linkers: this is a callback to the fact that the isolated node structure I've shown you earlier has 12 acetate ligands on it. Acetate also has a carboxylate group, although only one, which means it's incapable of binding nodes together. This makes acetate a <i>capping group</i>.
        At this stage, let us assert that the node, with its 12 binding sites, can carry a combination of linkers and capping groups that sums up to 12. Generally speaking, in zirconium-based MOFs, the linker is typically utilising all of its carboxylate groups to bind nodes, but not all binding sites on the node can be occupied by linkers due to steric hindrance.
        As a matter of fact, in the MOF under study, NU-601, there are 6 linkers connected to each node, leaving 6 binding sites for capping groups. Each binding site has to be occupied by <i>something</i> under standard conditions.
        A representation of the framework is shown in the next figure.</p>
        <br>
        <figure>
          <img src="assets/images/nu601_img3_mof.png" alt="Self-assembly of the NU-601 framework, with a cutout of the extended structure." class="nu601-img2">
          <figcaption><i>(Top part) The node and the linker combine into extended, three-dimensional structure. (Bottom part) This three-dimensional structure can extend many "cells", forming a framework and resulting in the formation of large, accessible channels.</i></figcaption>
        </figure>
        <br>
        <p>It turns out, however, that the capping groups themselves do not have to be carboxylates. A lot of research in the Hupp group at Northwestern University went into showing that the capping group (usually formate, rather than acetate, but the point stands) can be easily 
        replaced by a <i>hydroxo/aqua pair</i>. Hydroxo refers to the OH<sup>-</sup> group, while aqua refers to water, i.e. H</sub>2</sub>O. One important difference between a carboxylate-carrying ligand like acetate or formate, and a hydroxo/aqua pair lies in the fact that the latter
        engenders <i>acid-base</i> chemistry to the node. The <b>H</b> atoms in the hydroxo and aqua groups can dissociate as H<sup>+</sup>, and will do so if the environment is sufficiently alkaline.</p>
        <br>
        <p>To recap, NU-601 is a Zr-based MOF composed of Zr-based nodes and tetra-phenylcarboxylate linkers. Each linker is connected to 4 nodes. Each node supports 6 linkers with 6 more sites available for capping groups or hydroxo/aqua pairs. The linkers and nodes align into a large, three-dimensional structure. When aqua and hydroxo groups are present on the node,
        they can lose their protons (H<sup>+</sup>) in alkaline conditions. This does not affect the linker-node connections. In fact, much of the chemical resilience associated with Zr-MOFs arises from the strong, multiple connections between linkers and nodes. Put simply, unless conditions are extreme, it is extremely unlikely that
        all 4 connections between a linker and nodes will fail.</p>
        <br>
        <p>Look back at the image depicting the framework and note how large the channels are compared to solid material; this means that the nodes and the linkers are exposed to whatever environment the framework finds itself in. External air and water can access the insides of the framework.</p>
        <h3>The Excited State</h3>
        <p>As we have established earlier, in natural photosynthesis light harvesting is performed by large collections of pigments. In the above discussion of NU-601's structure, we have observed that the formation of the framework locks a large collection of molecules - the linkers - into close proximity. Their rigid connections with the nodes hold them in place.</p>
        <br>
        <p>
        Light-matter interactions in a framework material like NU-601, in principle, are based on light-matter interactions for linkers and nodes. Within the general idea of using frameworks as light-harvesting antennas, we want the material to absorb light and harness its energy to perform useful work. Absorption of light usually boils down to an interaction between a molecule (or a cluster, like the node) and a photon. For absorption to occur, the energy of this photon needs to match an <i>energy gap</i> between <i>energy levels</i> present in the material. We talk about this in terms of <i>ground</i> and <i>excited</i> states; the difference in their energies is equal to that gap.<br>It turns out that the ground-excited energy gap for the zirconium node is far larger than that for the linker. If the ground and excited states were like banks of a river, and you wished to connect them with a bridge, you would find it much easier for the linker than for the node. As a result, a common assumption in zirconium MOF science is that the node is <b>inert</b>. Very high energy light ("hard UV") would be required to excite it, and the unstable excited state would rapidly cease to exist.
        <br>
        I challenged this assumption by systematically changing the environment. Earlier, I showed that the node in NU-601 is connected to only 6 linkers. The remaining binding sites are chemically active. This means they can interact with the environment. I immersed the MOF into water and systematically changed the pH, causing protons (H<sup>+</sup>) to move between the surface of the node and the solution. <b>Important</b>: the linkers <b>lack</b> the functionality to interact with the solution, because the carboxylate groups are bound, and the organic backbone - the rings - are hydrophobic and highly stable. <br>
        As I changed the pH, I measured <i>fluorescence spectra</i> of the material. A fluorescence measurement is taken by first <i>exciting</i> the material with light of a specific colour; this colour corresponds to a specific energy that our material absorbs particularly well. In the case of NU-601, this colour is in the ultraviolet (UV) range. After excitation, the material radiates the light back out: as the excited state relaxes back to the ground state, the absorbed energy needs to go somewhere. The colour of the outbound light provides information about the excited state. This information is critical to understand how the excited state works, and what light harvesting functionality the material may have.
        </p>
        <p>
        We will now have to get into some fundamentals. In a nutshell, absorption of light by an organic molecule causes an <b>excited state</b> to form. The excited state is unstable and decays after some time. The time to decay depends on factors both internal and external to the molecule. <br>Internal factors are tied to the molecule's structure.<br>External factors come from the environment. For any NU-601 linker, the environment consists of the following:<br>
        - other linkers and nodes<br>
        - the <b>medium</b> filling the pores of the MOF<br>
        Let's start with the linkers. This one's easy. Neighboring linkers in NU-601 do not affect other linkers. The reasons have to do with geometry. In most cases, molecules oriented at exactly 90 degrees (right angles) with respect to each other do not interact when light absorption is concerned.
        <br>
        When it comes to the <b>nodes</b>, the situation is a bit more complex. Earlier, we have stated that the nodes do not interact with light in a significant way. In other words, we assumed them to be <i>inert</i>. The reason is that the nodes have a very high <i>bandgap</i>. Our study began with a simple question: just how inert, how innocent are the nodes? <br>
        The <b>medium</b> filling the pores of the MOF turned out to be quite important. 
        </p>
        

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

