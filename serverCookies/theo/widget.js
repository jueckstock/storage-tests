(function() {
    const targetElementID = document.currentScript.getAttribute("data-target-element-id");
    window.addEventListener('load', () => {
        const scopeSuffix = Math.random().toString();

        const formBlock = document.createElement('div');
        formBlock.innerHTML = `
<input id="jsCookieInput${scopeSuffix}" type="text">
<input id="jsCookieSave${scopeSuffix}" type="button" value="Save">
<br>
<span id="jsCookieMonitor${scopeSuffix}"></span>`;

        const targetParent = (targetElementID && document.getElementById(targetElementID)) || document.body;
        targetParent.appendChild(formBlock);

        const inputBlock = document.getElementById(`jsCookieInput${scopeSuffix}`);
        const inputButton = document.getElementById(`jsCookieSave${scopeSuffix}`);
        const monitorBlock = document.getElementById(`jsCookieMonitor${scopeSuffix}`);

        inputButton.addEventListener('click', async() => {
            const response = await fetch(`/set-cookie`, {
                method: "POST",
                mode: "same-origin",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                credentials: "include",
                body: JSON.stringify({
                    cookies: [{
                        name: "SECRET",
                        value: inputBlock.value,
                        maxAge: 24 * 3600 * 365,
                        secure: true,
                        sameSite: 4,
                    }]
                })
            });

            if (!response.ok) {
                console.error(await response.text());
            }
        });

        setInterval(() => {
            const secret = document.cookie && document.cookie.split('; ').find(row => row.startsWith('SECRET=')).split('=')[1];
            monitorBlock.innerText = secret;
        }, 1000);

    });
})()