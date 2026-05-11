const sampleText = `OAC Meeting Notes — Project North Yard — 2026-05-11

Attendees: Owner rep, GC PM, site manager, electrical subcontractor, mechanical subcontractor, architect.

1. Electrical to provide updated lighting submittal for Level 2 corridor by Friday.
2. Mechanical noted conflict between duct route and sprinkler main above Grid B4. Architect to clarify whether ceiling height can be reduced or duct rerouted.
3. GC decided to keep temporary access road open until concrete pour is complete.
4. Site manager asked who owns patching around new penetrations in Room 214. Needs confirmation from architect/spec.
5. Drywall subcontractor will repair damaged board at stair core before next inspection.
6. Owner requested updated cost impact for alternate door hardware.
7. Electrical says drawing E-203 does not match latest architectural reflected ceiling plan. Possible RFI.
8. Mechanical to send revised equipment delivery dates.
9. Architect confirmed lobby tile color selection is approved.
10. GC to coordinate weekend work notice with neighboring tenants.`;

const tradeMap = [
  ['electrical', 'Electrical'], ['electrician', 'Electrical'], ['mechanical', 'Mechanical'],
  ['hvac', 'Mechanical'], ['sprinkler', 'Fire protection'], ['drywall', 'Drywall'],
  ['architect', 'Architect'], ['owner', 'Owner'], ['gc', 'GC'], ['site manager', 'GC'],
  ['concrete', 'Concrete'], ['plumbing', 'Plumbing'], ['structural', 'Structural'],
  ['civil', 'Civil'], ['tenant', 'Tenant coordination']
];

const actionWords = [' to ', ' will ', ' needs to ', ' action', ' follow up', ' provide ', ' send ', ' coordinate ', ' repair ', ' update ', ' prepare '];
const rfiWords = ['clarify', 'conflict', 'does not match', 'drawing', 'spec', 'unknown', 'confirmation', 'confirm whether', 'possible rfi', '?'];
const decisionWords = ['decided', 'agreed', 'approved', 'confirmed', 'selection is approved'];
const reviewWords = ['asked', 'who owns', 'needs confirmation', 'requested', 'missing', 'tbd'];

let state = { actions: [], rfis: [], decisions: [], review: [], allRows: [] };
let activeTab = 'actions';

const $ = (id) => document.getElementById(id);
const notes = $('notes');
const results = $('results');

$('sampleBtn').addEventListener('click', () => { notes.value = sampleText; notes.focus(); });
$('clearBtn').addEventListener('click', () => { notes.value = ''; state = { actions: [], rfis: [], decisions: [], review: [], allRows: [] }; render(); });
$('generateBtn').addEventListener('click', () => { state = parseNotes(notes.value); activeTab = 'actions'; updateTabs(); render(); });
$('copyCsvBtn').addEventListener('click', () => copyText(toCsv(state.allRows), 'CSV copied'));
$('copyEmailBtn').addEventListener('click', () => copyText(toEmail(state), 'Email summary copied'));
$('downloadCsvBtn').addEventListener('click', downloadCsv);

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => {
    activeTab = button.dataset.tab;
    updateTabs();
    renderResults();
  });
});

function parseNotes(text) {
  const parsed = { actions: [], rfis: [], decisions: [], review: [], allRows: [] };
  const lines = text.split(/\n+/).map(cleanLine).filter(Boolean);

  for (const line of lines) {
    if (/^(attendees|oac meeting|meeting notes)/i.test(line)) continue;
    const lower = line.toLowerCase();
    const party = detectParty(lower, line);
    const due = detectDue(line);
    const trade = detectTrade(lower);

    if (decisionWords.some((word) => lower.includes(word))) {
      addRow(parsed, 'decisions', { type: 'Decision', party, trade, item: simplifyDecision(line), source: line, due, confidence: 'Medium', review: 'Verify decision wording' });
    }

    if (rfiWords.some((word) => lower.includes(word))) {
      addRow(parsed, 'rfis', { type: 'RFI candidate', party: party || 'Design team / GC', trade, item: toRfiText(line), source: line, due, confidence: 'Medium', review: 'Confirm before issuing formal RFI' });
    }

    if (actionWords.some((word) => lower.includes(word))) {
      addRow(parsed, 'actions', { type: 'Action', party, trade, item: toActionText(line), source: line, due, confidence: party === 'Needs review' ? 'Low' : 'Medium', review: due === 'Add due date' ? 'Add due date' : 'Check assignment' });
    }

    if (reviewWords.some((word) => lower.includes(word))) {
      addRow(parsed, 'review', { type: 'Needs review', party, trade, item: line, source: line, due, confidence: 'Low', review: 'Needs human decision or assignment' });
    }
  }

  // De-duplicate rough overlaps while keeping useful categories.
  for (const key of ['actions', 'rfis', 'decisions', 'review']) {
    parsed[key] = dedupe(parsed[key]);
  }
  parsed.allRows = [...parsed.actions, ...parsed.rfis, ...parsed.decisions, ...parsed.review];
  return parsed;
}

