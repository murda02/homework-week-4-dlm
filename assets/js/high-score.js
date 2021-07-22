let userInitialsInput = document.querySelector("#initials");
let userList = document.querySelector("#user-high-scores");
let userInitials = [];

function renderInitials () {
    userInitialsInput.innerHTML = "";
    for (let i = 0; i < userInitials.length; i++) {
        let userInitial = userInitials[i];

        let li = document.createElement("li");
        li.textContent = userInitial;
        li.setAttribute("data-index", i);

        userList.appendChild(li);
        
    }
}

function init () {
    let storedInitials = JSON.parse(localStorage.getItem("userInitials"));
    if (storedInitials !== null) {
        userInitials = storedInitials;
    }
    renderInitials();
}

function storeInitials() {
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
}

userInitialsInput.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let userText = userInitialsInput.value.trim();
        if (userText === "") {
            return;
        }
        userInitials.push(userText);
        userInitialsInput.value = "";

        storeInitials();
        renderInitials();
      }
});

init(); 