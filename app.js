const STORAGE_KEY = "mard-bead-manager-v1";
const DAILY_TASK_STORAGE_KEY = "mard-earth-online-v1";
const DEFAULT_WARNING_VALUE = 30;
const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "M"];

let COLORS = [];
let COLOR_MAP = new Map();
let PALETTE_LAB = new Map();
let colorMatchCache = new Map();
let patternImage = null;
let patternResults = [];
const DASHBOARD_QUOTES = [
  { text: "千里之行，始于足下。", author: "老子" },
  { text: "不积跬步，无以至千里。", author: "荀子" },
  { text: "工欲善其事，必先利其器。", author: "孔子" },
  { text: "知足者富，强行者有志。", author: "老子" },
  { text: "合抱之木，生于毫末。", author: "老子" },
  { text: "锲而不舍，金石可镂。", author: "荀子" },
  { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游" },
  { text: "纸上得来终觉浅，绝知此事要躬行。", author: "陆游" },
  { text: "慢慢来，比较快。", author: "佚名" },
  { text: "种一棵树最好的时间是十年前，其次是现在。", author: "谚语" },
  { text: "人生是旷野，不是轨道。", author: "佚名" },
  { text: "认真生活的人，永远有光。", author: "佚名" },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    translation: "我们由反复做的事塑造；卓越不是一种行为，而是一种习惯。",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    translation: "事情在完成之前，看起来总是很难。",
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    translation: "从当下开始，用手边所有的，做力所能及的。",
  },
  {
    text: "The best way out is always through.",
    author: "Robert Frost",
    translation: "走出去最好的办法，永远是穿过它。",
  },
  {
    text: "Little by little, one travels far.",
    author: "J. R. R. Tolkien",
    translation: "一点一点走，也能抵达很远的地方。",
  },
  {
    text: "Nothing is impossible. The word itself says 'I'm possible!'",
    author: "Audrey Hepburn",
    translation: "没有什么是不可能的，这个词本身就在说“我可能”。",
  },
  {
    text: "You must do the things you think you cannot do.",
    author: "Eleanor Roosevelt",
    translation: "你必须去做那些你认为自己做不到的事。",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    translation: "简约，是极致的复杂之后留下的答案。",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    translation: "向前的秘诀，就是先开始。",
  },
  {
    text: "A year from now you may wish you had started today.",
    author: "Karen Lamb",
    translation: "一年后的你，也许会希望自己从今天就开始。",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    translation: "在当下，用手边有的，做你能做的。",
  },
  {
    text: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    author: "Jane Goodall",
    translation: "你的行动会带来改变，重要的是决定你想带来怎样的改变。",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
    translation: "未来取决于你今天做了什么。",
  },
];
const DAILY_TASKS = [
  { id: "warm-water", text: "认真喝完一杯温水" },
  { id: "look-sky", text: "抬头看一次今天的天空" },
  { id: "old-song", text: "听一首很久没听的歌" },
  { id: "new-path", text: "走一小段平时不会走的路" },
  { id: "say-thanks", text: "对一个人认真说一次谢谢" },
  { id: "tiny-order", text: "整理桌面的一小块区域" },
  { id: "quiet-five", text: "放下手机，安静发呆五分钟" },
  { id: "remember-smile", text: "记录今天让你笑的一件小事" },
  { id: "future-note", text: "给未来的自己留一句鼓励" },
  { id: "slow-meal", text: "慢慢吃完一顿饭，不赶时间" },
  { id: "small-detail", text: "找出一个平时被忽略的小细节" },
  { id: "less-complain", text: "今天少说一句抱怨，多夸一次别人" },
  { id: "good-thing", text: "Write down one thing you did well today.", translation: "写下今天你做得不错的一件事。" },
  { id: "say-thanks-en", text: "Say thank you and mean it.", translation: "认真地对一个人说谢谢。" },
  {
    id: "one-song",
    text: "Listen to one song without doing anything else.",
    translation: "只专心听一首歌，不同时做别的事。",
  },
  {
    id: "phone-free-walk",
    text: "Take a five-minute walk without your phone.",
    translation: "不带手机，散步五分钟。",
  },
  {
    id: "easy-to-miss",
    text: "Take a photo of something easy to miss.",
    translation: "拍下一件很容易被忽略的小事或小物。",
  },
  {
    id: "lighter",
    text: "Name one thing that made today lighter.",
    translation: "说出今天让你轻松一点的一件事。",
  },
];
const DAILY_EGG_TASKS = [
  { id: "egg-subtitle", text: "用三个词给今天起一个副标题" },
  { id: "egg-name-object", text: "给房间里的一件小物取一个名字" },
  { id: "egg-today-light", text: "拍一张“只有今天才有”的光" },
  { id: "egg-other-hand", text: "用非惯用手写下今天的日期" },
  { id: "egg-sound", text: "录下十秒钟此刻的环境声" },
  { id: "egg-symbol", text: "画一个只属于今天的简单符号" },
  { id: "egg-lucky-number", text: "找一个幸运数字，写在便签上" },
  { id: "egg-useless-fun", text: "安排一个完全没用但开心的小动作" },
  { id: "egg-receipt", text: "用一句话向今天说“已收到”" },
];
let dashboardQuoteIndex = new Date().getDate() % DASHBOARD_QUOTES.length;
let dailyTaskState = { date: "", completed: [] };
let state = {
  opening: {},
  ledger: [],
  warningValue: DEFAULT_WARNING_VALUE,
};
let ui = {
  activeView: "welcome",
  warehouseGroup: "all",
  calculatorType: "use",
  selectedColor: null,
  ledgerFilter: "all",
  dashboardRange: "month",
  dashboardStart: "",
  dashboardEnd: "",
  dashboardCost: 0.02,
  dashboardNotePane: "daily",
  calendarMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
};

const dom = {};

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatNumber(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 0 }).format(number);
}

function contrastText(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  return luminance > 0.48 ? "#3f2933" : "#ffffff";
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function srgbToLinear(value) {
  const channel = value / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function rgbToLab(r, g, b) {
  const red = srgbToLinear(r);
  const green = srgbToLinear(g);
  const blue = srgbToLinear(b);

  const x = (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047;
  const y = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 1;
  const z = (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883;

  const transform = (value) =>
    value > 0.008856 ? Math.cbrt(value) : 7.787 * value + 16 / 116;

  const fx = transform(x);
  const fy = transform(y);
  const fz = transform(z);
  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

function buildPaletteLab() {
  PALETTE_LAB = new Map(
    COLORS.map((color) => {
      const rgb = hexToRgb(color.hex);
      return [color.code, rgbToLab(rgb.r, rgb.g, rgb.b)];
    }),
  );
  colorMatchCache = new Map();
}

function nearestMardColor(r, g, b) {
  const key = ((r >> 2) << 12) | ((g >> 2) << 6) | (b >> 2);
  if (colorMatchCache.has(key)) return colorMatchCache.get(key);

  const lab = rgbToLab(r, g, b);
  let bestCode = COLORS[0].code;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const color of COLORS) {
    const target = PALETTE_LAB.get(color.code);
    const dl = lab.l - target.l;
    const da = lab.a - target.a;
    const db = lab.b - target.b;
    const distance = dl * dl + da * da + db * db;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestCode = color.code;
    }
  }
  colorMatchCache.set(key, bestCode);
  return bestCode;
}

function isNearWhite(r, g, b, threshold) {
  return Math.min(r, g, b) >= threshold && Math.max(r, g, b) - Math.min(r, g, b) <= 16;
}

function averageCell(data, width, height, centerX, centerY, radius = 1) {
  let red = 0;
  let green = 0;
  let blue = 0;
  let alpha = 0;
  let count = 0;
  for (let y = centerY - radius; y <= centerY + radius; y += 1) {
    if (y < 0 || y >= height) continue;
    for (let x = centerX - radius; x <= centerX + radius; x += 1) {
      if (x < 0 || x >= width) continue;
      const offset = (y * width + x) * 4;
      const a = data[offset + 3];
      if (a < 16) continue;
      red += data[offset];
      green += data[offset + 1];
      blue += data[offset + 2];
      alpha += a;
      count += 1;
    }
  }
  if (!count) return null;
  return {
    r: Math.round(red / count),
    g: Math.round(green / count),
    b: Math.round(blue / count),
    a: Math.round(alpha / count),
  };
}

function detectGridStep(data, width, height) {
  const candidates = [2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];
  const sampleRows = Math.max(1, Math.min(80, Math.floor(height / 6)));
  const sampleCols = Math.max(1, Math.min(80, Math.floor(width / 6)));

  const scoreForStep = (step, horizontal) => {
    let score = 0;
    let samples = 0;
    const limit = horizontal ? width : height;
    const fixedLimit = horizontal ? height : width;
    for (let fixed = 0; fixed < fixedLimit; fixed += Math.max(1, Math.floor(fixedLimit / (horizontal ? sampleRows : sampleCols)))) {
      for (let value = step; value < limit; value += step) {
        const x1 = horizontal ? value - 1 : fixed;
        const y1 = horizontal ? fixed : value - 1;
        const x2 = horizontal ? value : fixed;
        const y2 = horizontal ? fixed : value;
        const offset1 = (y1 * width + x1) * 4;
        const offset2 = (y2 * width + x2) * 4;
        score +=
          Math.abs(data[offset1] - data[offset2]) +
          Math.abs(data[offset1 + 1] - data[offset2 + 1]) +
          Math.abs(data[offset1 + 2] - data[offset2 + 2]);
        samples += 1;
      }
    }
    return samples ? score / samples : 0;
  };

  let best = 1;
  let bestScore = 0;
  for (const step of candidates) {
    const score = Math.max(scoreForStep(step, true), scoreForStep(step, false));
    if (score > bestScore) {
      bestScore = score;
      best = step;
    }
  }
  return bestScore >= 28 ? best : 1;
}

function loadPatternFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("请选择图片文件");
    return;
  }
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);
  image.onload = () => {
    const maxSize = 1200;
    const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = dom.patternCanvas;
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    patternImage = image;
    patternResults = [];
    canvas.classList.add("visible");
    dom.patternEmpty.classList.add("hidden");
    dom.patternFileMeta.textContent = `${file.name} · ${canvas.width}×${canvas.height}`;
    dom.patternSummary.textContent = "图片已载入，点击开始识别";
    dom.analyzePattern.disabled = false;
    dom.addPatternRow.disabled = true;
    dom.copyPatternResults.disabled = true;
    dom.downloadPatternCsv.disabled = true;
    dom.importPatternResults.disabled = true;
    renderPatternResults();
    URL.revokeObjectURL(objectUrl);
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    showToast("图片读取失败");
  };
  image.src = objectUrl;
}

