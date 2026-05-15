const sampleInput = `DMR period: April 2026
DMR due date: 2026-05-28

Permit requirements:
BOD, weekly, limit 30 mg/L
TSS, weekly, limit 30 mg/L
Ammonia Nitrogen, weekly, limit 10 mg/L
pH, daily, range 6.0-9.0
Flow, daily, report only
E. coli, weekly, limit 126 cfu/100mL

Lab / operator results:
parameter,sample_date,result,unit,status,source,notes
BOD,2026-04-07,22,mg/L,received,Acme Lab,
BOD,2026-04-14,,mg/L,pending,Acme Lab,lab said rerun
BOD,2026-04-21,31,mg/L,received,Acme Lab,check permit limit
TSS,2026-04-07,18,mg/L,received,Acme Lab,
TSS,2026-04-14,19,mg/L,received,Acme Lab,
TSS,2026-04-21,,mg/L,missing,,no result in email folder
Ammonia Nitrogen,2026-04-07,7.4,mg/L,received,Acme Lab,
pH,2026-04-01,7.1,su,received,Operator log,
Flow,2026-04-01,0.82,MGD,received,SCADA export,
E. coli,2026-04-07,,cfu/100mL,pending,Acme Lab,expected tomorrow`;

const inputEl = document.querySelector('#dmrInput');
const dueDateEl = document.querySelector('#dueDate');
const reportEl = document.querySelector('#report');
const summaryEl = document.querySelector('#summaryCards');
let lastRows = [];
let lastMarkdown = '';

function parseRequirements(text) {
  const reqs = new Map();
  const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (!lower.includes('limit') && !lower.includes('range') && !lower.includes('report only')) continue;
    const name = line.split(',')[0].trim();
    if (!name || name.length > 45) continue;
    const limitMatch = line.match(/limit\s+([0-9.]+)\s*([^,\n]*)/i);
    const rangeMatch = line.match(/range\s+([0-9.]+)\s*[-–]\s*([0-9.]+)/i);
    reqs.set(norm(name), {
      name,
      text: line,
      limit: limitMatch ? Number(limitMatch[1]) : null,
      limitUnit: limitMatch ? limitMatch[2].trim() : '',
      rangeLow: rangeMatch ? Number(rangeMatch[1]) : null,
      rangeHigh: rangeMatch ? Number(rangeMatch[2]) : null,
      reportOnly: lower.includes('report only')
    });
  }
  return reqs;
}

function norm(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function parseRows(text) {
  const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);
  const headerIndex = lines.findIndex(line => /parameter/i.test(line) && /sample/i.test(line) && /status/i.test(line));
  const dataLines = headerIndex >= 0 ? lines.slice(headerIndex + 1) : lines.filter(line => line.split(',').length >= 4);
  return dataLines.map(line => {
    const parts = line.split(',').map(part => part.trim());
    if (parts.length < 4) return null;
    const [parameter, sampleDate, result, unit, status = '', source = '', ...notes] = parts;
    if (!parameter || /permit requirements/i.test(parameter)) return null;
    const statusGuess = status || (result ? 'received' : 'missing');
    return {
      parameter,
      sampleDate,
      result,
      unit,
      status: statusGuess.toLowerCase(),
      source,
      notes: notes.join(', '),
      numeric: result === '' ? null : Number(result)
    };
  }).filter(Boolean);
}

function daysUntil(dateString) {
  if (!dateString) return null;
  const today = new Date();
  const due = new Date(`${dateString}T12:00:00`);
  return Math.ceil((due - today) / 86400000);
}

function analyze() {
  const text = inputEl.value.trim();
  const reqs = parseRequirements(text);
  const rows = parseRows(text);
  const due = dueDateEl.value;
  const days = daysUntil(due);
  const enriched = rows.map(row => {
    const req = reqs.get(norm(row.parameter));
    let flag = '';
    if (row.status.includes('missing') || (!row.result && !row.status.includes('pending'))) flag = 'missing';
    else if (row.status.includes('pending')) flag = 'pending';
    else flag = 'received';
    let limitFlag = '';
    if (req && row.numeric !== null) {
      if (req.limit !== null && row.numeric > req.limit) limitFlag = `Above listed limit ${req.limit} ${req.limitUnit}`;
      if (req.rangeLow !== null && (row.numeric < req.rangeLow || row.numeric > req.rangeHigh)) limitFlag = `Outside listed range ${req.rangeLow}-${req.rangeHigh}`;
    }
    return { ...row, requirement: req, flag, limitFlag };
  });
  const requiredNames = Array.from(reqs.values()).map(r => r.name);
  const seenNames = new Set(enriched.map(r => norm(r.parameter)));
  const missingParameters = requiredNames.filter(name => !seenNames.has(norm(name)));
  render(enriched, missingParameters, { due, days, reqs });
}

