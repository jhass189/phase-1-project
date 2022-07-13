// Submit button event listener
document.querySelector('#athlete-form').addEventListener('submit', handleSubmit)

// Submit event handler
function handleSubmit(e) {
  // Prevent Default function to retain information
  e.preventDefault()
  // Template for card for user submitted information
  let athleteObj = {
    name: e.target.name.value,
    imageUrl: e.target.image_url.value,
    description: e.target.description.value,
    votes: 0
  }
  // Calls to activate render one and submit athlete function
  renderOneAthlete(athleteObj)
  submitAthlete(athleteObj)
}

// DOM Render athlete function
function renderOneAthlete(athlete) {
  // Build Athlete Card
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
  <h4>${athlete.name}</h4>
  <img src="${athlete.imageUrl}">
  <div class="content">
  <p>${athlete.description}</p>
  </div>
  <div class="btn" id="vote">
  <button> Vote </button>
  </div>
  `
  // Mouse over event listener
  card.querySelector('h4').addEventListener('mouseover', () => alert('Vote for me!'))

  // Vote button event listener
  card.querySelector('#vote').addEventListener('click', () => alert('Your vote has been cast!'))

  // Add athlete card to DOM
  document.querySelector('#athlete-list').appendChild(card)
}

// Get Data from cards and Render Athletes to the DOM
function initialize() {
  getAllAthletes()
}
initialize()

// Get all athletes function
function getAllAthletes() {
  // Fetch request to locate and pull athlete information from db.json server
  fetch('http://localhost:3000/athletes')
    .then(res => res.json())
    // Iterates over each object in athlete array to produce information for individual cards
    .then(athleteData.forEach(athlete => renderOneAthlete(athlete)))

}

// POST method operations
function submitAthlete(athleteObj) {
  // Connects to server
  fetch('http://localhost:3000/athletes', {
    // Addresses POST method
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // Stringify converts JS object to JSON string
    body: JSON.stringify(athleteObj)
  })
    // Recevies back from server, previously devliered infortmation to server
    .then(res => res.json())
    .then(athlete => console.log(athlete))
}

