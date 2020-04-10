
// window.onload(){
//     alert("window")
// }


var database = []
var uniqueLanguage = {}
document.onload = () => {
    calling()
}
document.onload()

const getMovie=()=> {
    var newArr = database.filter((element) =>element.title.toLowerCase().includes(document.getElementById("movie").value))
    console.log(newArr)
     getCards(newArr)
}

const debounceMovieSearch = function (fnc, limit) {
    let timer;
    return function () {
        clearInterval(timer)
        timer = setTimeout(() => {
            fnc()
        }, limit)
    }
}
const searchMovie = debounceMovieSearch(getMovie, 400)
document.getElementById("movie").addEventListener("keyup", searchMovie)



// append all the unique languages 
function uniqueLan(uniqueLanguage) {
    var parentLang = document.getElementById("language")
    for (key in uniqueLanguage) {
        var option = document.createElement("option")
        option.setAttribute("value", key)
        option.textContent = key
        parentLang.appendChild(option)
    }
}




function calling() {
    fetch("http://www.json-generator.com/api/json/get/bZSAbuyAKq?indent=2")
        .then(res => res.json())
        .then(res => {
            database = res
            localStorage.setItem("data", JSON.stringify(res))
            for (let i = 0; i < res.length; i++) {
                uniqueLanguage[res[i]["language"]] = 1
            }
            uniqueLan(uniqueLanguage)
        })
    getCards(JSON.parse(localStorage.getItem("data")))
}

// filter the theatre based on distance between source and destination
var distance = document.getElementById("distance")
distance.addEventListener("change", filterBasedOnDistance)
function filterBasedOnDistance() {
    console.log(distance.value)
}


// filter the movie based on genre
var genre = document.getElementById("genre")
genre.addEventListener("change", filterBasedOnGenre)
function filterBasedOnGenre() {
    var newArr = database.filter((element) => element.genre.includes(genre.value))
    getCards(newArr)
}



// filter the movies based on language
var language = document.getElementById("language")
language.addEventListener("change", filterBasedOnLanguage)
function filterBasedOnLanguage() {
    var newArr = database.filter((element) => element.language == language.value)
    getCards(newArr)
}


// function to make an individual card
function card(obj) {
    var div1 = document.createElement("div")
    var img1 = document.createElement("img")
    var div2 = document.createElement("div")
    var h5 = document.createElement("h5")
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")
    var address=document.createElement("address")
    var price=document.createElement("div")
    var theatre=document.createElement("div")

    div1.addEventListener("click",theatrecheck)
    function theatrecheck(e)
    {
        localStorage.setItem("movie",JSON.stringify(obj))
        window.location.href="theatre.html"
    }

    div1.style.height="500px"
    p1.textContent = obj["language"]
    p2.textContent = obj["genre"]
    h5.textContent = obj["title"]
    address.textContent=obj["theatre_address"]
    price.textContent=obj["price"]
    theatre.textContent=obj["theatre"]

    div1.setAttribute("id", obj["id"])
    div1.setAttribute("class", "card")
    img1.setAttribute("src", "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60")
    img1.setAttribute("class", "image-size")
    img1.setAttribute("class", "card-img-top")
    div2.setAttribute("class", "card-body")
    h5.setAttribute("class", "card-title")
    p1.setAttribute("class", "card-text")
    p2.setAttribute("class", "card-text")

    div1.appendChild(img1)
    div2.appendChild(h5)
    div2.appendChild(p1)
    div2.appendChild(p2)
    div2.appendChild(theatre)
    div2.appendChild(address)
    div2.appendChild(price)
    div1.appendChild(div2)
    return div1
}


// function to get all the cards
function getCards(arr) {
    console.log(arr)
    var table = []
    for (var i = 0; i < Math.floor(arr.length/2)-2; i++) {
        table.push(card(arr[i]))
    }
    console.log(table)
    displayMovie(table)
}


// function to display all the cards on the page
function displayMovie(arr) {
    var parent = document.querySelector("#displayMovie")
    parent.innerHTML = ""
    var div1 = document.createElement("div")
    div1.setAttribute("class", "container")
    var div2 = document.createElement("div")
    div2.setAttribute("class", "row")
    for (var i = 0; i < arr.length; i++) {
        var space = document.createElement("div")
        space.setAttribute("class", "col-3 my-2")
        space.appendChild(arr[i])
        div2.appendChild(space)
    }
    div1.appendChild(div2)
    parent.appendChild(div1)
}