function render(rows, missingParameters, meta) {
  const missing = rows.filter(r => r.flag === 'missing');
  const pending = rows.filter(r => r.flag === 'pending');
  const limitFlags = rows.filter(r => r.limitFlag);
  const reviewCount = missing.length + pending.length + limitFlags.length + missingParameters.length;
  let status = 'Ready for human review';
  let statusClass = 'status-ready';
  if (reviewCount > 0) { status = 'Review needed'; statusClass = 'status-review'; }
  if (missing.length + missingParameters.length > 0) { status = 'Blocked until checked'; statusClass = 'status-blocked'; }

  summaryEl.innerHTML = `
    <div class="card"><strong class="${statusClass}">${status}</strong><span>Draft readiness</span></div>
    <div class="card"><strong>${missing.length}</strong><span>Missing rows</span></div>
    <div class="card"><strong>${pending.length}</strong><span>Pending rows</span></div>
    <div class="card"><strong>${limitFlags.length}</strong><span>Limit/range flags</span></div>`;

  const followUps = [...missing, ...pending].map(r => `- ${r.parameter} (${r.sampleDate || 'date unknown'}): ${r.flag}. ${r.source ? `Follow up with ${r.source}.` : 'Confirm source/result status.'} ${r.notes || ''}`.trim());
  const limitNotes = limitFlags.map(r => `- ${r.parameter} (${r.sampleDate}): ${r.result} ${r.unit}. ${r.limitFlag}.`);
  const absentNotes = missingParameters.map(name => `- ${name}: no matching result row found in pasted data.`);
  const dueText = meta.days === null ? 'Due date not set.' : `${meta.due} (${meta.days} day${meta.days === 1 ? '' : 's'} from today).`;

  const tableRows = rows.map(r => `<tr><td>${escapeHtml(r.parameter)}</td><td>${escapeHtml(r.sampleDate)}</td><td>${escapeHtml(r.result || '—')}</td><td><span class="badge ${r.flag}">${r.flag}</span></td><td>${escapeHtml(r.limitFlag || '—')}</td><td>${escapeHtml(r.notes || '')}</td></tr>`).join('');
  reportEl.innerHTML = `
    <h3>Deadline</h3><p>${escapeHtml(dueText)}</p>
    <h3>Follow-up checklist</h3>${listHtml([...followUps, ...absentNotes])}
    <h3>Limit / range review</h3>${listHtml(limitNotes.length ? limitNotes : ['- No limit or range flags detected from pasted rows.'])}
    <h3>Result table</h3><table><thead><tr><th>Parameter</th><th>Sample date</th><th>Result</th><th>Status</th><th>Review flag</th><th>Notes</th></tr></thead><tbody>${tableRows || '<tr><td colspan="6">No rows detected.</td></tr>'}</tbody></table>
    <h3>Reminder</h3><p>This is a draft checklist only. Verify against the actual permit and official reporting system.</p>`;

  lastRows = rows;
  lastMarkdown = markdownReport({ status, dueText, followUps, absentNotes, limitNotes, rows });
}

function listHtml(items) {
  return `<ul>${items.map(item => `<li>${escapeHtml(item.replace(/^[-•]\s*/, ''))}</li>`).join('')}</ul>`;
}

function markdownReport({ status, dueText, followUps, absentNotes, limitNotes, rows }) {
  return `# DMR missing results checklist\n\n## Status\n\n${status}\n\n## Deadline\n\n${dueText}\n\n## Follow-up checklist\n\n${[...followUps, ...absentNotes].join('\n') || '- No missing or pending items detected.'}\n\n## Limit / range review\n\n${limitNotes.join('\n') || '- No limit or range flags detected from pasted rows.'}\n\n## Result rows\n\n${rows.map(r => `- ${r.parameter} | ${r.sampleDate} | ${r.result || '—'} ${r.unit || ''} | ${r.flag}${r.limitFlag ? ` | ${r.limitFlag}` : ''}`).join('\n')}\n\n## Reminder\n\nDraft checklist only. Verify against the actual permit and official reporting system.`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function downloadCsv() {
  const header = ['parameter','sample_date','result','unit','status','review_flag','notes'];
  const csv = [header.join(','), ...lastRows.map(row => [row.parameter,row.sampleDate,row.result,row.unit,row.flag,row.limitFlag,row.notes].map(csvCell).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dmr-readiness-checklist.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

document.querySelector('#loadSample').addEventListener('click', () => { inputEl.value = sampleInput; analyze(); });
document.querySelector('#analyze').addEventListener('click', analyze);
document.querySelector('#copyReport').addEventListener('click', async () => {
  if (!lastMarkdown) analyze();
  await navigator.clipboard.writeText(lastMarkdown);
});
document.querySelector('#downloadCsv').addEventListener('click', () => {
  if (!lastRows.length) analyze();
  downloadCsv();
});
inputEl.value = sampleInput;
analyze();
