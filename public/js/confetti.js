const confettiCount = 40
const sequinCount = 10

const gravityConfetti = 0.3
const gravitySequins = 0.55
const dragConfetti = 0.075
const dragSequins = 0.02
const terminalVelocity = 3

const button = document.getElementById('button')
var disabled = false
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let cx = ctx.canvas.width / 2
let cy = ctx.canvas.height / 2

let confetti = []
let sequins = []

const colors = [
  { front : '#f64fff', back: '#9617ab' }, // Purple
  { front : '#20f2f7', back: '#1a6af7' }, // Light Blue
  { front : '#80db1c', back: '#4c851d' }  // Darker Green
]

randomRange = (min, max) => Math.random() * (max - min) + min

initConfettoVelocity = (xRange, yRange) => {
  const x = randomRange(xRange[0], xRange[1])
  const range = yRange[1] - yRange[0] + 1
  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
  if (y >= yRange[1] - 1) {
    y += (Math.random() < .25) ? randomRange(1, 3) : 0
  }
  return {x: x, y: -y}
}

function Confetto() {
  this.randomModifier = randomRange(0, 99)
  this.color = colors[Math.floor(randomRange(0, colors.length))]
  this.dimensions = {
    x: randomRange(5, 9),
    y: randomRange(8, 15),
  }
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/4, canvas.width/2 + button.offsetWidth/4),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  }
  this.rotation = randomRange(0, 2 * Math.PI)
  this.scale = {
    x: 1,
    y: 1,
  }
  this.velocity = initConfettoVelocity([-9, 9], [6, 11])
}
Confetto.prototype.update = function() {
  this.velocity.x -= this.velocity.x * dragConfetti
  this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity)
  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
  
  this.position.x += this.velocity.x
  this.position.y += this.velocity.y

  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)    
}

function Sequin() {
  this.color = colors[Math.floor(randomRange(0, colors.length))].back,
  this.radius = randomRange(1, 2),
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/3, canvas.width/2 + button.offsetWidth/3),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  },
  this.velocity = {
    x: randomRange(-6, 6),
    y: randomRange(-8, -12)
  }
}
Sequin.prototype.update = function() {
  this.velocity.x -= this.velocity.x * dragSequins
  this.velocity.y = this.velocity.y + gravitySequins
  
  this.position.x += this.velocity.x
  this.position.y += this.velocity.y   
}

initBurst = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto())
  }
  for (let i = 0; i < sequinCount; i++) {
    sequins.push(new Sequin())
  }
}

// draws the elements on the canvas
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x)
    let height = (confetto.dimensions.y * confetto.scale.y)
    
    ctx.translate(confetto.position.x, confetto.position.y)
    ctx.rotate(confetto.rotation)

    confetto.update()

    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
    
    ctx.fillRect(-width / 2, -height / 2, width, height)
    
    ctx.setTransform(1, 0, 0, 1, 0, 0)

    if (confetto.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
    }
  })

  sequins.forEach((sequin, index) => {  
    ctx.translate(sequin.position.x, sequin.position.y)
    
    sequin.update()
    
    ctx.fillStyle = sequin.color
    
    ctx.beginPath()
    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.setTransform(1, 0, 0, 1, 0, 0)

    if (sequin.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight)
    }
  })

  confetti.forEach((confetto, index) => {
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1)
  })
  sequins.forEach((sequin, index) => {
    if (sequin.position.y >= canvas.height) sequins.splice(index, 1)
  })

  window.requestAnimationFrame(render)
}

clickButton = () => {
  if (!disabled) {
    disabled = true
    button.classList.add('loading')
    button.classList.remove('ready')
    setTimeout(() => {
      button.classList.add('complete')
      button.classList.remove('loading')
      setTimeout(() => {
        window.initBurst()
        // setTimeout(() => {
        //   // Reset button so user can select it again
        //   disabled = false
        //   button.classList.add('ready')
        //   button.classList.remove('complete')
        // }, 4000)
      }, 320)
    }, 1800)
  }
}

resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  cx = ctx.canvas.width / 2
  cy = ctx.canvas.height / 2
}

window.addEventListener('resize', () => {
  resizeCanvas()
})

document.body.onkeyup = (e) => {
  if (e.keyCode == 13 || e.keyCode == 32) {
    clickButton()
  }
}

textElements = button.querySelectorAll('.button-text')
textElements.forEach((element) => {
  characters = element.innerText.split('')
  let characterHTML = ''
  characters.forEach((letter, index) => {
    characterHTML += `<span class="char${index}" style="--d:${index * 30}ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`
  })
  element.innerHTML = characterHTML
})

render()