function findYouTubeEmbeds() {
    const html = document.documentElement.innerHTML;

    const regex = /https:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/g;

    let matches;
    let results = [];

    while ((matches = regex.exec(html)) !== null) {
        results.push(matches[1]);
    }

    return [...new Set(results)]; // remove duplicates
}

// Listen for popup request
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getEmbeds") {
        sendResponse({ embeds: findYouTubeEmbeds() });
    }
});
