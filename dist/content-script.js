// src/content-script.ts
new MutationObserver((e) => {
  e.forEach((m) => {
    m.addedNodes.forEach((n) => {
      if (n.nodeName === "IFRAME" && n.getAttribute("allowfullscreen") === null && n.getAttribute("src")?.match(/^.*:\/\/(?:www\.)?youtube\.com\/embed\/.*$/)) {
        console.log(`[YoutubeFullscreen] Reloaded Youtube Embed with src ${n.getAttribute("src")}`);
        n.setAttribute("allowfullscreen", "");
        n.outerHTML = n.outerHTML;
      }
    });
  });
}).observe(document.documentElement, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
});
document.querySelectorAll(`iframe[src*="youtube.com/embed/"]`).forEach((e) => {
  e.outerHTML = e.outerHTML;
});
//# sourceMappingURL=content-script.js.map
