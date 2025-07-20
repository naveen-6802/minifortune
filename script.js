// Fortune data
const fortunes = [
  "Trust the journey, even when the path is unclear! 🌟",
  "A surprise awaits you this week! 🎁",
  "Your kindness will return to you tenfold! 💝",
  "New opportunities are knocking at your door! 🚪",
  "Today is perfect for trying something new! ✨",
  "A meaningful conversation is coming your way! 💬",
  "Your creativity will shine brighter than ever! 🎨",
  "Someone special is thinking of you right now! 💭",
  "Good news travels fast, and it's heading to you! 📬",
  "Your patience will be rewarded soon! ⏰",
  "A small act of courage will lead to big changes! 🦋",
  "The universe is conspiring in your favor! 🌌",
  "Your smile will brighten someone's day today! 😊",
  "An unexpected friendship is about to bloom! 🌸",
  "Trust your instincts - they're guiding you well! 🧭",
  "A door you thought was closed will reopen! 🔓",
  "Your hard work is about to pay off beautifully! 🏆",
  "Love is closer than you think! 💕",
  "A creative solution will solve your current puzzle! 💡",
  "Your positive energy is contagious today! ⚡",
  "A forgotten dream is ready to be pursued! 🌙",
  "Someone will offer you exactly what you need! 🤝",
  "Your intuition is your superpower right now! 🔮",
  "A happy coincidence will make you smile! 🍀",
  "Your generosity will create a ripple effect! 🌊",
  "The perfect moment is approaching quickly! ⏳",
  "Your unique perspective is exactly what's needed! 👁️",
  "A challenge will reveal your hidden strength! 💪",
  "Serendipity is working in your favor today! 🎭",
  "Your authenticity attracts the right people! 🧲",
  "A simple pleasure will bring you great joy! 🌈",
  "Your wisdom will guide someone important! 🦉",
  "An adventure is calling your name! 🗺️",
  "Your compassion will heal an old wound! 🩹",
  "A lucky break is heading your way! 🎰",
  "Your laughter will be the best medicine today! 😄",
  "A new chapter of your story begins now! 📖",
  "Your courage will inspire others to be brave! 🦁",
  "The right words will come at the perfect time! 📝",
  "Your dreams are closer to reality than you know! 🌠",
  "A gentle reminder will arrive when you need it! 🔔",
  "Your heart knows the way forward! ❤️",
  "A beautiful memory is about to be created! 📸",
  "Your persistence will unlock a wonderful surprise! 🔑",
  "The stars are aligning for your success! ⭐",
  "Your inner light will guide you through any darkness! 🕯️",
  "A moment of clarity will change everything! 💎",
  "Your presence is a gift to those around you! 🎀",
  "The best is yet to come! 🌅",
  "Your journey is unfolding exactly as it should! 🛤️",
]

const emojis = ["🌟", "🦋", "🌸", "🍀", "✨", "🌙", "🌈", "💫", "🔮", "🎭"]
const animations = ["animate-spin", "animate-bounce", "animate-pulse", "animate-float", "animate-glow"]

// DOM elements
const fortuneBtn = document.getElementById("fortuneBtn")
const fortuneDisplay = document.getElementById("fortuneDisplay")
const dailyLimitMessage = document.getElementById("dailyLimitMessage")
const fortuneText = document.getElementById("fortuneText")
const fortuneEmoji = document.getElementById("fortuneEmoji")
const shareBtn = document.getElementById("shareBtn")
const shareText = document.getElementById("shareText")
const viewAgainBtn = document.getElementById("viewAgainBtn")

// State variables
let currentFortune = ""
let currentEmoji = ""
let currentAnimation = ""
let hasFortuneToday = false
let showFortune = false

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  checkDailyFortune()
  setupEventListeners()
})

// Event listeners
function setupEventListeners() {
  fortuneBtn.addEventListener("click", getFortune)
  shareBtn.addEventListener("click", shareToClipboard)
  viewAgainBtn.addEventListener("click", viewTodaysFortune)
}

