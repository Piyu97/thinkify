var theatre = JSON.parse(localStorage.getItem("movie"))
document.querySelector("h1").textContent = theatre["theatre"]

var bodyElem = document.querySelector("body")
bodyElem.style.backgroundColor = "lightblue"


// making the seats available for a theatre
var seats = document.getElementById("seats")
for (let i = 1; i <= 50; i++) {
    var div = document.createElement("div")
    div.textContent = i
    div.style.padding = "5px";
    div.style.border = "2px solid black"
    div.style.backgroundColor = "green"
    div.addEventListener("click", selectedSeat)
    seats.appendChild(div)
}


// maintaining the count of seats selected
var count = 0
function selectedSeat(e) {
    if (e.target.style.backgroundColor == "green") {
        ++count
        console.log(count)
        e.target.style.backgroundColor = "red"
        e.target.style.color = "white"
    }
    else {
        --count
        console.log(count)
        e.target.style.backgroundColor = "green"
        e.target.style.color = "black"

    }
}

// get redirected to sales page
const goToSalesPage = () => {
    localStorage.setItem("count", count)
    window.location.href = "sales.html"
}

var btn = document.querySelector("button")
btn.addEventListener("click", goToSalesPage)