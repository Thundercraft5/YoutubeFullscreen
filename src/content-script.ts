// Listen for changes to the DOM, find iframes that are about to be added
new MutationObserver(e => {
	e.forEach(m => {
		// @ts-ignore
		m.addedNodes.forEach((n: Element) => {
			if (n.nodeName === "IFRAME" && n.getAttribute("allowfullscreen") === null && n.getAttribute("src")?.match(/^.*:\/\/(?:www\.)?youtube\.com\/embed\/.*$/)) {
				console.log(`[YoutubeFullscreen] Reloaded Youtube Embed with src ${n.getAttribute("src")}`);
				n.setAttribute("allowfullscreen", "");
				// Reload iframe with allow fullscreen
				n.outerHTML = n.outerHTML;
			}
		});
	})
}).observe(document.documentElement, {
	childList: true,
	subtree: true,
	characterData: true,
	attributes: true
});

document.addEventListener("DOMContentLoaded", () => {
	// Reload iframes that do not allow fullscreen
	document.querySelectorAll(`iframe[src*="youtube.com/embed/"]`).forEach(e => {
		if (e.getAttribute("allowfullscreen") === null) e.outerHTML = e.outerHTML;
	});
})