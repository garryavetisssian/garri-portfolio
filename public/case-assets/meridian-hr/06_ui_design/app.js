/**
 * Meridian HR — Requests prototype integration layer.
 * Vanilla JS, no frameworks. Renders every reviewed screen state into #main-content
 * using only classes already defined in foundations.css — no new component styles.
 * Routing is hash-based so browser back/forward work with no extra plumbing.
 */

// ---------- Demo data (seeds the same examples used across 06_ui_design/*.html) ----------
let requests = [
  {
    id: 'r1', title: 'Benefits open enrollment question', category: 'Benefits', date: '2 days ago', status: 'waiting',
    actionRequired: "Priya from HR asked which plan tier you're enrolling in. Reply below to keep this moving.",
    messages: [
      { from: 'employee', text: 'Can you share the details of the new benefits plan before open enrollment closes?', time: '2 days ago, 9:14 AM' },
      { from: 'system', text: 'Status updated 2 times' },
      { from: 'hr', name: 'Priya Nair · HR', text: 'Happy to help — we have three tiers this year. Which plan are you currently enrolled in, or are you enrolling for the first time?', time: 'Yesterday, 11:02 AM' }
    ],
    attachments: [{ name: '2026-benefits-guide.pdf', size: '1.2 MB' }]
  },
  {
    id: 'r2', title: 'PTO request — May 3–10', category: 'Leave', date: 'Yesterday', status: 'with-hr',
    messages: [
      { from: 'employee', text: "I'd like to take leave from May 3–10 for a family trip. Let me know if you need anything else from me.", time: 'Yesterday, 4:12 PM' },
      { from: 'system', text: 'Request received — assigned to HR' }
    ],
    attachments: []
  },
  {
    id: 'r3', title: 'Copy of signed contract', category: 'Documents', date: '3 days ago', status: 'with-hr',
    messages: [
      { from: 'employee', text: 'Could I get a copy of my signed contract for a visa application?', time: '3 days ago, 9:00 AM' },
      { from: 'system', text: 'Request received — assigned to HR' }
    ],
    attachments: []
  },
  {
    id: 'r4', title: 'Updated my bank details', category: 'Payroll', date: '1 week ago', status: 'resolved',
    messages: [
      { from: 'employee', text: 'My direct deposit details changed — new account attached. Can you update this before the next pay run?', time: '1 week ago, 10:05 AM' },
      { from: 'hr', name: 'Priya Nair · HR', text: 'Updated on our end and confirmed with payroll — this will apply from your next pay run. Let us know if anything looks off after that.', time: '6 days ago, 2:20 PM' },
      { from: 'system', text: 'Status updated 2 times' }
    ],
    attachments: [{ name: 'voided-check.pdf', size: '210 KB' }]
  },
  {
    id: 'r5', title: 'Question about remote work policy', category: 'Other', date: '3 weeks ago', status: 'closed',
    messages: [
      { from: 'employee', text: "Are we still core-hours 10am–3pm CT if I'm working from another state for a month?", time: '3 weeks ago, 1:40 PM' },
      { from: 'hr', name: 'Priya Nair · HR', text: 'Yes — core hours stay the same regardless of location. Just flag it in Slack #status like usual. Let us know if that changes.', time: '3 weeks ago, 3:02 PM' },
      { from: 'system', text: 'Status updated 3 times — Resolved, then Closed' }
    ],
    attachments: []
  }
];
let nextIdNum = 6;
let pendingAttachments = []; // files staged in the Create Request drawer, cleared on submit/close

// ---------- Persisted UI state (survives re-renders and hash navigation within a session) ----------
const DEFAULT_CATEGORY = 'Benefits';
let appState = { filter: 'needs-you', search: '' }; // list-pane filter tab + search query
let draftRequest = { title: '', description: '', category: DEFAULT_CATEGORY }; // Create Request drawer, in progress
let formErrors = { title: false, description: false };

