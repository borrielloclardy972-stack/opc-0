// OPC超级个体训练营 · UI 优化版 v2
// 升级内容：引入平台 SVG 图标替代 CSS 文本头像

const CODES = { user: "OPC-VIEW-2026", admin: "OPC-EDIT-2026" };
const STORAGE_KEYS = { materials: "opc_redesign_materials", requests: "opc_redesign_requests" };

// ── 平台图标映射 ─────────────────────────────────────────────
const platformMeta = {
  "抖音":     { label: "抖音",     icon: "assets/icons/douyin.svg",      key: "dy" },
  "小红书":    { label: "小红书",   icon: "assets/icons/xiaohongshu.svg",  key: "xhs" },
  "视频号":    { label: "视频号",   icon: "assets/icons/shipinhao.svg",    key: "wx" },
  "boss":     { label: "BOSS直聘", icon: "assets/icons/boss.svg",         key: "boss" },
  "闲鱼":     { label: "闲鱼",     icon: "assets/icons/xianyu.svg",       key: "xy" },
  "抖音投流":  { label: "抖音投流", icon: "assets/icons/douyin-ad.svg",    key: "dyad" },
  "腾讯广告":  { label: "腾讯广告", icon: "assets/icons/tencent-ad.svg",   key: "tx" },
  "OPC":      { label: "OPC",      icon: "assets/icons/opc-app.svg",      key: "opc" },
  "销售":     { label: "销售端",   icon: "assets/icons/opc-app.svg",      key: "sale" },
  "交付":     { label: "交付端",   icon: "assets/icons/opc-app.svg",      key: "sale" },
  "案例":     { label: "案例库",   icon: "assets/icons/opc-app.svg",      key: "case" },
  "工具":     { label: "工具",     icon: "assets/icons/opc-app.svg",      key: "tool" },
  "BOSS":     { label: "BOSS直聘", icon: "assets/icons/boss.svg",         key: "boss" }
};

function displayPlatform(platform) {
  return platformMeta[platform]?.label || platform;
}

function platformBadge(platform, size = "sm") {
  const meta = platformMeta[platform];
  if (!meta) return `<span class="platform-icon-fallback ${size}">${(platform||"?")[0]}</span>`;
  return `<img class="platform-icon-img ${size}" src="${meta.icon}" alt="${meta.label}" />`;
}

function platformFullBadge(platform) {
  const meta = platformMeta[platform];
  if (!meta) return `<span class="platform-icon-fallback">${(platform||"?")[0]}</span>`;
  return `
    <div class="platform-badge-wrap">
      <img class="platform-icon-img" src="${meta.icon}" alt="${meta.label}" />
      <span class="platform-label">${meta.label}</span>
    </div>
  `;
}

// ── 分组元数据 ───────────────────────────────────────────────
const GROUP_META = {
  camp: {
    title: "培训营 / 训练营",
    small: "TRAINING CAMP",
    desc: "按培训营结构查看引流端、销售端与交付端对应的学习视频资料。",
    label: "培训营",
    summaries: [
      ["一级分类", "培训营 / 训练营"],
      ["二级结构", "引流端 / 销售交付"],
      ["三级结构", "各平台引流教程"],
      ["资料类型", "视频 / 图文 / SOP"]
    ]
  },
  product: {
    title: "产品物料资料",
    small: "PRODUCT MATERIALS",
    desc: "查看产品核心物料、基础文档和SOP，便于统一理解产品与交付标准。",
    label: "产品物料",
    summaries: [
      ["核心内容", "产品卖点 / 价格 / 说明"],
      ["基础资料", "文档 / SOP / 手册"],
      ["适用场景", "销售 / 交付 / 培训"],
      ["资料类型", "文档 / 资料包"]
    ]
  },
  cases: {
    title: "素材案例",
    small: "CASE LIBRARY",
    desc: "查看高转化素材案例与成交交付案例，学习内容结构与转化链路。",
    label: "素材案例",
    summaries: [
      ["案例类型", "高转化 / 成交交付"],
      ["学习目标", "结构拆解 / 转化路径"],
      ["适用场景", "内容创作 / 实战复盘"],
      ["资料类型", "案例 / 视频 / 图文"]
    ]
  },
  other: {
    title: "其他资料",
    small: "TOOLS & FAQ",
    desc: "查看工具清单、FAQ和补充说明，用于补足学习资料之外的通用内容。",
    label: "其他资料",
    summaries: [
      ["资料类型", "工具清单 / FAQ"],
      ["作用", "补充说明 / 公告"],
      ["使用场景", "日常查询 / 问题排查"],
      ["资料形式", "文档 / 清单"]
    ]
  }
};

