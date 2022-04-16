const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable?Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  apiKey = "f4e2fa7586cf41f9842d333108c8e47c";
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Jokes API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-toSpeech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Erros Here
    console.log("whoops, error", error);
  }
}

// Event Listner
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
