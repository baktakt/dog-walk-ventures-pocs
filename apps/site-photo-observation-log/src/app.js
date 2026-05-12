const sampleInput = `Photo 01 - Level 2 corridor outside stair B: damaged drywall and exposed corner bead. Ask interiors subcontractor to inspect and patch by Friday.
Photo 02 - Basement plant room: standing water near pump base after overnight rain. Safety risk, check drainage and electrical clearance today.
Photo 03 - South elevation scaffold: missing toe board on bay 4. Scaffold contractor to correct before work continues.
Photo 04 - Apartment 3B bathroom: tile delivery incomplete, only 6 boxes on site. Need supplier update and revised install date.
Photo 05 - Roof access hatch: client approved revised guardrail detail. Record as decision for closeout photos.
Photo 06 - Loading bay: waste skip overflowing and blocking delivery route. Logistics team to clear by tomorrow morning.`;

const sourceInput = document.querySelector('#sourceInput');
const results = document.querySelector('#results');
const resultStatus = document.querySelector('#resultStatus');
const copyBtn = document.querySelector('#copyBtn');
const csvBtn = document.querySelector('#csvBtn');
let currentRows = [];

document.querySelector('#sampleBtn').addEventListener('click', () => {
  sourceInput.value = sampleInput;
  sourceInput.focus();
});

document.querySelector('#clearBtn').addEventListener('click', () => {
  sourceInput.value = '';
  currentRows = [];
  render(currentRows);
});

document.querySelector('#runBtn').addEventListener('click', () => {
  currentRows = parseObservations(sourceInput.value);
  render(currentRows);
});

copyBtn.addEventListener('click', async () => copyText(formatReport(currentRows), 'Observation report copied'));
csvBtn.addEventListener('click', () => downloadCsv(currentRows));

function parseObservations(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => buildObservation(line, index + 1));
}

