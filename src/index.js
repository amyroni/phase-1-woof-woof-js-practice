document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(pups => {
    const filter = document.querySelector("#good-dog-filter")
    let filterOn = false; 
    if (filterOn) {
      filter.textContent = "Filter good dogs: ON";
      pups.forEach(pup => {
        if (pup.isGoodDog) { addPup(pup) }})
    } else { 
      filter.textContent = "Filter good dogs: OFF";
      pups.forEach(pup => addPup(pup))
    }
    filter.addEventListener("click", () => {
      document.querySelector("div#dog-bar").querySelectorAll("span").forEach(dog => dog.remove())
      filterOn = !filterOn;
      if (filterOn) {
        filter.textContent = "Filter good dogs: ON";
        pups.forEach(pup => {
          if (pup.isGoodDog) { addPup(pup) }})
      } else { 
        filter.textContent = "Filter good dogs: OFF";
        pups.forEach(pup => addPup(pup))
      }  
    })
  })
})

function addPup(pup) {
  const pupName = document.createElement("span");
  pupName.textContent = pup.name;
  pupName.style.cursor = "pointer";
  pupName.addEventListener("click", () => {
    const pupImg = document.createElement("img");
    pupImg.src = pup.image;
    const pupName = document.createElement("h2");
    pupName.textContent = pup.name;
    const btn = document.createElement("button");
    btn.type = "button";
    if (pup.isGoodDog) {
      btn.textContent = "Good Dog!"
    } else {
      btn.textContent = "Bad Dog!"
    }
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      pup.isGoodDog = !pup.isGoodDog;
      if (pup.isGoodDog) {
        btn.textContent = "Good Dog!"
      } else {
        btn.textContent = "Bad Dog!"
      }
      updatePup(pup);
     })
    document.querySelector("#dog-info").append(pupImg, pupName, btn);
  })
  document.querySelector("div#dog-bar").append(pupName);
}

function updatePup(pup) {
  fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({isGoodDog: !pup.isGoodDog})
  })
  .then(response => response.json())
  .then(pup => console.log(pup))
}