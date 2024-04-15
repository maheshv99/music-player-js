const allSong = [
  {
    id: 1,
    name: "All Ok",
    artist: "Raghu",
    img: "assets/images/popsongs/all_ok_.jpg",
    genre: "Pop Music",
    source: "assets/songs/popsongs/ALL_OK_Aagodella_Olledakke.m4a",
  },
  {
    id: 2,
    name: "Badaku-Ranaranga",
    artist: "Arjun",
    img: "assets/images/popsongs/baduku_ondu_Ranaranga.jpg",
    genre: "Pop Music",
    source: "assets/songs/popsongs/Baduku_Ondu_Ranaranga_Yuva.m4a",
  },
  {
    id: 3,
    name: "Hunnime chandira",
    artist: "janapad",
    img: "assets/images/popsongs/hunnime_chandirananga.jpg",
    genre: "Pop Music",
    source: "assets/songs/popsongs/Hunnime_chandiranag.m4a",
  },
  {
    id: 4,
    name: "Neeli Neeli Akash",
    artist: "R K G",
    img: "assets/images/popsongs/neeli_neeli_akash.jpg",
    genre: "Pop Music",
    source: "assets/songs/popsongs/Neeli_Neeli_Aakasha.m4a",
  },
  {
    id: 5,
    name: "Ninna Gungalli",
    artist: "janapad",
    img: "assets/images/popsongs/ninna_gungalli.jpg",
    genre: "Pop Music",
    source: "assets/songs/popsongs/NINNA_GUNGALLI.m4a",
  },
  {
    id: 6,
    name: "Ninna Gungalli",
    artist: "janapad",
    img: "assets/images/popsongs/ninna_gungalli.jpg",
    genre: "Rock",
    source: "assets/songs/popsongs/NINNA_GUNGALLI.m4a",
  },
];
const AllPlayList = {};
let currentPlayListName = null;
//handling toggle button
document.getElementById("toggle-button").addEventListener("click", toggleTheme);
function toggleTheme() {
  let theme = document.getElementsByTagName("body")[0];
  if (theme.getAttribute("data-theme") == "light") {
    theme.setAttribute("data-theme", "dark");
  } else {
    theme.setAttribute("data-theme", "light");
  }
}

//show songs
{
  /* <audio controls src="./assets/songs/popsongs/ALL_OK_Aagodella_Olledakke.m4a"></audio> */
}
const genreDropDownEL = document.getElementById("filterSong");
const showSongEl = document.getElementById("showAllSongs");
const currentImageEl = document.querySelector(".imageContainer img");
const currentSongNameEl = document.querySelector(".songName");
const currentSongArtistEl = document.querySelector(".songArtist");
const audionEl = document.querySelector(".songControlsContainer audio");
const currentPlaylistEl = document.querySelector(".currentPlaylist");
const allPlaylistEl = document.querySelector(".allPlaylist");
const createPlaylistBtn = document.getElementById("createPlaylist");
const playListInputText = document.getElementById("addPlayListInput");
const addtoplaylistBtn = document.getElementById("addtoplaylist");
const nextSongBtn = document.getElementById("nextSong");
const previousSongBtn = document.getElementById("previousSong");

// console.log(audionEl.src);

allSong.forEach((song) => {
  let list = [];
  document
    .querySelectorAll("#filterSong option")
    .forEach((opt) => list.push(opt.textContent));
  console.log(list.includes(song.genre));
  if (!list.includes(song.genre)) {
    let element = `<option>${song.genre}</option>`;
    genreDropDownEL.innerHTML += element;
  }
});

function showSongs(genre) {
  showSongEl.innerHTML = "";
  allSong.forEach((song) => {
    if (song.genre == genre || genre == "allsong") {
      let element = document.createElement("div");
      element.textContent = song.name;
      showSongEl.appendChild(element);
      element.addEventListener("click", () => {
        console.log(song);
        renderCurrentSong(song);
      });
    }
  });
}
//adding event for filter option
genreDropDownEL.addEventListener("change", () => {
  showSongs(genreDropDownEL.value);
});
showSongs(genreDropDownEL.value);

