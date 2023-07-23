current = undefined

function openElement(clickedDiv){

    if(current == clickedDiv.id) return

    if(current == undefined){
        current = clickedDiv.id

        const siblings = Array.from(clickedDiv.parentElement.children)

        console.log(siblings)
    
        siblings.forEach((sibling)=>{
            if(sibling.className != clickedDiv.className){
                //show
                sibling.classList.remove('hidden')
            }
        })

        return
    }

    //get the siblings for the one we need to close

    const siblings = Array.from(clickedDiv.parentElement.children)

    console.log(siblings)

    siblings.forEach((sibling)=>{
        if(sibling.className != clickedDiv.className){
            //show
            sibling.classList.remove('hidden')
        }
    })
    
    //get id of current
    
    container = clickedDiv.parentElement.parentElement

    toHide = container.querySelectorAll('#' + CSS.escape(current))

    toHide.forEach((sibling)=>{
        if(sibling.className != clickedDiv.className){
            //show
            sibling.classList.add('hidden')
        }
    })

    current = clickedDiv.id

}

