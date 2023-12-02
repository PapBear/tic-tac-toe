let data = {
  input: {
    inputArea: null,
    markerCount: null,
    areaTicTacToe: [
      [], [], [],
      [], [], [],
      [], [], []
    ]
  },
  screen: 1,
  notificationShow: false,
  playerTurn: 1,
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
      resultInput.innerHTML = `${value}`;
      data.input.markerCount = Number(value)
    }
  });
}

function addAllEventListener() {
  inputAreaListener()
  inputMarkerListener()
}

function checkDirection(firstIndex, secondIndex, value) {
  return data?.input?.areaTicTacToe?.[firstIndex]?.[secondIndex] === value
}

function checkAllSide(firstIndex, secondIndex) {
  let currentPlacement = data?.input?.areaTicTacToe[firstIndex][secondIndex]
  const winnerContainer = document.getElementsByClassName('tictactoe__winner')[0]
  const winnerElement = document.getElementsByClassName('tictactoe__winner-modal-winner')[0]

  let count = 0
  let directionList = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]

  for (let i = 0; i < directionList.length; i++) {
    count = 0
    for (let j = 0; j < data?.input?.markerCount; j++) {
      if (checkDirection(Number(firstIndex - (directionList[i][0] * j)), Number(secondIndex - (directionList[i][1] * j)), currentPlacement)) {
        count += 1
      }


      if (count === data?.input?.markerCount) {
        winnerContainer.style.visibility = 'initial'
        winnerElement.innerHTML = `Tic Tac Toe Winner: ${currentPlacement} Player`
        break;
      }
    }

    if (count === data?.input?.markerCount) {
      break;
    }
  }
}

function setGameListener() {
  const table = document.getElementsByClassName('tictactoe__table')[0]
  table.style.gridTemplateColumns = `repeat(${data?.input?.inputArea},minmax(0,1fr))`
  table.innerHTML = ""

  const firstLine = document.getElementsByClassName('tictactoe__turn-player-line_one')[0]
  const secondLine = document.getElementsByClassName('tictactoe__turn-player-line_two')[0]

  table.addEventListener('click', function (event) {
    if (event.target.tagName === 'DIV') {
      let divId = event.target.id;
      if (divId) {
        const firstIndex = divId.split("-")[1].split(",")[0]
        const secondIndex = divId.split("-")[1].split(",")[1]

        if (data.input.areaTicTacToe[firstIndex][secondIndex] !== '') {
          return
        }

        if (data.playerTurn === 1) {
          document.getElementById(divId).innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png" alt="Close" title="Close" width="44" height="44">'

          firstLine.style.width = '0%'
          secondLine.style.width = '100%'
          firstLine.style.opacity = 0
          secondLine.style.opacity = 100

          data.playerTurn = 2
          data.input.areaTicTacToe[firstIndex][secondIndex] = 'X'
        } else {
          document.getElementById(divId).innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/481/481078.png" alt="Dry clean" title="Dry clean" width="44" height="44">'

          firstLine.style.width = '100%'
          secondLine.style.width = '0%'
          firstLine.style.opacity = 100
          secondLine.style.opacity = 0

          data.playerTurn = 1
          data.input.areaTicTacToe[firstIndex][secondIndex] = 'O'
        }

        checkAllSide(firstIndex, secondIndex)
      }
    }
  });
}
// =========================================================== //


// Global Function //
function playGameValidation() {
  if (!data?.input?.inputArea || !data?.input?.markerCount || data?.input?.inputArea < 3 || data?.input?.markerCount < 3) {
    return false
  }

  return true
}

function resetGame() {
  data = {
    input: {
      inputArea: null,
      markerCount: null,
      areaTicTacToe: [
        [], [], [],
        [], [], [],
        [], [], []
      ]
    },
    screen: 1,
    notificationShow: false,
    playerTurn: 1,
  }

  const errorElement = document.getElementsByClassName('tictactoe__notification')[0]
  errorElement.style.opacity = 0

  const winnerContainer = document.getElementsByClassName('tictactoe__winner')[0]
  winnerContainer.style.visibility = 'hidden'

  const firstElementInterface = document.getElementsByClassName('tictactoe__interface-one')[0]
  const secondElementInterface = document.getElementsByClassName('tictactoe__interface-two')[0]

  firstElementInterface.style.opacity = 100
  secondElementInterface.style.opacity = 0

  firstElementInterface.style.zIndex = 2
  secondElementInterface.style.zIndex = 1

  const selectedInput = document.getElementById("inputArea");
  const resultInput = document.getElementById("inputAreaResult");

  selectedInput.value = null
  resultInput.innerHTML = ''

  const selectedInputMarker = document.getElementById("inputMarkerCount");
  const resultInputMarker = document.getElementById("inputMarkerCountResult");

  selectedInputMarker.value = null
  resultInputMarker.innerHTML = ''
}

function showNotification(type, message) {
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
  errorElement.style.opacity = 100

  // Hide the notification
  setTimeout(() => {
    data.notificationShow = false
    errorElement.style.opacity = 0
  }, 3000)
}

function setArray() {
  data.input.areaTicTacToe = []
  for (let i = 0; i < (data?.input?.inputArea); i++) {
    data.input.areaTicTacToe.push([])
    for (let j = 0; j < (data?.input?.inputArea); j++) {
      data.input.areaTicTacToe[i].push('')
    }
  }
}

function setData() {
  const table = document.getElementsByClassName('tictactoe__table')[0]
  table.style.gridTemplateColumns = `repeat(${data?.input?.inputArea},minmax(0,1fr))`
  table.innerHTML = ""

  setGameListener()
  setArray()

  for (let i = 0; i < (data?.input?.inputArea); i++) {
    for (let j = 0; j < (data?.input?.inputArea); j++) {
      table.innerHTML += `
      <div id=tictacbox-${i},${j} class="tictactoe__table-box"></div>
    `
    }
  }
}

function setTable() {
  const table = document.getElementsByClassName('tictactoe__table')[0]
  table.innerHTML = ""
}

function playGame() {
  if (!playGameValidation()) {
    showNotification('error', 'Please fill all input correctly')
    return
  }

  if (data?.input?.markerCount > data?.input?.inputArea) {
    showNotification('error', 'Marker count must be lower than input area')
    return
  }

  const firstElementInterface = document.getElementsByClassName('tictactoe__interface-one')[0]
  const secondElementInterface = document.getElementsByClassName('tictactoe__interface-two')[0]

  firstElementInterface.style.opacity = 0
  secondElementInterface.style.opacity = 100

  firstElementInterface.style.zIndex = 1
  secondElementInterface.style.zIndex = 2

  setData()
}
// =========================================================== //


// Mounted Section //
// Call all function in mounted
// =========================================================== //
function mounted() {
  addAllEventListener()
}

window.addEventListener('DOMContentLoaded', function () {
  mounted()
});
// =========================================================== //