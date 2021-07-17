window.onload = () => {
    Object.keys(localStorage).forEach((key, index) => {
        let dropzone = document.querySelector('.drop-zone');
        let img = document.createElement('img');
        img.setAttribute('src', blobToFile(localStorage.getItem(key), String(key)));
        img.setAttribute('style', `--index: ${index+1}`);
        dropzone.appendChild(img);
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