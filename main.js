
//Text editable not responding//
//cant change image on favorite button //



var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var cardArea = document.querySelector('.image-card');
var favoriteArea = document.querySelector('.favorite-area')
var favoriteArray = ['images/favorite.svg', 'images/favorite-active.svg'];
var imagesArray = [];
var reader = new FileReader();
// var favoriteImagesArray = [];


// Event Listeners //
create.addEventListener('click', createElement);
photoGallery.addEventListener('keyup', textEditable);
// favoriteButton.addEventListener('click', changeFavoriteImage);
favoriteArea.addEventListener('click', favoriteVote);


//Functions //
window.onload = function() {
  if(localStorage.hasOwnProperty('photoscard')){
  var parseObj = JSON.parse(localStorage.getItem('photoscard'));
  imagesArray = parseObj;
  for (var i = 0; i < imagesArray.length; i++) {
    appendPhotos(imagesArray[i]);
    favoritePhotos();
    }
  }
}

function createElement(event) {
  event.preventDefault();
  if (input.files[0]) {
    reader.readAsDataURL(input.files[0]); 
    reader.onload = createCard;
  }
}

function favoriteVote(element){
var favorite = element.target.closest('.testing-button').index;
console.log(favorite);
favoriteStatus(favorite);
}

function createCard(e) {
  e.preventDefault();
  var titleInput = document.querySelector('#title');
  var bodyInput = document.querySelector('#caption');
  var newPhoto = new Photo(Date.now(), titleInput.value, e.target.result, bodyInput.value, false);
  imagesArray.push(newPhoto);
  newPhoto.saveToStorage(imagesArray);
  appendPhotos(newPhoto);
  
}

function appendPhotos(newPhoto) {
  photoGallery.innerHTML +=
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
        <img onclick="deleteCard(${newPhoto.id})" src="images/delete.svg" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'" width="40px" height="40px">
        <section class ="favorite-area"><img id="favorite-button" class ="testing-button" src="${favoriteArray[newPhoto.favorite]}"></section>
      </section>
    </article>`;
  }

function favoritePhotos() {
  var favoritePhoto = 0;
  imagesArray.forEach(function(photo) {
    if (photo.favorite === 0) {
      favoritePhoto++
    };
  });
  document.querySelector('#favorite-counter').innerText = favoritePhoto;
}

function deleteCard (id) {
  var element = document.querySelector(`[data-id="${id}"]`);
  element.remove();    
  var deletePhoto = imagesArray.find( newPhoto => {  
    return id === newPhoto.id;
  }); 
  deletePhoto = new Photo (deletePhoto.id, deletePhoto.title, deletePhoto.file, deletePhoto.caption, deletePhoto.favorite);
  deletePhoto.deleteFromStorage(imagesArray, deletePhoto.id);
  }

function textEditable(event){
  photoGallery.addEventListener('keypress', textEnter);
  event.target.addEventListener('focusout', textClick);
}


function textEnter(event) {
  if (event.code === 13) {
    editTextListener(event);
 }
};

function textClick(event) {
  editTextListener(event);
};

function editTextListener(event){
    console.log("hello");
    updateText();
    photoGallery.removeEventListener('keypress', textEnter);
    event.target.removeEventListener('focusout', textClick);
    event.target.contentEditable = false;
  }

function findIndex (number) {
  for(var i = 0; i < number.length; i++) {
    if(number == imagesArray[i].id) 
      return imagesArray[i];
  }
}
  function updateText(element) {
  console.log('made it!');
  var number = element.target.parentElement.dataset.id;
  var index = findIndex(number);
  if (event.target.classList.contains('card-title')) {
    index.updatePhoto(event.target.innerText, 'card-title');
    console.log('pie')
  }else {
    index.updatePhoto(event.target.innerText, 'card-caption');
   };
  index.saveToStorage(imagesArray);
  };


// function showQuality (qualities) {
//   console.log(qualities + " this is the button clicked");
//   var thisQualityButton = qualities;

//   var qualityIdeas = ideasArray.filter(function(obj) {
//     // console.log()
//     var qualityText = qualityArray[obj.quality];
//     return qualityText.includes(thisQualityButton);
//   });
//   cardArea.innerHTML = "";
//   qualityIdeas.forEach(function(obj) {
//     appendCard(obj)
//   });

  





   
    