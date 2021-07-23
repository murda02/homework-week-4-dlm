let userInitialsInput = document.querySelector("#initials");
let userList = document.querySelector("#user-high-scores");
let userInitials = [];

// a function that puts ups the user's initials & score on the page
function renderInitials () {
    let userInitial = userInitials[userInitials.length -1];
    let yourScore = localStorage.getItem("timeLeft");
    let li = document.createElement("li");
        li.textContent = `${userInitial} = ${yourScore}`;
        li.setAttribute("data-index", userInitials.length);

    userList.appendChild(li);
    userInitialsInput.innerHTML = "";
}

function init () {
    let storedInitials = JSON.parse(localStorage.getItem("userInitials"));
    if (storedInitials !== null) {
        userInitials = storedInitials;
    }
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