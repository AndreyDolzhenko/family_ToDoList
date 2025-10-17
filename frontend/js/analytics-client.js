class UserAnalytics {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.pageStartTime = Date.now();
    this.setupEventListeners();
  }

  // Получаем или создаем session ID
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem("user_session_id");
    if (!sessionId) {
      // Генерируем простой UUID
      sessionId =
        "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("user_session_id", sessionId);
    }
    return sessionId;
  }

  // Отправляем данные на сервер
  async logAction(actionData) {
    try {
      await fetch("/api/analytics/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Id": this.sessionId,
        },
        body: JSON.stringify({
          ...actionData,
          pageUrl: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Ошибка логирования:", error);
    }
  }

  // Логируем просмотр страницы
  logPageView() {
    this.logAction({
      actionType: "PAGE_VIEW",
      entityType: "PAGE",
    });
  }

  // Логируем клик по элементу
  logClick(element, entityType = null, entityId = null) {
    this.logAction({
      actionType: "CLICK",
      elementId: element.id || element.className,
      entityType,
      entityId,
      metadata: {
        tagName: element.tagName,
        text: element.textContent?.substring(0, 100),
      },
    });
  }

  // Логируем отправку формы
  logFormSubmit(form, actionType = "FORM_SUBMIT") {
    const entityType = this.extractEntityTypeFromForm(form);

    this.logAction({
      actionType,
      entityType,
      elementId: form.id,
      metadata: {
        formAction: form.action,
        method: form.method,
      },
    });
  }

  // Логируем поиск
  logSearch(query, entityType = null) {
    this.logAction({
      actionType: "SEARCH",
      searchQuery: query,
      entityType,
    });
  }

  // Логируем время на странице при уходе
  logTimeOnPage() {
    const duration = Date.now() - this.pageStartTime;
    this.logAction({
      actionType: "PAGE_VIEW",
      entityType: "PAGE",
      duration,
    });
  }

  // Определяем тип сущности из формы
  extractEntityTypeFromForm(form) {
    const action = form.action || window.location.pathname;
    if (action.includes("users")) return "USER";
    if (action.includes("schedule")) return "SCHEDULES";
    if (action.includes("task")) return "TASK";
    return null;
  }

  // Настраиваем автоматические слушатели событий
  setupEventListeners() {
    // Логируем просмотр страницы
    this.logPageView();

    // Отслеживаем клики по ссылкам
    document.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.logClick(e.target);
      }

      // Отслеживаем клики по кнопкам
      if (e.target.tagName === "BUTTON" || e.target.type === "submit") {
        this.logClick(e.target);
      }
    });

    // Отслеживаем отправку форм
    document.addEventListener("submit", (e) => {
      this.logFormSubmit(e.target);
    });

    // Логируем время на странице при уходе
    window.addEventListener("beforeunload", () => {
      this.logTimeOnPage();
    });

    // Отслеживаем поиск (если есть поле поиска)
    const searchInputs = document.querySelectorAll(
      'input[type="search"], input[name*="search"]'
    );
    searchInputs.forEach((input) => {
      let searchTimeout;
      input.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          if (e.target.value.length > 2) {
            this.logSearch(e.target.value);
          }
        }, 1000); // Ждем 1 секунду после ввода
      });
    });
  }
}

// Инициализируем аналитику
const analytics = new UserAnalytics();

// Экспортируем для использования в других скриптах
window.userAnalytics = analytics;