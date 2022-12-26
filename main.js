//スライダー
const slider = [...document.querySelectorAll(".slider img")];

let slideImageIndex = 0;

const changeSlide = () => {
  slider[slideImageIndex].classList.toggle("active");
  if (slideImageIndex >= slider.length - 1) {
    slideImageIndex = 0;
  } else {
    slideImageIndex++;
  }
  slider[slideImageIndex].classList.toggle("active");
};

setInterval(() => {
  changeSlide();
}, 2000);

//プライヤーオープン
const musicPlayerSection = document.querySelector(".player");

let clickCount = 1;

musicPlayerSection.addEventListener("click", () => {
  if (clickCount >= 2) {
    musicPlayerSection.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

//プレイヤーからホームへ戻る
const backHomeFromPlayer = document.querySelector(".player .arrow-btn");

backHomeFromPlayer.addEventListener("click", () => {
  musicPlayerSection.classList.remove("active");
});

//トラックリストへ
const trackListSection = document.querySelector(".track-list");
const menuBtn = document.querySelector(".player .menu-btn");

menuBtn.addEventListener("click", () => {
  trackListSection.classList.add("active");
});

//トラックリストからホームへ戻る
const backHomeFromTrackList = document.querySelector(".track-list .arrow-btn");

backHomeFromTrackList.addEventListener("click", () => {
  trackListSection.classList.remove("active");
});

//音楽
let currentMusic = 0;

const music = document.querySelector("#audio-src");
const soundBar = document.querySelector(".sound-bar-range");
const currentMusicName = document.querySelector(".current-track-name");
const currentMusicArtist = document.querySelector(".current-track-artist");
const coverImage = document.querySelector(".cover");
const currentMusicTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");
const track = [...document.querySelectorAll(".track")];

//コントロールパネルボタン
const forwardBtn = document.querySelector("i.fa-forward");
const backwardBtn = document.querySelector("i.fa-backward");
const playBtn = document.querySelector("i.fa-play");
const pauseBtn = document.querySelector("i.fa-pause");
const repeatBtn = document.querySelector("span.fa-redo");
const volumeBtn = document.querySelector("span.fa-volume-up");
const volumeRange = document.querySelector(".volume-range");

//再生
playBtn.addEventListener("click", () => {
  music.play();
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
});

//一時停止
pauseBtn.addEventListener("click", () => {
  music.pause();
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
});

//再生準備
const setMusic = (i) => {
  soundBar.value = 0;
  let musicListData = musicList[i];
  currentMusic = i;

  music.src = musicListData.path;

  currentMusicName.innerHTML = musicListData.name;
  currentMusicArtist.innerHTML = musicListData.artist;
  coverImage.src = musicListData.cover;

  setTimeout(() => {
    soundBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
  currentMusicTime.innerHTML = "00 : 00";
  track.forEach((item) => item.classList.remove("active"));
  track[currentMusic].classList.add("active");
};
setMusic(0);

//時間の変換
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${min} : ${sec}`;
};

//サウンドバーの操作
setInterval(() => {
  soundBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(soundBar.max)) {
    if (repeatBtn.className.includes("active")) {
      setMusic(currentMusic);
      playBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 500);

soundBar.addEventListener("change", () => {
  music.currentTime = soundBar.value;
});

//次の曲へ
forwardBtn.addEventListener("click", () => {
  if (currentMusic >= musicList.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playBtn.click();
});

//前の曲へ
backwardBtn.addEventListener("click", () => {
  if (currentMusic <= 0) {
    currentMusic = musicList.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click();
});

//リピート
repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active");
});

//音量調整
volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("active");
  volumeRange.classList.toggle("active");
});

volumeRange.addEventListener("input", () => {
  music.volume = volumeRange.value;
});

track.forEach((item, i) => {
  item.addEventListener("click", () => {
    setMusic(i);
    playBtn.click();
  });
});
