const $ = (selector) => document.querySelector(selector);

async function api(path, method = "GET", body = null) {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

function tag(value) {
  if (value === "sent" || value === "paid" || value === "partially_paid") return `<span class="tag">${value}</span>`;
  if (value === "failed") return `<span class="tag error">${value}</span>`;
  return `<span class="tag warn">${value}</span>`;
}

function formJson(form) {
  const fd = new FormData(form);
  const raw = Object.fromEntries(fd.entries());
  const out = {};
  Object.entries(raw).forEach(([k, v]) => {
    if (v === "") return;
    if (["contractor_id", "monitoring_system_id", "payment_term_days", "block_after_due_days", "disable_after_day"].includes(k)) {
      out[k] = Number(v);
    } else if (k === "price_per_vehicle") {
      out[k] = Number(v);
    } else {
      out[k] = v;
    }
  });
  return out;
}

async function loadSummary() {
  const s = await api("/dashboard/summary");
  $("#summary").innerHTML = `
    <div class="metric"><div class="label">Клиентов</div><div class="value">${s.total_clients}</div></div>
    <div class="metric"><div class="label">Активных</div><div class="value">${s.active_clients}</div></div>
    <div class="metric"><div class="label">Документов</div><div class="value">${s.documents_total}</div></div>
    <div class="metric"><div class="label">Сумма</div><div class="value">${s.amount_total}</div></div>
  `;
}

async function loadContractors() {
  const contractors = await api("/contractors");
  $("#contractorList").innerHTML = contractors
    .map((c) => `<span class="chip">#${c.id} ${c.name} (${c.accounting_provider})</span>`)
    .join("");
  $("#contractorSelect").innerHTML = contractors
    .map((c) => `<option value="${c.id}">#${c.id} ${c.name}</option>`)
    .join("");
}

let selectedMonitoringSystemId = null;

async function loadMonitoringSystems() {
  const systems = await api("/monitoring-systems");
  $("#monitoringList").innerHTML = systems
    .map(
      (s) => `<div class="monitoring-item${selectedMonitoringSystemId === s.id ? " active" : ""}" data-id="${s.id}">
        <span>${s.name}</span>
        <small>${s.code}</small>
      </div>`
    )
    .join("");
  $("#monitoringSelect").innerHTML = systems
    .map((s) => `<option value="${s.id}">#${s.id} ${s.name}</option>`)
    .join("");
}

async function loadClients() {
  const qs = selectedMonitoringSystemId ? `?monitoring_system_id=${encodeURIComponent(selectedMonitoringSystemId)}` : "";
  const clients = await api(`/clients${qs}`);
  $("#clientsTable").innerHTML = clients
    .map(
      (c) => `<tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.contractor_name}</td>
        <td>${c.monitoring_system_name}</td>
        <td>${c.price_per_vehicle} ₽</td>
        <td>${c.payment_term_days}</td>
      </tr>`
    )
    .join("");
}

async function loadDocs() {
  const month = $("#monthFilter").value.trim();
  const qs = month ? `?month=${encodeURIComponent(month)}` : "";
  const docs = await api(`/billing/documents${qs}`);
  $("#docsTable").innerHTML = docs
    .map(
      (d) => `<tr>
        <td>${d.id}</td>
        <td>${d.client_name}</td>
        <td>${d.contractor_name}</td>
        <td>${d.monitoring_system_name}</td>
        <td>${d.period_month}</td>
        <td>${d.amount}</td>
        <td>${tag(d.email_status)}</td>
        <td>${tag(d.payment_status)}</td>
      </tr>`
    )
    .join("");
}

async function reloadAll() {
  await Promise.all([loadSummary(), loadContractors(), loadMonitoringSystems(), loadClients(), loadDocs()]);
}

$("#seedBtn").addEventListener("click", async () => {
  await api("/demo/seed", "POST");
  await reloadAll();
});

$("#refreshBtn").addEventListener("click", reloadAll);
$("#filterBtn").addEventListener("click", loadDocs);

$("#contractorForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = formJson(e.target);
  payload.customer_type = payload.customer_type || "company";
  await api("/contractors", "POST", payload);
  e.target.reset();
  await reloadAll();
});

$("#monitoringForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = formJson(e.target);
  await api("/monitoring-systems", "POST", payload);
  e.target.reset();
  await reloadAll();
});

$("#monitoringList").addEventListener("click", (e) => {
  const item = e.target.closest(".monitoring-item");
  if (!item) return;
  const id = Number(item.dataset.id);
  selectedMonitoringSystemId = selectedMonitoringSystemId === id ? null : id;
  reloadAll().catch((err) => {
    console.error(err);
    alert(`Ошибка загрузки: ${err.message}`);
  });
});

$("#clientForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = formJson(e.target);
  payload.customer_type = "company";
  await api("/clients", "POST", payload);
  e.target.reset();
  await reloadAll();
});

reloadAll().catch((err) => {
  console.error(err);
  alert(`Ошибка загрузки: ${err.message}`);
});