function resetDraft() {
  pendingAttachments = [];
  draftRequest = { title: '', description: '', category: DEFAULT_CATEGORY };
  formErrors = { title: false, description: false };
}

// ---------- Status metadata (mirrors color.semantic.employeeStatus in design_tokens.json) ----------
const STATUS_META = {
  'with-hr':  { label: 'With HR',        steps: ['complete', 'current', 'upcoming'] },
  'waiting':  { label: 'Waiting for you', steps: ['complete', 'complete', 'current', 'upcoming'] },
  'resolved': { label: 'Resolved',        steps: ['complete', 'complete', 'current'] },
  'closed':   { label: 'Closed',          steps: ['complete', 'complete', 'complete'] }
};
const STEP_LABELS = {
  'with-hr': 'Submitted → With HR → Resolved',
  'waiting': 'Submitted → With HR → Waiting for you → Resolved',
  'resolved': 'Submitted → With HR → Resolved',
  'closed': 'Submitted → With HR → Resolved'
};
// Per-dot labels (Item B) — same sequence as STEP_LABELS, just not pre-joined, so each one can be
// rendered directly under its own dot instead of as one trailing string.
const STEP_NAMES = {
  'with-hr': ['Submitted', 'With HR', 'Resolved'],
  'waiting': ['Submitted', 'With HR', 'Waiting for you', 'Resolved'],
  'resolved': ['Submitted', 'With HR', 'Resolved'],
  'closed': ['Submitted', 'With HR', 'Resolved']
};

const ICON = {
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2.5h9l3.5 3.5V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  alert: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 16.5h.01"/><circle cx="12" cy="12" r="9"/></svg>',
  attach: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17.5 8.5 9.9 16.1a3 3 0 1 1-4.2-4.2l8.5-8.5a2 2 0 1 1 2.8 2.8L8.6 14.6a1 1 0 1 1-1.4-1.4l7-7"/></svg>',
  search: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  inbox: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5V14a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4V16.5A2.5 2.5 0 0 1 4 14V5.5Z"/></svg>'
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Reusable component renderers (match foundations.css classes exactly) ----------
function statusBadge(status) {
  const meta = STATUS_META[status];
  return `<span class="status-badge ${status}"><span class="dot"></span>${meta.label}</span>`;
}

function progressTracker(status) {
  const steps = STATUS_META[status].steps;
  const names = STEP_NAMES[status];
  let html = `<div class="progress-tracker" role="img" aria-label="Progress: ${escapeHtml(STEP_LABELS[status])}, currently ${escapeHtml(STATUS_META[status].label)}">`;
  steps.forEach((s, i) => {
    html += `<div class="progress-step"><div class="step ${s}"></div><span class="step-label">${escapeHtml(names[i])}</span></div>`;
    if (i < steps.length - 1) {
      const connectorState = (s === 'complete') ? 'complete' : 'upcoming';
      html += `<div class="connector ${connectorState}"></div>`;
    }
  });
  html += `</div>`;
  return html;
}

function messageBubble(m) {
  if (m.from === 'system') {
    return `<div class="system-event-group">${ICON.clock}${escapeHtml(m.text)}</div>`;
  }
  const cls = m.from === 'employee' ? 'employee' : 'hr';
  const sender = m.from === 'employee' ? 'You' : escapeHtml(m.name);
  const msgAttachments = m.attachments?.length
    ? `<div class="msg-attachments">${m.attachments.map(a => attachmentChip(a, false)).join('')}</div>`
    : '';
  return `<div class="message-bubble ${cls}">
    <div class="sender">${sender}</div>
    <p>${escapeHtml(m.text)}</p>
    ${msgAttachments}
    <span class="timestamp">${escapeHtml(m.time)}</span>
  </div>`;
}

function attachmentChip(a, removable, removeAction = 'remove-pending-attachment') {
  const remove = removable ? `<button type="button" class="remove" aria-label="Remove ${escapeHtml(a.name)}" data-action="${removeAction}" data-name="${escapeHtml(a.name)}">✕</button>` : '';
  return `<span class="attachment-chip">${ICON.file}${escapeHtml(a.name)} <span class="size">· ${escapeHtml(a.size)}</span>${remove}</span>`;
}

function requestCard(r, selectedId) {
  const needsYou = r.status === 'waiting' ? ' needs-you' : '';
  const selected = r.id === selectedId ? ' selected' : '';
  const current = r.id === selectedId ? ' aria-current="true"' : '';
  return `<button type="button" class="request-card${needsYou}${selected}" data-nav="/requests/${r.id}"${current}>
    <div class="row-top"><span class="title">${escapeHtml(r.title)}</span>${statusBadge(r.status)}</div>
    <div class="meta"><span class="category-tag">${escapeHtml(r.category)}</span>·<span>${escapeHtml(r.date)}</span></div>
  </button>`;
}

function sortedForList() {
  // "Needs you" first, regardless of recency — per product_design_direction.md §4.
  return [...requests].sort((a, b) => (a.status === 'waiting' ? -1 : 0) - (b.status === 'waiting' ? -1 : 0));
}

// ---------- List filtering + search (Items #1, #7 — live search and a persisted filter tab,
// both backed by appState so navigating away and back never silently resets them) ----------
function getFilteredList() {
  let list = sortedForList();
  if (appState.filter === 'needs-you') list = list.filter(r => r.status === 'waiting');
  const q = appState.search.trim().toLowerCase();
  if (q) list = list.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q));
  return list;
}

