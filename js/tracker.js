/* ============================================================
   DFN DEV SYSTEM — DISCIPLINE TRACKER
   A simple daily checklist with streak tracking, persisted to
   localStorage on the user's device. No accounts, no servers.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "dfn_discipline_tracker_v1";

  const DEFAULT_TASKS = [
    "30 min music production",
    "Work on a DFN Worldwide task",
    "Read or write 1 page",
    "Move your body / train",
  ];

  const todayKey = () => new Date().toISOString().slice(0, 10);

  /* --------------------------------------------------------
     Load / save state
     state = {
       tasks: [{ id, text }],
       completions: { "YYYY-MM-DD": [taskId, ...] },
       streak: number,
       bestStreak: number,
       lastCompleteDate: "YYYY-MM-DD" | null
     }
  -------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("DFN Tracker: could not read saved data", e);
    }
    return {
      tasks: DEFAULT_TASKS.map((text, i) => ({ id: `t${i}`, text })),
      completions: {},
      streak: 0,
      bestStreak: 0,
      lastCompleteDate: null,
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("DFN Tracker: could not save data", e);
    }
  }

  let state = loadState();

  /* --------------------------------------------------------
     DOM refs
  -------------------------------------------------------- */
  const taskList = document.getElementById("task-list");
  const addForm = document.getElementById("add-form");
  const addInput = document.getElementById("add-input");
  const resetBtn = document.getElementById("reset-btn");
  const statToday = document.getElementById("stat-today");
  const statStreak = document.getElementById("stat-streak");
  const statBest = document.getElementById("stat-best");

  if (!taskList) return;

  /* --------------------------------------------------------
     Render
  -------------------------------------------------------- */
  function render() {
    const tKey = todayKey();
    const completedToday = state.completions[tKey] || [];

    // Tasks
    taskList.innerHTML = "";
    if (state.tasks.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No tasks yet — add your first daily discipline below.";
      taskList.appendChild(empty);
    } else {
      state.tasks.forEach((task) => {
        const done = completedToday.includes(task.id);
        const row = document.createElement("div");
        row.className = "task-row" + (done ? " done" : "");
        row.setAttribute("role", "checkbox");
        row.setAttribute("aria-checked", String(done));
        row.setAttribute("tabindex", "0");
        row.innerHTML = `
          <span class="task-check">${done ? "✓" : ""}</span>
          <span class="task-text">${escapeHtml(task.text)}</span>
        `;
        row.addEventListener("click", () => toggleTask(task.id));
        row.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTask(task.id);
          }
        });
        taskList.appendChild(row);
      });
    }

    // Stats
    statToday.textContent = `${completedToday.length}/${state.tasks.length}`;
    statStreak.textContent = String(state.streak);
    statBest.textContent = String(state.bestStreak);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* --------------------------------------------------------
     Actions
  -------------------------------------------------------- */
  function toggleTask(taskId) {
    const tKey = todayKey();
    const completedToday = state.completions[tKey] || [];
    const idx = completedToday.indexOf(taskId);

    if (idx === -1) {
      completedToday.push(taskId);
    } else {
      completedToday.splice(idx, 1);
    }
    state.completions[tKey] = completedToday;

    updateStreak();
    saveState(state);
    render();
  }

  function updateStreak() {
    const tKey = todayKey();
    const completedToday = state.completions[tKey] || [];
    const allDoneToday =
      state.tasks.length > 0 && completedToday.length === state.tasks.length;

    if (allDoneToday) {
      if (state.lastCompleteDate === tKey) {
        // already counted today
        return;
      }
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = yesterday.toISOString().slice(0, 10);

      if (state.lastCompleteDate === yKey) {
        state.streak += 1;
      } else {
        state.streak = 1;
      }
      state.lastCompleteDate = tKey;
      if (state.streak > state.bestStreak) {
        state.bestStreak = state.streak;
      }
    } else {
      // If today was previously the completion date but is no longer fully done,
      // back the streak off by one (un-checking undoes today's contribution).
      if (state.lastCompleteDate === tKey) {
        state.streak = Math.max(0, state.streak - 1);
        state.lastCompleteDate = null;
      }
    }
  }

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = "t" + Date.now();
    state.tasks.push({ id, text: trimmed });
    saveState(state);
    render();
  }

  function resetToday() {
    const tKey = todayKey();
    delete state.completions[tKey];
    if (state.lastCompleteDate === tKey) {
      state.streak = Math.max(0, state.streak - 1);
      state.lastCompleteDate = null;
    }
    saveState(state);
    render();
  }

  /* --------------------------------------------------------
     Events
  -------------------------------------------------------- */
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(addInput.value);
    addInput.value = "";
    addInput.focus();
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Reset today's checklist? This won't affect your saved streak history.")) {
      resetToday();
    }
  });

  render();
})();
