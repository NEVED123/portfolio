window.addEventListener("load", ()=>{
    fetch('../info/projects.json')
    .then((response) => response.json())
    .then((json) => parseProjects(json));
})

let carouselNumber = 0;

async function parseProjects(projects){

    const project = document.createDocumentFragment();

    await projects.categories.forEach(async (category)=>{

        carouselNumber++;

        //create div to wrap each carousel
        const carousel = document.createElement('div')
        carousel.setAttribute('class','projects-contents__project')

        //create title for project
        const projectTitle = document.createElement('div')
        projectTitle.setAttribute('class','projects-contents__project__title')
        projectTitle.setAttribute('id',carouselNumber.toString())
        projectTitle.setAttribute('onClick','openElement(this)')
        projectTitle.appendChild(document.createTextNode(category.name))

        //create description for project
        const projectDesc = document.createElement('div')
        projectDesc.setAttribute('class','project-contents__project__description hidden')
        projectDesc.setAttribute('id',carouselNumber.toString())
        projectDesc.appendChild(document.createTextNode(category.description))

        //carousel frame
        const carouselFrame = document.createElement('div')
        carouselFrame.setAttribute('class', 'carousel__frame hidden')
        carouselFrame.setAttribute('id',carouselNumber.toString())

        const leftArrow = document.createElement('a')
        leftArrow.setAttribute('class', 'carousel__frame__arrow--left')
        leftArrow.setAttribute('onClick', 'moveLeft(this)')
        leftArrow.appendChild(document.createTextNode('<'))

        const rightArrow = document.createElement('a')
        rightArrow.setAttribute('class', 'carousel__frame__arrow--right')
        rightArrow.setAttribute('onClick', 'moveRight(this)')
        rightArrow.appendChild(document.createTextNode('>'))

        carouselFrame.appendChild(leftArrow)
        carouselFrame.appendChild(rightArrow)

        const assetsPath = `../assets/projects/${category.assets}`

        await getFilePathsFromDirectory(assetsPath).then((paths)=>{
            console.log(paths)
            paths.forEach((path)=>{
                const imageWrapper = document.createElement('div')
                imageWrapper.setAttribute('class', 'carousel__image-frame')
    
                const image = document.createElement('img')
                image.setAttribute('class', 'carousel__image')
                image.setAttribute('src', path)
    
                imageWrapper.appendChild(image)
                carouselFrame.appendChild(imageWrapper)
            })
        })

        carousel.appendChild(projectTitle)
        carousel.appendChild(projectDesc)
        carousel.appendChild(carouselFrame)
        project.appendChild(carousel)
        document.getElementById('project-set').appendChild(project)
    })

    
}

function getFilePathsFromDirectory(filepath) {
    return new Promise((resolve, reject)=>{
        fetch(filepath)
        .then((response) => response.text())
        .then((text)=> {
            const parser = new DOMParser()
            const dom = parser.parseFromString(text, "text/html")
            const viewTiles = dom.getElementsByClassName("view-tiles")
            const directorylis = Array.from(viewTiles[0].children).slice(1)

            const directories = []

            directorylis.forEach((li)=>{
                const anchor = li.children[0]
                directories.push(anchor.getAttribute('href'))
                
            })

            resolve(directories);
        })        
    })

}

/**
 *         
 */