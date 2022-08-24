const inputBtn = document.querySelector('#input-btn');

inputBtn.addEventListener('click', () => {
    const input = document.getElementById('input-txt').value;
    if(input){
        window.history.pushState("", "", `/game/${input}`)
        location.reload();   
    }

})