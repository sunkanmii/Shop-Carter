function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let data = document.getElementById(event.dataTransfer.getData("text"));
    let nodes = [...data.parentNode.children];
    let indOfSection = nodes.findIndex((ele) => ele == data);

    convertImageToBlob(data.children[0].cloneNode(), indOfSection);
    let dropzone = document.querySelector('.drop-zone');
    let imgsInDropZone = [...document.querySelectorAll('.drop-zone img')];
    
    if(imgsInDropZone.findIndex((ele) => data.children[0].style.getPropertyValue('--index') == ele.style.getPropertyValue('--index')) == -1){
        dropzone.appendChild(data.children[0].cloneNode());
    }
    
    let itemCount = parseInt(data.children[1].children[0].textContent.substring(2, 3));
    let idOfItem = JSON.parse(localStorage.getItem(`id-${indOfSection}`));
    
    // Save item count in localstorage
    if(idOfItem != null){
        localStorage.setItem(`id-${indOfSection}`, itemCount + idOfItem);
    }
    else{
        localStorage.setItem(`id-${indOfSection}`, itemCount);
    }

    let deleteItemSection = document.querySelectorAll('.item-drop-down')[1];

    deleteItemSection.children[indOfSection].children[0].textContent = `x ${JSON.parse(localStorage.getItem(`id-${indOfSection}`))}`;
    let totalItems = document.querySelector('#item-num');
    totalItems.textContent = parseInt(totalItems.textContent) + parseInt(data.children[1].querySelector('.item-counter').textContent.substring(1, 3));
    localStorage.setItem('total-items', totalItems.textContent);
}

function convertImageToBlob(image, num) {
    const reader = new FileReader();

    fetch(image.getAttribute("src"))
        .then(function (response) {
            return response.blob()
        })
        .then(function (blob) {
            image = blob
            reader.readAsDataURL(image)
        });
        reader.addEventListener("load", () => {
            localStorage.setItem(`img-${num+1}`, reader.result);
        })
}