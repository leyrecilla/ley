import { useState } from "react";

// ─── Icon component ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 22, stroke = "currentColor", fill = "none", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const IC = {
  docs:  "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  web:   ["M12 2a10 10 0 100 20A10 10 0 0012 2z","M2 12h20","M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"],
  list:  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 12l2 2 4-4",
  cam:   "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  learn: ["M22 10v6M2 10l10-5 10 5-10 5z", "M6 12v5c3 3 9 3 12 0v-5"],
  menu:  "M3 12h18 M3 6h18 M3 18h18",
  grid:  "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  rows:  "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  plus:  "M12 5v14 M5 12h14",
  check: "M20 6L9 17l-5-5",
  close: "M18 6L6 18 M6 6l12 12",
  back:  "M19 12H5 M12 5l-7 7 7 7",
  star:  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  up:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
};

const TI = { pdf:"📄", doc:"📝", photo:"🖼️", video:"▶️", course:"🎓", podcast:"🎧" };
const TC = { pdf:"#f97316", doc:"#3b82f6", photo:"#a855f7", video:"#ef4444", course:"#10b981", podcast:"#8b5cf6", _:"#6b7280" };

const seed = {
  docs: [
    { id:1, name:"Manual Impresora HP", type:"pdf", date:"2024-03", folder:"Manuales", size:"2.4 MB" },
    { id:2, name:"Factura Enero 2024",  type:"pdf", date:"2024-01", folder:"Facturas", size:"180 KB" },
    { id:3, name:"Contrato Alquiler",   type:"doc", date:"2024-02", folder:"Facturas", size:"340 KB" },
    { id:4, name:"Manual Lavadora",     type:"pdf", date:"2023-11", folder:"Manuales", size:"5.1 MB" },
    { id:5, name:"Factura Gas",         type:"pdf", date:"2024-02", folder:"Facturas", size:"95 KB"  },
    { id:6, name:"Garantía TV",         type:"photo",date:"2024-01", folder:"Manuales", size:"1.2 MB" },
  ],
  webs: [
    { id:1, name:"ChatGPT", url:"https://chatgpt.com", folder:"IA",      em:"🤖" },
    { id:2, name:"Notion",  url:"https://notion.so",   folder:"Trabajo", em:"📝" },
    { id:3, name:"GitHub",  url:"https://github.com",  folder:"Dev",     em:"💻" },
    { id:4, name:"YouTube", url:"https://youtube.com", folder:"Ocio",    em:"▶️" },
    { id:5, name:"Figma",   url:"https://figma.com",   folder:"Diseño",  em:"🎨" },
    { id:6, name:"Claude",  url:"https://claude.ai",   folder:"IA",      em:"✨" },
  ],
  lists: [
    { id:1, name:"Compra semanal", items:[{t:"Leche",c:true},{t:"Pan",c:false},{t:"Frutas",c:false},{t:"Yogur",c:true},{t:"Pasta",c:false}] },
    { id:2, name:"Tareas casa",    items:[{t:"Limpiar cocina",c:false},{t:"Aspiradora",c:true},{t:"Lavar ropa",c:false}] },
    { id:3, name:"Proyecto App",   items:[{t:"Diseño UI",c:true},{t:"Backend API",c:false},{t:"Testing",c:false},{t:"Deploy",c:false}] },
    { id:4, name:"Viaje verano",   items:[{t:"Reservar vuelo",c:true},{t:"Hotel",c:false},{t:"Maleta",c:false}] },
  ],
  shots: [
    { id:1, name:"Diseño referencia", date:"2024-03-10", folder:"Diseño",   bg:"linear-gradient(135deg,#1e3a5f,#0f2027)" },
    { id:2, name:"Error app móvil",   date:"2024-03-08", folder:"Bugs",     bg:"linear-gradient(135deg,#5f1a1a,#2d0a0a)" },
    { id:3, name:"Inspiración web",   date:"2024-03-05", folder:"Diseño",   bg:"linear-gradient(135deg,#1a5f2a,#0a2d12)" },
    { id:4, name:"Dashboard mock",    date:"2024-02-28", folder:"Trabajo",  bg:"linear-gradient(135deg,#5f3a1a,#2d1a0a)" },
    { id:5, name:"Captura recibo",    date:"2024-02-20", folder:"Docs",     bg:"linear-gradient(135deg,#2a1a5f,#100a2d)" },
    { id:6, name:"Promo interesante", date:"2024-02-15", folder:"Personal", bg:"linear-gradient(135deg,#5f1a3a,#2d0a1a)" },
  ],
  courses: [
    { id:1, name:"Figma Masterclass",    type:"video",   progress:65,  tags:["diseño","ui"]       },
    { id:2, name:"React Avanzado",        type:"course",  progress:30,  tags:["dev","react"]       },
    { id:3, name:"Podcast Marketing",     type:"podcast", progress:100, tags:["negocio"]           },
    { id:4, name:"Resumen: Atomic Habits",type:"pdf",     progress:80,  tags:["productividad"]     },
    { id:5, name:"TypeScript Basics",     type:"course",  progress:10,  tags:["dev"]               },
  ],
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  inp: { background:"#1f2937", border:"1px solid #374151", borderRadius:10, color:"#f9fafb", padding:"10px 12px", fontSize:14, outline:"none", width:"100%", fontFamily:"inherit" },
  lbl: { color:"#9ca3af", fontSize:10, fontWeight:700, letterSpacing:".06em", display:"block", marginBottom:5 },
  sb:  { background:"#f59e0b", border:"none", borderRadius:12, color:"#000", padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", width:"100%", fontFamily:"inherit", marginTop:6 },
};
const cb = (a, c = "#f59e0b") => ({
  background: a ? c+"22" : "#1f2937",
  border: `1px solid ${a ? c : "#374151"}`,
  borderRadius: 9, color: a ? c : "#9ca3af",
  padding: "6px 11px", fontSize: 12, fontWeight: 600,
  cursor: "pointer", fontFamily: "inherit",
});

// ─── Shared components ────────────────────────────────────────────────────────
const Badge = ({ l, c = "#6b7280" }) => (
  <span style={{ background:c+"22", color:c, border:`1px solid ${c}44`, borderRadius:6, fontSize:10, padding:"2px 7px", fontWeight:700, whiteSpace:"nowrap" }}>{l}</span>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position:"absolute", inset:0, zIndex:300, display:"flex", alignItems:"flex-end", background:"rgba(0,0,0,.75)", backdropFilter:"blur(4px)" }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ width:"100%", background:"#111827", borderRadius:"20px 20px 0 0", maxHeight:"78%", overflowY:"auto", borderTop:"1px solid #1f2937" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 18px 10px" }}>
        <span style={{ fontSize:17, fontWeight:800, color:"#f9fafb" }}>{title}</span>
        <button onClick={onClose} style={{ background:"#1f2937", border:"none", borderRadius:8, color:"#9ca3af", padding:7, cursor:"pointer", display:"flex" }}>
          <Icon d={IC.close} size={15} />
        </button>
      </div>
      <div style={{ padding:"4px 18px 32px", display:"flex", flexDirection:"column", gap:12 }}>{children}</div>
    </div>
  </div>
);

