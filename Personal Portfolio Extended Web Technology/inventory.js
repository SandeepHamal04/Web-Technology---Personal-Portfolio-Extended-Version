// ===== Inventory App =====
let items = JSON.parse(localStorage.getItem("items") || "[]"); // persisted in localStorage

const nameEl = document.getElementById("itemName");
const qtyEl = document.getElementById("quantity");
const locEl = document.getElementById("location");
const searchEl = document.getElementById("searchInput");
const totalEl = document.getElementById("totalItems");
const tbody = document.getElementById("tbody");
const emptyMsg = document.getElementById("emptyMsg");

function saveItems(){
  localStorage.setItem("items", JSON.stringify(items));
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function getFiltered(){
  const q = (searchEl.value || "").toLowerCase().trim();
  return items.filter(it =>
    it.name.toLowerCase().includes(q) ||
    it.location.toLowerCase().includes(q)
  );
}

function render(){
  const filtered = getFiltered();
  totalEl.textContent = filtered.length;

  tbody.innerHTML = "";
  if(filtered.length === 0){
    emptyMsg.hidden = false;
    return;
  }
  emptyMsg.hidden = true;

  filtered.forEach((it) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="padding:10px; border-top:1px solid rgba(16,19,39,.12);">${escapeHtml(it.name)}</td>
      <td style="padding:10px; border-top:1px solid rgba(16,19,39,.12);">${it.qty}</td>
      <td style="padding:10px; border-top:1px solid rgba(16,19,39,.12);">${escapeHtml(it.location)}</td>
      <td style="padding:10px; border-top:1px solid rgba(16,19,39,.12);">
        <button class="btn" data-del="${it.id}" type="button">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("addBtn").addEventListener("click", () => {
  const name = nameEl.value.trim();
  const qty = Number(qtyEl.value || 0);
  const loc = locEl.value.trim();

  if(!name || qty <= 0 || !loc){
    alert("Please enter Item Name, Quantity (>= 1), and Location.");
    return;
  }

  items.push({ id: Date.now() + Math.random(), name, qty, location: loc });
  saveItems();
  nameEl.value = "";
  qtyEl.value = "1";
  locEl.value = "";
  render();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  nameEl.value = "";
  qtyEl.value = "1";
  locEl.value = "";
  searchEl.value = "";
  render();
});

searchEl.addEventListener("input", render);

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-del]");
  if(!btn) return;
  const id = Number(btn.dataset.del);
  items = items.filter(it => it.id !== id);
  render();
  saveItems();
});

render();
