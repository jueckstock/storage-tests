(function() {
    const targetElementID = document.currentScript.getAttribute("data-target-element-id");
    window.addEventListener('load', () => {
        const scopeSuffix = Math.random().toString();

        const formBlock = document.createElement('div');
        formBlock.innerHTML = `
<input id="localStorageInput${scopeSuffix}" type="text">
<input id="localStorageSave${scopeSuffix}" type="button" value="Save">
<br>
<span id="localStorageMonitor${scopeSuffix}"></span>
        `;

        const targetParent = (targetElementID && document.getElementById(targetElementID)) || document.body;
        targetParent.appendChild(formBlock);

        const inputBlock = document.getElementById(`localStorageInput${scopeSuffix}`);
        const inputButton = document.getElementById(`localStorageSave${scopeSuffix}`);
        const monitorBlock = document.getElementById(`localStorageMonitor${scopeSuffix}`);

        const updateMonitor = () => {
            monitorBlock.innerText = localStorage.getItem("SECRET");
        }
        window.addEventListener('storage', updateMonitor);
        inputButton.addEventListener('click', () => {
            localStorage.setItem("SECRET", inputBlock.value);
            updateMonitor();
        });
        updateMonitor();
    });
})()