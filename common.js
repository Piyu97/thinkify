// code for navbar
var nav = document.querySelector("#nav")
nav.style.height = "80px";
nav.style.width = "100%";
nav.style.backgroundColor = "black";
nav.style.color = "white";
nav.textContent = "Booking My Show";
var div = document.createElement("div")
div.style.float = "left"
div.style.color = "white"
div.style.fontSize = "15px"
div.textContent = "Go Back"
div.style.marginTop = "10px"
nav.appendChild(div)

nav.addEventListener("click", homepage)
function homepage() {
    window.location.href = "index.html"
}

div.addEventListener("click", redirect)
function redirect() {
    window.history.back()
}


// code for footer
var footer = document.querySelector("#footer")
footer.style.height = "80px";
footer.style.width = "100%";
footer.style.backgroundColor = "black";
footer.style.color = "white";
footer.textContent = "Thanks for choosing us !!";
var span = document.createElement("span")
span.style.fontSize = "50px"
span.style.marginLeft = "40px"
span.innerHTML = "&#128519"
footer.appendChild(span)