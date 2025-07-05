document.addEventListener("DOMContentLoaded", () => {
    const masterPlay = document.getElementById('masterPlay');
    const shuffle = document.querySelector('.shuffle');
    const seek = document.querySelector('#seek');
    const bar2 = document.querySelector('#bar2');
    const dot = document.querySelector('.dot');
    const currentStart = document.querySelector('#current-start');
    const currentEnd = document.querySelector('#current-end');
    const vol = document.querySelector('#vol');
    const vol_icon = document.querySelector('#vol-icon');
    const vol_bar = document.querySelector('.vol-bar');
    const vol_dot = document.querySelector('#vol-dot');
    const back = document.querySelector('#back');
    const next = document.querySelector('#next');

    const music = new Audio('songs/1.mp3');

    let index=1;
    const playlistPlayButtons= Array.from(document.getElementsByClassName('playlistPlay')); //ye humne playlist ke buttons ko ek array me store kiya hai
    const songCount=60; //total songs in your playlist

    //play/pause functionality with check for masterPlay

    if(masterPlay){
        masterPlay.addEventListener('click', () => {
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            } else {
                music.pause();
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
            }
        });
    }

    //playlist buttons functionality
    if(playlistPlayButtons.length > 0) {
        playlistPlayButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        index = parseInt(event.target.id);
        console.log("Clicked button index:", index);
    console.log("Current music.src:", music.src);
    console.log("Is music paused?", music.paused);

        // ✅ Reset all icons first
        playlistPlayButtons.forEach((btn) => {
            btn.classList.remove('fa-pause');
            btn.classList.add('fa-play');
        });

        // ✅ If same song and it's playing → pause it
        if (!music.paused && music.src.includes(`songs/${index}.mp3`)) {
            music.pause();

            // Set clicked button to play
            button.classList.remove('fa-pause');
            button.classList.add('fa-play');

            if (masterPlay) {
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
            }

        } else {
            // ✅ Else play clicked song
            music.src = `songs/${index}.mp3`;
            music.play();

            // Set clicked button to pause
            button.classList.remove('fa-play');
            button.classList.add('fa-pause');

            // Master button update
            if (masterPlay) {
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
            }
        }
    });
});

    }

    // update progress bar and time
music.addEventListener('timeupdate', () => {
    if (!isNaN(music.duration)) {
        // update duration display
        const min1 = Math.floor(music.duration / 60);
        const sec1 = Math.floor(music.duration % 60).toString().padStart(2, '0');
        if (currentEnd) currentEnd.innerText = `${min1}:${sec1}`;

        // update current time display
        const min2 = Math.floor(music.currentTime / 60);
        const sec2 = Math.floor(music.currentTime % 60).toString().padStart(2, '0');
        if (currentStart) currentStart.innerText = `${min2}:${sec2}`;

        // update progress bar
        const progressBar = (music.currentTime / music.duration) * 100;
        if (seek) seek.value = progressBar;
        if (bar2) bar2.style.width = `${progressBar}%`;
        if (dot) dot.style.left = `${progressBar}%`;
    }
});

// seek functionality with a check for seek
if (seek) {
    seek.addEventListener('change', () => {
        music.currentTime = (seek.value * music.duration) / 100;
    });
}

// volume control
if (vol) {
    vol.addEventListener('input', () => {
        const vol_value = vol.value;
       
        // update volume icon
if (vol_val == 0) {
    vol_icon.className = 'fa-solid fa-volume-off';
} else if (vol_val > 50) {
    vol_icon.className = 'fa-solid fa-volume-high';
} else {
    vol_icon.className = 'fa-solid fa-volume-low';
}

if (vol_bar) {
    vol_bar.style.width = `${vol_val}%`;
}
if (vol_dot) {
    vol_dot.style.left = `${vol_val}%`;
}
music.volume = vol_val / 100;
});

// back button functionality
if (back) {
    back.addEventListener('click', () => {
        index = index > 1 ? index - 1 : songCount;
        music.src = `/songs/${index}.mp3`;
        music.play();
        if () {
            // (This line is incomplete in the image; please complete it if there's more.)
        }
    });
}

    });
