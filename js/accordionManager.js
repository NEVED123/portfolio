function openElement(clickedDiv){

    const current = clickedDiv.id

    //get group
    const groupParent = clickedDiv.parentElement.parentElement

    //iterate through all elements, hide all but our current one
    //if we are on our current one, remove the hidden attribute

    const groupElements = Array.from(groupParent.children)

    groupElements.forEach((element)=>{

        const children = Array.from(element.querySelectorAll(':not( .always-visible'))

        children.forEach((child)=>{
            
            if(child.id == current){
                if(child.classList.contains('hidden')){
                    child.classList.remove('hidden')
                }
                else{
                    child.classList.add('hidden')
                }
            }
            else{
                child.classList.add('hidden')
            }

        })

    })

    

}