// ── 初始素材（含真实平台名称和图标路径）────────────────────
const SEED_MATERIALS = [
  { id:"m1", group:"camp", category:"引流端培训营", subcategory:"抖音引流教程", platform:"抖音", platformKey:"dy", type:"视频", duration:"18s", badge:"自然流", label:"AI创业粉", title:"抖音创业开场三秒钩子", desc:"引流端培训营 · 抖音获客口播开场，适合短视频起号与私域承接。", mentor:"学习：创业者开场三秒钩子", gradient:"linear-gradient(135deg, rgba(21,18,22,.95), rgba(255,45,85,.28))" },
  { id:"m2", group:"camp", category:"引流端培训营", subcategory:"小红书引流教程", platform:"小红书", platformKey:"xhs", type:"图文", duration:"7页", badge:"爆款图文", label:"AI创业粉", title:"小红书图文种草七页结构", desc:"引流端培训营 · 收藏型图文模板，适合转化成交前的种草承接。", mentor:"学习：封面与结构转化", gradient:"linear-gradient(135deg, rgba(91,16,32,.95), rgba(255,36,66,.28))" },
  { id:"m3", group:"camp", category:"引流端培训营", subcategory:"视频号引流教程", platform:"视频号", platformKey:"wx", type:"视频", duration:"3m", badge:"私域承接", label:"AI创业粉", title:"视频号教程内容承接SOP", desc:"引流端培训营 · 适合教程型内容引流与社群承接。", mentor:"学习：视频号内容承接", gradient:"linear-gradient(135deg, rgba(16,50,35,.95), rgba(35,194,107,.28))" },
  { id:"m4", group:"camp", category:"引流端培训营", subcategory:"闲鱼引流教程", platform:"闲鱼", platformKey:"xy", type:"SOP", duration:"12m", badge:"交易型", label:"AI创业粉", title:"闲鱼商品发布与私信成交", desc:"引流端培训营 · 商品标题、发布、沟通到私信成交全链路。", mentor:"学习：闲鱼线索承接", gradient:"linear-gradient(135deg, rgba(58,50,20,.95), rgba(255,209,61,.28))" },
  { id:"m5", group:"camp", category:"引流端培训营", subcategory:"BOSS引流教程", platform:"BOSS", platformKey:"boss", type:"文档", duration:"9页", badge:"线索筛选", label:"AI创业粉", title:"BOSS直聘线索筛选话术", desc:"引流端培训营 · 招聘场景线索识别与高意向用户筛选方法。", mentor:"学习：BOSS获客话术", gradient:"linear-gradient(135deg, rgba(18,40,77,.95), rgba(25,118,255,.28))" },
  { id:"m6", group:"camp", category:"交付销售培训营", subcategory:"销售端培训营", platform:"销售", platformKey:"sale", type:"视频", duration:"11m", badge:"成交课", label:"销售端", title:"销售端成交四步话术", desc:"交付 / 销售端培训营 · 从需求确认到报价成交的标准流程。", mentor:"学习：成交四步模型", gradient:"linear-gradient(135deg, rgba(20,17,29,.95), rgba(122,92,255,.30))" },
  { id:"m7", group:"camp", category:"交付销售培训营", subcategory:"交付端培训营", platform:"交付", platformKey:"opc", type:"文档", duration:"SOP", badge:"交付课", label:"交付端", title:"交付端客户管理SOP", desc:"交付 / 销售端培训营 · 交付节奏、节点复盘和客户管理标准化。", mentor:"学习：交付流程闭环", gradient:"linear-gradient(135deg, rgba(16,42,68,.95), rgba(22,133,255,.28))" },
  { id:"m8", group:"product", category:"产品核心物料", subcategory:"产品核心物料", platform:"OPC", platformKey:"opc", type:"资料包", duration:"8份", badge:"核心物料", label:"产品资料", title:"产品核心物料包", desc:"产品介绍、卖点、价格、交付说明与常见问题整理。", mentor:"学习：产品标准介绍", gradient:"linear-gradient(135deg, rgba(30,36,61,.95), rgba(122,92,255,.30))" },
  { id:"m9", group:"product", category:"基础文档SOP", subcategory:"基础文档SOP", platform:"OPC", platformKey:"opc", type:"文档", duration:"合集", badge:"基础文档", label:"SOP", title:"基础文档与SOP合集", desc:"学员手册、执行流程、交付标准、复盘模板等基础资料。", mentor:"学习：执行SOP", gradient:"linear-gradient(135deg, rgba(23,51,64,.95), rgba(47,215,255,.26))" },
  { id:"m10", group:"cases", category:"高转化素材案例", subcategory:"高转化素材案例", platform:"案例", platformKey:"case", type:"案例", duration:"6例", badge:"高转化", label:"案例库", title:"高转化素材案例拆解", desc:"拆解标题、封面、钩子和转化动作，适合对照复用。", mentor:"学习：案例结构拆解", gradient:"linear-gradient(135deg, rgba(53,31,27,.95), rgba(255,91,132,.26))" },
  { id:"m11", group:"cases", category:"成交交付案例", subcategory:"成交交付案例", platform:"案例", platformKey:"case", type:"案例", duration:"4例", badge:"完整链路", label:"成交案例", title:"成交与交付完整案例", desc:"从线索进入、沟通成交到交付履约的全链路案例演示。", mentor:"学习：成交与交付案例", gradient:"linear-gradient(135deg, rgba(47,34,56,.95), rgba(255,79,139,.26))" },
  { id:"m12", group:"other", category:"工具清单FAQ", subcategory:"工具清单FAQ", platform:"工具", platformKey:"tool", type:"工具", duration:"清单", badge:"FAQ", label:"辅助资料", title:"工具清单与FAQ", desc:"常用工具、账号使用、常见问题、补充公告与说明合集。", mentor:"学习：常用工具与FAQ", gradient:"linear-gradient(135deg, rgba(27,55,50,.95), rgba(54,211,153,.24))" }
];

