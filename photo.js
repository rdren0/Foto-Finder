class Photo{
  constructor(id, title, file, caption, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite || 0;
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


  favoriteStatus(obj){
    if(this.favorite === 0){
      this.favorite++;
    }else if(this.favorite === 1 ){
    this.favorite --;
    }
  }


}