function renderListCards(selectedId) {
  const list = getFilteredList();
  if (list.length) return list.map(r => requestCard(r, selectedId)).join('');
  if (appState.search.trim()) {
    return `<div class="empty-state neutral compact">
      <div class="icon-circle">${ICON.search}</div>
      <p class="text-body-md">No requests match "${escapeHtml(appState.search.trim())}". Try a different search, or clear it to see everything.</p>
      <button type="button" class="btn-text" data-action="clear-search">Clear search</button>
    </div>`;
  }
  return `<div class="empty-state neutral compact"><div class="icon-circle">${ICON.inbox}</div><p class="text-body-md">Nothing needs you right now.</p><button type="button" class="btn-text" data-action="filter" data-filter="all">View all requests</button></div>`;
}

function filterTabs(activeTab) {
  const tab = activeTab || appState.filter;
  return `<div class="filter-tabs" role="group" aria-label="Filter requests">
    <button type="button" class="filter-tab${tab === 'needs-you' ? ' selected' : ''}" aria-pressed="${tab === 'needs-you'}" data-action="filter" data-filter="needs-you">Needs you</button>
    <button type="button" class="filter-tab${tab === 'all' ? ' selected' : ''}" aria-pressed="${tab === 'all'}" data-action="filter" data-filter="all">All</button>
  </div>`;
}

function listPane(selectedId) {
  return `<div class="detail-list-pane">
    <div class="list-toolbar">
      ${filterTabs()}
      <input class="input" type="search" aria-label="Search requests" placeholder="Search requests" value="${escapeHtml(appState.search)}">
    </div>
    <div class="request-list" id="request-list">${renderListCards(selectedId)}</div>
  </div>`;
}

function composer(requestId, closed) {
  const notice = closed ? `<div class="closed-notice" style="margin-bottom:12px">This request is closed — sending a message below will reopen it.</div>` : '';
  return `${notice}<form class="composer" data-request-id="${requestId}" data-action="send-reply">
    <div class="composer-toolbar" role="group" aria-label="Formatting">
      <button type="button" class="composer-format" data-action="format" data-format="bold" aria-label="Bold"><strong>B</strong></button>
      <button type="button" class="composer-format" data-action="format" data-format="italic" aria-label="Italic"><em>I</em></button>
    </div>
    <textarea class="input" placeholder="${closed ? 'Ask a follow-up…' : 'Write a message…'}" required></textarea>
    <div class="composer-footer">
      <button type="button" class="composer-attach">${ICON.attach}Attach files</button>
      <button type="submit" class="btn-primary" disabled>Send</button>
    </div>
  </form>`;
}

