
//append to dom multiple times, maybe an issue with IDS//
//when one of the multiples is deleted, all dups dissapear after refesh//
// text editable not responding//
//Dont forget favorite number button is backwards atm ///
//cant vhange image on favorite button //




var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var cardArea = document.querySelector('.image-card');
var favoriteButton = document.getElementById('favorite-button');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var favoriteImagesArray = [];
var reader = new FileReader();


// Event Listeners //
window.addEventListener('load', appendPhotos);
create.addEventListener('click', createElement);
cardArea.addEventListener('click', textEditable);
// favoriteButton.addEventListener('click', changeFavoriteImage);



//Functions //
window.onload = function() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var parseObj = JSON.parse(localStorage.getItem(keys[i]));
    var newPhoto= new Photo(parseObj.id, parseObj.title, parseObj.file, parseObj.caption);
    imagesArray.push(newPhoto);
    newPhoto.saveToStorage();
    appendPhotos(newPhoto);
    favoritePhotos();
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
  
}

function appendPhotos(e) {
  imagesArray.forEach(function (newPhoto) {
    var photoCard =
  photoGallery.innerHTML +=
    `<article class="image-card" data-id="${newPhoto.id}">
      <section id="title-area">
        <h4 class="card-title edit-text"contentEditable = "false">${newPhoto.title}</h4>
      </section>
      <section id="image-area">
        <img class= "image-size" src="${newPhoto.file}">
      </section>
      <section id="caption-area">
        <h4 class="card-caption edit-text"contentEditable = "false">${newPhoto.caption}</h4>
      </section>
      <section id="bottom-area">
        <img onclick="deleteCard(${newPhoto.id})" src="images/delete.svg" onmouseover="this.src='images/delete-active.svg'" onmouseout="this.src='images/delete.svg'" width="40px" height="40px">
        <img id ='favorite-button' onclick ='changeFavoriteImage()' src="images/favorite.svg">
      </section>
    </article>`;
  })
}

// onclick="favoriteCard(${false})"
/////
  
function textEditable(event){
  console.log(this);
  if (event.target.classList.contains("card-title" || "card-caption")) {
    editText(event);
  }
}

function editText(event){
  if (event.target.classList.contains('edit-text')) {
    event.target.contentEditable = true;
    editTextListener(event);
 }
}

function textEnter(event) {
  if (event.code === 'Enter') {
    updateText();
    event.target.contentEditable = false;
    editTextListener(event);
 }
};

function textClick(event) {
  updateText();
  event.target.contentEditable = false;
  editTextListener(event);
};

function updateText() {
  var index = findIdNumber(event.target.parentElement.dataset.id);
  if (event.target.classList.contains('card-title')) {
    array[index].updatePhoto(event.target.innerText, 'card-title');
   }
  else {
    imagesArray[index].updatePhoto(event.target.innerText, 'card-caption');
   };
  imagesArray[index].saveToStorage();
  };

  function editTextListener(event){
    photoGallery.addEventListener('keypress', textEnter);
    event.target.addEventListener('blur', textClick);
  }

/////


function deleteCard (id) {
  let element = document.querySelector(`[data-id="${id}"]`);
  element.remove();
  let deletePhoto = imagesArray.find(function(newPhoto) {
    return id === newPhoto.id;
  });
  deletePhoto.deleteFromStorage();
  let deleteIndex = imagesArray.findIndex(function(newPhoto) {
    return id === newPhoto.id;
  });
  imagesArray.splice(deleteIndex, 1)
}

function favoritePhotos() {
  var favoritePhoto = 0;
  imagesArray.forEach(function(photo) {
    if (photo.favorite === false) {
      favoritePhoto++
    };
  });
  document.querySelector('#favorite-counter').innerText = favoritePhoto;
}


function changeFavoriteImage() {
  console.log("testing");
  if (favoriteButton.src == "images/favorite.svg") 
    {
      favoriteButton.src.src = "images/favorite-active.svg";
  }else if (favoriteButton.src.src === "images/favorite-active.svg"){
    favoriteButton.src.src = "images/favorite.svg";
  }
}
// function favoriteVote(event) {
//   var index = findIndexNumber(event.target.parentElement.parentElement.dataset.id);
//   if (event.target.classList.contains('favorite')) {
//     favoriteUpdateCall(index);
//     event.target.classList.remove('favorite');
//   } else {
//     favoriteUpdateCall(index);
//     event.target.classList.add('favorite');
//   };
// }



   
    