// rendering song to play
function renderCurrentSong(song) {
  currentSongArtistEl.textContent = song.artist;
  currentSongNameEl.textContent = song.name;
  currentImageEl.src = song.img;
  audionEl.src = song.source;
}
renderCurrentSong(allSong[0]);

// playlist
function createPlaylist() {
  const text = playListInputText.value.trim();
  playListInputText.value = "";
  let isCreated = false;
  document.querySelectorAll(".allPlaylist div").forEach((div) => {
    if (div.textContent == text) {
      isCreated = true;
    }
  });
  console.log(isCreated);
  if (text.length > 0) {
    if (!isCreated) {
      let element = document.createElement("div");
      element.textContent = text;
      allPlaylistEl.appendChild(element);
      AllPlayList[text] = [];
      console.log(AllPlayList);
      element.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        currentPlayListName = e.target.textContent;
        renderPlaylist();
      });
    } else {
      alert(`${text} => PlayList is Already Created!! 😂😂`);
    }
  }
}
createPlaylistBtn.addEventListener("click", createPlaylist);

function addToPlayList() {
  const songName = currentSongNameEl.textContent;
  const artistName = currentSongArtistEl.textContent;
  let isCreated = false;
  document.querySelectorAll(".currentPlaylist div").forEach((div) => {
    if (div.textContent.split("-")[0].trim() == songName) {
      isCreated = true;
    }
  });

  if (!isCreated) {
    if (currentPlayListName != null) {
      let parentEle = document.createElement("div");
      let ch1 = document.createElement("span");
      ch1.textContent = `${songName} - ${artistName}`;
      let ch2 = document.createElement("i");
      ch2.classList.add("fa-solid");
      ch2.classList.add("fa-trash");
      parentEle.appendChild(ch1);
      parentEle.appendChild(ch2);
      currentPlaylistEl.appendChild(parentEle);

      ch2.addEventListener("click", (e) => {
        e.target.parentNode.remove();
      });

      // currentPlaylistEl.innerHTML += element;
      AllPlayList[currentPlayListName].push({
        name: `${songName} - ${artistName}`,
        element: parentEle,
      });
      console.log(AllPlayList[currentPlayListName][0].element);
    } else {
      alert("Please Select PlayList!! 😍😍");
    }
  } else {
    alert(`${songName} => PlayList is Already Created!! 🤣🤣`);
  }
}
addtoplaylistBtn.addEventListener("click", addToPlayList);

function renderPlaylist() {
  currentPlaylistEl.innerHTML = "";
  AllPlayList[currentPlayListName].forEach((song) => {
    let element = song.element;
    currentPlaylistEl.appendChild(element);
  });
}
// next and previous button event

function handleControlsBtn(currentSong, type) {
  const details = {
    currentIndex: -1,
    nextSongIndex: -1,
    nextSongName: null,
    continue: true,
  };

  document.querySelectorAll("#showAllSongs div").forEach((ele, index) => {
    if (type == "nextsong") {
      if (ele.textContent == currentSong) {
        details.currentIndex = index + 1;
      }
      if (details.currentIndex == index) {
        details.nextSongIndex = index;
        details.nextSongName = ele.textContent;
      }
    } else {
      if (ele.textContent == currentSong) {
        details.currentIndex = index;
        details.continue = false;
      }
      if (details.continue) {
        details.nextSongIndex = index;
        details.nextSongName = ele.textContent;
      }
    }
  });
  console.log(details);
  if (details.nextSongIndex !== -1) {
    let song = allSong.find((song) => song.name == details.nextSongName);
    renderCurrentSong(song);
  }
}
//next btn event
nextSongBtn.addEventListener("click", () =>
  handleControlsBtn(currentSongNameEl.textContent, "nextsong")
);
//prevous btn event
previousSongBtn.addEventListener("click", () => {
  handleControlsBtn(currentSongNameEl.textContent, "previoussong");
});
