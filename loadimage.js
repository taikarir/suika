const loadImage = (url, onSuccess, onError) => {

  const img = new Image();
  img.src = url;
};
class LoadedImage {
    constructor(url) {
        this.img = new Image();
        this.img.src = url;
    }
}
