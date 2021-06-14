const inProfielfoto= document.getElementById("profielfoto");
const previewConatiner = document.getElementById("imagePreview");
const previewImage = previewConatiner.querySelector(".image-preview__image");
const previewDefaultText = previewConatiner.querySelector(".image-preview__default-text");

inProfielfoto.addEventListener("change", function(){
    const file = this.files[0];

if (file){
    const reader = new FileReader();
previewDefaultText.style.display = "none";
previewImage.style.display = "none";
reader.addEventListener("load", function(){
    console.log(this);
    previewImage.setAttribute("src", this.result);

});
reader.readAsDataURL(file);
}

});