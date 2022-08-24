const copyBtn = document.querySelector('#copy-code-btn');
const roomCode = document.querySelector('#room-code').innerText;

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(roomCode);
    copyBtn.title = "Copied!";
})