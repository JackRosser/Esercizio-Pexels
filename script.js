const dataURL = "https://api.pexels.com/v1/search?query=hamsters";
const key = "8wpJm0dH7JQCZRGSdGyFOtoQgNBvY71WPCuZjxVZg99ARl1ulPB02FTE";
let rowPhotos = document.getElementById("row-photos");
const animals = [
  "dog",
  "cat",
  "bird",
  "fish",
  "horse",
  "rabbit",
  "hamster",
  "turtle",
  "snake",
  "frog",
  "elephant",
  "lion",
  "tiger",
  "bear",
  "wolf",
  "fox",
  "deer",
  "giraffe",
  "zebra",
  "kangaroo",
  "koala",
  "panda",
  "penguin",
  "dolphin",
  "whale",
  "shark",
  "octopus",
  "crocodile",
  "lizard",
  "parrot",
  "eagle",
  "owl",
  "butterfly",
  "bee",
  "spider",
  "scorpion",
  "crab",
  "lobster",
  "monkey",
  "gorilla",
  "chimpanzee",
  "rhino",
  "hippo",
  "camel",
  "donkey",
  "cow",
  "sheep",
  "goat",
  "pig",
  "chicken",
  "rooster",
  "duck",
  "goose",
  "turkey",
  "peacock",
  "swan",
  "flamingo",
  "moose",
  "buffalo",
  "bison",
  "cheetah",
  "leopard",
  "jaguar",
  "antelope",
  "lynx",
  "bat",
  "raccoon",
  "skunk",
  "hedgehog",
  "porcupine",
  "squirrel",
  "beaver",
  "otter",
  "seal",
  "walrus",
  "penguin",
  "polar bear",
  "meerkat",
  "mongoose",
  "sloth",
  "armadillo",
  "anteater",
  "puma",
  "cougar",
  "wolverine",
  "honeybadger",
  "komododragon",
  "iguana",
  "gecko",
  "chameleon",
  "tarantula",
  "centipede",
  "millipede",
  "earthworm",
  "snail",
  "slug",
  "starfish",
  "sea urchin",
  "jellyfish"
];

let randomButton = document.getElementById("random-button");
let randomUrl;

randomButton.addEventListener("click", function () {
  let randomIndex = Math.floor(Math.random() * animals.length);
  randomUrl = `https://api.pexels.com/v1/search?query=${animals[randomIndex]}`;
  console.log(randomUrl);
  randomImagesGenerator();
});

const randomImagesGenerator = function () {
  fetch(randomUrl, {
    headers: {
      Authorization: key
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((data) => {
      console.log("OGGETTO RANDOM", data);
      rowPhotos.innerHTML = "";
      data.photos.forEach((img) => {
        let col = document.createElement("div");
        col.classList = "col-md-4";
        col.innerHTML = `<div class="card mb-4 shadow-sm">
                  <img src=${img.src.medium} class="bd-placeholder-img card-img-top" />
                  <div class="card-body">
                    <h5 class="card-title">${img.alt}</h5>
                    <p class="card-text">
                      ${img.photographer}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary hide-button">Hide</button>
                      </div>
                      <small class="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>`;
        rowPhotos.appendChild(col);

        // Aggiunge l'event listener al pulsante "Hide"
        const hideButton = col.querySelector(".hide-button");
        hideButton.addEventListener("click", function () {
          col.remove();
        });
      });
    })
    .catch((err) => {
      console.log("errorissimo", err);
    });
};

const getData = function () {
  fetch(dataURL, {
    headers: {
      Authorization: key,
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((data) => {
      console.log("OGGETTO CHE HO OTTENUTO", data);
      let loadImages = document.getElementById("load-images");

      loadImages.addEventListener("click", function () {
        rowPhotos.innerHTML = "";
        data.photos.forEach((img) => {
          let col = document.createElement("div");
          col.classList = "col-md-4";
          col.innerHTML = `<div class="card mb-4 shadow-sm">
                <img src=${img.src.medium} class="bd-placeholder-img card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">${img.alt}</h5>
                  <p class="card-text">
                    ${img.photographer}
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary hide-button">Hide</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>`;
          rowPhotos.appendChild(col);

          const hideButton = col.querySelector(".hide-button");
          hideButton.addEventListener("click", function () {
            col.remove();
          });
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getData();
