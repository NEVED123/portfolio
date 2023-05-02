window.addEventListener("load", ()=>{
    fetch('../info/skills.json')
    .then((response) => response.json())
    .then((json) => parseJSON(json));
})

function parseJSON(skills){

    const skillContents = document.createDocumentFragment();

    skills.categories.forEach((category)=>{

        //create figure to wrap each skill set
        const skillSet = document.createElement('figure');
        skillSet.setAttribute('class','skills-contents__skill-sets__skill-set')

        //create title for skill set
        const skill = document.createElement('figcaption');
        skill.setAttribute('class','skills-contents__skill-sets__skill-set__title')
        skill.appendChild(document.createTextNode(category.name));

        //create ul for each list
        const list = document.createElement('ul');
        list.setAttribute('class','skills-contents__skill-sets__skill-set__list')

        //create an li for each item in skill set
        category.items.forEach((item)=>{
            const listItem = document.createElement('li');
            listItem.setAttribute('class','skills-contents__skill-sets__skill-set__list__item')
            listItem.appendChild(document.createTextNode(item));
            list.appendChild(listItem)
        })

        skillSet.appendChild(skill)
        skillSet.appendChild(list)

        skillContents.appendChild(skillSet)
    })

    document.getElementById('skill-sets').appendChild(skillContents)
}