function analyzePattern() {
  if (!patternImage) {
    showToast("请先上传图纸");
    return;
  }
  const canvas = dom.patternCanvas;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const requestedStep = dom.patternStep.value;
  let step = requestedStep === "auto" ? detectGridStep(data, canvas.width, canvas.height) : Number(requestedStep);
  step = Math.max(1, Math.floor(step));

  if (requestedStep === "auto") {
    const cellCount = (canvas.width * canvas.height) / (step * step);
    while (cellCount > 120000) {
      step += 1;
    }
  }

  const ignoreWhite = dom.patternIgnoreWhite.checked;
  const threshold = Math.max(200, Math.min(255, Number(dom.patternWhiteThreshold.value) || 242));
  const counts = new Map();
  let total = 0;

  for (let y = Math.floor(step / 2); y < canvas.height; y += step) {
    for (let x = Math.floor(step / 2); x < canvas.width; x += step) {
      const sample = averageCell(data, canvas.width, canvas.height, x, y, step >= 4 ? 1 : 0);
      if (!sample) continue;
      if (ignoreWhite && isNearWhite(sample.r, sample.g, sample.b, threshold)) continue;
      const code = nearestMardColor(sample.r, sample.g, sample.b);
      counts.set(code, (counts.get(code) || 0) + 1);
      total += 1;
    }
  }

  patternResults = Array.from(counts.entries())
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .map((item) => ({ ...item, hex: COLOR_MAP.get(item.code).hex }));

  dom.patternSummary.textContent = `总颗数 ${formatNumber(total)} · 色号 ${patternResults.length} · 网格 ${step}px`;
  dom.addPatternRow.disabled = false;
  dom.copyPatternResults.disabled = !patternResults.length;
  dom.downloadPatternCsv.disabled = !patternResults.length;
  dom.importPatternResults.disabled = !patternResults.length;
  renderPatternResults();
  refreshIcons();
}

