let ytPlayer;
function extractVideoId(link) {
  // Accepts standard YouTube URLs and share links
  let idMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return idMatch ? idMatch[1] : null;
}

function loadVideo() {
  let link = document.getElementById('yt-link').value;
  let vid = extractVideoId(link);
  if (!vid) {
    alert("Invalid YouTube link: Please paste a valid link!");
    return;
  }
  let embedUrl = `https://www.youtube.com/embed/${vid}?enablejsapi=1&autoplay=1&controls=1&rel=0`;
  document.getElementById('yt-player').src = embedUrl;
}

function changeSpeed() {
  let player = document.getElementById('yt-player');
  let speed = parseFloat(document.getElementById('speed-select').value);
  // Try using postMessage for YouTube iframe API
  player.contentWindow.postMessage(JSON.stringify({
    "event": "command",
    "func": "setPlaybackRate",
    "args": [speed]
  }), "*");
}
