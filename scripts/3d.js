const player = document.getElementById('3d');
const img = document.getElementById('centeredContainer3');
const closer = document.getElementById('closerBtn3');
var sl = document.getElementById('myYouTubeIframe');

/*player.addEventListener("click", function () {
    if (img.style.display === "block") {
        img.style.display = "none";
    } else {
        img.style.display = "block";
        $('#centeredContainer').css('display', 'none');
    }
});

closer.addEventListener("click", function () {
    img.style.display = "none";
});*/

player.addEventListener("click", function (){
    window.open("./3d.html")
})