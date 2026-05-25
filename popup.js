document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    const response = await browser.tabs.sendMessage(tab.id, {
        action: "getEmbeds"
    });

    const list = document.getElementById("results");

    if (!response || response.embeds.length === 0) {
        list.innerHTML = "<li>No embeds found.</li>";
        return;
    }

    response.embeds.forEach(id => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = `https://youtube.com/watch?v=${id}`;
        link.textContent = id;
        link.target = "_blank";

        li.appendChild(link);
        list.appendChild(li);
    });
});
