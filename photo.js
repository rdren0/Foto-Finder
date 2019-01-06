class Photo{
  constructor(id, title, file, caption, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite || false;
  }


  saveToStorage(){
    localStorage.setItem(this.id, JSON.stringify(this));

  }

  deleteFromStorage(){

  }

  updatePhoto(){


  }

  favoriteStatus(){

  }


}









    