// Check if user already has a fortune today
function checkDailyFortune() {
  const today = new Date().toDateString()
  const lastFortuneDate = localStorage.getItem("minifortune-last-date")
  const savedFortune = localStorage.getItem("minifortune-today")
  const savedEmoji = localStorage.getItem("minifortune-emoji")
  const savedAnimation = localStorage.getItem("minifortune-animation")

  if (lastFortuneDate === today && savedFortune && savedEmoji && savedAnimation) {
    hasFortuneToday = true
    currentFortune = savedFortune
    currentEmoji = savedEmoji
    currentAnimation = savedAnimation
    showDailyLimitMessage()
  }
}

// Get a new fortune
function getFortune() {
  const today = new Date().toDateString()

  if (hasFortuneToday) {
    viewTodaysFortune()
    return
  }

  // Generate random fortune, emoji, and animation
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)]

  currentFortune = randomFortune
  currentEmoji = randomEmoji
  currentAnimation = randomAnimation
  hasFortuneToday = true
  showFortune = true

  // Save to localStorage
  localStorage.setItem("minifortune-last-date", today)
  localStorage.setItem("minifortune-today", randomFortune)
  localStorage.setItem("minifortune-emoji", randomEmoji)
  localStorage.setItem("minifortune-animation", randomAnimation)

  displayFortune()
}

// Display the fortune
function displayFortune() {
  // Update button state
  fortuneBtn.textContent = "Today's Fortune Revealed"
  fortuneBtn.disabled = true

  // Update fortune display
  fortuneText.textContent = currentFortune
  fortuneEmoji.textContent = currentEmoji
  fortuneEmoji.className = `fortune-emoji ${currentAnimation}`

  // Show fortune display
  dailyLimitMessage.classList.add("hidden")
  fortuneDisplay.classList.remove("hidden")
  showFortune = true
}

// Show daily limit message
function showDailyLimitMessage() {
  fortuneBtn.textContent = "Today's Fortune Revealed"
  fortuneBtn.disabled = true
  dailyLimitMessage.classList.remove("hidden")
  fortuneDisplay.classList.add("hidden")
}

// View today's fortune again
function viewTodaysFortune() {
  displayFortune()
}

// Share fortune to clipboard
async function shareToClipboard() {
  const shareTextContent = `My MiniFortune today: ${currentFortune} ✨ Try it at https://minifortune.app!`

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(shareTextContent)
      showCopiedFeedback()
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(shareTextContent)
    }
  } catch (err) {
    // Fallback if clipboard API fails
    fallbackCopyToClipboard(shareTextContent)
  }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.position = "fixed"
  textArea.style.left = "-999999px"
  textArea.style.top = "-999999px"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand("copy")
    showCopiedFeedback()
  } catch (err) {
    alert("Share text: " + text)
  } finally {
    document.body.removeChild(textArea)
  }
}

// Show copied feedback
function showCopiedFeedback() {
  const originalHTML = shareBtn.innerHTML
  shareBtn.innerHTML = `
        <svg class="share-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20,6 9,17 4,12"/>
        </svg>
        <span>Copied!</span>
    `

  setTimeout(() => {
    shareBtn.innerHTML = originalHTML
  }, 2000)
}

// Utility function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor")
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
})

// Add keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (document.activeElement === fortuneBtn && !fortuneBtn.disabled) {
      e.preventDefault()
      getFortune()
    }
  }
})

// Add some visual feedback for button interactions
fortuneBtn.addEventListener("mousedown", function () {
  this.style.transform = "translateY(1px)"
})

fortuneBtn.addEventListener("mouseup", function () {
  this.style.transform = ""
})

fortuneBtn.addEventListener("mouseleave", function () {
  this.style.transform = ""
})

// Performance optimization: Preload Google Fonts
const fontLink = document.createElement("link")
fontLink.rel = "preload"
fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
fontLink.as = "style"
document.head.appendChild(fontLink)

// Add error handling for localStorage
function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.warn("LocalStorage not available:", e)
  }
}

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.warn("LocalStorage not available:", e)
    return null
  }
}

// Add service worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
