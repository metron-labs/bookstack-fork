(function () {
  if (window.__slackNotifyInitialized) {
    return;
  }
  window.__slackNotifyInitialized = true;

  document.addEventListener("click", function (event) {
    const notifyButton = event.target.closest("#slack-notify-button");

    if (!notifyButton) {
      return;
    }

    if (notifyButton.disabled || notifyButton.dataset.submitting === "true") {
      return;
    }

    event.preventDefault();
    notifyButton.dataset.submitting = "true";

    const pageId = notifyButton.getAttribute("data-page-id");
    const pageName = notifyButton.getAttribute("data-page-name");
    const pageUrl = notifyButton.getAttribute("data-page-url");
    const tokenMeta = document.querySelector('meta[name="token"]');
    const csrfToken = tokenMeta ? tokenMeta.content : "";

    notifyButton.disabled = true;
    notifyButton.innerText = "Completing...";

    fetch("/ajax/training-complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify({
        page_id: pageId,
        page_name: pageName,
        page_url: pageUrl,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Status " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "ok" || data.status === "already_completed") {
          notifyButton.innerText = "Completed";
          notifyButton.disabled = true;
          notifyButton.style.backgroundColor = "#2e7d32";
          notifyButton.style.cursor = "not-allowed";
        } else {
          alert("Error: " + (data.message || "Failed to send notification."));
          notifyButton.disabled = false;
          notifyButton.dataset.submitting = "false";
          notifyButton.innerText = "Mark as Complete";
        }
      })
      .catch((error) => {
        console.error("Slack Notification Error:", error);
        notifyButton.disabled = false;
        notifyButton.dataset.submitting = "false";
        notifyButton.innerText = "Mark as Complete";
      });
  });
})();