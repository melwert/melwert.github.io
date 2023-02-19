const glowLabel = document.getElementById('glow-label')
const shadowLabel = document.getElementById('shadow-label')

const shadowLengthScale = 0.1

glowLabel.onmousemove = updateEffects

function updateEffects(e) {
  const mousePos = getMousePosition(e)
  updateLight(mousePos)
  updateShadow(mousePos)
}

function updateLight(mousePos) {
  shadowLabel.style.setProperty('--x', mousePos.x + 'px')
  shadowLabel.style.setProperty('--y', mousePos.y + 'px')
}

function updateShadow(mousePos) {
  const shadowLengths = calcShadowLengths(mousePos)
  shadowLabel.style.setProperty('--x-shadow', - shadowLengths.xLength + 'px')
  shadowLabel.style.setProperty('--y-shadow', - shadowLengths.yLength + 'px')
}

function calcShadowLengths(mousePos) {
  const radAngle = calcShadowAngle(mousePos)
  const distance = calcShadowDistanceScaled(mousePos); 

  return {
    xLength: Math.round(distance * Math.cos(radAngle)),
    yLength: Math.round(distance * Math.sin(radAngle)),
  }
}

function calcShadowAngle(mousePos) {
  return Math.atan2(mousePos.y, mousePos.x).toFixed(2); 
}

function calcShadowDistanceScaled(mousePos) {
  const distance = calcDistanceToOrigin(mousePos)
  return Math.round(distance * shadowLengthScale)
}

function calcDistanceToOrigin(mousePos) {
  return Math.sqrt(Math.pow(mousePos.x, 2) + Math.pow(mousePos.y, 2))
}

function getMousePosition(e) {
  return {
    x: e.pageX - window.innerWidth/2,
    y: e.pageY - window.innerHeight/2,
  }
}
