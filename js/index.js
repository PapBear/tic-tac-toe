let data = {
  input: {
    inputArea: null,
    markerCount: null
  }
}


// Listener Section //
// =========================================================== //
function inputAreaListener() {
  const selectedInput = document.getElementById("inputArea");
  const resultInput = document.getElementById("inputAreaResult");

  selectedInput.addEventListener("change", (event) => {
    const value = event.target.value

    if (value < 3) {
      resultInput.innerHTML = 'Minimum amount is 3'
      data.input.inputArea = null
    } else {
      resultInput.innerHTML = `${value} x ${value}`;
      data.input.inputArea = Number(value)
    }
  });
}

function inputMarkerListener() {
  const selectedInput = document.getElementById("inputMarkerCount");
  const resultInput = document.getElementById("inputMarkerCountResult");
  
  selectedInput.addEventListener("change", (event) => {
    const value = event.target.value

    if (value < 3) {
      resultInput.innerHTML = 'Minimum amount is 3'
      data.input.markerCount = null
    } else {
      resultInput.innerHTML = `${value} x ${value}`;
      data.input.markerCount = Number(value)
    }
  });
}

function addAllEventListener() {
  inputAreaListener()
  inputMarkerListener()
}
// =========================================================== //


// Global Function //
function playGameValidation() {
  if (!data?.input?.inputArea || !data?.input?.markerCount || data?.input?.inputArea < 3 || data?.input?.markerCount < 3) {
    return false
  }

  return true
}

function playGame() {
  console.log(playGameValidation())
}
// =========================================================== //


// Mounted Section //
// Call all function in mounted
// =========================================================== //
function mounted() {
  addAllEventListener()
}

window.addEventListener('DOMContentLoaded',function () {
  mounted()
});
// =========================================================== //