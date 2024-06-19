// Creating new Play Audio 
let current_song = new Audio();
let waiter;
// Seconds to Minute_Seconds Converter
function secondsTominutesSeconds(seconds){
    if(isNaN(seconds) || seconds < 0){
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinute = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinute}:${formattedSeconds}`;
}

// Song Fetcher
async function song_fetcher(){
let folder = await fetch("http://127.0.0.1:5500/x_rated/")
let response  = await folder.text();

//  A div for storing the response
let div = document.createElement('div');
div.innerHTML = response;


// An array for storing folder splitted songs
let songs = []

// link_getter - Getting links from anchor elements
let link_getter = div.getElementsByTagName("a");

// A loop for pushing the songs onto the songs array
for (let index = 0; index < link_getter.length; index++) {
    const element = link_getter[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/x_rated/")[1]);
    }
}
return songs;
}

let playMusic = (track)=>{
    current_song.src = "/x_rated/" + track;
    current_song.play();
    play.src = './song_buttons/pause.svg';
    document.getElementById("song_name").innerHTML = track.replaceAll("%20"," ").split("(")[0];
}

// A function for displaying
let displayer = async()=>{
    // waiter - awaiting song array coming from song_fetcher
    waiter = await song_fetcher();
    
    // An array for storing the cleaned name of songs
    let fetched_song = [];

    // A loop for cleansing of songs
    for(let track of waiter){
        let splitter_a = track.split("(")[0];
        fetched_song.push(track);
    }

    // A variable for getting the ul elment from fav_songs element
    let song_list = document.getElementById("fav_songs").querySelector("ul");

    // A loop for appending the list of songs to song_list recieved from fetched_song
    for (const track of fetched_song) {
        song_list.innerHTML+=`<li>
        <div class="song_player">
                        <div class="player_img"><i class="fa-solid fa-music"></i></div>
                        <div class="player_info">
                            <div>${track.replaceAll("%20"," ")}</div>
                            <div>AK</div>
                        </div>
                        <div class="play_now">
                            <p>Play Now</p>
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div></li>`
    }

    let arr = []
    Array.from(song_list.getElementsByTagName('li')).forEach(e=>e.addEventListener('click', element=>{
        playMusic(e.querySelector('div').querySelectorAll('div')[1].querySelector('div').innerHTML);
    }))

    // Attach an event listener to play.next and prebious
    let icon_play = document.getElementById('play');
    icon_play.addEventListener('click',()=>{
        if(current_song.paused){
        current_song.play();
        play.src = './song_buttons/pause.svg';
    }
    else{
        current_song.pause();
        play.src = './song_buttons/play.svg';
    }})

    // Listen for time update event
    current_song.addEventListener("timeupdate",()=>{
        document.getElementById("song_duration").innerHTML = `${secondsTominutesSeconds(current_song.currentTime)}/${secondsTominutesSeconds(current_song.duration)}`

        document.querySelector(".circle").style.left = (current_song.currentTime / current_song.duration)*100 - 1 + "%";
    })

    // Changing seekbar
    document.querySelector(".seekbar").addEventListener('click',e=>{
        let changer = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = changer + "%";
        current_song.currentTime = ((current_song.duration)*changer)/100;
    })

    // Previous and Next 
    let previous = document.getElementById("previous");

    let next = document.getElementById("next");

    previous.addEventListener('click',()=>{
        let index = waiter.indexOf(current_song.src.split("/").slice(-1)[0]);
        if(index-1 >= 0){
        playMusic(waiter[index-1])
    }
    })

    next.addEventListener('click',()=>{
        let index = waiter.indexOf(current_song.src.split("/").slice(-1)[0]);
        let length = waiter.length;
        if(index+1 < length)
        playMusic(waiter[index+1])
    })

    document.getElementById("range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        current_song.volume = parseInt(e.target.value)/100;
    })
}

displayer()

function onclk(){
    return player
}

// taking left container out for mobile devices

let ham_burg = document.getElementById("hamburger");

ham_burg.addEventListener('click',(e)=>{
    e.stopPropagation();
    let left_cont = document.getElementById("left_container");
    left_cont.style.left = 0;

})

document.getElementById("right_container").addEventListener('click',()=>{
    document.getElementById("left_container").style.left = -100 + "%";
})

document.getElementById("vol").querySelector("i").addEventListener('mouseover',()=>{
    document.getElementById("range").style.display = "block"
})

document.getElementById("vol").querySelector("i").addEventListener('mouseout',()=>{
    document.getElementById("range").style.display = "none"
})

class Objects{
    constructor(bg_color, color){
        this.bg_color = bg_color,
        this.color = color
    }
}

let color_obj_1 = new Objects('linear-gradient(to right, cyan ,green)','rgba(63, 233, 255, 0.9)');

let color_obj_2 = new Objects('linear-gradient(to right, yellow ,white)','rgba(252, 255, 63, 0.9)');

let color_obj_3 = new Objects('linear-gradient(to right, rgb(248, 200, 242) ,rgb(155, 248, 155), rgba(255, 226, 63, 0.9))','rgba(133, 255, 63, 0.9)')

let color_obj_4 = new Objects('linear-gradient(to right, rgb(33, 253, 180) ,rgb(39, 161, 241), rgba(255, 63, 63, 0.9))', 'rgba(152, 127, 245, 0.9)')
let color_arr = [color_obj_1, color_obj_2, color_obj_3, color_obj_4];
let i = 3;
document.getElementById("nav").querySelectorAll("i")[1].addEventListener('click', ()=>{
    i--;
    document.getElementById("logo").querySelector("i").style.color = color_arr[i].color;
    document.getElementById("play_bar_img").style.backgroundImage = color_arr[i].bg_color;
    if(i==0){
        i=3;
    }
})

let j =0;
document.getElementById("nav").querySelectorAll("i")[2].addEventListener('click', ()=>{
    j++;
    document.getElementById("logo").querySelector("i").style.color = color_arr[j].color;
    document.getElementById("play_bar_img").style.backgroundImage = color_arr[j].bg_color;
    if(j==3){
        j=0;
    }
})