function cleanLine(line) {
  return line.replace(/^\s*\d+[.)]\s*/, '').replace(/^[-•]\s*/, '').trim();
}
function detectTrade(lower) {
  const found = tradeMap.find(([needle]) => lower.includes(needle));
  return found ? found[1] : 'General';
}
function detectParty(lower, original) {
  const found = tradeMap.find(([needle]) => lower.includes(needle));
  if (found) return found[1];
  const match = original.match(/^([A-Z][A-Za-z /&-]{1,35})\s+(to|will|shall|needs to|requested)/);
  return match ? match[1].trim() : 'Needs review';
}
function detectDue(line) {
  const match = line.match(/\b(by\s+[^.]+|before\s+[^.]+|until\s+[^.]+|next\s+[^.]+)\b/i);
  return match ? match[0] : 'Add due date';
}
function toActionText(line) {
  return line.replace(/^(.*?)(\bto\b|\bwill\b|\bneeds to\b)/i, (_, before, verb) => `${before.trim()} ${verb}` ).trim();
}
function toRfiText(line) {
  if (/possible rfi/i.test(line)) return line.replace(/possible rfi\.?/i, 'Confirm discrepancy and issue RFI if unresolved.');
  if (/clarify/i.test(line)) return line;
  return `Clarify: ${line}`;
}
function simplifyDecision(line) { return line.replace(/^(.*?)(decided|confirmed|approved)/i, '$1$2').trim(); }
function addRow(parsed, bucket, row) { parsed[bucket].push(row); }
function dedupe(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.type}|${row.item.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function updateTabs() {
  document.querySelectorAll('.tab').forEach((button) => button.classList.toggle('active', button.dataset.tab === activeTab));
}
function render() {
  $('actionCount').textContent = state.actions.length;
  $('rfiCount').textContent = state.rfis.length;
  $('decisionCount').textContent = state.decisions.length;
  $('questionCount').textContent = state.review.length;
  const total = state.allRows.length;
  $('summaryBadge').textContent = total ? `${total} draft rows` : 'No output yet';
  const hasRows = total > 0;
  ['copyCsvBtn', 'downloadCsvBtn', 'copyEmailBtn'].forEach((id) => $(id).disabled = !hasRows);
  renderResults();
}
function renderResults() {
  const rows = state[activeTab] || [];
  results.className = rows.length ? 'results result-list' : 'results empty-state';
  if (!rows.length) {
    results.innerHTML = '<p>No rows in this category yet.</p>';
    return;
  }
  results.innerHTML = rows.map((row) => `
    <article class="result-item ${cssClass(row.type)}">
      <div class="result-meta">
        <span class="pill">${escapeHtml(row.type)}</span>
        <span class="pill">${escapeHtml(row.party)}</span>
        <span class="pill">${escapeHtml(row.trade)}</span>
        <span class="pill">${escapeHtml(row.confidence)} confidence</span>
      </div>
      <strong>${escapeHtml(row.item)}</strong>
      <p class="source-line"><b>Due:</b> ${escapeHtml(row.due)} · <b>Review:</b> ${escapeHtml(row.review)}</p>
      <p class="source-line"><b>Source:</b> ${escapeHtml(row.source)}</p>
    </article>`).join('');
}
function cssClass(type) {
  if (type.includes('RFI')) return 'rfi';
  if (type.includes('Decision')) return 'decision';
  if (type.includes('review')) return 'review';
  return 'action';
}
function toCsv(rows) {
  const header = ['Type', 'Responsible party', 'Trade', 'Item', 'Due date', 'Confidence', 'Needs review', 'Source line'];
  return [header, ...rows.map((r) => [r.type, r.party, r.trade, r.item, r.due, r.confidence, r.review, r.source])]
    .map((row) => row.map(csvCell).join(',')).join('\n');
}
function csvCell(value) { return `"${String(value || '').replace(/"/g, '""')}"`; }
function toEmail(parsed) {
  const lines = ['Draft follow-up from meeting notes', '', 'Actions:'];
  parsed.actions.forEach((r) => lines.push(`- ${r.party}: ${r.item} (${r.due})`));
  lines.push('', 'RFI candidates:');
  parsed.rfis.forEach((r) => lines.push(`- ${r.item}`));
  lines.push('', 'Decisions:');
  parsed.decisions.forEach((r) => lines.push(`- ${r.item}`));
  lines.push('', 'Needs review before sending:', '- Confirm assignments, due dates, and RFI wording.');
  return lines.join('\n');
}
async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast('Copy failed — use browser permissions or download CSV');
  }
}
function downloadCsv() {
  const blob = new Blob([toCsv(state.allRows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'construction-meeting-rfi-tracker.csv';
  a.click();
  URL.revokeObjectURL(url);
}
function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

render();
