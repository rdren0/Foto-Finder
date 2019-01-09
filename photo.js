class Photo{
  constructor(id, title, file, caption, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite;
  }

  saveToStorage(){
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage(){
    localStorage.removeItem(this.id);
  }

  updatePhoto(newValues, text) {
    if (text === 'card-title') {
      this.title = newValues;
    }else if(text === 'card-caption') {
      this.caption = newValues;
    }else{
    }
  }

  favoriteStatus(value){
    this.favorite = value;
    this.saveToStorage(imagesArray);
  }
}


// document.querySelector(".favorite-button").addEventListener("click", showFavorite)
// function showFavorite(e) {
//   e.preventDefault()
//   console.log("its passing the first")
//   var  favoritecheck = document.querySelectorAll("img")
//   favoritecheck.forEach(function(check){
//     if(check.src === "icons/favorite-active.svg"){
//       console.log("this is true")
//       check.parentElement.style.display = "grid";
//     }else {
//       console.log("this is false")
//       check.parentElement.style.display = "none";
//     }
//   })

// }
