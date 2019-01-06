class Photo{
  constructor(id, title, file, words, favorite){
    this.id = id || Date.now();
    this.title = title;
    this.file = file;
    this.words = words;
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









    