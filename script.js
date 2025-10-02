// Data: detailed post texts (example content)
const posts = [
  {
    id:1, month:"Oct 2025", date:"Oct 5, 2025",
    title:"Why Utility Network Matters",
    text:
`At GeoInformatics we consider the Utility Network not merely a technical module but the foundation of a modern operations strategy. Organizations that manage large and complex networks — electricity, water, gas, and telecommunications — face a core challenge: data fragmentation that leads to slow responses, inconsistent records, and inefficient planning.

The Utility Network addresses this by providing a single, connected model of assets and their relationships. Instead of static layers or isolated tables, the network gives a living representation where each component (lines, nodes, valves, transformers, fibers) is an entity connected to others. This enables accurate spatial analysis, end-to-end tracing, and rapid visualization of impact across the entire system.

In practice, adopting the Utility Network transforms maintenance, emergency response and long-term planning. Decisions become evidence-based, response times decrease, and the organization achieves a smoother path toward digital transformation. This text is an example excerpt from the planned campaign.`
  },
  {
    id:2, month:"Oct 2025", date:"Oct 15, 2025",
    title:"Real-time Outage Management",
    text:
`Service outages create immediate operational pressure: safety risks, customer complaints and reputational impact. The primary operational problem is rarely the technical fault itself, but locating and isolating it quickly.

With a connected Utility Network, operators can run network traces the moment an alarm or customer report is logged. The system reveals which assets are affected, which customers will lose service, and which isolation steps are required. Dispatchers get precise maps and attributes for the affected equipment, enabling them to send crews with the right tools and parts.

Real-time outage management reduces truck rolls, shortens restoration times, and supports proactive communication with stakeholders. For utility managers, this capability translates directly into operational resilience and higher customer satisfaction. This text is an example excerpt from the planned campaign.`
  },
  {
    id:3, month:"Oct 2025", date:"Oct 25, 2025",
    title:"Reducing Costs with Smart GIS",
    text:
`Cost efficiency is a major driver for investments in modern GIS. Traditional approaches often lead to repeated field visits, over-maintained assets, and uncoordinated capital spending.

Smart GIS and the Utility Network enable targeted maintenance by identifying assets at risk, optimizing crew routes, and scheduling interventions based on condition and criticality rather than fixed intervals. This reduces unnecessary work, lowers fuel and personnel costs, and improves mean time to repair.

Moreover, integrating asset lifecycle information in the network model allows planners to forecast replacements and budget proactively. The financial benefit is measurable: fewer emergency repairs, optimized inventory, and better allocation of capital expenditures. This text is an example excerpt from the planned campaign.`
  },
  {
    id:4, month:"Nov 2025", date:"Nov 5, 2025",
    title:"Data Structures: The Backbone of GIS",
    text:
`While visuals and dashboards attract attention, the real performance of GIS depends on underlying data structures. Efficient spatial indexing and appropriate storage models are essential to handle large volumes of features and raster data.

Choosing the right data structures — such as R-Trees for spatial indexing or tile-based storage for imagery — dramatically improves query response times and enables scalable operations. Poorly designed schemas or missing indexes produce slow queries and user frustration.

For technical leads, investing time in a robust data architecture pays off in long-term stability, fewer outages, and a system that scales with organizational needs. This text is an example excerpt from the planned campaign.`
  },
  {
    id:5, month:"Nov 2025", date:"Nov 15, 2025",
    title:"Practical Examples of Data Structures",
    text:
`Translating theory into practice, here are practical patterns used in GIS systems:

1) R-Tree: Optimized for spatial range queries and nearest-neighbor searches. It is ideal for datasets with points, lines and polygons where you need fast intersection or proximity queries.
2) Arrays / Raster tiles: Used for satellite imagery and grid-based analytics. Tiled arrays allow efficient retrieval of image windows and fast processing pipelines.
3) Hash tables / key-value stores: Employed for quick lookup of attribute records or metadata associated with spatial features.

Each structure is chosen to solve specific performance and usability needs; understanding these trade-offs is essential for architects building production-grade GIS. This text is an example excerpt from the planned campaign.`
  },
  {
    id:6, month:"Nov 2025", date:"Nov 25, 2025",
    title:"Best Practices for Data Management",
    text:
`Reliable GIS depends on consistent processes for data governance and quality control. Best practices include:

• Defining a business-driven data model that reflects operational workflows.
• Enforcing validation rules at capture time to prevent incorrect entries.
• Applying spatial and attribute indexing to accelerate queries.
• Maintaining version history to track changes and enable rollbacks.
• Documenting schemas, naming conventions and metadata for transparency.

Organizations that follow these practices reduce errors, enable faster onboarding of staff, and keep datasets trustworthy over time. This text is an example excerpt from the planned campaign.`
  },
  {
    id:7, month:"Dec 2025", date:"Dec 5, 2025",
    title:"Organization Overview in ArcGIS",
    text:
`ArcGIS Online and Enterprise provide a centralized organizational view for administrators and managers. A well-configured organization dashboard consolidates user accounts, credit consumption, service health and licensing status into a single pane of glass.

This visibility helps decision makers understand platform usage, identify waste, and make informed budgeting and governance choices. The organization overview is a practical tool to control platform cost and ensure that GIS services align with operational priorities. This text is an example excerpt from the planned campaign.`
  },
  {
    id:8, month:"Dec 2025", date:"Dec 15, 2025",
    title:"Roles & User Types in ArcGIS",
    text:
`Effective governance requires clear separation of duties. ArcGIS supports role-based access with roles such as Administrator, Publisher and User, and user types like Creator, Viewer and Analyst.

Mapping job functions to the minimal required permissions enforces least-privilege, reduces risk, and prevents accidental changes. Periodic reviews of roles and access help organizations adapt to staff changes and preserve operational security. This text is an example excerpt from the planned campaign.`
  },
  {
    id:9, month:"Dec 2025", date:"Dec 25, 2025",
    title:"Smart Credit Management",
    text:
`Credits are the transactional unit for many cloud GIS operations. Without governance, credit consumption can escalate unexpectedly.

Recommended practices include regular audits (for example quarterly reviews), budgeting credits per project, enabling alerts for threshold breaches, and tagging services by project to attribute costs. These steps ensure predictable spending and accountability across teams. This text is an example excerpt from the planned campaign.`
  }
];

