let pages

addEventListener("scroll", ()=>{
  //idea: check if a div is more than 50% on the screen
  //coordinates of div: between 0 and divheight/2

  pages = [
    document.getElementById("skills"), 
    document.getElementById("projects"),
    document.getElementById("work"),
    document.getElementById("aboutme"),
    document.getElementById("resume"),
    document.getElementById("fun")
  ]

  pages.forEach((page)=>{

    const navbarItem = document.querySelector(`a.navbar__item[href="#${page.id}"]`)
    if(isHalfwayInViewPort(page)){  
      if(!navbarItem.classList.contains("glowing")){
        navbarItem.classList.add("glowing")
      }
    }
    else
    {
      navbarItem.classList.remove("glowing")
    }
  })
})

function isHalfwayInViewPort(element){
  const rect = element.getBoundingClientRect();

  if(rect.top > -rect.height / 2 && rect.top < rect.height / 2) return true;
}

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

