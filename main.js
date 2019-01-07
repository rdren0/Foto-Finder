
//Text editable not responding//
//cant change image on favorite button //



var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var cardArea = document.querySelector('.image-card');
var favoriteButton = document.querySelector('#favorite-button');
var imagesArray = [];
var favoriteImagesArray = [];
var reader = new FileReader();


// Event Listeners //
create.addEventListener('click', createElement);
// favoriteButton.addEventListener('click', changeFavoriteImage);
photoGallery.addEventListener('keyup', textEditable);



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

function createCard(e) {
  e.preventDefault();
  var titleInput = document.querySelector('#title');
  var bodyInput = document.querySelector('#caption');
  var newPhoto = new Photo(Date.now(), titleInput.value, e.target.result, bodyInput.value);
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
        <img id ='favorite-button' onclick ='changeFavoriteImage()' src="images/favorite.svg">
      </section>
    </article>`;
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

// function changeFavoriteImage() {
//   console.log("testing");
//   if (favoriteButton.src == "images/favorite.svg") 
//     {
//       favoriteButton.src.src = "images/favorite-active.svg";
//   }else if (favoriteButton.src.src === "images/favorite-active.svg"){
//     favoriteButton.src.src = "images/favorite.svg";
//   }
// }
  
function textEditable(event){
  console.log(event.target);
  if (event.target.classList.contains("card-title" || "card-caption")) {
    photoGallery.addEventListener('keypress', textEnter);
    event.target.addEventListener('focusout', textClick);
  }
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
    updateText();
    photoGallery.removeEventListener('keypress', textEnter);
    event.target.removeEventListener('focusout', textClick);
    event.target.contentEditable = false;
  }

function updateText() {
  console.log('made it!');
  var index = findIdNumber(event.target.parentElement.dataset.id);
  if (event.target.classList.contains('card-title')) {
    array[index].updatePhoto(event.target.innerText, 'card-title');
   }
  else {
    imagesArray[index].updatePhoto(event.target.innerText, 'card-caption');
   };
  imagesArray[index].saveToStorage(imagesArray);
  };

  



// function favoriteVote(event) {
//   var index = findIndexNumber(event.target.parentElement.parentElement.dataset.id);
//   if (event.target.classList.contains('favorite')) {
//     changeFavoriteImage(index);
//     event.target.classList.remove('favorite');
//   } else {
//     changeFavoriteImage(index);
//     event.target.classList.add('favorite');
//   };
// }



   
    