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

        inputButton.addEventListener('click', () => {
            document.cookie = `SECRET=${encodeURIComponent(inputBlock.value)};path=/;max-age=31536000`;
        });

        setInterval(() => {
            const secret = document.cookie.split('; ').find(row => row.startsWith('SECRET=')).split('=')[1];
            monitorBlock.innerText = secret;
        }, 1000);

    });
})()