function requestDetail(r) {
  const closed = r.status === 'closed';
  return `<div class="detail-header">
      <div>
        <h2 class="text-h3" style="margin:0 0 4px">${escapeHtml(r.title)}</h2>
        <div class="meta-line">${escapeHtml(r.category)} · Opened ${escapeHtml(r.date)}</div>
      </div>
      ${statusBadge(r.status)}
    </div>
    ${progressTracker(r.status)}
    ${r.status === 'waiting' ? `<div class="action-required">
      <div class="icon">${ICON.alert}</div>
      <div><strong>HR needs more information from you</strong><p>${escapeHtml(r.actionRequired || '')}</p></div>
    </div>` : ''}
    <div class="conversation-feed">${r.messages.map(messageBubble).join('')}</div>
    ${r.status === 'resolved' ? `<div class="resolved-prompt">
      <p>Did this answer your question?</p>
      <div class="actions"><span class="text-caption text-secondary">No action needed — this closes on its own soon.</span>
      <button type="button" class="btn-text" data-action="focus-reply">No, follow up</button></div>
    </div>` : ''}
    ${r.attachments.length ? `<div class="attachments-summary"><h3 class="text-h3">Files in this request</h3><div class="chip-row">${r.attachments.map(a => attachmentChip(a, false)).join('')}</div></div>` : ''}
    ${composer(r.id, closed)}`;
}

function detailPlaceholder() {
  return `<div style="display:flex; align-items:center; justify-content:center; flex:1;">
    <p class="text-secondary">Select a request from the list to view it here.</p>
  </div>`;
}

function createDrawer() {
  const categories = ['Benefits', 'Payroll', 'Documents', 'Leave', 'Other'];
  const chips = pendingAttachments.length
    ? pendingAttachments.map(a => attachmentChip(a, true)).join('')
    : '';
  const titleError = formErrors.title ? `<span class="field-error" id="req-title-error" role="alert">Title is required.</span>` : '';
  const descError = formErrors.description ? `<span class="field-error" id="req-description-error" role="alert">Description is required.</span>` : '';
  return `<div class="scrim">
    <div class="drawer" role="dialog" aria-modal="true" aria-labelledby="new-request-title">
      <div class="drawer-header">
        <h2 id="new-request-title" class="text-h2" style="margin:0">New request</h2>
        <button type="button" class="btn-text" aria-label="Close" data-action="close-drawer">✕</button>
      </div>
      <fieldset>
        <legend class="field-label">What's this about? <span class="text-secondary" style="font-weight:400">(optional)</span></legend>
        <div class="chip-choices" role="group" aria-label="Request category" id="category-group">
          ${categories.map(c => `<button type="button" class="category-chip${c === draftRequest.category ? ' selected' : ''}" aria-pressed="${c === draftRequest.category}" data-action="pick-category">${c}</button>`).join('')}
        </div>
      </fieldset>
      <div>
        <label class="field-label" for="req-title">Title</label>
        <input class="input${formErrors.title ? ' has-error' : ''}" id="req-title" name="req-title" placeholder="e.g. Question about parental leave" value="${escapeHtml(draftRequest.title)}" aria-required="true"${formErrors.title ? ' aria-invalid="true" aria-describedby="req-title-error"' : ''}>
        ${titleError}
      </div>
      <div>
        <label class="field-label" for="req-description">Describe your request</label>
        <textarea class="input${formErrors.description ? ' has-error' : ''}" id="req-description" name="req-description" style="min-height:140px" placeholder="Tell HR what you need — the more detail, the faster this gets answered." aria-required="true"${formErrors.description ? ' aria-invalid="true" aria-describedby="req-description-error"' : ''}>${escapeHtml(draftRequest.description)}</textarea>
        ${descError}
      </div>
      <div>
        <label class="field-label" id="req-attachments-label">Attachments <span class="text-secondary" style="font-weight:400">(optional)</span></label>
        <input type="file" id="create-file-input" multiple hidden aria-hidden="true" tabindex="-1">
        <div class="dropzone" id="create-dropzone" role="group" aria-labelledby="req-attachments-label">Drag files here, or <span class="text-brand" style="font-weight:500">browse</span></div>
        <div class="chip-row" id="pending-attachments" style="display:flex;gap:8px;flex-wrap:wrap">${chips}</div>
      </div>
      <div class="drawer-footer">
        <button type="button" class="btn-text" data-action="close-drawer">Cancel</button>
        <button type="button" class="btn-primary" data-action="submit-request">Submit request</button>
      </div>
    </div>
  </div>`;
}

