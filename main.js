
var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var favoriteImagesArray = [];
var reader = new FileReader();

window.addEventListener('load', appendPhotos);
create.addEventListener('click', createElement);

window.onload = function() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var parseObj = JSON.parse(localStorage.getItem(keys[i]));
    var newPhoto= new Photo(parseObj.id, parseObj.title, parseObj.file, parseObj.caption);
    imagesArray.push(newPhoto);
    newPhoto.saveToStorage();
    appendPhotos(newPhoto); 
  }
}

function createElement(event) {
  event.preventDefault();
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = createCard;
  }
}

function createCard(e) {
  e.preventDefault();
  // console.log(e.target.result);
  var titleInput      =     document.querySelector('#title');
  var bodyInput       =     document.querySelector('#caption');
  var newPhoto= new Photo(Date.now(), titleInput.value, e.target.result, bodyInput.value);
  imagesArray.push(newPhoto);
  newPhoto.saveToStorage();
  appendPhotos(newPhoto);
  
}

function appendPhotos(e) {
  imagesArray.forEach(function (newPhoto) {
    var photoCard =
  photoGallery.innerHTML +=`<article class="image-card" data-id="${newPhoto.id}">
    <section id="title-area">
      <h4 class="card-title edit-text"contentEditable = "false">"${newPhoto.title}"</h4>
    </section>
    <section id="image-area">
      <img class= "image-size" src="${newPhoto.file}">
    </section>
    <section id="caption-area">
      <p class="card-caption edit-text"contentEditable = "false">"${newPhoto.caption}"</p>
    </section>
    <section id="bottom-area">
      <img src="images/delete.svg" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'" width="40px" height="40px">
      <img src="images/favorite.svg">
    </section>
  </article>`;
  })
}

function deleteCard (id) {
  let element = document.querySelector(`[data-id="${newPhoto.id}"]`);
  element.remove();
  let deleteIdea = imagesArray.find(function(photo) {
    return id === newPhoto.id;
  });
  deleteIdea.deleteFromStorage();
  let deleteIndex = imagesArray.findIndex(function(photo) {
    return id === newPhoto.id;
  });
  imagesArray.splice(deleteIndex, 1)
}




   
    