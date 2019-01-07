class Photo{
  constructor(id, title, file, caption, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite || false;
  }


  saveToStorage(array){
    localStorage.setItem('photoscard', JSON.stringify(array));

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

  ///this['title']
  // this['caption']
// updatePhoto(asdasdasas, 'title')

  favoriteStatus(){

  }


}









    