// ---------- Full views ----------
function pageHeader(opts) {
  opts = opts || {};
  return `<div class="page-header">
    <div class="breadcrumb" data-nav="/requests">← Demo Co</div>
    <div class="title-row">
      <div class="title-group"><h1 class="text-h1">Requests</h1></div>
      ${opts.hideCreate ? '' : '<button type="button" class="btn-primary" data-action="open-create">+ New request</button>'}
    </div>
    ${opts.desc ? `<p class="desc text-body-lg">${opts.desc}</p>` : ''}
  </div>`;
}

function renderRequestsView(selectedId, opts) {
  opts = opts || {};
  const body = pageHeader() + `<div class="detail-layout">
    ${listPane(selectedId)}
    <div class="detail-main-pane">${selectedId ? requestDetail(requests.find(r => r.id === selectedId)) : detailPlaceholder()}</div>
  </div>`;
  if (!opts.showCreate) return body;
  // While the create-request drawer is open, the list/detail behind it must be genuinely inert —
  // unreachable by keyboard and hidden from assistive tech — not just visually present underneath.
  // `inert` (native) handles focus + pointer-events; aria-hidden is kept alongside for older AT.
  return `<div inert aria-hidden="true" style="display:flex; flex-direction:column; flex:1; min-height:0;">${body}</div>` + createDrawer();
}

function renderEmptyDemo() {
  return pageHeader({ desc: 'Ask HR a question, request a document, or follow up on something — and track it here.' }) +
    `<div class="empty-state invite">
      <div class="icon-circle">${ICON.inbox}</div>
      <h2 class="text-h2">Nothing here yet</h2>
      <p class="text-body-lg">When you have a question for HR — a document, a policy, a leave request — start it here. You'll be able to follow it until it's answered.</p>
      <div class="actions">
        <button type="button" class="btn-primary" data-action="open-create">+ New request</button>
        <a class="btn-text" href="#">Browse the Knowledge base instead →</a>
      </div>
    </div>`;
}

function renderNoResultsDemo() {
  return pageHeader() + `<div class="detail-layout">
    <div class="detail-list-pane">
      <div class="list-toolbar">
        ${filterTabs('all')}
        <input class="input" type="search" aria-label="Search requests" value="parental" placeholder="Search requests">
      </div>
      <div class="empty-state neutral compact">
        <div class="icon-circle">${ICON.search}</div>
        <h2 class="text-h3" style="margin:0">No requests match "parental"</h2>
        <p class="text-body-md">Try a different search, or clear it to see everything.</p>
        <button type="button" class="btn-text" data-nav="/requests">Clear search</button>
      </div>
    </div>
    <div class="detail-main-pane" style="align-items:center; justify-content:center;">
      <p class="text-secondary" style="text-align:center;">Select a request from the list to view it here.</p>
    </div>
  </div>`;
}