// UI state
let state = { month: 'all', expandedAll: false };

// DOM refs
const monthsListEl = document.getElementById('monthsList');
const postsGrid = document.getElementById('postsGrid');
const fullContainer = document.getElementById('fullContainer');
const countBadge = document.getElementById('countBadge');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalText = document.getElementById('modalText');

// Build months list dynamically
const months = [...new Set(posts.map(p=>p.month))];
function initMonths(){
  monthsListEl.innerHTML = '';
  // "All" item
  const allItem = document.createElement('div');
  allItem.className = 'month-item active';
  allItem.textContent = 'All months';
  allItem.onclick = ()=> { state.month='all'; update(); };
  monthsListEl.appendChild(allItem);

  months.forEach(m=>{
    const el = document.createElement('div');
    el.className = 'month-item';
    el.textContent = m;
    el.onclick = ()=> { state.month = m; update(); };
    monthsListEl.appendChild(el);
  });
}

// Render summary grid (cards)
function renderGrid(){
  const items = posts.filter(p=> state.month==='all' ? true : p.month===state.month);
  postsGrid.innerHTML = '';
  countBadge.textContent = `${items.length} posts`;

  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card fade-in';
    card.innerHTML = `
      <div>
        <h4>${escapeHtml(p.title)}</h4>
        <div class="date">${escapeHtml(p.date)} — ${escapeHtml(p.month)}</div>
      </div>
      <div class="excerpt">${escapeHtml(truncateText(p.text,150))}</div>
    `;
    card.onclick = ()=> openModal(p);
    postsGrid.appendChild(card);
  });
}

// Render full posts (expanded)
function renderFull(){
  fullContainer.innerHTML = '';
  const items = posts.filter(p=> state.month==='all' ? true : p.month===state.month);
  items.forEach(p=>{
    const box = document.createElement('article');
    box.className = 'full-post fade-in';
    box.innerHTML = `
      <h2>${escapeHtml(p.title)}</h2>
      <div class="date">${escapeHtml(p.date)} — ${escapeHtml(p.month)}</div>
      <div class="body">${escapeHtml(p.text)}</div>
      <div class="note">Note: This text is an example of the planned post content.</div>
    `;
    fullContainer.appendChild(box);
  });
}

// Utility: truncate for excerpt
function truncateText(s,max){
  if(!s) return '';
  if(s.length<=max) return s;
  return s.slice(0,max).trim() + '…';
}

// Modal controls
function openModal(p){
  modalTitle.textContent = p.title;
  modalDate.textContent = `${p.date} — ${p.month}`;
  modalText.textContent = p.text;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
}
document.getElementById('closeModal').onclick = ()=> closeModal();
document.getElementById('copyBtn').onclick = ()=>{
  const text = modalTitle.textContent + "\n\n" + modalText.textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Copied';
    setTimeout(()=> btn.textContent = 'Copy text', 1200);
  }).catch(()=> alert('Copy failed'));
};
function closeModal(){
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
}
// close modal when clicking backdrop
document.querySelector('#modal .backdrop').onclick = closeModal;

// Download JSON
document.getElementById('downloadJson').onclick = ()=>{
  const blob = new Blob([JSON.stringify(posts, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'geoinforamtics_plan_example.json'; a.click();
  URL.revokeObjectURL(url);
};

// Print
document.getElementById('printBtn').onclick = ()=> window.print();

// Expand all toggle
document.getElementById('expandAll').onclick = (e)=>{
  state.expandedAll = !state.expandedAll;
  e.target.textContent = state.expandedAll ? 'Hide All' : 'Show All';
  if(state.expandedAll) renderFull();
  else fullContainer.innerHTML = '';
};

// Helper: escape HTML
function escapeHtml(str){
  return String(str || '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// Highlight active month
function highlightMonths(){
  [...monthsListEl.children].forEach(child=>{
    child.classList.toggle('active', state.month === 'all' ? child.textContent === 'All months' : child.textContent === state.month);
  });
}

// Update UI
function update(){
  highlightMonths();
  renderGrid();
  if(state.expandedAll) renderFull();
  else fullContainer.innerHTML = '';
  // smooth scroll top of posts
  document.querySelector('section')?.scrollIntoView({behavior:'smooth', block:'start'});
}

// Init
initMonths();
update();