const TITLES = {
  home: "首页",
  agent: "代理认证卡密",
  library: "培训营 / 训练营",
  learning: "学习进度",
  assessment: "考核学习进度"
};

const state = {
  role: "user",
  authMode: "user",
  screen: "home",
  group: "camp",
  filter: "all"
};

function $(s){ return document.querySelector(s); }
function $all(s){ return [...document.querySelectorAll(s)]; }
function esc(v){ return String(v ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m])); }
function readMaterials(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEYS.materials)) || SEED_MATERIALS; } catch { return SEED_MATERIALS; } }
function saveMaterials(list){ localStorage.setItem(STORAGE_KEYS.materials, JSON.stringify(list)); }
function readRequests(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEYS.requests)) || []; } catch { return []; } }
function saveRequests(list){ localStorage.setItem(STORAGE_KEYS.requests, JSON.stringify(list)); }

function setAuthTab(mode){
  state.authMode = mode;
  $all("[data-auth]").forEach(btn => btn.classList.toggle("active", btn.dataset.auth === mode));
  const isRegister = mode === "register";
  $("#passwordPanel").hidden = isRegister;
  $("#registerPanel").hidden = !isRegister;
  $("#formMessage").textContent = "";
  $("#formMessage").style.color = "";
  if(!isRegister){
    const isAdmin = mode === "admin";
    $("#roleNote").innerHTML = isAdmin
      ? "<b>管理员登录</b><span>管理权限：上传、删除素材、查看注册申请和完整数据。</span>"
      : "<b>用户登录</b><span>只读权限：查看素材、课程进度和资料内容。</span>";
    $("#codeLabel").textContent = isAdmin ? "管理员卡密" : "用户查看卡密";
    $("#accessCode").placeholder = isAdmin ? "请输入管理员卡密" : "请输入用户卡密";
    $("#loginSubmit").textContent = isAdmin ? "管理员登录管理系统" : "用户登录查看素材";
  }
}

