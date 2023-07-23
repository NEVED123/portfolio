function toggleNavbar(){
    var x = document.getElementById("navbar")

    if (x.className === "navbar") {
      x.className += "--mobile";
    } 
    else if(x.className === "navbar--mobile"){
      x.className += "--closing"
      console.log(x.className)
      setTimeout(()=>{
        x.className = "navbar"
      },500)

    }
}
