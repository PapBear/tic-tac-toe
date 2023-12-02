let data = {
  input: {
    inputArea: null,
    markerCount: null,
  },
  notificationShow: false
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

function setInterface() {

}

function showNotification (type, message) {
  const errorElement = document.getElementsByClassName('tictactoe__notification')[0]
  const errorElementText = document.getElementsByClassName('tictactoe__notification')[0]

  switch (type) {
    case 'error':
      errorElement.style.backgroundColor = '#F2DEDF'
      errorElement.style.color = '#984C52'
      errorElementText.innerHTML = `${message}`
      break

    case 'success':
      errorElement.style.backgroundColor = '#6EBD7D'
      errorElement.style.color = '#FFFFFF'
      errorElementText.innerHTML = `${message}`
      break
  }

  if (data.notificationShow === true) {
    return
  }

  data.notificationShow = true
  errorElement.style.visibility = 'initial'

  // Hide the notification
  setTimeout(() => {
    data.notificationShow = false
    errorElement.style.visibility = 'hidden'
  }, 3000)
}

function playGame() {
  if (!playGameValidation()) {
    showNotification('error', 'Please fill all input correctly')
  }
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