function renderPatternResults() {
  if (!patternResults.length) {
    dom.patternResultsBody.innerHTML = `<tr><td colspan="6" class="empty-row">上传图纸后开始识别</td></tr>`;
    return;
  }
  const total = patternResults.reduce((sum, item) => sum + Number(item.count || 0), 0);
  dom.patternResultsBody.innerHTML = patternResults
    .map((item, index) => {
      const color = COLOR_MAP.get(item.code) || COLORS[0];
      const percentage = total ? (Number(item.count || 0) / total) * 100 : 0;
      return `
        <tr>
          <td>
            <select class="pattern-code-select" data-pattern-code="${index}">
              ${COLORS.map(
                (option) =>
                  `<option value="${option.code}" ${option.code === item.code ? "selected" : ""}>${option.code}</option>`,
              ).join("")}
            </select>
          </td>
          <td><span class="swatch" style="background:${color.hex}"></span></td>
          <td>${color.hex}</td>
          <td>
            <input class="pattern-count-input" type="number" min="1" step="1" value="${item.count}" data-pattern-count="${index}" />
          </td>
          <td>
            <div class="pattern-bar"><span style="width:${Math.max(2, percentage)}%"></span></div>
            <small>${percentage.toFixed(1)}%</small>
          </td>
          <td>
            <button class="delete-button" data-remove-pattern="${index}" title="删除这一行">
              <i data-lucide="trash-2"></i>
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
  refreshIcons();
}

function clearPattern() {
  patternImage = null;
  patternResults = [];
  const canvas = dom.patternCanvas;
  canvas.classList.remove("visible");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
  dom.patternEmpty.classList.remove("hidden");
  dom.patternFileMeta.textContent = "未选择图片";
  dom.patternSummary.textContent = "等待识别";
  dom.analyzePattern.disabled = true;
  dom.addPatternRow.disabled = true;
  dom.copyPatternResults.disabled = true;
  dom.downloadPatternCsv.disabled = true;
  dom.importPatternResults.disabled = true;
  dom.patternFile.value = "";
  renderPatternResults();
}

function patternListText() {
  return patternResults.map((item) => `${item.code} ${Number(item.count)}`).join("\n");
}

function importPatternToCalculator() {
  if (!patternResults.length) {
    showToast("没有可带入的识别结果");
    return;
  }
  ui.calculatorType = "use";
  switchView("calculator");
  openLedgerImportModal({
    type: "use",
    project: "图纸识别",
    lines: patternListText(),
  });
}

function downloadPatternCsv() {
  if (!patternResults.length) return;
  const total = patternResults.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const rows = patternResults.map((item) => [
    item.code,
    COLOR_MAP.get(item.code)?.hex || "",
    Number(item.count),
    total ? ((Number(item.count) / total) * 100).toFixed(1) : "0.0",
  ]);
  const csv = ["色号,HEX,数量,占比%", ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `图纸识别结果-${todayString()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyPatternResults() {
  if (!patternResults.length) return;
  try {
    await navigator.clipboard.writeText(patternListText());
    showToast("识别清单已复制");
  } catch {
    showToast("复制失败，请使用下载 CSV");
  }
}

function localDateString(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function getDashboardRange() {
  const today = new Date();
  const end = localDateString(today);
  let startDate = new Date(today.getFullYear(), today.getMonth(), 1);

  if (ui.dashboardRange === "week") {
    const day = today.getDay() === 0 ? 7 : today.getDay();
    startDate = new Date(today);
    startDate.setDate(today.getDate() - day + 1);
  } else if (ui.dashboardRange === "30") {
    startDate = new Date(today);
    startDate.setDate(today.getDate() - 29);
  } else if (ui.dashboardRange === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
  } else if (ui.dashboardRange === "custom") {
    startDate = dom.dashboardStart.value ? new Date(`${dom.dashboardStart.value}T00:00:00`) : new Date(today);
  }

  if (ui.dashboardRange === "custom") {
    const customStart = dom.dashboardStart.value || end;
    const customEnd = dom.dashboardEnd.value || customStart;
    return { start: customStart, end: customEnd };
  }

  return {
    start: localDateString(startDate),
    end,
  };
}

function dashboardRecordsInRange(range) {
  return state.ledger
    .filter((record) => record.date >= range.start && record.date <= range.end)
    .sort((a, b) => b.date.localeCompare(a.date) || new Date(b.createdAt) - new Date(a.createdAt));
}

function buildDashboardSeries(records, range) {
  const start = new Date(`${range.start}T00:00:00`);
  const end = new Date(`${range.end}T00:00:00`);
  const dayCount = Math.max(1, Math.round((end - start) / 86_400_000) + 1);
  const monthly = dayCount > 70;
  const keys = new Map();

  const addKey = (date, record) => {
    const key = monthly ? date.slice(0, 7) : date;
    if (!keys.has(key)) keys.set(key, { use: 0, add: 0 });
    const item = keys.get(key);
    if (record.type === "use") item.use += Number(record.quantity || 0);
    else item.add += Number(record.quantity || 0);
  };

  records.forEach((record) => addKey(record.date, record));
  const sortedKeys = Array.from(keys.keys()).sort();
  return {
    monthly,
    labels: sortedKeys,
    use: sortedKeys.map((key) => keys.get(key).use),
    add: sortedKeys.map((key) => keys.get(key).add),
  };
}

function renderDashboardLineChart(records, range) {
  const series = buildDashboardSeries(records, range);
  if (!series.labels.length) {
    dom.dashboardLineChart.innerHTML = `<div class="empty-row">当前时间范围内没有趋势数据</div>`;
    dom.dashboardTrendCaption.textContent = "--";
    return;
  }

  const width = 760;
  const height = 240;
  const padding = { top: 16, right: 16, bottom: 34, left: 38 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, ...series.use, ...series.add);
  const x = (index) =>
    padding.left + (series.labels.length === 1 ? chartWidth / 2 : (index / (series.labels.length - 1)) * chartWidth);
  const y = (value) => padding.top + chartHeight - (value / maxValue) * chartHeight;
  const points = (values) => values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const labelIndexes = new Set([0, Math.floor((series.labels.length - 1) / 2), series.labels.length - 1]);

  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((ratio) => {
      const lineY = padding.top + chartHeight - ratio * chartHeight;
      return `<line x1="${padding.left}" x2="${width - padding.right}" y1="${lineY}" y2="${lineY}" stroke="rgba(60,60,67,.12)" stroke-dasharray="3 5" />`;
    })
    .join("");
  const labels = Array.from(labelIndexes)
    .map(
      (index) =>
        `<text x="${x(index)}" y="${height - 10}" text-anchor="middle" fill="#8e8e93" font-size="10">${escapeHtml(
          series.labels[index],
        )}</text>`,
    )
    .join("");
  const dots = (values, color) =>
    values
      .map(
        (value, index) =>
          `<circle cx="${x(index)}" cy="${y(value)}" r="3" fill="${color}" stroke="#f5f5f7" stroke-width="1.5" />`,
      )
      .join("");

  dom.dashboardLineChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="用豆与增补趋势图">
      ${grid}
      <polyline points="${points(series.use)}" fill="none" stroke="#1d1d1f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="${points(series.add)}" fill="none" stroke="#8e8e93" stroke-width="2" stroke-dasharray="6 5" stroke-linecap="round" stroke-linejoin="round" />
      ${dots(series.use, "#1d1d1f")}
      ${dots(series.add, "#8e8e93")}
      ${labels}
      <text x="${padding.left}" y="10" fill="#8e8e93" font-size="10">峰值 ${formatNumber(maxValue)}</text>
    </svg>
    <div class="dashboard-line-legend">
      <span><i></i>用豆</span>
      <span><i class="restock-line"></i>增补</span>
    </div>
  `;
  dom.dashboardTrendCaption.textContent = series.monthly ? "按月汇总" : "按日汇总";
}

function renderDashboardRanking(records) {
  const counts = new Map();
  records
    .filter((record) => record.type === "use")
    .forEach((record) => counts.set(record.code, (counts.get(record.code) || 0) + Number(record.quantity || 0)));
  const ranking = Array.from(counts.entries())
    .map(([code, count]) => ({ code, count, hex: COLOR_MAP.get(code)?.hex || "#ddd" }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (!ranking.length) {
    dom.dashboardColorRanking.innerHTML = `<div class="empty-row">当前时间范围内没有用豆记录</div>`;
    return;
  }
  const max = ranking[0].count;
  dom.dashboardColorRanking.innerHTML = ranking
    .map(
      (item) => `
        <div class="dashboard-ranking-row">
          <span class="swatch" style="background:${item.hex}"></span>
          <span class="ranking-code">${item.code}</span>
          <div class="dashboard-ranking-line"><span style="width:${Math.max(3, (item.count / max) * 100)}%"></span></div>
          <span class="ranking-count">${formatNumber(item.count)}</span>
        </div>
      `,
    )
    .join("");
}

function renderDashboardCalendar() {
  const month = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth(), 1);
  ui.calendarMonth = month;
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = month.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const todayKey = todayString();
  const range = getDashboardRange();
  const activeDates = new Set(
    state.ledger.filter((record) => record.type === "use").map((record) => record.date),
  );
  const cells = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(`<span class="calendar-day muted" aria-hidden="true"></span>`);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    const key = localDateString(date);
    const classes = ["calendar-day"];
    if (activeDates.has(key)) classes.push("has-activity");
    if (key === todayKey) classes.push("today");
    if (key === range.start) classes.push("range-start");
    if (key === range.end) classes.push("range-end");
    if (key > range.start && key < range.end) classes.push("in-range");
    cells.push(
      `<button type="button" class="${classes.join(" ")}" data-calendar-date="${key}" aria-label="${key}">${day}</button>`,
    );
  }

  dom.dashboardCalendarTitle.textContent = `${year} 年 ${monthIndex + 1} 月`;
  dom.dashboardCalendar.innerHTML = cells.join("");
}

function renderDashboardQuote(advance = false) {
  if (advance) dashboardQuoteIndex = (dashboardQuoteIndex + 1) % DASHBOARD_QUOTES.length;
  const quote = DASHBOARD_QUOTES[dashboardQuoteIndex];
  dom.dashboardQuote.textContent = quote.text;
  dom.dashboardQuoteAuthor.textContent = quote.author;
  dom.dashboardQuoteTranslation.textContent = quote.translation || "";
  dom.dashboardQuoteTranslation.classList.toggle("hidden", !quote.translation);
}

function renderDashboardNotePane(pane = ui.dashboardNotePane) {
  ui.dashboardNotePane = pane;
  $$("button[data-note-pane]", dom.dashboardNoteTabs).forEach((button) => {
    const isActive = button.dataset.notePane === pane;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  $$(".dashboard-note-pane").forEach((paneElement) => {
    paneElement.classList.toggle("active", paneElement.dataset.notePane === pane);
  });
}

function updateDashboardToday() {
  const today = todayString();
  const records = state.ledger.filter((record) => record.date === today);
  const used = records
    .filter((record) => record.type === "use")
    .reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const added = records
    .filter((record) => record.type === "add")
    .reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  dom.dashboardTodayUse.textContent = formatNumber(used);
  dom.dashboardTodayAdd.textContent = formatNumber(added);
}

function renderDashboard() {
  const range = getDashboardRange();
  if (range.start > range.end) {
    showToast("开始日期不能晚于结束日期");
    return;
  }
  const records = dashboardRecordsInRange(range);
  const useRecords = records.filter((record) => record.type === "use");
  const addRecords = records.filter((record) => record.type === "add");
  const usedTotal = useRecords.reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const addedTotal = addRecords.reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const costPerBead = Math.max(0, Number(dom.dashboardCost.value) || 0);
  const patternKeys = new Set(
    useRecords.map((record) => record.project?.trim() || `未命名-${record.date}`),
  );

  dom.dashboardMetrics.innerHTML = `
    <article class="dashboard-metric"><span>拼图数量</span><strong>${formatNumber(patternKeys.size)}</strong></article>
    <article class="dashboard-metric"><span>用豆数量</span><strong>${formatNumber(usedTotal)}</strong></article>
    <article class="dashboard-metric"><span>补充数量</span><strong>${formatNumber(addedTotal)}</strong></article>
    <article class="dashboard-metric"><span>用豆成本</span><strong>¥${(usedTotal * costPerBead).toFixed(2)}</strong></article>
    <article class="dashboard-metric"><span>增补成本</span><strong>¥${(addedTotal * costPerBead).toFixed(2)}</strong></article>
  `;

  renderDashboardLineChart(records, range);
  renderDashboardRanking(records);
  renderDashboardCalendar();
  updateDashboardToday();
  renderDashboardTasks();
  renderDashboardNotePane();

  dom.dashboardDetailCount.textContent = `${formatNumber(records.length)} 条`;
  dom.dashboardDetailBody.innerHTML = records.length
    ? records
        .slice(0, 300)
        .map(
          (record) => `
            <tr>
              <td>${escapeHtml(record.date)}</td>
              <td>${record.type === "use" ? "拼豆用" : "后续增补"}</td>
              <td class="code-cell">${escapeHtml(record.code)}</td>
              <td>${formatNumber(record.quantity)}</td>
              <td>${escapeHtml(record.project || "未命名")}</td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="5" class="empty-row">当前时间范围内没有记录</td></tr>`;
  dom.dashboardRangeLabel.textContent = `${range.start} 至 ${range.end}`;
}

function dashboardReportHtml() {
  const range = getDashboardRange();
  const records = dashboardRecordsInRange(range);
  const useRecords = records.filter((record) => record.type === "use");
  const addRecords = records.filter((record) => record.type === "add");
  const usedTotal = useRecords.reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const addedTotal = addRecords.reduce((sum, record) => sum + Number(record.quantity || 0), 0);
  const patternKeys = new Set(useRecords.map((record) => record.project?.trim() || `未命名-${record.date}`));
  const costPerBead = Math.max(0, Number(dom.dashboardCost.value) || 0);
  const colorCounts = new Map();
  useRecords.forEach((record) => colorCounts.set(record.code, (colorCounts.get(record.code) || 0) + Number(record.quantity || 0)));
  const ranking = Array.from(colorCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 20);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>拼豆里程报告 ${range.start} - ${range.end}</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif;background:#f3f3f5;color:#1d1d1f;margin:0;padding:36px}
main{max-width:960px;margin:0 auto}
h1{font-size:30px;margin:0 0 8px}.meta{color:#6e6e73;margin-bottom:28px}
.no-print{display:flex;justify-content:flex-end;margin-bottom:18px}.print-button{padding:9px 14px;border:1px solid #d8d8dc;border-radius:10px;background:#fff;color:#1d1d1f;font-weight:600}
.metrics{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #d8d8dc;border-bottom:1px solid #d8d8dc}
.metrics div{padding:18px 14px;border-right:1px solid #d8d8dc}.metrics div:last-child{border-right:0}
.metrics span{display:block;color:#6e6e73;font-size:12px}.metrics strong{display:block;font-size:24px;margin-top:8px}
table{width:100%;border-collapse:collapse;margin-top:24px}th,td{padding:10px;border-bottom:1px solid #e1e1e5;text-align:left;font-size:13px}th{color:#6e6e73;font-weight:600}
.credit{text-align:center;color:#8e8e93;margin-top:40px;font-size:12px}.credit b{font-family:"Segoe Script","Brush Script MT",cursive;font-size:20px;color:#1d1d1f}
@page{size:A4;margin:16mm}@media print{body{padding:0;background:#fff}.no-print{display:none}}
</style>
</head>
<body>
<main>
<div class="no-print"><button class="print-button" onclick="window.print()">打印 / 保存为 PDF</button></div>
<h1>拼豆里程报告</h1>
<div class="meta">时间范围：${range.start} 至 ${range.end} · 每颗参考成本：¥${costPerBead.toFixed(3)}</div>
<section class="metrics">
<div><span>拼图数量</span><strong>${formatNumber(patternKeys.size)}</strong></div>
<div><span>用豆数量</span><strong>${formatNumber(usedTotal)}</strong></div>
<div><span>补充数量</span><strong>${formatNumber(addedTotal)}</strong></div>
<div><span>用豆成本</span><strong>¥${(usedTotal * costPerBead).toFixed(2)}</strong></div>
<div><span>增补成本</span><strong>¥${(addedTotal * costPerBead).toFixed(2)}</strong></div>
</section>
<h2>色号使用排行</h2>
<table><thead><tr><th>色号</th><th>数量</th></tr></thead><tbody>
${ranking.map(([code, count]) => `<tr><td>${escapeHtml(code)}</td><td>${formatNumber(count)}</td></tr>`).join("") || `<tr><td colspan="2">没有用豆记录</td></tr>`}
</tbody></table>
<h2>流水明细</h2>
<table><thead><tr><th>日期</th><th>类型</th><th>色号</th><th>数量</th><th>拼图 / 用途</th></tr></thead><tbody>
${records.map((record) => `<tr><td>${escapeHtml(record.date)}</td><td>${record.type === "use" ? "拼豆用" : "后续增补"}</td><td>${escapeHtml(record.code)}</td><td>${formatNumber(record.quantity)}</td><td>${escapeHtml(record.project || "未命名")}</td></tr>`).join("")}
</tbody></table>
<div class="credit">MARD 221 拼豆管理 · <b>By Christy Deng</b></div>
</main>
</body>
</html>`;
}

function exportDashboardPdf() {
  const reportWindow = window.open("", "_blank");
  if (!reportWindow) {
    showToast("浏览器拦截了报告窗口，请允许弹出窗口");
    return;
  }
  reportWindow.document.open();
  reportWindow.document.write(dashboardReportHtml());
  reportWindow.document.close();
  const printReport = () => {
    setTimeout(() => {
      reportWindow.focus();
      reportWindow.print();
    }, 250);
  };
  if (reportWindow.document.readyState === "complete") printReport();
  else reportWindow.addEventListener("load", printReport, { once: true });
}

function exportDashboardCsv() {
  const range = getDashboardRange();
  const records = dashboardRecordsInRange(range);
  const rows = records.map((record) => [
    record.date,
    record.type === "use" ? "拼豆用" : "后续增补",
    record.code,
    Number(record.quantity),
    record.project || "",
  ]);
  const csv = [
    "日期,类型,色号,数量,拼图/用途",
    ...rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")),
  ].join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `拼豆明细-${range.start}-${range.end}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function todayString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
  }
  return hash >>> 0;
}

function seededPick(items, count, seed) {
  const pool = items.slice();
  let cursor = seed >>> 0 || 1;
  for (let index = pool.length - 1; index > 0; index -= 1) {
    cursor = (Math.imul(cursor, 1664525) + 1013904223) >>> 0;
    const swapIndex = cursor % (index + 1);
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return pool.slice(0, count);
}

function getDailyTaskSet(date = todayString()) {
  const seed = hashSeed(date);
  const regular = seededPick(DAILY_TASKS, 3, seed).map((task) => ({ ...task, kind: "regular" }));
  const egg = seededPick(DAILY_EGG_TASKS, 1, seed ^ 0x9e3779b9).map((task) => ({
    ...task,
    kind: "egg",
  }));
  return [...regular, ...egg];
}

function ensureDailyTaskState() {
  const date = todayString();
  if (dailyTaskState.date !== date) dailyTaskState = { date, completed: [] };
  return date;
}

function loadDailyTaskProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DAILY_TASK_STORAGE_KEY) || "null");
    const today = todayString();
    if (parsed?.date === today && Array.isArray(parsed.completed)) {
      dailyTaskState = {
        date: today,
        completed: parsed.completed.filter((id) => typeof id === "string"),
      };
    }
  } catch (error) {
    console.warn("Failed to load daily tasks", error);
  }
}

function saveDailyTaskProgress() {
  try {
    localStorage.setItem(DAILY_TASK_STORAGE_KEY, JSON.stringify(dailyTaskState));
  } catch (error) {
    console.warn("Failed to save daily tasks", error);
  }
}

function renderDashboardTasks() {
  const today = ensureDailyTaskState();
  const tasks = getDailyTaskSet(today);
  const completed = new Set(dailyTaskState.completed);
  const date = new Date(`${today}T00:00:00`);
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const taskItem = (task) => `
    <label class="daily-task-item${completed.has(task.id) ? " done" : ""}">
      <input
        type="checkbox"
        data-daily-task-id="${escapeHtml(task.id)}"
        ${completed.has(task.id) ? "checked" : ""}
      />
      <span class="daily-task-check" aria-hidden="true"></span>
      <span class="daily-task-text">
        ${escapeHtml(task.text)}
        ${task.translation ? `<small>${escapeHtml(task.translation)}</small>` : ""}
      </span>
    </label>
  `;
  const regularTasks = tasks.filter((task) => task.kind === "regular");
  const eggTasks = tasks.filter((task) => task.kind === "egg");

  dom.dashboardTaskProgress.textContent = `${completed.size} / ${tasks.length}`;
  dom.dashboardTaskDate.textContent = `${date.getMonth() + 1} 月 ${date.getDate()} 日 · ${
    weekdays[date.getDay()]
  } · 今日任务已发布`;
  dom.dashboardTaskList.innerHTML = `
    <section class="daily-task-group">
      <span class="daily-task-group-label">常规任务</span>
      ${regularTasks.map(taskItem).join("")}
    </section>
    <section class="daily-task-group">
      <span class="daily-task-group-label">彩蛋任务</span>
      ${eggTasks.map(taskItem).join("")}
    </section>
  `;
}

function makeId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeWarningValue(value, fallback = DEFAULT_WARNING_VALUE) {
  const number = Math.floor(Number(value));
  if (!Number.isFinite(number) || number < 0) return fallback;
  return Math.min(number, 1_000_000);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    state.opening = parsed.opening && typeof parsed.opening === "object" ? parsed.opening : {};
    state.ledger = Array.isArray(parsed.ledger) ? parsed.ledger : [];
    state.warningValue = normalizeWarningValue(parsed.warningValue);
  } catch (error) {
    console.warn("Failed to load state", error);
  }
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        opening: state.opening,
        ledger: state.ledger,
        warningValue: state.warningValue,
      }),
    );
  } catch (error) {
    console.warn("Failed to save state", error);
    showToast("本地保存失败，请导出备份");
  }
}

function getMovementMap() {
  const map = new Map(COLORS.map((color) => [color.code, 0]));
  for (const record of state.ledger) {
    if (!map.has(record.code)) continue;
    const sign = record.type === "use" ? -1 : 1;
    map.set(record.code, map.get(record.code) + sign * Number(record.quantity || 0));
  }
  return map;
}

function getInventory() {
  const movement = getMovementMap();
  const result = new Map();
  for (const color of COLORS) {
    const openingValue = state.opening[color.code];
    const hasOpening = openingValue !== undefined && openingValue !== "" && openingValue !== null;
    const opening = hasOpening ? Number(openingValue) : 0;
    const moved = movement.get(color.code) || 0;
    const current = opening + moved;
    let status = "未填写";
    if (hasOpening || moved !== 0) {
      if (current <= 0) status = "缺货";
      else if (current <= state.warningValue) status = "偏低";
      else status = "充足";
    }
    result.set(color.code, {
      opening,
      hasOpening,
      moved,
      current,
      status,
      suggested:
        status === "缺货" || status === "偏低" ? Math.max(0, state.warningValue - current) : 0,
    });
  }
  return result;
}

function getColor(code) {
  return COLOR_MAP.get(code);
}

function showToast(message) {
  if (!dom.toast) return;
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => dom.toast.classList.remove("show"), 2400);
}

function selectColorFromBead(code) {
  ui.selectedColor = code;
  dom.colorSearch.value = code;
  switchView("calculator");
  renderCalculator();
  showToast(`${code} 已带到计算器`);
}

function spawnBeadBurst(anchor, colorHex = "#b45d7e") {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const rect = anchor.getBoundingClientRect();
  const layer = document.createElement("div");
  layer.className = "bead-burst";
  for (let index = 0; index < 7; index += 1) {
    const bead = document.createElement("span");
    bead.className = "burst-bead";
    bead.style.background = colorHex;
    bead.style.left = `${rect.left + rect.width / 2}px`;
    bead.style.top = `${rect.top + rect.height / 2}px`;
    bead.style.setProperty("--tx", `${(Math.random() - 0.5) * 90}px`);
    bead.style.setProperty("--ty", `${-24 - Math.random() * 58}px`);
    bead.style.setProperty("--delay", `${index * 18}ms`);
    layer.appendChild(bead);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 760);
}

function refreshIcons() {
  window.lucide?.createIcons();
}

function switchView(view) {
  ui.activeView = view;
  document.body.classList.toggle("home-mode", view === "welcome");
  let activeTab = null;
  $$(".tab").forEach((tab) => {
    const isActive = tab.dataset.view === view;
    tab.classList.toggle("active", isActive);
    if (isActive) {
      activeTab = tab;
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
  if (activeTab && dom.tabs) {
    const tabLeft = activeTab.offsetLeft;
    const tabRight = tabLeft + activeTab.offsetWidth;
    if (tabLeft < dom.tabs.scrollLeft) dom.tabs.scrollLeft = Math.max(0, tabLeft - 6);
    if (tabRight > dom.tabs.scrollLeft + dom.tabs.clientWidth) {
      dom.tabs.scrollLeft = tabRight - dom.tabs.clientWidth + 6;
    }
  }
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`));
  if (view !== "welcome") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  if (view === "warehouse") renderWarehouse();
  if (view === "calculator") renderCalculator();
  if (view === "restock") renderRestock();
  if (view === "palette") renderPalette();
  if (view === "dashboard") renderDashboard();
  refreshIcons();
}

function renderMetrics() {
  const inventory = getInventory();
  const values = Array.from(inventory.values());
  const total = values.reduce((sum, item) => sum + item.current, 0);
  const low = values.filter((item) => item.status === "偏低").length;
  const out = values.filter((item) => item.status === "缺货").length;
  const unfilled = values.filter((item) => item.status === "未填写").length;
  dom.warehouseMetrics.innerHTML = `
    <div class="metric-card"><span>当前总库存</span><strong>${formatNumber(total)}</strong></div>
    <div class="metric-card danger"><span>缺货</span><strong>${out}</strong></div>
    <div class="metric-card warn"><span>偏低</span><strong>${low}</strong></div>
    <div class="metric-card"><span>未填写</span><strong>${unfilled}</strong></div>
  `;
}

function renderWarehouse() {
  renderMetrics();
  const inventory = getInventory();
  const search = dom.warehouseSearch.value.trim().toUpperCase();
  const filtered = COLORS.filter((color) => {
    const inGroup = ui.warehouseGroup === "all" || color.group === ui.warehouseGroup;
    const inSearch = !search || color.code.includes(search) || color.hex.includes(search);
    return inGroup && inSearch;
  });

  dom.warehouseGroups.innerHTML = [
    `<button class="chip ${ui.warehouseGroup === "all" ? "active" : ""}" data-group="all">全部</button>`,
    ...GROUPS.map((group) => {
      const count = COLORS.filter((color) => color.group === group).length;
      return `<button class="chip ${
        ui.warehouseGroup === group ? "active" : ""
      }" data-group="${group}">${group} · ${count}</button>`;
    }),
  ].join("");

  if (!filtered.length) {
    dom.warehouseBody.innerHTML = `<tr><td colspan="9" class="empty-row">没有匹配的色号</td></tr>`;
    refreshIcons();
    return;
  }

  dom.warehouseBody.innerHTML = filtered
    .map((color) => {
      const item = inventory.get(color.code);
      const openingRaw =
        state.opening[color.code] === undefined || state.opening[color.code] === ""
          ? ""
          : Number(state.opening[color.code]);
      return `
        <tr>
          <td class="code-cell">${escapeHtml(color.code)}</td>
          <td><span class="group-badge">${color.group}</span></td>
          <td>
            <button
              class="swatch bead-button"
              style="background:${color.hex}"
              title="点击带到计算器：${color.code} ${color.hex}"
              data-pick-color="${color.code}"
              aria-label="选择 ${color.code}"
            ></button>
          </td>
          <td>
            <div class="stock-control">
              <button class="stock-step" type="button" data-stock-step="-500" data-stock-code="${color.code}">-500</button>
              <input
                class="stock-input"
                type="number"
                min="0"
                step="1"
                value="${openingRaw}"
                data-opening-code="${color.code}"
                aria-label="${color.code} 期初库存"
              />
              <button class="stock-step" type="button" data-stock-step="500" data-stock-code="${color.code}">+500</button>
            </div>
          </td>
          <td>${formatNumber(item.moved)}</td>
          <td><strong>${formatNumber(item.current)}</strong></td>
          <td>${formatNumber(state.warningValue)}</td>
          <td><span class="status-pill status-${item.status}">${item.status}</span></td>
          <td>${item.suggested ? formatNumber(item.suggested) : "-"}</td>
        </tr>
      `;
    })
    .join("");
  refreshIcons();
}

function renderCalculator() {
  $$("#calculator-type button").forEach((button) => {
    button.classList.toggle("active", button.dataset.type === ui.calculatorType);
  });
  dom.projectLabel.textContent = ui.calculatorType === "use" ? "拼图名称" : "来源 / 用途";
  dom.calcProject.placeholder = ui.calculatorType === "use" ? "例如：小猫挂件" : "例如：补货 / 盘点修正";
  dom.quickField.classList.toggle("hidden", ui.calculatorType === "use");
  renderSelectedColor();
  renderCalculatorPreview();
  renderLedger();
}

function renderSelectedColor() {
  if (!ui.selectedColor) {
    dom.selectedColor.innerHTML = `
      <span class="swatch empty"></span>
      <span class="selected-color-text">未选择</span>
    `;
    return;
  }
  const color = getColor(ui.selectedColor);
  dom.selectedColor.innerHTML = `
    <span class="swatch" style="background:${color.hex}"></span>
    <span class="selected-color-text">${color.code}</span>
    <small>${color.hex}</small>
  `;
}

function renderColorOptions() {
  const search = dom.colorSearch.value.trim().toUpperCase();
  const options = COLORS.filter((color) => {
    if (!search) return true;
    return color.code.includes(search) || color.hex.includes(search);
  }).slice(0, 40);
  if (!options.length) {
    dom.colorOptions.innerHTML = `<div class="color-option">没有匹配色号</div>`;
  } else {
    dom.colorOptions.innerHTML = options
      .map(
        (color) => `
          <button type="button" class="color-option ${
            ui.selectedColor === color.code ? "active" : ""
          }" data-code="${color.code}">
            <span class="swatch" style="background:${color.hex}"></span>
            <strong>${color.code}</strong>
            <small>${color.hex}</small>
          </button>
        `,
      )
      .join("");
  }
  dom.colorOptions.classList.remove("hidden");
}

function renderCalculatorPreview() {
  if (!ui.selectedColor) {
    dom.previewBefore.textContent = "--";
    dom.previewAfter.textContent = "--";
    dom.previewState.textContent = "请选择色号";
    return;
  }
  const inventory = getInventory().get(ui.selectedColor);
  const quantity = Number(dom.calcQuantity.value || 0);
  const delta = ui.calculatorType === "use" ? -quantity : quantity;
  const after = inventory.current + delta;
  dom.previewBefore.textContent = formatNumber(inventory.current);
  dom.previewAfter.textContent = formatNumber(after);
  let status = "充足";
  if (after <= 0) status = "缺货";
  else if (after <= state.warningValue) status = "偏低";
  dom.previewState.textContent = `${ui.calculatorType === "use" ? "扣减" : "增加"} ${formatNumber(
    quantity,
  )} · ${status}`;
}

function renderLedger() {
  const filtered = state.ledger
    .filter((record) => ui.ledgerFilter === "all" || record.type === ui.ledgerFilter)
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  dom.ledgerCount.textContent = `${formatNumber(filtered.length)} 条`;
  if (!filtered.length) {
    dom.ledgerList.innerHTML = `<div class="empty-row">还没有记录</div>`;
    refreshIcons();
    return;
  }
  dom.ledgerList.innerHTML = filtered
    .slice(0, 200)
    .map((record) => {
      const color = getColor(record.code);
      const typeLabel = record.type === "use" ? "拼豆用" : "后续增补";
      const sign = record.type === "use" ? "-" : "+";
      return `
        <article class="ledger-item">
          <span class="swatch" style="background:${color?.hex || "#eee"}"></span>
          <div class="ledger-main">
            <strong>
              <span>${record.code}</span>
              <span class="ledger-qty ${record.type}">${sign}${formatNumber(record.quantity)}</span>
            </strong>
            <small>${escapeHtml(record.date)} · ${typeLabel} · ${escapeHtml(
              record.project || "未命名",
            )}${record.note ? ` · ${escapeHtml(record.note)}` : ""}</small>
          </div>
          <button class="delete-button" data-delete-record="${record.id}" title="删除记录">
            <i data-lucide="trash-2"></i>
          </button>
        </article>
      `;
    })
    .join("");
  refreshIcons();
}

function renderRestock() {
  const inventory = getInventory();
  const low = COLORS.map((color) => ({ color, item: inventory.get(color.code) })).filter(
    ({ item }) => item.status === "缺货" || item.status === "偏低",
  );
  const out = low.filter(({ item }) => item.status === "缺货").length;
  dom.restockMetrics.innerHTML = `
    <div class="metric-card danger"><span>缺货</span><strong>${out}</strong></div>
    <div class="metric-card warn"><span>偏低</span><strong>${low.length - out}</strong></div>
    <div class="metric-card"><span>需要关注</span><strong>${low.length}</strong></div>
    <div class="metric-card"><span>预警阈值</span><strong>${formatNumber(state.warningValue)}</strong></div>
  `;
  if (!low.length) {
    dom.restockBody.innerHTML = `<tr><td colspan="7" class="empty-row">暂无需要补货的颜色</td></tr>`;
    return;
  }
  dom.restockBody.innerHTML = low
    .map(
      ({ color, item }) => `
        <tr>
          <td class="code-cell">${color.code}</td>
          <td><span class="swatch" style="background:${color.hex}"></span></td>
          <td><strong>${formatNumber(item.current)}</strong></td>
          <td>${formatNumber(state.warningValue)}</td>
          <td><span class="status-pill status-${item.status}">${item.status}</span></td>
          <td>${formatNumber(item.suggested)}</td>
          <td>
            <button class="row-action" data-restock-code="${color.code}" data-restock-qty="${item.suggested}">
              去增补
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderPalette() {
  const search = dom.paletteSearch.value.trim().toUpperCase();
  const filtered = COLORS.filter(
    (color) => !search || color.code.includes(search) || color.hex.includes(search),
  );
  dom.paletteGrid.innerHTML = filtered
    .map(
      (color) => `
        <article class="palette-card">
          <button
            class="palette-color liquid-color"
            style="background:${color.hex};color:${contrastText(color.hex)}"
            data-pick-color="${color.code}"
            title="点击带到计算器：${color.code} ${color.hex}"
            aria-label="选择 ${color.code}"
          >${color.code}</button>
          <div class="palette-meta">
            <strong>${color.code}</strong>
            <span>${color.hex}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function addRecord(record) {
  const color = getColor(record.code);
  const quantity = Number(record.quantity);
  if (!color) {
    showToast("色号不存在");
    return false;
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    showToast("数量必须是正数");
    return false;
  }
  state.ledger.push({
    id: makeId(),
    date: record.date || todayString(),
    type: record.type === "add" ? "add" : "use",
    code: color.code,
    quantity,
    project: record.project || "",
    note: record.note || "",
    createdAt: new Date().toISOString(),
  });
  saveState();
  return true;
}

function deleteRecord(id) {
  state.ledger = state.ledger.filter((record) => record.id !== id);
  saveState();
  renderWarehouse();
  renderCalculator();
  renderRestock();
  renderPalette();
  renderDashboard();
  showToast("记录已删除");
}

function parseLines(text, defaultQuantity = 500) {
  const valid = [];
  const invalid = [];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  for (const line of lines) {
    const parts = line.split(/[\t,，;；\s]+/).filter(Boolean);
    const code = parts[0].toUpperCase();
    const quantity =
      parts.length >= 2
        ? Number(parts[1])
        : defaultQuantity === null || defaultQuantity === undefined
          ? Number.NaN
          : Number(defaultQuantity);
    if (!COLOR_MAP.has(code) || !Number.isFinite(quantity) || quantity <= 0) {
      invalid.push(line);
      continue;
    }
    valid.push({ code, quantity });
  }
  return { valid, invalid };
}

function openModal({ title, body, actions }) {
  dom.modalRoot.innerHTML = `
    <div class="modal">
      <div class="modal-head">
        <h2>${escapeHtml(title)}</h2>
        <button class="modal-close" data-close-modal><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">${body}</div>
      <div class="modal-actions">${actions}</div>
    </div>
  `;
  dom.modalRoot.classList.add("open");
  refreshIcons();
}

function closeModal() {
  dom.modalRoot.classList.remove("open");
  dom.modalRoot.innerHTML = "";
}

function openWarningSettingsModal() {
  openModal({
    title: "设置预警阈值",
    body: `
      <div class="warning-settings-copy">
        <p>当前库存低于或等于阈值时，色号会标记为“偏低”，并自动进入补货清单。</p>
        <p class="import-hint">设置为 0 时，只把库存为 0 的色号标记为“缺货”，不额外标记偏低。</p>
      </div>
      <label class="field">
        <span>预警阈值（颗）</span>
        <input
          type="number"
          id="warning-value-input"
          min="0"
          max="1000000"
          step="1"
          value="${state.warningValue}"
        />
      </label>
      <div class="field">
        <span>常用阈值</span>
        <div class="chip-row" id="warning-value-presets">
          <button type="button" class="chip" data-warning-preset="0">0</button>
          <button type="button" class="chip" data-warning-preset="20">20</button>
          <button type="button" class="chip active" data-warning-preset="30">30</button>
          <button type="button" class="chip" data-warning-preset="50">50</button>
          <button type="button" class="chip" data-warning-preset="100">100</button>
          <button type="button" class="chip" data-warning-preset="500">500</button>
        </div>
      </div>
    `,
    actions: `
      <button class="ghost-button" data-close-modal>取消</button>
      <button class="primary-button" id="confirm-warning-value">
        <i data-lucide="check"></i>
        保存设置
      </button>
    `,
  });

  const input = $("#warning-value-input");
  const presets = $("#warning-value-presets");
  const syncPresetState = () => {
    const value = normalizeWarningValue(input.value, -1);
    $$("[data-warning-preset]", presets).forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.warningPreset) === value);
    });
  };
  presets.addEventListener("click", (event) => {
    const button = event.target.closest("[data-warning-preset]");
    if (!button) return;
    input.value = button.dataset.warningPreset;
    syncPresetState();
  });
  input.addEventListener("input", syncPresetState);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") $("#confirm-warning-value").click();
  });
  $("#confirm-warning-value").addEventListener("click", () => {
    if (!input.value.trim()) {
      showToast("请输入预警阈值");
      return;
    }
    const parsed = Number(input.value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      showToast("预警阈值必须是大于或等于 0 的数字");
      return;
    }
    state.warningValue = normalizeWarningValue(parsed);
    saveState();
    closeModal();
    renderAll();
    showToast(`预警阈值已设为 ${formatNumber(state.warningValue)} 颗`);
  });
  syncPresetState();
}