const TBar = ({ title, view, setView, onAdd, onBack }) => (
  <div style={{ display:"flex", alignItems:"center", padding:"12px 16px 10px", borderBottom:"1px solid #1f2937", background:"#0b0f1a", gap:8, flexShrink:0 }}>
    {onBack && (
      <button onClick={onBack} style={{ background:"#1f2937", border:"none", borderRadius:9, color:"#9ca3af", padding:"5px 7px", cursor:"pointer", display:"flex" }}>
        <Icon d={IC.back} size={17} />
      </button>
    )}
    <span style={{ flex:1, fontSize:18, fontWeight:800, color:"#f9fafb", letterSpacing:"-.4px" }}>{title}</span>
    {setView && ["grid","list"].map(v => (
      <button key={v} onClick={() => setView(v)} style={{ background:view===v?"#f59e0b22":"#1f2937", border:`1px solid ${view===v?"#f59e0b55":"transparent"}`, borderRadius:8, color:view===v?"#f59e0b":"#6b7280", padding:"5px 7px", cursor:"pointer", display:"flex" }}>
        <Icon d={v==="grid" ? IC.grid : IC.rows} size={15} />
      </button>
    ))}
    {onAdd && (
      <button onClick={onAdd} style={{ background:"#f59e0b", border:"none", borderRadius:9, color:"#000", padding:"6px 12px", fontWeight:800, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:"inherit" }}>
        <Icon d={IC.plus} size={13} stroke="#000" sw={2.5} />Añadir
      </button>
    )}
  </div>
);

