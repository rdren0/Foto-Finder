
// ------------Global Var List------------
var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var searchInput = document.querySelector('.h2-input');
var addPhotoInputs1 = document.querySelector('.add-photo-inputs1');
var addPhotoInputs2 = document.querySelector('.add-photo-inputs2');
var addPhotoInputs3 = document.querySelector('.image-input');
var favoriteFilter = document.querySelector(".favorite-filter");
var favoritePhotoButton = document.querySelector('.testing-favorites');
var bottomofCard = document.querySelector('#bottom-area');
var cardArea = document.querySelector('.image-card');
var showMore = document.querySelector('.show-more');
var showMoreButton = document.querySelector('.show-more-button');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();



// ------------Event Listeners------------
create.addEventListener('click', createElement);
searchInput.addEventListener('keyup', searchPhotos);
photoGallery.addEventListener('focusin', wheresTheCursor);
addPhotoInputs1.addEventListener('blur',disableCreateButton);
addPhotoInputs2.addEventListener('blur',disableCreateButton);
addPhotoInputs3.addEventListener('change',disableCreateButton);
photoGallery.addEventListener('click', favoriteVoteCheck);
favoriteFilter.addEventListener("click", showFavorite)
// showMore.addEventListener('click', showAll)



// ------------Functions------------
window.onload = function() {
  if(localStorage.length !=0){
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var parseObj = JSON.parse(localStorage.getItem(keys[i]));
    var newPhoto= new Photo(parseObj.id, parseObj.title, parseObj.file, parseObj.caption);
    imagesArray.push(newPhoto);
    newPhoto.saveToStorage();
    appendPhotos(newPhoto);
    favoritePhotos();
    }  
  }else{
      placeholderText();
    }
}

function disableCreateButton(){
  if(addPhotoInputs1.value.length >0 && addPhotoInputs2.value.length >0 && addPhotoInputs3.files.length ===1){
  create.disabled=false;
  }else{
    create.disabled=true;
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
  var titleInput = document.querySelector('#title');
  var bodyInput = document.querySelector('#caption');
  var newPhoto = new Photo(Date.now(), titleInput.value, e.target.result, bodyInput.value);
  imagesArray.push(newPhoto);
  newPhoto.saveToStorage();
  appendPhotos(newPhoto);
  clearPhotoAddInputs();
}

function appendPhotos(newPhoto) {
  var favoritesvg;
  if(newPhoto.favorite === true){
    favoritesvg = "images/favorite-active.svg"
    favoritePhotos();
  } else {
    favoritesvg = "images/favorite.svg"
  }
  var newCard =
    `<article class="image-card" data-id="${newPhoto.id}">
      <section id="title-area">
        <h4 class="card-title edit-text"contentEditable = "true">${newPhoto.title}</h4>
      </section>
      <section id="image-area">
        <img class= "image-size" src="${newPhoto.file}">
      </section>
      <section id="caption-area">
        <h4 class="card-caption edit-text"contentEditable = "true">${newPhoto.caption}</h4>
      </section>
      <section id="bottom-area">
        <img class = "delete-button" onclick="deleteCard(${newPhoto.id})" src="images/delete.svg" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'" width="40px" height="40px">
<section class="favorite-area"><img class="testing-button" src="${favoritesvg}"></section>
    </article>`;
    photoGallery.insertAdjacentHTML('afterbegin',newCard);
  }


function wheresTheCursor(event){
  if(event.target.closest('.image-card') !== null && 
    !event.target.classList.contains('delete-button') ){
    event.target.onblur = function(event){
      updateText(event);
    }
  }
}

function searchPhotos (event) {
  event.preventDefault();
  var searchWord = searchInput.value.toUpperCase();
  var filteredPhotos = imagesArray.filter(function(obj) {
    var titleText = obj.title.toUpperCase();
    var captionText = obj.caption.toUpperCase();
    return titleText.includes(searchWord) || captionText.includes(searchWord);
  });
  photoGallery.innerHTML = "";
  filteredPhotos.forEach(function(obj) {
    appendPhotos(obj)
  })
}

function showFavorite(e) {
  e.preventDefault()
  console.log('this');
  var  favoriteArea = document.querySelectorAll("img")
  favoriteArea.forEach(function(image){
    if(image.src === "images/favorite-active.svg"){
      image.parentElement.parentElement.style.display = "grid";
    }else {
      image.parentElement.parentElement.style.display = "none";
    }
  })
}

function clearPhotoAddInputs() {
  addPhotoInputs1.value = '';
  addPhotoInputs2.value = '';
}

function updateText(event) {
  var number = event.target.closest('.image-card').dataset.id;
  var index = imagesArray.find(function(image){
    return parseInt(number) === image.id;
  });
  if (event.target.classList.contains('card-title')) {
    index.updatePhoto(event.target.innerText, 'card-title');
  }else {
    index.updatePhoto(event.target.innerText, 'card-caption');
   };
  index.saveToStorage(imagesArray);
}

function deleteCard (id) {
  var element = document.querySelector(`[data-id="${id}"]`);
  element.remove();
  var deletePhoto = imagesArray.find(function(newPhoto) {
    return id === newPhoto.id;
  });
  deletePhoto.deleteFromStorage();
  var deleteIndex = imagesArray.findIndex(function(newPhoto) {
    return id === newPhoto.id;
  });
  imagesArray.splice(deleteIndex, 1);
  placeholderText()
}

function favoriteVoteCheck(){
if(event.target.classList.contains('testing-button') ){
    favoriteVote()
    }
  }

function favoriteVote() {
  var number = event.target.closest('.image-card').dataset.id;
  var index = imagesArray.find(function(image){
  return parseInt(number) === image.id;  
  });
  if (index.favorite === false) {
    index.favorite = true;
    event.target.src = "images/favorite-active.svg";
    index.favoriteStatus(true, index);
  }else{
    index.favorite = false;
    event.target.src = "images/favorite.svg";
    index.favoriteStatus(false, index);
  }
  favoritePhotos();
}

function favoritePhotos() {
  var favoritePhoto = 0;
  imagesArray.forEach(function(photo) {
    if (photo.favorite === true) {
      favoritePhoto++
    };
  });
  document.querySelector('#favorite-counter').innerText = favoritePhoto;
}

function showAll() {
  if (showMore.innerText === 'Show More') {
    showMore.innerText = 'Show Less';
  } else if (showMore.innerText === 'Show Less') {
    showMore.innerText = 'Show More';  
  }
}

function placeholderText() {
  if (imagesArray.length === 0) {
    photoGallery.insertAdjacentHTML('beforebegin',
      '<h4 id="no-photo-text">Add photos to start your album!</h3>');
  }
}