function openLedgerImportModal(prefill = {}) {
  const initialType = prefill.type === "add" ? "add" : "use";
  openModal({
    title: "批量导入记录",
    body: `
      <div class="form-grid">
        <label class="field">
          <span>类型</span>
          <select id="import-type">
            <option value="use" ${initialType === "use" ? "selected" : ""}>拼豆用（扣减）</option>
            <option value="add" ${initialType === "add" ? "selected" : ""}>后续增补（增加）</option>
          </select>
        </label>
        <label class="field">
          <span>日期</span>
          <input type="date" id="import-date" value="${todayString()}" />
        </label>
        <label class="field span-2">
          <span id="import-project-label">拼图名称</span>
          <input type="text" id="import-project" placeholder="例如：小猫挂件" value="${escapeHtml(
            prefill.project || "",
          )}" />
        </label>
        <div class="field span-2" id="import-default-qty-field">
          <span>默认数量（只有色号没有数量时使用）</span>
          <div class="chip-row" id="import-default-qty">
            <button type="button" class="chip active" data-default-qty="500">500</button>
            <button type="button" class="chip" data-default-qty="1000">1000</button>
            <button type="button" class="chip" data-default-qty="2000">2000</button>
          </div>
        </div>
        <label class="field span-2">
          <span>色号和数量</span>
          <textarea id="import-text" placeholder="每行一条，例如：&#10;A1&#10;A2 1200&#10;B5,300">${escapeHtml(
            prefill.lines || "",
          )}</textarea>
          <p class="import-hint">支持空格、逗号或 Tab 分隔；只填色号时会按默认数量导入。</p>
        </label>
      </div>
      <div class="parse-summary" id="import-summary">等待输入</div>
    `,
    actions: `
      <button class="ghost-button" data-close-modal>取消</button>
      <button class="primary-button" id="confirm-import"><i data-lucide="check"></i>导入记录</button>
    `,
  });
  const typeSelect = $("#import-type");
  const projectLabel = $("#import-project-label");
  const textarea = $("#import-text");
  const summary = $("#import-summary");
  const defaultQuantityField = $("#import-default-qty-field");
  const defaultQuantityRow = $("#import-default-qty");
  let defaultQuantity = 500;
  const getDefaultQuantity = () => (typeSelect.value === "add" ? defaultQuantity : null);
  const updateSummary = () => {
    const { valid, invalid } = parseLines(textarea.value, getDefaultQuantity());
    summary.textContent = `可导入 ${valid.length} 条${invalid.length ? `，无法识别 ${invalid.length} 条` : ""}`;
  };
  typeSelect.addEventListener("change", () => {
    projectLabel.textContent = typeSelect.value === "use" ? "拼图名称" : "来源 / 用途";
    defaultQuantityField.classList.toggle("hidden", typeSelect.value === "use");
    updateSummary();
  });
  defaultQuantityRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-default-qty]");
    if (!button) return;
    defaultQuantity = Number(button.dataset.defaultQty);
    $$(".chip", defaultQuantityRow).forEach((chip) => {
      chip.classList.toggle("active", chip === button);
    });
    updateSummary();
  });
  textarea.addEventListener("input", updateSummary);
  $("#confirm-import").addEventListener("click", () => {
    const { valid, invalid } = parseLines(textarea.value, getDefaultQuantity());
    if (!valid.length) {
      showToast("没有可导入的记录");
      return;
    }
    const type = typeSelect.value;
    const date = $("#import-date").value || todayString();
    const project = $("#import-project").value.trim();
    for (const row of valid) {
      addRecord({ type, date, code: row.code, quantity: row.quantity, project });
    }
    closeModal();
    renderWarehouse();
    renderCalculator();
    renderRestock();
    renderPalette();
    renderDashboard();
    showToast(`已导入 ${valid.length} 条记录${invalid.length ? `，跳过 ${invalid.length} 条` : ""}`);
  });
  defaultQuantityField.classList.toggle("hidden", typeSelect.value === "use");
  projectLabel.textContent = typeSelect.value === "use" ? "拼图名称" : "来源 / 用途";
  updateSummary();
}