function buildObservation(line, fallbackNumber) {
  const photoMatch = line.match(/\b(?:photo|img|image)\s*#?\s*([\w-]+)/i);
  const photo = photoMatch ? `Photo ${photoMatch[1]}` : `Observation ${fallbackNumber}`;
  const cleaned = line.replace(/^\s*(?:photo|img|image)\s*#?\s*[\w-]+\s*[-–:]\s*/i, '').trim();
  const [beforeColon, afterColon] = splitLocation(cleaned);
  const location = beforeColon || 'Add location';
  const description = afterColon || beforeColon || cleaned;
  const category = detectCategory(description);
  const severity = detectSeverity(description);
  const status = detectStatus(description, severity);
  const nextAction = detectNextAction(description);
  const reviewFlags = buildReviewFlags(location, description, nextAction, severity);
  return { photo, location, category, issueType: detectIssueType(description), severity, status, nextAction, description, reviewFlags };
}

function splitLocation(text) {
  if (text.includes(':')) {
    const [loc, ...rest] = text.split(':');
    return [loc.trim(), rest.join(':').trim()];
  }
  const dash = text.match(/^(.{4,70}?)(?:\s[-–]\s)(.+)$/);
  if (dash) return [dash[1].trim(), dash[2].trim()];
  return ['', text.trim()];
}

function detectCategory(text) {
  const rules = [
    [/scaffold|toe board|guardrail|fall|safety|standing water|electrical/i, 'Safety / site risk'],
    [/drywall|corner bead|tile|paint|bathroom|interior/i, 'Quality / interiors'],
    [/pump|plant|drainage|electrical|mep|water/i, 'MEP / water coordination'],
    [/delivery|supplier|boxes|material/i, 'Materials / supply'],
    [/waste|skip|loading|logistics|route/i, 'Logistics / housekeeping'],
    [/roof|closeout|approved|decision/i, 'Closeout / decision record'],
  ];
  return matchRule(text, rules, 'General observation');
}

function detectIssueType(text) {
  const rules = [
    [/missing|incomplete|only \d+/i, 'Missing / incomplete'],
    [/damaged|exposed|cracked|broken/i, 'Damage / defect'],
    [/standing water|blocked|overflowing/i, 'Site condition'],
    [/approved|decision|record/i, 'Decision / record'],
    [/risk|before work continues|clearance/i, 'Safety concern'],
  ];
  return matchRule(text, rules, 'Needs classification');
}

function detectSeverity(text) {
  if (/safety|risk|electrical|scaffold|toe board|before work continues|standing water|fall/i.test(text)) return 'High';
  if (/blocked|overflowing|damaged|incomplete|missing/i.test(text)) return 'Medium';
  return 'Low';
}

function detectStatus(text, severity) {
  if (/approved|record as decision|closeout/i.test(text)) return 'Record / closed';
  if (/before work continues|today|safety|risk/i.test(text)) return 'Needs urgent review';
  if (severity === 'High') return 'Open — high priority';
  return 'Open';
}

function detectNextAction(text) {
  const actionPatterns = [
    /(ask\s+.+)$/i,
    /(check\s+.+)$/i,
    /((?:[A-Z][a-z]+|[a-z]+)\s+contractor\s+to\s+.+)$/i,
    /(need\s+.+)$/i,
    /(record\s+.+)$/i,
    /([A-Z][a-z]+\s+team\s+to\s+.+)$/,
  ];
  for (const pattern of actionPatterns) {
    const match = text.match(pattern);
    if (match) return capitalize(match[1].replace(/\.$/, ''));
  }
  return 'Assign owner and next action';
}

function buildReviewFlags(location, description, nextAction, severity) {
  const flags = [];
  if (location === 'Add location') flags.push('Add exact location');
  if (nextAction === 'Assign owner and next action') flags.push('Assign owner');
  if (severity === 'High') flags.push('Human safety/quality review required');
  if (!/by |today|tomorrow|before|friday|monday|tuesday|wednesday|thursday/i.test(description)) flags.push('Add due date if follow-up is needed');
  return flags;
}

function matchRule(text, rules, fallback) {
  const found = rules.find(([pattern]) => pattern.test(text));
  return found ? found[1] : fallback;
}

function render(rows) {
  const highCount = rows.filter((row) => row.severity === 'High').length;
  const reviewCount = rows.reduce((sum, row) => sum + row.reviewFlags.length, 0);
  document.querySelector('#observationCount').textContent = rows.length;
  document.querySelector('#highCount').textContent = highCount;
  document.querySelector('#reviewCount').textContent = reviewCount;
  resultStatus.textContent = rows.length ? `${rows.length} draft observations` : 'Waiting';
  copyBtn.disabled = rows.length === 0;
  csvBtn.disabled = rows.length === 0;
  if (!rows.length) {
    results.className = 'empty-state';
    results.innerHTML = '<p>Use the sample or paste your own notes, then create a draft observation log.</p>';
    return;
  }
  results.className = 'result-stack';
  results.innerHTML = rows.map(observationCard).join('');
}

function observationCard(row) {
  const kind = row.severity === 'High' ? 'review' : row.status.includes('closed') ? 'decision' : 'action';
  return `<article class="result-card ${kind}">
    <div class="result-meta">
      <span class="pill">${escapeHtml(row.photo)}</span>
      <span class="pill">${escapeHtml(row.severity)} severity</span>
      <span class="pill">${escapeHtml(row.status)}</span>
    </div>
    <h3>${escapeHtml(row.location)}</h3>
    <p>${escapeHtml(row.description)}</p>
    <dl class="observation-details">
      <div><dt>Category</dt><dd>${escapeHtml(row.category)}</dd></div>
      <div><dt>Issue type</dt><dd>${escapeHtml(row.issueType)}</dd></div>
      <div><dt>Next action</dt><dd>${escapeHtml(row.nextAction)}</dd></div>
      <div><dt>Review flags</dt><dd>${escapeHtml(row.reviewFlags.join('; ') || 'None')}</dd></div>
    </dl>
  </article>`;
}

function formatReport(rows) {
  const lines = ['Site photo observation log — draft', ''];
  rows.forEach((row, index) => {
    lines.push(`${index + 1}. ${row.photo} — ${row.location}`);
    lines.push(`   Description: ${row.description}`);
    lines.push(`   Category: ${row.category}`);
    lines.push(`   Severity: ${row.severity}`);
    lines.push(`   Status: ${row.status}`);
    lines.push(`   Next action: ${row.nextAction}`);
    lines.push(`   Review flags: ${row.reviewFlags.join('; ') || 'None'}`);
    lines.push('');
  });
  lines.push('Draft assistant: review before using on a real project.');
  return lines.join('\n');
}

function downloadCsv(rows) {
  const header = ['photo', 'location', 'category', 'issue_type', 'severity', 'status', 'next_action', 'review_flags', 'description'];
  const body = rows.map((row) => [row.photo, row.location, row.category, row.issueType, row.severity, row.status, row.nextAction, row.reviewFlags.join('; '), row.description]);
  const csv = [header, ...body].map((cells) => cells.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'site-photo-observation-log.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast('Copy failed. Try downloading CSV instead.');
  }
}

function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

render(currentRows);
