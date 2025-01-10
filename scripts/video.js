// Get references to the player, video container, close button, and tooltip
const player = document.getElementById("centeredContainer");
const videoDiv = document.getElementById("youtubevideodiv");
const videoclose = document.getElementById("closerBtn");
const video = player.querySelector("video");
const tooltip = document.getElementById("youtube-tooltip");

// Add an event listener to the tooltip for toggling the video player
tooltip.addEventListener("click", function() {
    if (player.style.display === "flex") {
        // If the player is visible, hide it and stop the video
        player.style.display = "none";
        $('#draggable2').css('display', 'block'); // Show the landmarks list
        $('#draggable').css('display', 'block');  // Show the layers list
        video.pause(); // Pause the video
        video.currentTime = 0; // Reset the current time of the video to 0
        video.src = ""; // Clear the video source
    } else {
        // If the player is hidden, show it and play the video
        player.style.display = "flex";
        player.style.justifyContent = 'center';
        player.style.alignItems = 'center';
        $('#draggable2').css('display', 'none'); // Hide the landmarks list
        $('#draggable').css('display', 'none');  // Hide the layers list
        video.src = "./loliem2.mp4"; // Set the video source
        video.play(); // Play the video
    }
});

// Add an event listener to the close button
videoclose.addEventListener("click", function() {
    // Hide the player, pause, reset, and stop the video
    player.style.display = "none";
    $('#draggable2').css('display', 'block'); // Show the landmarks list
    $('#draggable').css('display', 'block');  // Show the layers list
    video.pause(); // Pause the video
    video.currentTime = 0; // Reset the current time of the video to 0
    video.src = ""; // Clear the video source
});
