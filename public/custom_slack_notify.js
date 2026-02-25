document.addEventListener("DOMContentLoaded", function () {
  const notifyButton = document.getElementById("slack-notify-button");

  if (!notifyButton) return;

  notifyButton.addEventListener("click", function (event) {
    event.preventDefault();
    notifyButton.innerHTML =
      '<i class="fa fa-spinner fa-spin"></i> Completing...';

    // Get data from the button's data attributes
    const pageName = document.title;
    const pageUrl = window.location.href;
    const csrfToken = document.querySelector('meta[name="token"]').content;

    notifyButton.disabled = true;

    fetch("/ajax/training-complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify({
        page_name: pageName,
        page_url: pageUrl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Chapter successfully completed!");
          notifyButton.innerHTML = "Completed";
        } else {
          alert("Error sending notification.");
          notifyButton.disabled = false;
          notifyButton.innerHTML = "Mark as Complete";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyButton.disabled = false;
        notifyButton.innerHTML = "Mark as Complete";
      });
  });
});
