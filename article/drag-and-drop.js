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
    // Insert function call here
    
}

