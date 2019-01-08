
// text editable not responding//
//Dont forget favorite number button is backwards atm ///
//favorite button is null? //




var create = document.querySelector('.add-image');
var input = document.querySelector('#file');
var photoGallery = document.querySelector('.image-card-area');
var searchInput = document.querySelector('.h2-input');
var addPhotoInputs = document.querySelectorAll('.add-photo-inputs');
var cardArea = document.querySelector('.image-card');
var favoriteButton = document.querySelector('.testing-button');
var imagesArray = JSON.parse(localStorage.getItem('photos')) || [];
var favoriteArray = ['images/favorite.svg', 'images/favorite-active.svg'];
var reader = new FileReader();


// Event Listeners //
create.addEventListener('click', createElement);
searchInput.addEventListener('keyup', searchPhotos);

// cardArea.addEventListener('click', textEditable);
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
  var newPhoto = new Photo(Date.now(), titleInput.value, e.target.result, bodyInput.value, );
  imagesArray.push(newPhoto);
  newPhoto.saveToStorage();
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
    clearPhotoAddInputs();

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

function clearPhotoAddInputs() {
  addPhotoInputs.forEach(function() {
    addPhotoInputs.value = '';
  });
}

function textEditable(event){
  photoGallery.addEventListener('keypress', textEnter);
  event.target.addEventListener('focusout', textClick);
}

function textEnter(event) {
  if (event.code === 13) {
    editTextListener(event);
 }
}

function textClick(event) {
  editTextListener(event);
}

function editTextListener(event){
    console.log("hello");
    updateText();
    photoGallery.removeEventListener('keypress', textEnter);
    event.target.removeEventListener('focusout', textClick);
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

function favoritePhotos() {
  var favoritePhoto = 0;
  imagesArray.forEach(function(photo) {
    if (photo.favorite === 0) {
      favoritePhoto++
    };
  });
  document.querySelector('#favorite-counter').innerText = favoritePhoto;
}


function changeFavoriteImage(object) {
  favoriteSatus(object);
}

// cardArea.addEventListener('click', function(event) {
//   if (event.target.classList.contains('up-button')) {
//     vote(event, 'up');
//   } else if (event.target.classList.contains('down-button')) {
//     vote(event, 'down')
//   }
// });

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
//   })

// function findIdNumber(objId) {
//   for (var i = 0; i < ideasArray.length; i++) {
//     if (parseInt(ideasArray[i].id) === parseInt(objId)) {
//       console.log(i)
//       return i
//     }
//   }
// };
/////////////////////////////////////////


// function vote(event, votebutton) {
//   var index = findIdNumber(event.target.closest('.idea-cards').dataset.id);
//   if (votebutton === 'up') {
//     ideasArray[index].updateQuality('up');
//     event.target.nextElementSibling.innerText = qualityArray[ideasArray[index].quality];   
//     console.log(qualityArray[ideasArray[index].quality]);
//   } else if (votebutton === 'down') {
//     console.log(qualityArray[ideasArray[index].quality])
//     ideasArray[index].updateQuality('down');
//     event.target.nextElementSibling.nextElementSibling.innerText = qualityArray[ideasArray[index].quality];
//   }
//   ideasArray[index].saveToStorage();
//   ideasArray.splice(index, 1, ideasArray[index]);
// };

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