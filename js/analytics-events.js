(function () {
  "use strict";

  function sendEvent(eventName, params) {
    var payload = params || {};

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, payload));
  }

  function getPageParams() {
    return {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title
    };
  }

  function getLeadSourcePage() {
    var leadSourcePage = window.location.pathname;
    try {
      var stored = sessionStorage.getItem("zh_lead_source");
      if (stored) {
        leadSourcePage = stored;
      }
    } catch (e) {}
    return leadSourcePage;
  }

  function getFormName(form) {
    return form.getAttribute("data-form-name") || form.id || "unnamed_form";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a") : null;

    if (!link) {
      return;
    }

    var href = link.getAttribute("href") || "";
    var params = getPageParams();

    if (href.indexOf("tel:") === 0) {
      sendEvent("phone_click", params);
    } else if (href.indexOf("mailto:") === 0) {
      sendEvent("email_click", params);
    } else if (link.id === "wechatBtn") {
      sendEvent("wechat_click", params);
    } else if (href.indexOf("#contact") !== -1) {
      sendEvent("consultation_click", params);
      try {
        var path = window.location.pathname;
        var existing = sessionStorage.getItem("zh_lead_source");
        if (path !== "/" && path !== "/index.html" && path !== "/english.html" && !existing) {
          sessionStorage.setItem("zh_lead_source", path);
        }
      } catch (e) {}
    }
  }, true);

  document.addEventListener("focusin", function (event) {
    var target = event.target;
    var field = target && target.closest ? target.closest("input, select, textarea, [contenteditable='true']") : null;
    var form = field && field.closest ? field.closest("form") : null;

    if (!form || form.getAttribute("data-form-start-tracked") === "true") {
      return;
    }

    form.setAttribute("data-form-start-tracked", "true");
    sendEvent(
      "form_start",
      Object.assign(
        {
          form_name: getFormName(form),
          method: "form",
          lead_source_page: getLeadSourcePage()
        },
        getPageParams()
      )
    );
  }, true);

  window.zhaoTrackFormLead = function (formName) {
    sendEvent(
      "generate_lead",
      Object.assign(
        {
          form_name: formName,
          method: "form",
          lead_source_page: getLeadSourcePage()
        },
        getPageParams()
      )
    );
  };
})();
