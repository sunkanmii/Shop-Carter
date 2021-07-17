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

    convertImage(data.children[0], nodes.findIndex((ele) => ele === data));
    let dropzone = document.querySelector('.drop-zone');
    let imgsInDropZone = [...document.querySelectorAll('.drop-zone img')];
    if(imgsInDropZone.findIndex((ele) => data.children[0].style.getPropertyValue('--index') == ele.style.getPropertyValue('--index')) == -1){
        dropzone.appendChild(data.children[0]);
    }
}

function convertImage(image, num) {
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