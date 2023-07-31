window.addEventListener("load", ()=>{
    fetch('../info/projects.json')
    .then((response) => response.json())
    .then((json) => parseProjects(json))

    fetch('../info/work.json')
    .then((response) => response.json())
    .then((json) => parseWork(json))
})

let carouselNumber = 0

async function parseProjects(projects){

    carouselNumber = 0

    const project = document.createDocumentFragment();

    await projects.categories.forEach(async (category)=>{

        carouselNumber++;

        //create div to wrap each carousel
        const carousel = document.createElement('div')
        carousel.setAttribute('class','info-contents__info')
        carousel.setAttribute('id',carouselNumber.toString())

        //create title for project
        const projectTitle = document.createElement('div')
        projectTitle.setAttribute('class','infos-contents__info__title')
        projectTitle.classList.add('class','visible')
        projectTitle.setAttribute('id',carouselNumber.toString())
        projectTitle.setAttribute('onClick','openElement(this)')
        projectTitle.appendChild(document.createTextNode(category.name))

        //create description for project
        const projectDesc = document.createElement('div')
        projectDesc.setAttribute('class','info-contents__info__description hidden')
        projectDesc.setAttribute('id',carouselNumber.toString())
        projectDesc.appendChild(document.createTextNode(category.description))

        carousel.appendChild(projectTitle)
        carousel.appendChild(projectDesc)

        if(category.assets != null){
            const assetsPath = `../assets/projects/${category.assets}`
            const carouselFrame = await generateCarousel(assetsPath, carouselNumber)
            carousel.appendChild(carouselFrame)    
        }
        else{
            projectDesc.setAttribute('style', 'padding: 20px 0px 20px 0px')
        }

        project.appendChild(carousel)
        document.getElementById('project-set').appendChild(project)
    })
}

async function parseWork(work){

    carouselNumber = 0

    const project = document.createDocumentFragment();

    await work.categories.forEach(async (category)=>{

        carouselNumber++;

        //create div to wrap each carousel
        const carousel = document.createElement('div')
        carousel.setAttribute('class','info-contents__info')
        carousel.setAttribute('id',carouselNumber.toString())

        //create title for project
        const workTitle = document.createElement('div')
        workTitle.setAttribute('class','infos-contents__info__title visible')
        workTitle.setAttribute('id',carouselNumber.toString())
        workTitle.setAttribute('onClick','openElement(this)')
        workTitle.appendChild(document.createTextNode(category.name))
        

        const position = document.createElement('div')
        position.setAttribute('class','infos-contents__info__subtitle hidden')
        position.setAttribute('id',carouselNumber.toString())
        position.appendChild(document.createTextNode(category.position))

        const dates = document.createElement('div')
        dates.setAttribute('class','infos-contents__info__subtitle hidden')
        dates.setAttribute('id',carouselNumber.toString())
        dates.appendChild(document.createTextNode(category.dates))


        //create description for project
        const projectDesc = document.createElement('div')
        projectDesc.setAttribute('class','info-contents__info__description hidden')
        projectDesc.setAttribute('id',carouselNumber.toString())
        projectDesc.appendChild(document.createTextNode(category.description))

        carousel.appendChild(workTitle)
        carousel.appendChild(dates)
        carousel.appendChild(position)
        carousel.appendChild(projectDesc)

        if(category.assets != null){
            const assetsPath = `../assets/work/${category.assets}`
            const carouselFrame = await generateCarousel(assetsPath, carouselNumber)
            carousel.appendChild(carouselFrame)    
        }
        else{
            projectDesc.setAttribute('style', 'padding: 20px 0px 20px 0px')
        }

        project.appendChild(carousel)
        document.getElementById('work-set').appendChild(project)
    })
}

async function generateCarousel(assetsPath, id){
    //carousel frame
    const carouselFrame = document.createElement('div')
    carouselFrame.setAttribute('class', 'carousel__frame hidden')
    carouselFrame.setAttribute('id',id.toString())

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

    await getFilePathsFromDirectory(assetsPath).then((paths)=>{
        
        paths.forEach((path)=>{
            const image = generateCarouselImage(path)
            carouselFrame.appendChild(image)
        })

        if(paths.length > 0){
            const firstImage = generateCarouselImage(paths[0])
            carouselFrame.appendChild(firstImage)
        }
    })

    return carouselFrame
}

function generateCarouselImage(src){
    const imageWrapper = document.createElement('div')
    imageWrapper.setAttribute('class', 'carousel__image-frame')

    const image = document.createElement('img')
    image.setAttribute('class', 'carousel__image')
    image.setAttribute('src', src)

    imageWrapper.appendChild(image)

    return imageWrapper;
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



