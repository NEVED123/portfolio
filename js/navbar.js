function toggleNavbar(){
    var x = document.getElementById("navbar")

    if (x.className === "navbar") {
      x.className += "--mobile";
    } 
    else{
      x.className += "--closing"
      console.log(x.className)
      setTimeout(()=>{
        x.className = "navbar"
      },500)

    }
}
