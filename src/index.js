document.querySelector('#athlete-form').addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  let athleteObj = {
    name: e.target.name.value,
    imageUrl: e.target.image_url.value,
    description: e.target.description.value,
    votes: 0
  }

  renderOneAthlete(athleteObj)
  submitAthlete(athleteObj)
}

function renderOneAthlete(athlete) {
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
  <h4>${athlete.name}</h4>
  <img src="${athlete.imageUrl}">
  <p>${athlete.description}</p>
  <div class="content">
  <p>
  <span class="vote-count">${athlete.votes}</span>
  <p>
  </div>
  <div class="buttons">
  <button id='vote'> Vote </button>
  </div>
  `

  card.querySelector('#vote').addEventListener('click', () => {
    athlete.votes += 1
    card.querySelector('span').textContent = athlete.votes
    updateVotes(athlete)
  })

  card.querySelector('img').addEventListener('mousedown', () => alert('Jordon or Lebron? Cast your vote below!'))

  document.querySelector('#athlete-list').appendChild(card)
}

function initialize() {
  getAllAthletes()
}
initialize()

function getAllAthletes() {
  fetch('http://localhost:3000/athlete')
    .then(res => res.json())
    .then(athleteData => athleteData.forEach(athlete => renderOneAthlete(athlete)))

}

function submitAthlete(athleteObj) {
  fetch('http://localhost:3000/athlete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(athleteObj)
  })
    .then(res => res.json())
    .then(athlete => console.log(athlete))
}

function updateVotes(athleteObj) {
  fetch(`http://localhost:3000/athlete/${athleteObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(athleteObj)
  })
    .then(res => res.json())
    .then(athlete => console.log(athlete))
}
