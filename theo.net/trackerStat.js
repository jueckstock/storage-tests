(function() {
    window.addEventListener('load', async () => {
        const jsSpan = document.getElementById("jsIdentifier");
        const netSpan = document.getElementById("netIdentifier");

        const jsID = document.cookie && document.cookie.split('; ').find(row => row.startsWith('toyTrackerID=')).split('=')[1];
        jsSpan.innerText = jsID;

        try {
            const response = await fetch('/get-cookie', {
                method: "POST",
                mode: "same-origin",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                credentials: "include",
                body: JSON.stringify({
                    cookieName: "toyTrackerID",
                }),
            });

            const text = await response.text();
            if (!response.ok) {
                console.error(text);
            } else {
                netSpan.innerText = text;
            }
        } catch (err) {
            console.error(err);
        }
    });
})();