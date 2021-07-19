window.onload = () => {
    Object.keys(localStorage).forEach((key, index) => {
        if(key.substring(0, 3) == 'img'){
            let dropzone = document.querySelector('.drop-zone');
            let img = document.createElement('img');
            img.setAttribute('src', blobToFile(localStorage.getItem(key), String(key)));
            img.setAttribute('style', `--index: ${parseInt(key.substring(4, 5))}`);
            dropzone.appendChild(img);
        }
        if(key == 'total-items'){
            let itemNum = document.querySelector('#item-num');
            itemNum.textContent = JSON.parse(localStorage.getItem(key));
        }
        if(key.substring(0, 2) == 'id'){
            let deleteItemSection = document.querySelectorAll('.item-drop-down')[1];
            deleteItemSection.children[parseInt(key.substring(3, 4))].children[0].textContent = `x ${JSON.parse(localStorage.getItem(key))}`;
        }
    })
}

function saveName(element){
    document.cookie = `Name=${element} ;`
}
function blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }

    return null;
}

// Add items to DOM
function addItem(item){
    let allItemsNums = document.querySelectorAll('.items .item-counter');
    let tempArrStrings = [];
    for (let i = 0; i < allItemsNums.length; i++) {
        const element = allItemsNums[i];
        const elementText = element.parentNode.textContent;
        const elementToCheck = elementText.substring(0, elementText.indexOf("x")).trim().toLocaleLowerCase();
        if(item.textContent.toLocaleLowerCase() == elementToCheck){
            tempArrStrings = element.textContent.split(' ');
            if(parseInt(tempArrStrings[1]) + 1 > 20){
                break;
            }
            tempArrStrings[1] = String(parseInt(tempArrStrings[1]) + 1);
            element.textContent = `${tempArrStrings[0]} ${tempArrStrings[1]}`;
            break;
        } 
    }
}

function toggleItems(element){
    element.parentNode.nextElementSibling.classList.toggle('hide');
}
