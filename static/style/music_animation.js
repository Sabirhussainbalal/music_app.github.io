const imgs = ['Blinder.PNG', 'Haqeeqat.PNG', 'Interstellar.PNG','Lovely_x_anotherLove.PNG','Mat_Aazma_Re.PNG','Music.PNG', 'belki.PNG', 'Dandelions_X_Kaise_Hua.PNG', 'I_wanna_be _yours.PNG', 'M𝐲_𝐞𝐲𝐞_𝐨𝐧_𝐲𝐨u.PNG', 'Samjho_Na_X_Wishes.PNG']; 
const audios = ['Im_a_peakyblinder.mp3', 'Haqeeqat.mp3', 'Interstellar.mp3','Lovely_X_Another_Love.mp3','Mat_aazma_re.mp3','Music.mp3' , 'belki.mp3', 'Dandelions_X_Kaise_Hua.mp3', 'I_wanna_be _yours.mp3', 'M𝐲_𝐞𝐲𝐞_𝐨𝐧_𝐲𝐨u.mp3', 'Samjho_Na_X_Wishes.mp3']; 


// Select the container where you want to add the gallery items
const songsContainer = document.querySelector('.songs');
const playlist = document.querySelector('.playlist ul');
let currentAudio = null;
let currentAudioIndex = -1; // Start with -1, no song is playing initially

// Loop through audio files and create gallery items
// Loop through audio files and create gallery items
audios.forEach((audio, index) => {
    const img = imgs[index]; // Assuming imgs and audios are in the same order
    
    // Append the song to the search results list
    document.querySelector('#myUL').innerHTML += `<li><a id="search-${audio}" href="#${audio}">${audio}</a></li>`;
    
    // Create the gallery item
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery';

    galleryItem.innerHTML = `
        <lord-icon id="plus" src="https://cdn.lordicon.com/rcgrnzji.json" trigger="hover" stroke="bold"></lord-icon>
        <a target="_blank" href="#">
            <img id='${audio}' src="static/pic/${img}" alt="${img}" width="600" height="400">
        </a>
        <div class="desc">${audio}</div>
    `;

    // Attach event listener to play audio from gallery
    galleryItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        playAudio(audio, img);
        addToPlaylist(audio);
    });

    // Add click event for adding to playlist
    galleryItem.querySelector('#plus').addEventListener('click', () => {
        addToPlaylist(audio);
    });

    // Append the gallery item to the container
    songsContainer.appendChild(galleryItem);
});

// Attach event listener to search results (UL)
document.querySelector('#myUL').addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'A') {
        e.preventDefault();

        // Extract the audio name from the clicked element
        const clickedAudio = e.target.id.replace('search-', '');
        const img = imgs[audios.indexOf(clickedAudio)]; // Get the corresponding image

        // Play the corresponding audio and add to playlist
        playAudio(clickedAudio, img);
        addToPlaylist(clickedAudio);
    }
});


// Fix the `playAudio` function
function playAudio(audio) {
    if (currentAudio) {
        currentAudio.pause();
    }

    const audioIndex = audios.indexOf(audio);

    currentAudio = new Audio(`static/vid/${audio}`);
    currentAudioIndex = audioIndex;  // Update the current index

    document.getElementById('song_name').innerText = audio;

    currentAudio.addEventListener('timeupdate', updateAudioTime);
    currentAudio.play();

    const playButton = document.getElementById('music-button');
    playButton.textContent = '⏸';

    playButton.onclick = () => {
        if (currentAudio.paused) {
            currentAudio.play();
            playButton.textContent = '⏸';
        } else {
            currentAudio.pause();
            playButton.textContent = '▶️';
        }
    };

    currentAudio.addEventListener('loadedmetadata', () => {
        document.querySelector('.duration').innerText = formatTime(currentAudio.duration);
    });

    const progressBar = document.querySelector('.control');
    progressBar.addEventListener('click', (e) => {
        const progressWidth = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = currentAudio.duration;
        currentAudio.currentTime = (clickX / progressWidth) * duration;
    });

    currentAudio.addEventListener('ended', playNextSong);
    initVisualization(currentAudio);
}

