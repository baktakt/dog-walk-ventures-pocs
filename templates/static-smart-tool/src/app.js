const sampleInput = `Sample field notes

1. Team A needs to provide updated document package by Friday.
2. Drawing note conflicts with specification section 08 71 00. Confirm correct requirement.
3. Client approved option B for the next revision.
4. Coordinator asked who owns follow-up with supplier.
5. Team B will send revised schedule dates before next meeting.`;

const sourceInput = document.querySelector('#sourceInput');
const results = document.querySelector('#results');
const resultStatus = document.querySelector('#resultStatus');
const copyBtn = document.querySelector('#copyBtn');
const downloadBtn = document.querySelector('#downloadBtn');

let currentResult = { actions: [], review: [], decisions: [] };

document.querySelector('#sampleBtn').addEventListener('click', () => {
  sourceInput.value = sampleInput;
  sourceInput.focus();
});

document.querySelector('#clearBtn').addEventListener('click', () => {
  sourceInput.value = '';
  currentResult = { actions: [], review: [], decisions: [] };
  render(currentResult);
});

document.querySelector('#runBtn').addEventListener('click', () => {
  currentResult = extractDraft(sourceInput.value);
  render(currentResult);
});

copyBtn.addEventListener('click', async () => {
  await copyText(formatSummary(currentResult), 'Summary copied');
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(currentResult, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dog-walk-smart-tool-output.json';
  a.click();
  URL.revokeObjectURL(url);
});

function extractDraft(text) {
  const lines = text.split(/\n+/).map(cleanLine).filter(Boolean);
  const actions = [];
  const review = [];
  const decisions = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (/^(sample|notes|field notes)/i.test(line)) continue;
    if (/(approved|decided|confirmed|agreed)/i.test(line)) decisions.push(makeRow('Decision', line, 'Verify wording'));
    if (/(needs to| will | to provide| to send| by | before )/i.test(` ${line} `)) actions.push(makeRow('Action', line, detectDue(line)));
    if (/(conflict|confirm|asked|who owns|missing|unclear|\?)/i.test(line)) review.push(makeRow('Review flag', line, 'Needs human review'));
  }

  return { actions: unique(actions), review: unique(review), decisions: unique(decisions) };
}

function cleanLine(line) {
  return line.replace(/^\s*\d+[.)]\s*/, '').replace(/^[-•]\s*/, '').trim();
}

function makeRow(type, text, note) {
  return { type, text, note, confidence: type === 'Review flag' ? 'Low' : 'Medium' };
}

function detectDue(text) {
  const match = text.match(/\b(by\s+[^.]+|before\s+[^.]+|next\s+[^.]+)\b/i);
  return match ? match[0] : 'Add due date';
}

function unique(rows) {
  const seen = new Set();
  return rows.filter((row) => {
    const key = `${row.type}:${row.text.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function render(result) {
  const total = result.actions.length + result.review.length + result.decisions.length;
  document.querySelector('#actionCount').textContent = result.actions.length;
  document.querySelector('#reviewCount').textContent = result.review.length;
  document.querySelector('#decisionCount').textContent = result.decisions.length;
  resultStatus.textContent = total ? `${total} draft items` : 'Waiting';
  copyBtn.disabled = total === 0;
  downloadBtn.disabled = total === 0;

  if (!total) {
    results.className = 'empty-state';
    results.innerHTML = '<p>Use the sample or paste your own text, then create a draft.</p>';
    return;
  }

  results.className = 'result-stack';
  results.innerHTML = [
    ...result.actions.map((row) => resultCard(row, 'action')),
    ...result.review.map((row) => resultCard(row, 'review')),
    ...result.decisions.map((row) => resultCard(row, 'decision')),
  ].join('');
}

function resultCard(row, kind) {
  return `<article class="result-card ${kind}">
    <div class="result-meta">
      <span class="pill">${escapeHtml(row.type)}</span>
      <span class="pill">${escapeHtml(row.confidence)} confidence</span>
      <span class="pill">${escapeHtml(row.note)}</span>
    </div>
    <p>${escapeHtml(row.text)}</p>
  </article>`;
}

function formatSummary(result) {
  const lines = ['Dog Walk Ventures smart-tool draft', ''];
  for (const [label, rows] of [['Actions', result.actions], ['Review flags', result.review], ['Decisions', result.decisions]]) {
    lines.push(`${label}:`);
    if (!rows.length) lines.push('- None');
    rows.forEach((row) => lines.push(`- ${row.text} (${row.note})`));
    lines.push('');
  }
  lines.push('Review before using on real work.');
  return lines.join('\n');
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    toast(message);
  } catch {
    toast('Copy failed. Try downloading instead.');
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

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

render(currentResult);
