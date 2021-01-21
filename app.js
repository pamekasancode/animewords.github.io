var listGroup = document.querySelector(".list-group")
var query = document.querySelector("#query")
var buttonUp = document.querySelector(".floating-button")
let mydata = []

AOS.init();

window.addEventListener("scroll", ScrollUp)

function ScrollUp() {
  buttonUp.classList.toggle("active", scrollY > 700)
  buttonUp.addEventListener("click", function() {
    window.scrollTo(0, 0)
  })

}

query.addEventListener('keyup', function(e) {
  let q = e.target.value.toLowerCase()
  let filtered = mydata.filter((quotes)=> {
    return(quotes.char.toLowerCase().includes(q) || quotes.anime.toLowerCase().includes(q))
  })
  render(filtered)
})

async function getData() {
  try {
    let res = await fetch("db.json")
    let data = await res.json()
    mydata = data.data
    render(mydata)
  } catch (er) {console.error(er)}
}

function render(data) {
  const template = data.map(quote => {
    return `
      <li data-aos="fade-up" class="list-group-item">
        <p>${quote.quote}</p>
        <p id="source">${quote.char}</p>
        <p id="anime">${quote.anime}</p>
      </li>`
    
  }).join('')
  
  listGroup.innerHTML = template
  
}

getData();

document.querySelector(".fa-instagram").addEventListener("click", function() {
  window.location = "https://instagram.com/firmansyahken"
  alert('Jangan lupa di follow Instagram mimin:v')
})
