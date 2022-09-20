const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}


// tell me a joke passing in audio
function tellMe(joke) {
  VoiceRSS.speech({
    key: '1ecbfa2c1ffe47bbb515005c5dd9b645',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}




// get jokes from jokeAPI
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log('whoops', error);
  }
}
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);