function enterApp(role){
  state.role = role;
  document.body.classList.remove("locked");
  document.body.classList.toggle("admin", role === "admin");
  $("#authShell").hidden = true;
  $("#appShell").hidden = false;
  $("#roleChip").textContent = role === "admin" ? "管理员" : "用户";
  goTo("home");
}

function goTo(screen, group = state.group, filter = state.filter){
  state.screen = screen;
  if(screen === "library"){
    state.group = group;
    state.filter = filter;
  }
  $all(".view").forEach(v => v.classList.remove("active"));
  $("#view-" + screen).classList.add("active");
  $all(".nav-link").forEach(btn => {
    const active = screen === "library"
      ? btn.dataset.screen === "library" && btn.dataset.group === state.group
      : btn.dataset.screen === screen;
    btn.classList.toggle("active", active);
  });
  $("#screenTitle").textContent = screen === "library" ? GROUP_META[state.group].title : TITLES[screen];
  $("#crumb").textContent = screen === "library" ? GROUP_META[state.group].title : TITLES[screen];
  $("#catalogGroupLabel").textContent = GROUP_META[state.group]?.label || "培训营";
  highlightCatalog();
  if(screen === "library") renderLibrary();
}

function highlightCatalog(){
  $all(".catalog-item, .catalog-leaf").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.group === state.group && btn.dataset.filter === state.filter);
  });
  $all(".catalog-group").forEach(group => group.classList.toggle("open", group.dataset.accordion === state.group));
}

function filterMaterials(list){
  return list.filter(item => {
    if(item.group !== state.group) return false;
    if(state.filter === "all") return true;
    if(state.filter === "引流端培训营") return item.category === "引流端培训营";
    if(state.filter === "交付销售培训营") return item.category === "交付销售培训营";
    return item.subcategory === state.filter || item.category === state.filter;
  });
}

function renderSummary(){
  const meta = GROUP_META[state.group];
  $("#summaryStrip").innerHTML = meta.summaries.map(([label, value]) => `
    <article class="summary-card">
      <span>${esc(label)}</span>
      <strong>${esc(value)}</strong>
    </article>
  `).join("");
}

function renderLibrary(){
  const meta = GROUP_META[state.group];
  const list = filterMaterials(readMaterials());
  $("#librarySmallTitle").textContent = meta.small;
  $("#libraryTitle").textContent = meta.title;
  $("#libraryDesc").textContent = state.filter === "all" ? meta.desc : `当前分类：${state.filter}，以下展示该分类对应的学习资料。`;
  $("#libraryCount").textContent = `${list.length} 项资料`;
  renderSummary();
  $("#materialGrid").innerHTML = list.length ? list.map(renderMaterialCard).join("") : `<div class="empty-state">当前分类暂无资料。</div>`;
}

