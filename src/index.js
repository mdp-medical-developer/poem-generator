function displayPoem(response) {
  let poemEl = document.querySelector("#poem");
  poemEl.innerHTML = "";
  let tw = new Typewriter("#poem", {
    strings: response.data.answer,
    autostart: true,
    delay: 40,
  });
  tw.typeString(response.data.answer).start();
}
function generatePoem(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let poemEl = document.querySelector("#poem");

  /// ==================== API Info ===========================================
  const KEY = "bf84c5dt8ba6f1571of07a1c8e407cf3";
  let context =
    "You are a romantic poet and love to write short poems. Your mission is to generate an English 4-line and 7-syllable-per-line poem and seperate each line with a <br .>. Make sure you follow the user instructions below. Do not include a title to the poem.";
  let prompt = `User instructions: Generate an English poem about ${instructionsInput.value}`;
  const URL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${encodeURIComponent(KEY)}`;

  /// ===================== Show the poem block =================================
  poemEl.classList.remove("hidden");
  poemEl.innerHTML = `⏳ Generating an English poem about "${instructionsInput.value}. "<span id = "loading-text">...</span>`;

  let loadingTW = new Typewriter("#loading-text", {
    loop: true,
    delay: 150,
  });

  loadingTW
    .typeString(".")
    .pauseFor(100)
    .typeString(".")
    .pauseFor(100)
    .typeString(".")
    .pauseFor(100)
    .pauseFor(100)
    .typeString(".")
    .pauseFor(100)
    .typeString(".")
    .pauseFor(100)
    .deleteAll()
    .start();
  /// ===================== Fetch data ==========================================
  axios.get(URL).then(displayPoem);
}

let poemFormEl = document.querySelector("#poem-generator-form");
poemFormEl.addEventListener("submit", generatePoem);