function openOpeningImportModal() {
  openModal({
    title: "批量导入期初库存",
    body: `
      <div class="field">
        <span>默认数量（只有色号没有数量时使用）</span>
        <div class="chip-row" id="opening-default-qty">
          <button type="button" class="chip active" data-default-qty="500">500</button>
          <button type="button" class="chip" data-default-qty="1000">1000</button>
          <button type="button" class="chip" data-default-qty="2000">2000</button>
        </div>
      </div>
      <label class="field">
        <span>色号和期初库存</span>
        <textarea id="opening-text" placeholder="每行一条，例如：&#10;A1&#10;A2 1200&#10;B5,300"></textarea>
        <p class="import-hint">只填色号时会按默认数量导入；导入会覆盖这些色号的期初库存。</p>
      </label>
      <div class="parse-summary" id="opening-summary">等待输入</div>
    `,
    actions: `
      <button class="ghost-button" data-close-modal>取消</button>
      <button class="primary-button" id="confirm-opening-import"><i data-lucide="check"></i>导入期初</button>
    `,
  });
  const textarea = $("#opening-text");
  const summary = $("#opening-summary");
  const defaultQuantityRow = $("#opening-default-qty");
  let defaultQuantity = 500;
  const updateSummary = () => {
    const { valid, invalid } = parseLines(textarea.value, defaultQuantity);
    summary.textContent = `可导入 ${valid.length} 条${invalid.length ? `，无法识别 ${invalid.length} 条` : ""}`;
  };
  defaultQuantityRow.addEventListener("click", (event) => {
    const button = event.target.closest("[data-default-qty]");
    if (!button) return;
    defaultQuantity = Number(button.dataset.defaultQty);
    $$(".chip", defaultQuantityRow).forEach((chip) => {
      chip.classList.toggle("active", chip === button);
    });
    updateSummary();
  });
  textarea.addEventListener("input", updateSummary);
  $("#confirm-opening-import").addEventListener("click", () => {
    const { valid, invalid } = parseLines(textarea.value, defaultQuantity);
    if (!valid.length) {
      showToast("没有可导入的数据");
      return;
    }
    for (const row of valid) {
      state.opening[row.code] = row.quantity;
    }
    saveState();
    closeModal();
    renderWarehouse();
    renderCalculator();
    renderRestock();
    renderPalette();
    renderDashboard();
    showToast(`已导入 ${valid.length} 个色号${invalid.length ? `，跳过 ${invalid.length} 条` : ""}`);
  });
}

