var theatreInfo=JSON.parse(localStorage.getItem("movie"))
var count=localStorage.getItem("count")


// following code to fill all the values on page
var movie=document.getElementById("movie")
movie.innerHTML=theatreInfo["title"]

var theatre=document.getElementById("theatre")
theatre.innerHTML=theatreInfo["theatre"]

var number=document.getElementById("number")
number.innerHTML=count

var price=document.getElementById("price")
price.innerHTML=theatreInfo["price"]

var address=document.getElementById("address")
address.innerHTML=theatreInfo["theatre_address"]

var genre=document.getElementById("genre")
genre.innerHTML=theatreInfo["genre"]

var language=document.getElementById("language")
language.innerHTML=theatreInfo["language"]

var total=document.getElementById("total")
total.innerHTML=Number(theatreInfo["price"])*count

var cancel=document.querySelector("#cancel")
cancel.addEventListener("click",cancelBooking)

function cancelBooking(){
    localStorage.setItem("count",0)
    window.location.href="theatre.html"
}