function renderMaterialCard(item){
  const pLabel = displayPlatform(item.platform || "");

  return `
    <article class="material-card">
      <div class="material-cover" style="background:${esc(item.gradient)}">
        <div class="cover-chip-row">
          <span class="cover-chip">${esc(item.badge)}</span>
          <span class="cover-tag">${esc(item.label)}</span>
        </div>
        <div class="platform-panel">
          <div class="platform-icon-block">
            ${platformBadge(item.platform, "lg")}
          </div>
          <div class="platform-meta">
            <strong>${esc(item.title)}</strong>
            <span class="platform-meta-sub">
              <span class="platform-meta-label">${esc(pLabel)}</span>
              <span class="platform-meta-sep">·</span>
              <span>${esc(item.subcategory)} · ${esc(item.duration)}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="material-body">
        <h3>${esc(item.type)}</h3>
        <p>${esc(item.desc)}</p>
        <div class="material-foot">
          <div class="info-stack">
            <small>${esc(item.category)}</small>
            <strong>${esc(item.mentor)}</strong>
          </div>
          <button class="delete-btn" data-delete="${esc(item.id)}">删除</button>
        </div>
      </div>
    </article>
  `;
}

function renderRequests(){
  const list = readRequests();
  $("#requestsList").innerHTML = list.length ? list.map(req => `
    <article class="request-item">
      <div class="request-head"><strong>${esc(req.name)}</strong><span class="request-role">${req.role === "admin" ? "管理员申请" : "用户申请"}</span></div>
      <p>联系方式：${esc(req.contact)}</p>
      <p>申请说明：${esc(req.note || "未填写")}</p>
      <p>提交时间：${esc(req.createdAt)}</p>
    </article>
  `).join("") : `<div class="empty-state">暂无注册申请。</div>`;
}

function bindEvents(){
  $all("[data-auth]").forEach(btn => btn.addEventListener("click", () => setAuthTab(btn.dataset.auth)));

  $("#authCard").addEventListener("submit", e => {
    e.preventDefault();
    if(state.authMode === "register") return;
    const code = $("#accessCode").value.trim();
    if(code === CODES[state.authMode]){
      enterApp(state.authMode === "admin" ? "admin" : "user");
    } else {
      $("#formMessage").textContent = state.authMode === "admin" ? "管理员卡密不正确。" : "用户卡密不正确。";
    }
  });

  $("#registerSubmit").addEventListener("click", () => {
    const req = {
      id: Date.now(),
      name: $("#regName").value.trim(),
      contact: $("#regContact").value.trim(),
      role: $("#regRole").value,
      note: $("#regNote").value.trim(),
      createdAt: new Date().toLocaleString("zh-CN")
    };
    if(!req.name || !req.contact){
      $("#formMessage").textContent = "请填写姓名和联系方式。";
      return;
    }
    const list = readRequests();
    list.unshift(req);
    saveRequests(list);
    $("#formMessage").style.color = "#168f65";
    $("#formMessage").textContent = "注册申请已提交，等待管理员审核。";
    $("#regName").value = "";
    $("#regContact").value = "";
    $("#regNote").value = "";
  });

  $all(".nav-link").forEach(btn => btn.addEventListener("click", () => {
    const screen = btn.dataset.screen;
    if(screen === "library") goTo("library", btn.dataset.group, btn.dataset.group === "camp" ? "all" : defaultFilter(btn.dataset.group));
    else goTo(screen);
  }));

  $("#catalogCard").addEventListener("click", e => {
    const head = e.target.closest(".catalog-head");
    if(head){
      head.closest(".catalog-group").classList.toggle("open");
      return;
    }
    const item = e.target.closest(".catalog-item, .catalog-leaf");
    if(!item) return;
    goTo("library", item.dataset.group, item.dataset.filter);
  });

  $("#switchAccess").addEventListener("click", () => location.reload());
  $("#verifyBtn").addEventListener("click", () => { $("#verifyText").textContent = "已完成认证 · OPC超级个体"; });
  $("#assessmentBtn").addEventListener("click", () => alert("考核模块当前为规划中，后续可接入题库和审核流程。"));

  $("#openUpload").addEventListener("click", () => $("#uploadModal").showModal());
  $("#openRequests").addEventListener("click", () => { renderRequests(); $("#requestsModal").showModal(); });

  $all("[data-close]").forEach(btn => btn.addEventListener("click", () => $("#" + btn.dataset.close).close()));

  $("#saveMaterial").addEventListener("click", () => {
    const title = $("#upTitle").value.trim();
    const group = $("#upGroup").value;
    const category = $("#upCategory").value.trim();
    const subcategory = $("#upSubcategory").value.trim() || category;
    const platform = $("#upPlatform").value.trim() || "OPC";
    const type = $("#upType").value.trim() || "资料";
    const desc = $("#upDesc").value.trim() || "管理员上传的学习资料";
    if(!title || !category){
      alert("请至少填写素材标题和分类名。");
      return;
    }
    const platformKey = guessPlatformKey(platform);
    const list = readMaterials();
    list.unshift({
      id: "up" + Date.now(),
      group,
      category,
      subcategory,
      platform,
      platformKey,
      type,
      duration: "新上传",
      badge: "管理员上传",
      label: GROUP_META[group].label,
      title,
      desc,
      mentor: "学习：管理员上传资料",
      gradient: guessGradient(platformKey)
    });
    saveMaterials(list);
    ["#upTitle", "#upCategory", "#upSubcategory", "#upPlatform", "#upType", "#upDesc"].forEach(id => $(id).value = "");
    $("#uploadModal").close();
    goTo("library", group, group === "camp" ? "all" : category);
  });

  $("#materialGrid").addEventListener("click", e => {
    const btn = e.target.closest("[data-delete]");
    if(!btn || state.role !== "admin") return;
    saveMaterials(readMaterials().filter(item => item.id !== btn.dataset.delete));
    renderLibrary();
  });
}

