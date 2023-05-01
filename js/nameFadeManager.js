//Ensures that the initial fade in of the name on home page only happens once
window.addEventListener("load", ()=>{
    setTimeout(2000)
    const x = document.getElementById("home-contents__name")
    x.className = "home-contents__name--loaded"
})
