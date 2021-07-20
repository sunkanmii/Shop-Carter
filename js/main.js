window.onload = () => {
    Object.keys(localStorage).forEach((key, index) => {
        if (key.substring(0, 3) == 'img') {
            let dropzone = document.querySelector('.drop-zone');
            let img = document.createElement('img');
            img.setAttribute('src', blobToFile(localStorage.getItem(key), String(key)));
            img.setAttribute('style', `--index: ${parseInt(key.substring(4, 5))}`);
            dropzone.appendChild(img);
        }
        if (key == 'total-items') {
            let itemNum = document.querySelector('#item-num');
            itemNum.textContent = JSON.parse(localStorage.getItem(key));
        }
        if (key.substring(0, 2) == 'id') {
            let deleteItemSection = document.querySelectorAll('.item-drop-down')[1];
            deleteItemSection.children[parseInt(key.substring(3, 4))].children[0].textContent = `x ${JSON.parse(localStorage.getItem(key))}`;
        }
    })

    let name = getCookie('Name');
    let nameTag = document.querySelector('#name');
    if(name != null){
        nameTag.textContent = name;
    }
}

function saveName(element) {
    document.cookie = `Name=${element}; expires=30 Aug 2021 12:00:00 UTC;`
}

// Converts image to blob using fetch
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

function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

function getCookie(name) {
    name = name + "=";
    let ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return null;
}

function deleteName(){
    let text = document.querySelector('#name');
    if(text.textContent != null || text.textContent != ""){
        document.cookie = `Name=; expires=30 Dec 2020 12:00:00 UTC`;
        text.textContent = "";
    }
}

// Add items to DOM
function addItem(item) {
    let allItemsNums = document.querySelectorAll('.items .item-counter');
    let tempArrStrings = [];
    for (let i = 0; i < allItemsNums.length; i++) {
        const element = allItemsNums[i];
        const elementText = element.parentNode.textContent;
        const elementToCheck = elementText.substring(0, elementText.indexOf("x")).trim().toLocaleLowerCase();
        if (item.textContent.toLocaleLowerCase() == elementToCheck) {
            tempArrStrings = element.textContent.split(' ');
            if (parseInt(tempArrStrings[1]) + 1 > 20) {
                break;
            }
            tempArrStrings[1] = String(parseInt(tempArrStrings[1]) + 1);
            element.textContent = `${tempArrStrings[0]} ${tempArrStrings[1]}`;
            break;
        }
    }
}

function toggleItems(element) {
    element.parentNode.nextElementSibling.classList.toggle('hide');
}

// Adds Item to cart
function addItemToCart(element){
    let nodes = [...element.parentNode.children];
    let indOfSection = nodes.findIndex((ele) => ele == element);
    let dropzone = document.querySelector('.drop-zone');
    let imgsInDropZone = [...document.querySelectorAll('.drop-zone img')];

    convertImageToBlob(element.children[0].cloneNode(), indOfSection);

    if (imgsInDropZone.findIndex((ele) => element.children[0].style.getPropertyValue('--index') == ele.style.getPropertyValue('--index')) == -1) {
        dropzone.appendChild(element.children[0].cloneNode());
    }

    let itemCount = parseInt(element.children[1].children[0].textContent.substring(2, 3));
    let idOfItem = JSON.parse(localStorage.getItem(`id-${indOfSection}`));

    // Save item count in localstorage
    if (idOfItem != null) {
        localStorage.setItem(`id-${indOfSection}`, itemCount + idOfItem);
    } else {
        localStorage.setItem(`id-${indOfSection}`, itemCount);
    }

    let deleteItemSection = document.querySelectorAll('.item-drop-down')[1];

    deleteItemSection.children[indOfSection].children[0].textContent = `x ${JSON.parse(localStorage.getItem(`id-${indOfSection}`))}`;
    let totalItems = document.querySelector('#item-num');
    totalItems.textContent = parseInt(totalItems.textContent) + parseInt(element.children[1].querySelector('.item-counter').textContent.substring(1, 3));
    localStorage.setItem('total-items', totalItems.textContent);
}

function deleteItem(element) {
    let images = [...document.querySelectorAll('.drop-zone img')];
    let indOfSection = [...document.querySelectorAll('.items section')].findIndex(ele => ele.getAttribute('id') == [...element.parentNode.children].indexOf(element) + 1);
    let selectedItem = images.find(ele => ele.style.getPropertyValue('--index') == indOfSection + 1);
    let totalItems = document.querySelector('#item-num');

    if (indOfSection != -1 && parseInt(totalItems.textContent) > 0) {
        localStorage.removeItem(`img-${indOfSection+1}`);
        localStorage.removeItem(`id-${indOfSection}`);
        totalItems.textContent = parseInt(totalItems.textContent) - parseInt(element.children[0].textContent.substring(2, 3));
        localStorage.setItem('total-items', totalItems.textContent);
        selectedItem.remove();
        element.children[0].textContent = `x 0`;
    }
}

// Show Pop-up for name change
function popUp() {
    let name = document.querySelector('#name-section h2 #name');

    if(name.textContent.length >= 1){
        return;
    }

    let person = prompt("Please enter your name", "Sunkanmi Fafowora");
    let text;
    if (person == null || person == "") {
        text = "John Doe";
        saveName(text);
    } else {
        text = `${person}`;
        saveName(text);
        name.textContent = text;
    }
}

function deleteAllItems(){
    let deleteItemSection = [...document.querySelectorAll('.item-drop-down')[1].children];
    let dropZone = [...document.querySelectorAll('.drop-zone img')];
    let totalItems = document.querySelector('#item-num');
    if(dropZone[0] == null){
        return;
    }
    deleteItemSection.forEach((element, index) => {
        element.children[0].textContent = 'x 0';
    });

    dropZone.forEach(element => {
        element.remove();
    });
    totalItems.textContent = 0;
    localStorage.clear();
}