const Chips = ({ items, active, onChange }) => (
  <div style={{ display:"flex", gap:6, padding:"8px 14px", overflowX:"auto", flexShrink:0 }}>
    {["Todos", ...items].map(f => (
      <button key={f} onClick={() => onChange(f)} style={{ flexShrink:0, background:active===f?"#f59e0b":"#1f2937", border:"none", borderRadius:20, color:active===f?"#000":"#9ca3af", padding:"5px 13px", fontSize:11, fontWeight:active===f?700:500, cursor:"pointer", fontFamily:"inherit" }}>{f}</button>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════
// DOCS
// ═══════════════════════════════════════════════════════════
function Docs() {
  const [view, setView] = useState("grid");
  const [items, setItems] = useState(seed.docs);
  const [folder, setFolder] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", type:"pdf", folder:"Manuales" });
  const folders = [...new Set(items.map(i => i.folder))];
  const list = folder === "Todos" ? items : items.filter(i => i.folder === folder);
  const save = () => {
    if (!form.name.trim()) return;
    setItems([...items, { id:Date.now(), ...form, date:"2024-03", size:"—" }]);
    setModal(false); setForm({ name:"", type:"pdf", folder:"Manuales" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title="Documentos" view={view} setView={setView} onAdd={() => setModal(true)} />
      <Chips items={folders} active={folder} onChange={setFolder} />
      <div style={{ flex:1, overflowY:"auto", padding:"10px 14px 24px" }}>
        {view === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {list.map(d => (
              <div key={d.id} style={{ background:"#111827", borderRadius:14, padding:14, border:"1px solid #1f2937" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{TI[d.type] || "📄"}</div>
                <div style={{ fontSize:12, fontWeight:700, color:"#f9fafb", lineHeight:1.35, marginBottom:8 }}>{d.name}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <Badge l={d.type.toUpperCase()} c={TC[d.type] || TC._} />
                  <span style={{ fontSize:10, color:"#4b5563" }}>{d.size}</span>
                </div>
                <div style={{ fontSize:10, color:"#4b5563", marginTop:5 }}>{d.folder} · {d.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {list.map(d => (
              <div key={d.id} style={{ background:"#111827", borderRadius:12, padding:"11px 14px", border:"1px solid #1f2937", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{TI[d.type] || "📄"}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#f9fafb", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</div>
                  <div style={{ fontSize:11, color:"#6b7280", marginTop:2 }}>{d.folder} · {d.date} · {d.size}</div>
                </div>
                <Badge l={d.type.toUpperCase()} c={TC[d.type] || TC._} />
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Añadir documento" onClose={() => setModal(false)}>
          <div><label style={S.lbl}>NOMBRE</label><input style={S.inp} value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nombre del documento..." /></div>
          <div>
            <label style={S.lbl}>TIPO</label>
            <div style={{ display:"flex", gap:7 }}>
              {["pdf","doc","photo"].map(t => <button key={t} style={cb(form.type===t, TC[t])} onClick={() => setForm({...form,type:t})}>{TI[t]} {t}</button>)}
            </div>
          </div>
          <div>
            <label style={S.lbl}>CARPETA</label>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {["Manuales","Facturas","Contratos"].map(f => <button key={f} style={cb(form.folder===f)} onClick={() => setForm({...form,folder:f})}>{f}</button>)}
            </div>
          </div>
          <div style={{ background:"#1f2937", border:"2px dashed #374151", borderRadius:12, padding:"18px", textAlign:"center", color:"#4b5563", fontSize:13, cursor:"pointer" }}>
            <Icon d={IC.up} size={22} /><div style={{ marginTop:6 }}>Toca para subir archivo</div>
          </div>
          <button style={S.sb} onClick={save}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// WEBS
// ═══════════════════════════════════════════════════════════
function Webs() {
  const [view, setView] = useState("grid");
  const [items, setItems] = useState(seed.webs);
  const [folder, setFolder] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", url:"https://", folder:"Trabajo", em:"🌐" });
  const folders = [...new Set(items.map(i => i.folder))];
  const list = folder === "Todos" ? items : items.filter(i => i.folder === folder);
  const emojis = ["🌐","💻","📊","🎨","🤖","▶️","📝","🛒","🎵","📱","⚡","🔗","🏠","💡","📌"];
  const save = () => {
    if (!form.name.trim() || !form.url.trim()) return;
    setItems([...items, { id:Date.now(), ...form }]);
    setModal(false); setForm({ name:"", url:"https://", folder:"Trabajo", em:"🌐" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title="Webs Favoritas" view={view} setView={setView} onAdd={() => setModal(true)} />
      <Chips items={folders} active={folder} onChange={setFolder} />
      <div style={{ flex:1, overflowY:"auto", padding:"10px 14px 24px" }}>
        {view === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            {list.map(w => (
              <a key={w.id} href={w.url} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
                <div style={{ background:"#111827", borderRadius:14, padding:"14px 8px", border:"1px solid #1f2937", textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{w.em}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:"#f9fafb", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{w.name}</div>
                  <div style={{ fontSize:9, color:"#4b5563", marginTop:3 }}>{w.folder}</div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {list.map(w => (
              <a key={w.id} href={w.url} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
                <div style={{ background:"#111827", borderRadius:12, padding:"11px 14px", border:"1px solid #1f2937", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{w.em}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:"#f9fafb" }}>{w.name}</div>
                    <div style={{ fontSize:11, color:"#6b7280", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginTop:2 }}>{w.url}</div>
                  </div>
                  <Badge l={w.folder} c="#3b82f6" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Añadir web favorita" onClose={() => setModal(false)}>
          <div><label style={S.lbl}>ICONO</label><div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>{emojis.map(e => <button key={e} style={{ ...cb(form.em===e), fontSize:18, padding:"4px 8px" }} onClick={() => setForm({...form,em:e})}>{e}</button>)}</div></div>
          <div><label style={S.lbl}>NOMBRE</label><input style={S.inp} value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nombre del sitio..." /></div>
          <div><label style={S.lbl}>URL</label><input style={S.inp} value={form.url} onChange={e => setForm({...form,url:e.target.value})} placeholder="https://..." /></div>
          <div>
            <label style={S.lbl}>CARPETA</label>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {["Trabajo","Dev","IA","Diseño","Ocio","Personal"].map(f => <button key={f} style={cb(form.folder===f)} onClick={() => setForm({...form,folder:f})}>{f}</button>)}
            </div>
          </div>
          <button style={S.sb} onClick={save}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// LISTAS
// ═══════════════════════════════════════════════════════════
function Lists() {
  const [view, setView] = useState("list");
  const [lists, setLists] = useState(seed.lists);
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newItem, setNewItem] = useState("");

  const toggle = (lid, idx) => setLists(lists.map(l => l.id===lid ? {...l, items:l.items.map((it,i) => i===idx ? {...it,c:!it.c} : it)} : l));
  const addList = () => { if (!newName.trim()) return; setLists([...lists, { id:Date.now(), name:newName, items:[] }]); setModal(false); setNewName(""); };
  const addItem = (lid) => { if (!newItem.trim()) return; setLists(lists.map(l => l.id===lid ? {...l, items:[...l.items,{t:newItem,c:false}]} : l)); setNewItem(""); };

  const al = lists.find(l => l.id === active);
  if (al) return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title={al.name} onBack={() => setActive(null)} />
      <div style={{ height:3, background:"#1f2937", margin:"0 14px", flexShrink:0 }}>
        <div style={{ height:3, background:"#f59e0b", width:`${al.items.length ? (al.items.filter(i=>i.c).length/al.items.length*100) : 0}%`, borderRadius:2, transition:"width .3s" }} />
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"6px 16px 24px" }}>
        {al.items.map((it, i) => (
          <div key={i} onClick={() => toggle(al.id, i)} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:"1px solid #1f2937", cursor:"pointer" }}>
            <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${it.c?"#f59e0b":"#374151"}`, background:it.c?"#f59e0b":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s" }}>
              {it.c && <Icon d={IC.check} size={12} stroke="#000" sw={3} />}
            </div>
            <span style={{ fontSize:15, color:it.c?"#4b5563":"#f9fafb", textDecoration:it.c?"line-through":"none", transition:"all .2s" }}>{it.t}</span>
          </div>
        ))}
        <div style={{ display:"flex", gap:8, marginTop:16 }}>
          <input style={{ ...S.inp, flex:1 }} value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key==="Enter" && addItem(al.id)} placeholder="Añadir elemento..." />
          <button onClick={() => addItem(al.id)} style={{ background:"#f59e0b", border:"none", borderRadius:10, color:"#000", padding:"0 14px", cursor:"pointer", display:"flex", alignItems:"center" }}>
            <Icon d={IC.plus} size={18} stroke="#000" sw={2.5} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title="Listas" view={view} setView={setView} onAdd={() => setModal(true)} />
      <div style={{ flex:1, overflowY:"auto", padding:"10px 14px 24px" }}>
        {view === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {lists.map(l => { const pct = l.items.length ? Math.round(l.items.filter(i=>i.c).length/l.items.length*100) : 0; return (
              <div key={l.id} onClick={() => setActive(l.id)} style={{ background:"#111827", borderRadius:14, padding:14, border:"1px solid #1f2937", cursor:"pointer" }}>
                <div style={{ fontSize:26, marginBottom:8 }}>☑️</div>
                <div style={{ fontSize:13, fontWeight:700, color:"#f9fafb", marginBottom:10 }}>{l.name}</div>
                <div style={{ height:4, background:"#1f2937", borderRadius:2, marginBottom:7 }}>
                  <div style={{ height:4, background:"#f59e0b", width:`${pct}%`, borderRadius:2 }} />
                </div>
                <div style={{ fontSize:10, color:"#6b7280" }}>{l.items.filter(i=>i.c).length}/{l.items.length} · {pct}%</div>
              </div>
            );})}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {lists.map(l => { const done = l.items.filter(i=>i.c).length; const pct = l.items.length ? Math.round(done/l.items.length*100) : 0; return (
              <div key={l.id} onClick={() => setActive(l.id)} style={{ background:"#111827", borderRadius:12, padding:"13px 15px", border:"1px solid #1f2937", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:"#f9fafb" }}>{l.name}</span>
                  <span style={{ fontSize:12, color:"#f59e0b", fontWeight:800 }}>{pct}%</span>
                </div>
                <div style={{ height:3, background:"#1f2937", borderRadius:2, marginBottom:6 }}>
                  <div style={{ height:3, background:"#f59e0b", width:`${pct}%`, borderRadius:2 }} />
                </div>
                <div style={{ fontSize:11, color:"#6b7280" }}>{done}/{l.items.length} · {l.items.slice(0,2).map(i=>i.t).join(", ")}{l.items.length>2?"…":""}</div>
              </div>
            );})}
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Nueva lista" onClose={() => setModal(false)}>
          <div><label style={S.lbl}>NOMBRE</label><input style={S.inp} value={newName} onChange={e => setNewName(e.target.value)} placeholder="Mi nueva lista..." /></div>
          <button style={S.sb} onClick={addList}>Crear lista</button>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREENSHOTS
// ═══════════════════════════════════════════════════════════
function Shots() {
  const [view, setView] = useState("grid");
  const [items, setItems] = useState(seed.shots);
  const [folder, setFolder] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", folder:"Diseño" });
  const folders = [...new Set(items.map(i => i.folder))];
  const list = folder === "Todos" ? items : items.filter(i => i.folder === folder);
  const bgs = ["linear-gradient(135deg,#1e3a5f,#0f2027)","linear-gradient(135deg,#5f1a1a,#2d0a0a)","linear-gradient(135deg,#1a5f2a,#0a2d12)","linear-gradient(135deg,#5f3a1a,#2d1a0a)","linear-gradient(135deg,#2a1a5f,#100a2d)","linear-gradient(135deg,#5f1a3a,#2d0a1a)"];
  const save = () => {
    if (!form.name.trim()) return;
    setItems([...items, { id:Date.now(), ...form, date:"2024-03-30", bg:bgs[items.length % bgs.length] }]);
    setModal(false); setForm({ name:"", folder:"Diseño" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title="Screenshots" view={view} setView={setView} onAdd={() => setModal(true)} />
      <Chips items={folders} active={folder} onChange={setFolder} />
      <div style={{ flex:1, overflowY:"auto", padding:"10px 14px 24px" }}>
        {view === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {list.map(s => (
              <div key={s.id} style={{ borderRadius:14, overflow:"hidden", border:"1px solid #1f2937", cursor:"pointer" }}>
                <div style={{ height:90, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon d={IC.cam} size={30} stroke="#ffffff33" />
                </div>
                <div style={{ background:"#111827", padding:"9px 11px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#f9fafb", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
                  <div style={{ fontSize:9, color:"#6b7280", marginTop:2 }}>{s.folder} · {s.date}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {list.map(s => (
              <div key={s.id} style={{ background:"#111827", borderRadius:12, overflow:"hidden", border:"1px solid #1f2937", display:"flex", cursor:"pointer" }}>
                <div style={{ width:68, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon d={IC.cam} size={22} stroke="#ffffff44" />
                </div>
                <div style={{ padding:"11px 13px", flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#f9fafb", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
                  <div style={{ fontSize:11, color:"#6b7280", marginTop:2 }}>{s.folder} · {s.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Añadir screenshot" onClose={() => setModal(false)}>
          <div style={{ background:"#1f2937", border:"2px dashed #374151", borderRadius:12, padding:"20px", textAlign:"center", color:"#4b5563", fontSize:13, cursor:"pointer" }}>
            <Icon d={IC.cam} size={24} /><div style={{ marginTop:6 }}>Toca para subir imagen</div>
          </div>
          <div><label style={S.lbl}>NOMBRE</label><input style={S.inp} value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nombre de la captura..." /></div>
          <div>
            <label style={S.lbl}>CARPETA</label>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {["Diseño","Bugs","Trabajo","Docs","Personal"].map(f => <button key={f} style={cb(form.folder===f)} onClick={() => setForm({...form,folder:f})}>{f}</button>)}
            </div>
          </div>
          <button style={S.sb} onClick={save}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// APRENDIZAJE
// ═══════════════════════════════════════════════════════════
function Learn() {
  const [view, setView] = useState("list");
  const [items, setItems] = useState(seed.courses);
  const [filter, setFilter] = useState("Todos");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", type:"course", url:"", tags:"" });
  const types = ["video","course","podcast","pdf"];
  const list = filter === "Todos" ? items : items.filter(i => i.type === filter);
  const pc = p => p===100 ? "#10b981" : p>60 ? "#f59e0b" : p>20 ? "#3b82f6" : "#6b7280";
  const save = () => {
    if (!form.name.trim()) return;
    setItems([...items, { id:Date.now(), ...form, progress:0, tags:form.tags.split(",").map(t=>t.trim()).filter(Boolean) }]);
    setModal(false); setForm({ name:"", type:"course", url:"", tags:"" });
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <TBar title="Aprendizaje" view={view} setView={setView} onAdd={() => setModal(true)} />
      <Chips items={types} active={filter} onChange={setFilter} />
      <div style={{ flex:1, overflowY:"auto", padding:"10px 14px 24px" }}>
        {view === "grid" ? (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {list.map(c => (
              <div key={c.id} style={{ background:"#111827", borderRadius:14, padding:14, border:"1px solid #1f2937", cursor:"pointer" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{TI[c.type] || "📚"}</div>
                <div style={{ fontSize:12, fontWeight:700, color:"#f9fafb", lineHeight:1.35, marginBottom:10 }}>{c.name}</div>
                <div style={{ height:4, background:"#1f2937", borderRadius:2, marginBottom:6 }}>
                  <div style={{ height:4, background:pc(c.progress), width:`${c.progress}%`, borderRadius:2 }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:10, color:"#6b7280" }}>{c.progress}%</span>
                  <Badge l={c.type} c={TC[c.type] || TC._} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {list.map(c => (
              <div key={c.id} style={{ background:"#111827", borderRadius:12, padding:"13px 15px", border:"1px solid #1f2937", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:8 }}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{TI[c.type] || "📚"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"#f9fafb", marginBottom:5 }}>{c.name}</div>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      <Badge l={c.type} c={TC[c.type] || TC._} />
                      {c.tags.map(t => <Badge key={t} l={t} c="#6b7280" />)}
                    </div>
                  </div>
                  <span style={{ fontSize:13, fontWeight:800, color:pc(c.progress), flexShrink:0 }}>{c.progress}%</span>
                </div>
                <div style={{ height:3, background:"#1f2937", borderRadius:2 }}>
                  <div style={{ height:3, background:pc(c.progress), width:`${c.progress}%`, borderRadius:2, transition:"width .3s" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Modal title="Añadir recurso" onClose={() => setModal(false)}>
          <div>
            <label style={S.lbl}>TIPO</label>
            <div style={{ display:"flex", gap:7 }}>
              {types.map(t => <button key={t} style={{ ...cb(form.type===t, TC[t]||TC._), flex:1, textAlign:"center", fontSize:11, padding:"8px 4px" }} onClick={() => setForm({...form,type:t})}>{TI[t]}<br/>{t}</button>)}
            </div>
          </div>
          <div><label style={S.lbl}>NOMBRE</label><input style={S.inp} value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nombre del recurso..." /></div>
          <div><label style={S.lbl}>URL (OPCIONAL)</label><input style={S.inp} value={form.url} onChange={e => setForm({...form,url:e.target.value})} placeholder="https://..." /></div>
          <div><label style={S.lbl}>ETIQUETAS (separadas por coma)</label><input style={S.inp} value={form.tags} onChange={e => setForm({...form,tags:e.target.value})} placeholder="diseño, productividad..." /></div>
          {form.type === "pdf" && (
            <div style={{ background:"#1f2937", border:"2px dashed #374151", borderRadius:12, padding:"18px", textAlign:"center", color:"#4b5563", fontSize:13, cursor:"pointer" }}>
              <Icon d={IC.up} size={22} /><div style={{ marginTop:6 }}>Subir PDF o documento</div>
            </div>
          )}
          <button style={S.sb} onClick={save}>Guardar</button>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
const NAV = [
  { id:"docs",  l:"Docs",     ic:IC.docs  },
  { id:"webs",  l:"Webs",     ic:IC.web   },
  { id:"lists", l:"Listas",   ic:IC.list  },
  { id:"shots", l:"Capturas", ic:IC.cam   },
  { id:"learn", l:"Aprender", ic:IC.learn },
];
const SECS = { docs:<Docs/>, webs:<Webs/>, lists:<Lists/>, shots:<Shots/>, learn:<Learn/> };

export default function App() {
  const [sec, setSec] = useState("docs");
  const [drawer, setDrawer] = useState(false);
  const cur = NAV.find(n => n.id === sec);

  return (
    <div style={{ width:"100%", maxWidth:430, margin:"0 auto", height:"100dvh", background:"#0b0f1a", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", padding:"12px 16px 10px", borderBottom:"1px solid #1f2937", background:"#0b0f1a", flexShrink:0, gap:10 }}>
        <button onClick={() => setDrawer(true)} style={{ background:"#1f2937", border:"none", borderRadius:9, padding:"6px 8px", color:"#9ca3af", cursor:"pointer", display:"flex" }}>
          <Icon d={IC.menu} size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, color:"#4b5563", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase" }}>Mi Espacio</div>
          <div style={{ fontSize:17, fontWeight:800, color:"#f9fafb", letterSpacing:"-.4px" }}>{cur?.l}</div>
        </div>
        <div style={{ width:8, height:8, borderRadius:"50%", background:"#f59e0b", boxShadow:"0 0 10px #f59e0baa" }} />
      </div>

      {/* Content */}
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {SECS[sec]}
      </div>

      {/* Bottom nav */}
      <div className="safe-bottom" style={{ display:"flex", background:"#0d1117", borderTop:"1px solid #1f2937", padding:"7px 2px 10px", flexShrink:0 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setSec(n.id)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 0" }}>
            <Icon d={n.ic} size={21} stroke={sec===n.id?"#f59e0b":"#4b5563"} sw={sec===n.id?2.2:1.6} />
            <span style={{ fontSize:9, color:sec===n.id?"#f59e0b":"#4b5563", fontWeight:sec===n.id?800:500 }}>{n.l}</span>
            {sec===n.id && <div style={{ width:3, height:3, borderRadius:"50%", background:"#f59e0b" }} />}
          </button>
        ))}
      </div>

      {/* Side drawer */}
      {drawer && (
        <div style={{ position:"absolute", inset:0, zIndex:200 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.65)", backdropFilter:"blur(3px)" }} onClick={() => setDrawer(false)} />
          <div style={{ position:"absolute", top:0, left:0, bottom:0, width:260, background:"#0d1117", borderRight:"1px solid #1f2937", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"22px 18px 16px", borderBottom:"1px solid #1f2937" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:11, background:"#f59e0b", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon d={IC.star} size={17} stroke="#000" fill="#000" />
                </div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#f9fafb" }}>Mi Espacio</div>
                  <div style={{ fontSize:10, color:"#4b5563" }}>Personal Hub PWA</div>
                </div>
              </div>
            </div>
            <div style={{ padding:"12px 8px", flex:1 }}>
              {NAV.map(n => (
                <button key={n.id} onClick={() => { setSec(n.id); setDrawer(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 13px", background:sec===n.id?"#f59e0b14":"none", border:`1px solid ${sec===n.id?"#f59e0b30":"transparent"}`, borderRadius:11, cursor:"pointer", marginBottom:4, fontFamily:"inherit" }}>
                  <Icon d={n.ic} size={19} stroke={sec===n.id?"#f59e0b":"#6b7280"} sw={sec===n.id?2:1.6} />
                  <span style={{ fontSize:13, fontWeight:sec===n.id?700:500, color:sec===n.id?"#f59e0b":"#9ca3af" }}>{n.l}</span>
                  {sec===n.id && <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#f59e0b" }} />}
                </button>
              ))}
            </div>
            <div style={{ padding:"14px 18px", borderTop:"1px solid #1f2937" }}>
              <div style={{ fontSize:10, color:"#374151", textAlign:"center", fontWeight:600 }}>v1.0 · Personal PWA</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
