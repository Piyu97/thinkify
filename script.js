var database = []
var uniqueLanguage = {}

var latitude = -6.6906402
var longitude = -35.5000999



// function executed when the document is loading
document.onload = () => {
    (function () {
        alert("Welcome to Booking My Show !!");
        calling()
    })();
}
document.onload()



const getMovie = () => {
    var newArr = database.filter((element) => {
        return (
            element.title.toLowerCase().includes(document.getElementById("movie").value)
            ||
            element.theatre.toLowerCase().includes(document.getElementById("movie").value)
        )
    })
    console.log(newArr)
    getCards(newArr)
}

// debounce logic
const debounceMovieSearch = function (fnc, limit) {
    let timer;
    return function () {
        clearInterval(timer)
        timer = setTimeout(() => {
            fnc()
        }, limit)
    }
}


const searchMovie = debounceMovieSearch(getMovie, 200)
document.getElementById("movie").addEventListener("keyup", searchMovie)



// append all the unique languages 
const uniqueLan = (uniqueLanguage) => {
    var parentLang = document.getElementById("language")
    for (key in uniqueLanguage) {
        var option = document.createElement("option")
        option.setAttribute("value", key)
        option.textContent = key
        parentLang.appendChild(option)
    }
}



// initial function that is being called
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

// logic to convert distance in kilometers
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return false;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}


// filter the theatre based on distance between source and destination
var distance1 = document.getElementById("distance")
distance1.addEventListener("change", filterBasedOnDistance)
function filterBasedOnDistance() {
    var newArr = database.filter((element) => {
        var lat1 = element.latitude
        var lon1 = element.latitude
        var table = distance(lat1, lon1, latitude, longitude, "K")
        if (table % 10 <= distance1.value)
            return true
        else return false

    })
    console.log(newArr)
    getCards(newArr)
}


// filter the movie based on genre
var genre = document.getElementById("genre")
const filterBasedOnGenre = () => {
    if (genre.value == "default") {
        getCards(database)
    }
    else {
        var newArr = database.filter((element) => element.genre.includes(genre.value))
        getCards(newArr)
    }
}
genre.addEventListener("change", filterBasedOnGenre)



// filter the movies based on language
var language = document.getElementById("language")
const filterBasedOnLanguage = () => {
    if (language.value == "default") {
        getCards(database)
    }
    else {
        var newArr = database.filter((element) => element.language == language.value)
        getCards(newArr)
    }
}
language.addEventListener("change", filterBasedOnLanguage)


// function to make an individual card
function card(obj) {
    var div1 = document.createElement("div")
    var img1 = document.createElement("img")
    var div2 = document.createElement("div")
    var h5 = document.createElement("h5")
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")
    var address = document.createElement("address")
    var price = document.createElement("div")
    var theatre = document.createElement("div")

    div1.addEventListener("click", theatrecheck)
    function theatrecheck(e) {
        localStorage.setItem("movie", JSON.stringify(obj))
        localStorage.setItem("count", 0)
        window.location.href = "theatre.html"
    }

    div1.style.height = "500px"
    p1.textContent = obj["language"]
    p2.textContent = obj["genre"]
    h5.textContent = obj["title"]
    address.textContent = obj["theatre_address"]
    price.textContent = obj["price"]
    theatre.textContent = obj["theatre"]

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
    for (var i = 0; i < Math.floor(arr.length); i++) {
        table.push(card(arr[i]))
        if (i == 50)
            break;
    }
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