function defaultFilter(group){
  switch(group){
    case "product": return "产品核心物料";
    case "cases": return "高转化素材案例";
    case "other": return "工具清单FAQ";
    default: return "all";
  }
}

function guessPlatformKey(platform){
  const name = platform.toLowerCase();
  if(name.includes("抖音投流") || name.includes("douyinad")) return "dyad";
  if(name.includes("抖音")) return "dy";
  if(name.includes("小红书")) return "xhs";
  if(name.includes("视频号") || name.includes("微信")) return "wx";
  if(name.includes("闲鱼")) return "xy";
  if(name.includes("boss")) return "boss";
  if(name.includes("腾讯广告")) return "tx";
  if(name.includes("销售")) return "sale";
  if(name.includes("交付")) return "sale";
  if(name.includes("案例")) return "case";
  if(name.includes("工具")) return "tool";
  return "opc";
}

function guessGradient(platformKey){
  const map = {
    dy: "linear-gradient(135deg, rgba(21,18,22,.95), rgba(255,45,85,.28))",
    dyad: "linear-gradient(135deg, rgba(20,17,29,.95), rgba(122,92,255,.28))",
    xhs: "linear-gradient(135deg, rgba(91,16,32,.95), rgba(255,36,66,.28))",
    wx: "linear-gradient(135deg, rgba(16,50,35,.95), rgba(35,194,107,.28))",
    xy: "linear-gradient(135deg, rgba(58,50,20,.95), rgba(255,209,61,.28))",
    boss: "linear-gradient(135deg, rgba(18,40,77,.95), rgba(25,118,255,.28))",
    tx: "linear-gradient(135deg, rgba(16,42,68,.95), rgba(22,133,255,.28))",
    sale: "linear-gradient(135deg, rgba(20,17,29,.95), rgba(122,92,255,.30))",
    case: "linear-gradient(135deg, rgba(53,31,27,.95), rgba(255,91,132,.26))",
    tool: "linear-gradient(135deg, rgba(27,55,50,.95), rgba(54,211,153,.24))",
    opc: "linear-gradient(135deg, rgba(30,36,61,.95), rgba(122,92,255,.30))"
  };
  return map[platformKey] || map.opc;
}

bindEvents();
setAuthTab("user");
highlightCatalog();

// ── PWA Service Worker ───────────────────────────────────────
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
