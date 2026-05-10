const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

// Load voices
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = voices
    .map(
      voice =>
        `<option value="${voice.name}">
          ${voice.name} (${voice.lang})
        </option>`
    )
    .join('');
}

function speak() {
  if (!msg.text.trim()) return; // prevent empty speech

  speechSynthesis.cancel(); // restart cleanly

  const selectedVoice = voices.find(
    voice => voice.name === voicesDropdown.value
  );

  msg.voice = selectedVoice;
  speechSynthesis.speak(msg);
}

function stop() {
  speechSynthesis.cancel();
}

// Update options (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', function () {
  msg.voice = voices.find(voice => voice.name === this.value);
  speak(); // restart speech with new voice
});

options.forEach(option =>
  option.addEventListener('input', setOption)
);

speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);