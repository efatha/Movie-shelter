// Mock data to represent videos
const newVideos = [
    { title: "Sample Video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    // Add more sample videos if necessary
];

const oldVideos = [
    { title: "Old Victory Speech", url: "video3.mp4" },
    { title: "Old Parliament Address", url: "video4.mp4" },
];

// Load mock videos on page load
document.addEventListener("DOMContentLoaded", function () {
    loadVideos(newVideos, "new-video-container");
    loadVideos(oldVideos, "old-video-container");
});

// Function to load videos into the container
function loadVideos(videoArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    videoArray.forEach(video => {
        const videoElement = document.createElement("video");
        videoElement.src = video.url;
        videoElement.controls = true;
        container.appendChild(videoElement);
    });
}