// Function to play the next song in the playlist
// Function to play the next song in the playlist
function playNextSong() {
    if (!playlist.children.length) return; // No songs in the playlist

    // Get the index of the currently playing song
    const currentIndex = [...playlist.children].findIndex(li => li.querySelector('span').innerText === currentAudio.src.split('/').pop());

    // Calculate the next index
    const nextIndex = (currentIndex + 1) % playlist.children.length;
    
    // If nextIndex is 0 and we are at the last song, stop auto-playing
    if (nextIndex === 0 && currentIndex === playlist.children.length - 1) {
        alert("End of playlist reached.");
        return;
    }

    // Get the audio file name and play it
    const nextAudio = playlist.children[nextIndex].querySelector('span').innerText;
    playAudio(nextAudio);
}

// Function to play the previous song in the playlist
function playPreviousSong() {
    if (!playlist.children.length) return; // No songs in the playlist

    // Get the index of the currently playing song
    const currentIndex = [...playlist.children].findIndex(li => li.querySelector('span').innerText === currentAudio.src.split('/').pop());

    // Calculate the previous index
    const prevIndex = (currentIndex - 1 + playlist.children.length) % playlist.children.length;
    
    // If prevIndex is the last song and we are at the beginning, show alert
    if (playlist.children.length <= 1 && prevIndex === playlist.children.length - 1) {
        alert("No more previous songs available.");
        return;
    }

    // Get the audio file name and play it
    const prevAudio = playlist.children[prevIndex].querySelector('span').innerText;
    playAudio(prevAudio);
}

document.getElementById('right_songs').addEventListener('click', () => {
    if (playlist.children.length === 0) {
        alert('No song exists; you must add songs');
        return;
    }
    playNextSong();
});

document.getElementById('left_songs').addEventListener('click', () => {
    if (playlist.children.length === 0) {
        alert('No song exists; you must add songs');
        return;
    }
    playPreviousSong();
});




function addToPlaylist(audio) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <div class="list">
            <div class="logos">
                <div class="icons">
                    <lord-icon src="https://cdn.lordicon.com/ozavgqay.json" trigger="hover" stroke="bold"></lord-icon>
                    <span>${audio}</span>
                </div>
            </div>
            <div class="remove">
                <lord-icon id="remove" src="https://cdn.lordicon.com/uxddtfbd.json" trigger="hover" stroke="bold"></lord-icon>
            </div>
        </div>
    `;

    listItem.querySelector('#remove').addEventListener('click', () => {
        listItem.remove();
    });

    listItem.querySelector('.logos').addEventListener('click', (e) => {
        if (e.target.closest('#remove')) return;
        playAudio(audio);
    });

    playlist.appendChild(listItem);
}

// Extra
// JavaScript Code


function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue, hasVisibleItems;
    input = document.getElementById('input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    hasVisibleItems = false;
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
        hasVisibleItems = true; // Mark that there is at least one visible item
      } else {
        li[i].style.display = "none";
      }
    }
  
    // Show the UL if there's input and at least one visible item
    if (input.value && hasVisibleItems) {
      ul.style.display = "block";
    } else {
      ul.style.display = "none";
    }
  }

// End


function updateAudioTime() {
    const currentTime = currentAudio.currentTime;
    document.querySelector('.time').innerText = formatTime(currentTime);

    const progressBar = document.querySelector('.full');
    const progressPercent = (currentTime / currentAudio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}


// Visualization..



let audioContext;
let analyser;
let dataArray;
let canvas;
let canvasCtx;

function initVisualization(audio) {
    // Set up the audio context and analyser
    if (audioContext) {
        audioContext.close();
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Set up the canvas for visualization
    canvas = document.getElementById('visualizationCanvas');
    canvasCtx = canvas.getContext('2d');

    // Set up the analyser properties
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // Start the visualization
    draw();
}

function draw() {
    if (!analyser || !canvasCtx) return;

    requestAnimationFrame(draw);

    // Clear the canvas
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Get the frequency data
    analyser.getByteFrequencyData(dataArray);

    // Adjust barWidth to make bars thinner and increase space between bars
    const barWidth = (canvas.width / dataArray.length) * 0.5; // Adjust multiplier to decrease thickness
    const barSpacing = 2; // Increase to add more space between bars

    let barHeight;
    let x = 0;

    // Create gradient for the bars
    const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#8a7dff');
    gradient.addColorStop(0.33, '#ff9cbe');
    gradient.addColorStop(0.66, '#70d7ff');
    gradient.addColorStop(1, '#ff70cf');

    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] * 1.5; // Adjust multiplier to make bars taller or shorter

        // Apply gradient fill
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); // Draw bar
        x += barWidth + barSpacing; // Move x position for next bar, including spacing
    }
}


