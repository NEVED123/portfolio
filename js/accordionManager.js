function openElement(clickedDiv){

    const current = clickedDiv.id

    //get group
    const groupParent = clickedDiv.parentElement.parentElement

    //iterate through all elements, hide all but our current one
    //if we are on our current one, remove the hidden attribute

    const groupElements = Array.from(groupParent.children)

    //console.log(groupElements)

    groupElements.forEach((element)=>{

        const children = Array.from(element.children)

        children.forEach((child)=>{
            
            if(!child.classList.contains('visible')){
                if(child.id == current){
                    child.classList.remove('hidden')
                }
                else{
                    if(!child.classList.contains('hidden'))
                    child.classList.add('hidden')
                }
            }
        })

    })

}