// ---------- Router ----------
// Grouped for the Prototype Navigator so it reads like a real design review, not a random list:
// Overview (browse/discover) -> Actions (create) -> Lifecycle (the four states a request moves through.
// The Composer Drag State was previously exposed here as its own screen; it isn't a screen in the brief
// (Part 1 scope is "empty state through to closed," not a transient composer micro-interaction), so it was
// removed from navigation. The underlying drag-and-drop implementation (wireDragAndDrop, .drag-over) is
// kept and still runs live on every composer in the real screens below.
const ROUTE_GROUPS = [
  {
    label: 'Overview',
    routes: [
      { path: '/requests/empty-demo', label: 'Empty State' },
      { path: '/requests', label: 'Requests List' },
      { path: '/requests/no-results-demo', label: 'No Results' }
    ]
  },
  {
    label: 'Actions',
    routes: [
      { path: '/requests/new', label: 'New Request' }
    ]
  },
  {
    label: 'Lifecycle',
    routes: [
      { path: '/requests/r2', label: 'With HR' },
      { path: '/requests/r1', label: 'Waiting for You' },
      { path: '/requests/r4', label: 'Resolved' },
      { path: '/requests/r5', label: 'Closed' }
    ]
  }
];

function currentPath() {
  return location.hash.slice(1) || '/requests';
}

function navigate(path) {
  location.hash = path;
}

function render() {
  const path = currentPath();
  const main = document.getElementById('main-content');
  let html;

  if (path === '/requests/empty-demo') {
    html = renderEmptyDemo();
  } else if (path === '/requests/no-results-demo') {
    html = renderNoResultsDemo();
  } else if (path === '/requests/new') {
    html = renderRequestsView(null, { showCreate: true });
  } else if (path.startsWith('/requests/')) {
    const id = path.split('/')[2];
    const exists = requests.some(r => r.id === id);
    html = renderRequestsView(exists ? id : null, {});
  } else {
    html = renderRequestsView(null, {});
  }

  main.innerHTML = html;
  wireDragAndDrop();
  renderProtoNav(path);
}

const PROTO_HINT = `<span class="proto-hint" title="This bar is a reviewer tool for navigating this prototype — it is not part of the Meridian HR product itself.">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5"/><path d="M12 8h.01"/></svg>
  Prototype navigation — not part of the product
</span>`;

function renderProtoNav(activePath) {
  const nav = document.getElementById('proto-nav');
  nav.innerHTML = PROTO_HINT + ROUTE_GROUPS.map(group =>
    `<span class="proto-label">${group.label}</span>` +
    group.routes.map(r => `<a data-nav="${r.path}" class="${r.path === activePath ? 'active' : ''}">${r.label}</a>`).join('')
  ).join('');
}

