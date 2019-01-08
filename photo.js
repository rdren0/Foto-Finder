class Photo{
  constructor(id, title, file, caption, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite || 0;
  }


  saveToStorage(array){
    localStorage.setItem('photoscard', JSON.stringify(array));

  }

  deleteFromStorage(photos, id){
    var index = photos.findIndex(function(photo){
      return id === photo.id
    });
    photos.splice(index,1);
    this.saveToStorage(photos);
  }

  updatePhoto(newValues, text) {
    if (text === 'card-title') {
      this.title = newValues;
    }else if(text === 'card-caption') {
      this.caption = newValues;
    }
  }

  ///this['title']
  // this['caption']
// updatePhoto(asdasdasas, 'title')

  favoriteStatus(){
    if(this.favorite === 0){
      this.favorite++;
    }else if(this.favorite === 1 ){
    this.favorite --;
    }
  }
}







    