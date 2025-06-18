function showPage(id) {
    const ids = ["jogar", "sobre", "ajuda", "menu"]
    const idsWithoutCurrentId = ids.filter(item => item != id)
    const pageToOpen = document.getElementById(id)

    for (let item of idsWithoutCurrentId) {
        const el = document.getElementById(item)
        el.style.display = "none" 
    }
    pageToOpen.style.display = "flex"
}

function carousel(direction) {
    const ids = ["fabricio", "sara", "renato", "diego", "maria"]
    let currentIndex = 0
    for (let id of ids) {
        const currentElement = document.getElementById(id)
        if (currentElement.style.display == "flex") {
            currentIndex = ids.indexOf(id)
        }
    }
    let nextIndex = 0    
    if (direction == "prev" && currentIndex > 0) {
        nextIndex = currentIndex - 1
    } else if (direction == "next" && currentIndex < ids.length - 1){
        nextIndex = currentIndex + 1
    } else {
        return
    }
    const personToDisplay = document.getElementById(ids[nextIndex])
    const previousPerson = document.getElementById(ids[currentIndex])
    previousPerson.style.display = "none"
    personToDisplay.style.display = "flex"
}
