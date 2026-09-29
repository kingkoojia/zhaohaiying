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

  window.zhaoTrackFormLead = function (formName) {
    var leadSourcePage = window.location.pathname;
    try {
      var stored = sessionStorage.getItem("zh_lead_source");
      if (stored) {
        leadSourcePage = stored;
      }
    } catch (e) {}
    sendEvent(
      "generate_lead",
      Object.assign(
        {
          form_name: formName,
          method: "form",
          lead_source_page: leadSourcePage
        },
        getPageParams()
      )
    );
  };
})();