function exportData() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    opening: state.opening,
    ledger: state.ledger,
    warningValue: state.warningValue,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mard-bead-backup-${todayString()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(file) {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") throw new Error("格式错误");
    state.opening = parsed.opening && typeof parsed.opening === "object" ? parsed.opening : {};
    state.ledger = Array.isArray(parsed.ledger) ? parsed.ledger : [];
    if (parsed.warningValue !== undefined) state.warningValue = normalizeWarningValue(parsed.warningValue);
    saveState();
    renderAll();
    showToast("备份已导入");
  } catch (error) {
    showToast("导入失败：JSON 文件格式不正确");
  }
}

function resetData() {
  if (!confirm("确定要清空所有期初库存和记录吗？此操作不可撤销。")) return;
  state.opening = {};
  state.ledger = [];
  saveState();
  renderAll();
  showToast("数据已清空");
}

function bindEvents() {
  $("#tabs").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-view]");
    if (tab) switchView(tab.dataset.view);
  });

  dom.warehouseSearch.addEventListener("input", renderWarehouse);
  dom.warehouseGroups.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-group]");
    if (!chip) return;
    ui.warehouseGroup = chip.dataset.group;
    renderWarehouse();
  });
  dom.warehouseBody.addEventListener("change", (event) => {
    const input = event.target.closest("[data-opening-code]");
    if (!input) return;
    const code = input.dataset.openingCode;
    const value = input.value.trim();
    if (value === "") delete state.opening[code];
    else state.opening[code] = Math.max(0, Number(value) || 0);
    saveState();
    renderWarehouse();
    renderRestock();
  });
  dom.warehouseBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stock-step]");
    if (!button) return;
    const code = button.dataset.stockCode;
    const step = Number(button.dataset.stockStep);
    const current = Number(state.opening[code] || 0);
    state.opening[code] = Math.max(0, current + step);
    saveState();
    renderWarehouse();
    renderRestock();
  });

  dom.calculatorType.addEventListener("click", (event) => {
    const button = event.target.closest("[data-type]");
    if (!button) return;
    ui.calculatorType = button.dataset.type;
    renderCalculator();
  });
  dom.colorSearch.addEventListener("focus", renderColorOptions);
  dom.colorSearch.addEventListener("input", () => {
    renderColorOptions();
  });
  dom.colorOptions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-code]");
    if (!option) return;
    ui.selectedColor = option.dataset.code;
    dom.colorSearch.value = option.dataset.code;
    dom.colorOptions.classList.add("hidden");
    renderSelectedColor();
    renderCalculatorPreview();
  });
  document.addEventListener("click", (event) => {
    const pick = event.target.closest("[data-pick-color]");
    if (pick) {
      selectColorFromBead(pick.dataset.pickColor);
      return;
    }
    if (!event.target.closest(".color-field")) dom.colorOptions.classList.add("hidden");
  });
  dom.quickButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quick]");
    const addButton = event.target.closest("[data-quick-add]");
    if (addButton) {
      const current = Number(dom.calcQuantity.value || 0);
      const next = Math.max(0, current + Number(addButton.dataset.quickAdd));
      dom.calcQuantity.value = String(next);
      renderCalculatorPreview();
      return;
    }
    if (!button || button.dataset.quick !== "clear") return;
    dom.calcQuantity.value = "";
    renderCalculatorPreview();
  });
  dom.calcQuantity.addEventListener("input", renderCalculatorPreview);
  dom.confirmRecord.addEventListener("click", () => {
    const success = addRecord({
      type: ui.calculatorType,
      date: dom.calcDate.value || todayString(),
      code: ui.selectedColor,
      quantity: dom.calcQuantity.value,
      project: dom.calcProject.value,
      note: dom.calcNote.value,
    });
    if (!success) return;
    const savedColor = getColor(ui.selectedColor)?.hex;
    spawnBeadBurst(dom.confirmRecord, savedColor);
    dom.calcQuantity.value = "";
    dom.calcNote.value = "";
    renderWarehouse();
    renderCalculator();
    renderRestock();
    renderPalette();
    renderDashboard();
    showToast("记录已保存");
  });
  dom.clearForm.addEventListener("click", () => {
    ui.selectedColor = null;
    dom.colorSearch.value = "";
    dom.calcQuantity.value = "";
    dom.calcNote.value = "";
    renderSelectedColor();
    renderCalculatorPreview();
  });
  dom.ledgerFilter.addEventListener("change", () => {
    ui.ledgerFilter = dom.ledgerFilter.value;
    renderLedger();
  });
  dom.ledgerList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-record]");
    if (button) deleteRecord(button.dataset.deleteRecord);
  });

  dom.restockBody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-restock-code]");
    if (!button) return;
    ui.calculatorType = "add";
    ui.selectedColor = button.dataset.restockCode;
    dom.calcQuantity.value = button.dataset.restockQty || "";
    dom.calcProject.value = "补货";
    switchView("calculator");
    renderCalculator();
  });

  dom.paletteSearch.addEventListener("input", renderPalette);

  dom.patternFile.addEventListener("change", () => {
    const file = dom.patternFile.files?.[0];
    if (file) loadPatternFile(file);
  });
  dom.patternDropzone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    dom.patternDropzone.classList.add("dragover");
  });
  dom.patternDropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dom.patternDropzone.classList.add("dragover");
  });
  dom.patternDropzone.addEventListener("dragleave", () => {
    dom.patternDropzone.classList.remove("dragover");
  });
  dom.patternDropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dom.patternDropzone.classList.remove("dragover");
    const file = event.dataTransfer?.files?.[0];
    if (file) loadPatternFile(file);
  });
  dom.analyzePattern.addEventListener("click", analyzePattern);
  dom.clearPattern.addEventListener("click", clearPattern);
  dom.addPatternRow.addEventListener("click", () => {
    const code = COLORS[0].code;
    patternResults.push({ code, count: 1, hex: COLOR_MAP.get(code).hex });
    dom.copyPatternResults.disabled = false;
    dom.downloadPatternCsv.disabled = false;
    dom.importPatternResults.disabled = false;
    renderPatternResults();
  });
  dom.patternResultsBody.addEventListener("change", (event) => {
    const codeSelect = event.target.closest("[data-pattern-code]");
    if (codeSelect) {
      const index = Number(codeSelect.dataset.patternCode);
      const code = codeSelect.value;
      patternResults[index] = { ...patternResults[index], code, hex: COLOR_MAP.get(code).hex };
      renderPatternResults();
      return;
    }
    const countInput = event.target.closest("[data-pattern-count]");
    if (countInput) {
      const index = Number(countInput.dataset.patternCount);
      patternResults[index] = {
        ...patternResults[index],
        count: Math.max(1, Number(countInput.value) || 1),
      };
      renderPatternResults();
    }
  });
  dom.patternResultsBody.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-pattern]");
    if (!removeButton) return;
    patternResults.splice(Number(removeButton.dataset.removePattern), 1);
    const hasResults = patternResults.length > 0;
    dom.copyPatternResults.disabled = !hasResults;
    dom.downloadPatternCsv.disabled = !hasResults;
    dom.importPatternResults.disabled = !hasResults;
    renderPatternResults();
  });
  dom.copyPatternResults.addEventListener("click", copyPatternResults);
  dom.downloadPatternCsv.addEventListener("click", downloadPatternCsv);
  dom.importPatternResults.addEventListener("click", importPatternToCalculator);

  dom.dashboardRange.addEventListener("click", (event) => {
    const button = event.target.closest("[data-range]");
    if (!button) return;
    ui.dashboardRange = button.dataset.range;
    $$("[data-range]", dom.dashboardRange).forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    const isCustom = ui.dashboardRange === "custom";
    dom.dashboardCustomRange.classList.toggle("hidden", !isCustom);
    if (isCustom) {
      const today = new Date();
      if (!dom.dashboardStart.value) {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        dom.dashboardStart.value = localDateString(start);
      }
      if (!dom.dashboardEnd.value) dom.dashboardEnd.value = localDateString(today);
    }
    const range = getDashboardRange();
    const startDate = new Date(`${range.start}T00:00:00`);
    ui.calendarMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    renderDashboard();
  });
  dom.dashboardStart.addEventListener("change", renderDashboard);
  dom.dashboardEnd.addEventListener("change", renderDashboard);
  dom.dashboardCost.addEventListener("input", renderDashboard);
  dom.dashboardCalendarPrev.addEventListener("click", () => {
    ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() - 1, 1);
    renderDashboardCalendar();
  });
  dom.dashboardCalendarNext.addEventListener("click", () => {
    ui.calendarMonth = new Date(ui.calendarMonth.getFullYear(), ui.calendarMonth.getMonth() + 1, 1);
    renderDashboardCalendar();
  });
  dom.dashboardCalendar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-calendar-date]");
    if (!button) return;
    const date = button.dataset.calendarDate;
    if (!ui.dashboardStart || ui.dashboardEnd) {
      ui.dashboardStart = date;
      ui.dashboardEnd = "";
    } else if (date < ui.dashboardStart) {
      ui.dashboardStart = date;
      ui.dashboardEnd = "";
    } else {
      ui.dashboardEnd = date;
    }
    ui.dashboardRange = "custom";
    dom.dashboardStart.value = ui.dashboardStart;
    dom.dashboardEnd.value = ui.dashboardEnd;
    dom.dashboardCustomRange.classList.remove("hidden");
    $$("[data-range]", dom.dashboardRange).forEach((item) => {
      item.classList.toggle("active", item.dataset.range === "custom");
    });
    renderDashboard();
  });
  dom.exportDashboardReport.addEventListener("click", exportDashboardPdf);
  dom.exportDashboardCsv.addEventListener("click", exportDashboardCsv);
  dom.dashboardNewQuote.addEventListener("click", () => renderDashboardQuote(true));
  dom.dashboardNoteTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-note-pane]");
    if (button) renderDashboardNotePane(button.dataset.notePane);
  });
  dom.dashboardTaskList.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-daily-task-id]");
    if (!checkbox) return;
    ensureDailyTaskState();
    const completed = new Set(dailyTaskState.completed);
    if (checkbox.checked) completed.add(checkbox.dataset.dailyTaskId);
    else completed.delete(checkbox.dataset.dailyTaskId);
    dailyTaskState.completed = [...completed];
    checkbox.closest(".daily-task-item")?.classList.toggle("done", checkbox.checked);
    const tasks = getDailyTaskSet();
    dom.dashboardTaskProgress.textContent = `${completed.size} / ${tasks.length}`;
    saveDailyTaskProgress();
    if (checkbox.checked && completed.size === tasks.length) {
      showToast("地球 Online 今日任务全部完成");
    }
  });

  $("#opening-import-btn").addEventListener("click", openOpeningImportModal);
  $("#ledger-import-btn").addEventListener("click", openLedgerImportModal);
  $("#warning-settings-btn").addEventListener("click", openWarningSettingsModal);
  $("#restock-warning-settings-btn").addEventListener("click", openWarningSettingsModal);
  $("#home-btn").addEventListener("click", () => switchView("welcome"));
  $$("[data-guide-go]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.guideGo));
  });
  $("#guide-export-btn").addEventListener("click", exportData);
  $("#guide-import-btn").addEventListener("click", () => dom.importFile.click());
  $("#export-btn").addEventListener("click", exportData);
  $("#import-btn").addEventListener("click", () => dom.importFile.click());
  dom.importFile.addEventListener("change", () => {
    const file = dom.importFile.files?.[0];
    if (file) importData(file);
    dom.importFile.value = "";
  });
  $("#reset-btn").addEventListener("click", resetData);

  dom.modalRoot.addEventListener("click", (event) => {
    if (event.target === dom.modalRoot || event.target.closest("[data-close-modal]")) closeModal();
  });

  const syncHeaderState = () => {
    document.body.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", syncHeaderState, { passive: true });
  syncHeaderState();
}