function addPendingFiles(files) {
  const fileList = Array.from(files || []);
  if (!fileList.length) return;
  fileList.forEach(f => pendingAttachments.push({ name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' }));
  // draftRequest already holds whatever the employee has typed (kept in sync by the delegated
  // 'input' listener below), so re-rendering the drawer here no longer wipes title/description/
  // category — only pendingAttachments changes (Item #4).
  render();
  navigate('/requests/new');
}

// ---------- Real drag-and-drop wiring (works with actual OS file drags, not just simulated) ----------
function wireDragAndDrop() {
  document.querySelectorAll('.composer').forEach(el => {
    ['dragover', 'dragenter'].forEach(evt => el.addEventListener(evt, e => { e.preventDefault(); el.classList.add('drag-over'); }));
    ['dragleave', 'drop'].forEach(evt => el.addEventListener(evt, e => { e.preventDefault(); el.classList.remove('drag-over'); }));
  });
  const dz = document.getElementById('create-dropzone');
  const fileInput = document.getElementById('create-file-input');
  if (dz) {
    ['dragover', 'dragenter'].forEach(evt => dz.addEventListener(evt, e => { e.preventDefault(); dz.classList.add('drag-over'); }));
    ['dragleave'].forEach(evt => dz.addEventListener(evt, () => dz.classList.remove('drag-over')));
    dz.addEventListener('drop', e => {
      e.preventDefault(); dz.classList.remove('drag-over');
      addPendingFiles(e.dataTransfer.files);
    });
    dz.addEventListener('click', () => fileInput?.click());
  }
  if (fileInput) {
    fileInput.addEventListener('change', e => {
      addPendingFiles(e.target.files);
      e.target.value = '';
    });
  }
}

// ---------- Event delegation (single listener, clean/maintainable) ----------
document.addEventListener('click', e => {
  const navEl = e.target.closest('[data-nav]');
  if (navEl) { e.preventDefault(); navigate(navEl.getAttribute('data-nav')); return; }

  // Backdrop click-to-close: fires only when the click lands directly on the scrim itself, not when it
  // bubbles up from something inside .drawer. This replaces an earlier onclick="stopPropagation()" on
  // .drawer that was meant to achieve the same thing but instead blocked every click inside the drawer
  // (Submit, Cancel, category chips, attachment removal) from ever reaching this delegated listener.
  if (e.target.classList.contains('scrim')) { resetDraft(); navigate('/requests'); return; }

  const actionEl = e.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.getAttribute('data-action');

  if (action === 'open-create') { resetDraft(); navigate('/requests/new'); }
  else if (action === 'close-drawer') { resetDraft(); navigate('/requests'); }
  else if (action === 'filter') {
    appState.filter = actionEl.getAttribute('data-filter');
    const path = currentPath();
    const id = path.startsWith('/requests/') ? path.split('/')[2] : null;
    const selectedId = id && requests.some(r => r.id === id) ? id : null;
    const listPaneEl = document.querySelector('.detail-list-pane');
    if (listPaneEl) {
      listPaneEl.outerHTML = listPane(selectedId);
      document.querySelector(`.filter-tab[data-filter="${appState.filter}"]`)?.focus();
    }
  }
  else if (action === 'clear-search') {
    appState.search = '';
    render();
    document.querySelector('input[type="search"]')?.focus();
  }
  else if (action === 'format') {
    // Minimal formatting affordance (Item G) — wraps the current textarea selection in
    // markdown-style markers rather than building a full rich-text editor; the composer stays a
    // plain <textarea>, so this is real formatting capability, not a decorative toolbar.
    const textarea = actionEl.closest('.composer')?.querySelector('textarea');
    if (!textarea) return;
    const marker = actionEl.getAttribute('data-format') === 'bold' ? '**' : '_';
    const start = textarea.selectionStart, end = textarea.selectionEnd;
    const value = textarea.value;
    textarea.value = value.slice(0, start) + marker + value.slice(start, end) + marker + value.slice(end);
    textarea.focus();
    textarea.selectionStart = start + marker.length;
    textarea.selectionEnd = end + marker.length;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }
  else if (action === 'focus-reply') {
    // Employee-facing control on a resolved request — it must never mutate ticket status itself
    // (that was the role-boundary violation this replaces). It only opens the reply composer;
    // actually reopening the request happens the same way it does everywhere else: by sending
    // a message (see the 'submit' listener below).
    const textarea = document.querySelector('.composer textarea');
    if (textarea) { textarea.focus(); textarea.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  }
  else if (action === 'pick-category') {
    draftRequest.category = actionEl.textContent.trim();
    document.querySelectorAll('#category-group .category-chip').forEach(c => { c.classList.remove('selected'); c.setAttribute('aria-pressed', 'false'); });
    actionEl.classList.add('selected'); actionEl.setAttribute('aria-pressed', 'true');
  }
  else if (action === 'remove-pending-attachment') {
    const name = actionEl.getAttribute('data-name');
    pendingAttachments = pendingAttachments.filter(a => a.name !== name);
    document.getElementById('pending-attachments').innerHTML = pendingAttachments.map(a => attachmentChip(a, true)).join('');
  }
  else if (action === 'submit-request') {
    const titleEl = document.getElementById('req-title');
    const descEl = document.getElementById('req-description');
    const title = titleEl.value.trim();
    const desc = descEl.value.trim();

    formErrors.title = !title;
    formErrors.description = !desc;
    if (formErrors.title || formErrors.description) {
      draftRequest.title = titleEl.value;
      draftRequest.description = descEl.value;
      const drawerScrim = document.querySelector('.scrim');
      if (drawerScrim) drawerScrim.outerHTML = createDrawer();
      document.getElementById(formErrors.title ? 'req-title' : 'req-description')?.focus();
      return;
    }

    const category = draftRequest.category || 'Other';
    const id = 'r' + (nextIdNum++);
    requests.unshift({
      id, title, category, date: 'Just now', status: 'with-hr',
      messages: [{ from: 'employee', text: desc, time: 'Just now' }, { from: 'system', text: 'Request received — assigned to HR' }],
      attachments: pendingAttachments.slice()
    });
    resetDraft();
    navigate('/requests/' + id);
  }
});

// Delegated 'input' listener: keeps the Create Request draft (title/description) and the live
// search query in sync with what's on screen, without a full re-render on every keystroke.
document.addEventListener('input', e => {
  if (e.target.id === 'req-title') {
    draftRequest.title = e.target.value;
    if (formErrors.title && e.target.value.trim()) {
      formErrors.title = false;
      e.target.classList.remove('has-error');
      e.target.removeAttribute('aria-invalid');
      document.getElementById('req-title-error')?.remove();
    }
    return;
  }
  if (e.target.id === 'req-description') {
    draftRequest.description = e.target.value;
    if (formErrors.description && e.target.value.trim()) {
      formErrors.description = false;
      e.target.classList.remove('has-error');
      e.target.removeAttribute('aria-invalid');
      document.getElementById('req-description-error')?.remove();
    }
    return;
  }
  if (e.target.matches('.composer textarea')) {
    // Send now genuinely reflects whether there's anything to send (Item G) — previously it
    // rendered fully enabled regardless of content, the opposite of what research_ux_audit.md's
    // finding asked for.
    const sendBtn = e.target.closest('.composer')?.querySelector('button[type="submit"]');
    if (sendBtn) sendBtn.disabled = !e.target.value.trim();
    return;
  }
  if (e.target.matches('input[type="search"]')) {
    appState.search = e.target.value;
    const path = currentPath();
    const id = path.startsWith('/requests/') ? path.split('/')[2] : null;
    const selectedId = id && requests.some(r => r.id === id) ? id : null;
    const listEl = document.getElementById('request-list');
    if (listEl) listEl.innerHTML = renderListCards(selectedId);
  }
});

// Escape closes the New Request drawer and returns focus to the toggle that opened it — same
// accessible-disclosure pattern landing.js already implements for the mobile nav (Item #2).
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (currentPath() !== '/requests/new') return;
  resetDraft();
  navigate('/requests');
  setTimeout(() => document.querySelector('[data-action="open-create"]')?.focus(), 0);
});

document.addEventListener('submit', e => {
  const form = e.target.closest('[data-action="send-reply"]');
  if (!form) return;
  e.preventDefault();
  const id = form.getAttribute('data-request-id');
  const textarea = form.querySelector('textarea');
  const text = textarea.value.trim();
  if (!text) return;
  const r = requests.find(x => x.id === id);
  if (!r) return;
  r.messages.push({ from: 'employee', text, time: 'Just now' });
  if (r.status === 'waiting' || r.status === 'resolved') r.status = 'with-hr';
  else if (r.status === 'closed') { r.status = 'with-hr'; r.messages.push({ from: 'system', text: 'Reopened by your reply' }); }
  render();
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
