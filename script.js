console.log("Welcome to JS");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterplay = document.getElementById('masterplay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let masterplaysong = document.getElementById('masterplaysong');

let song = [
    {songName: "Dil mubarakh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dil kou karar", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Thoda thhoda", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "tere bina", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Unstopable", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = song[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = song[i].songName;
});

// Handle play/pause
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplaysong.innerText = song[songIndex].songName;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterplaysong.innerText = song[songIndex].songName;
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log("timeupdate");
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    // console.log(progress);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (ProgressBar.value * audioElement.duration)/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e);
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterplaysong.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    masterplaysong.innerText = song[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.currentTime = 0;
    audioElement.play();
    masterplaysong.innerText = song[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    
})