function cacheDom() {
  dom.tabs = $("#tabs");
  dom.toast = $("#toast");
  dom.modalRoot = $("#modal-root");
  dom.warehouseMetrics = $("#warehouse-metrics");
  dom.warehouseSearch = $("#warehouse-search");
  dom.warehouseGroups = $("#warehouse-groups");
  dom.warehouseBody = $("#warehouse-body");
  dom.calculatorType = $("#calculator-type");
  dom.projectLabel = $("#project-label");
  dom.calcDate = $("#calc-date");
  dom.calcProject = $("#calc-project");
  dom.colorSearch = $("#color-search");
  dom.colorOptions = $("#color-options");
  dom.selectedColor = $("#selected-color");
  dom.calcQuantity = $("#calc-quantity");
  dom.quickField = $(".quick-field");
  dom.quickButtons = $(".quick-buttons");
  dom.calcNote = $("#calc-note");
  dom.previewBefore = $("#preview-before");
  dom.previewAfter = $("#preview-after");
  dom.previewState = $("#preview-state");
  dom.confirmRecord = $("#confirm-record");
  dom.clearForm = $("#clear-form");
  dom.ledgerCount = $("#ledger-count");
  dom.ledgerFilter = $("#ledger-filter");
  dom.ledgerList = $("#ledger-list");
  dom.restockMetrics = $("#restock-metrics");
  dom.restockBody = $("#restock-body");
  dom.paletteSearch = $("#palette-search");
  dom.paletteGrid = $("#palette-grid");
  dom.patternDropzone = $("#pattern-dropzone");
  dom.patternFile = $("#pattern-file");
  dom.patternStep = $("#pattern-step");
  dom.patternWhiteThreshold = $("#pattern-white-threshold");
  dom.patternIgnoreWhite = $("#pattern-ignore-white");
  dom.analyzePattern = $("#analyze-pattern");
  dom.clearPattern = $("#clear-pattern");
  dom.patternCanvas = $("#pattern-canvas");
  dom.patternEmpty = $("#pattern-empty");
  dom.patternFileMeta = $("#pattern-file-meta");
  dom.patternSummary = $("#pattern-summary");
  dom.patternResultsBody = $("#pattern-results-body");
  dom.addPatternRow = $("#add-pattern-row");
  dom.copyPatternResults = $("#copy-pattern-results");
  dom.downloadPatternCsv = $("#download-pattern-csv");
  dom.importPatternResults = $("#import-pattern-results");
  dom.dashboardRange = $("#dashboard-range");
  dom.dashboardCustomRange = $("#dashboard-custom-range");
  dom.dashboardStart = $("#dashboard-start");
  dom.dashboardEnd = $("#dashboard-end");
  dom.dashboardCost = $("#dashboard-cost");
  dom.dashboardRangeLabel = $("#dashboard-range-label");
  dom.dashboardMetrics = $("#dashboard-metrics");
  dom.dashboardLineChart = $("#dashboard-line-chart");
  dom.dashboardTrendCaption = $("#dashboard-trend-caption");
  dom.dashboardColorRanking = $("#dashboard-color-ranking");
  dom.dashboardDetailCount = $("#dashboard-detail-count");
  dom.dashboardDetailBody = $("#dashboard-detail-body");
  dom.dashboardCalendarTitle = $("#dashboard-calendar-title");
  dom.dashboardCalendar = $("#dashboard-calendar");
  dom.dashboardCalendarPrev = $("#dashboard-calendar-prev");
  dom.dashboardCalendarNext = $("#dashboard-calendar-next");
  dom.dashboardQuote = $("#dashboard-quote");
  dom.dashboardQuoteAuthor = $("#dashboard-quote-author");
  dom.dashboardQuoteTranslation = $("#dashboard-quote-translation");
  dom.dashboardNewQuote = $("#dashboard-new-quote");
  dom.dashboardNoteTabs = $("#dashboard-note-tabs");
  dom.dashboardTaskProgress = $("#dashboard-task-progress");
  dom.dashboardTaskDate = $("#dashboard-task-date");
  dom.dashboardTaskList = $("#dashboard-task-list");
  dom.dashboardTodayUse = $("#dashboard-today-use");
  dom.dashboardTodayAdd = $("#dashboard-today-add");
  dom.exportDashboardReport = $("#export-dashboard-report");
  dom.exportDashboardCsv = $("#export-dashboard-csv");
  dom.importFile = $("#import-file");
}

function renderAll() {
  renderWarehouse();
  renderCalculator();
  renderRestock();
  renderPalette();
  renderDashboard();
  refreshIcons();
}

async function init() {
  cacheDom();
  const patternSection = $("#view-pattern");
  patternSection.classList.remove("view");
  patternSection.classList.add("pattern-in-calculator");
  const calculatorNext = $("#calculator-next");
  if (calculatorNext) calculatorNext.before(patternSection);
  else $("#view-calculator").appendChild(patternSection);
  dom.calcDate.value = todayString();
  loadState();
  loadDailyTaskProgress();
  try {
    if (Array.isArray(window.MARD_COLORS) && window.MARD_COLORS.length) {
      COLORS = window.MARD_COLORS;
    } else {
      const response = await fetch("./palette.json");
      if (!response.ok) throw new Error("palette load failed");
      const palette = await response.json();
      COLORS = palette.colors;
    }
    COLOR_MAP = new Map(COLORS.map((color) => [color.code, color]));
    buildPaletteLab();
  } catch (error) {
    showToast("色卡数据加载失败，请通过本地服务器打开");
    return;
  }
  bindEvents();
  renderAll();
  renderPatternResults();
  renderDashboardQuote();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
