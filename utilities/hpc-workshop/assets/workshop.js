(function () {
  "use strict";

  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    if (!button || !menu) return;
    menu.classList.toggle("hidden", !open);
    button.setAttribute("aria-expanded", String(open));
  }

  if (button && menu) {
    button.addEventListener("click", function () {
      setMenu(button.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        button.focus();
      }
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach(function (copyButton) {
    copyButton.addEventListener("click", async function () {
      const target = document.getElementById(copyButton.dataset.copyTarget);
      if (!target) return;

      const original = copyButton.textContent;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        copyButton.textContent = "Copied";
      } catch (error) {
        copyButton.textContent = "Copy failed";
      }

      window.setTimeout(function () {
        copyButton.textContent = original;
      }, 1600);
    });
  });

  document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const item = checkbox.closest(".checklist-item");
      if (!item) return;
      item.classList.toggle("bg-green-50", checkbox.checked);
      item.classList.toggle("border-green-300", checkbox.checked);
      item.classList.toggle("border-gray-200", !checkbox.checked);
    });
  });
})();
