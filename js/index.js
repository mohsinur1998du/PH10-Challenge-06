document.getElementById("scrollButton").addEventListener("click", function () {
  document.getElementById("targetSection").scrollIntoView({
    behavior: "smooth",
  });
});

const fetchAPI = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();

  displayCard(data.pets);
};

const displayCard = (pets) => {
  const petDescription = document.getElementById("pet-description-left");
  pets.forEach((pet) => {
    const {
      petId,
      image,
      breed,
      pet_name,
      date_of_birth,
      gender,
      category,
      price,
    } = pet;
    const div = document.createElement("div");
    div.className = pet.category;
    div.innerHTML = `<div class="card bg-base-100 max-w-sm shadow-md">
        <figure class="px-2 pt-2">
          <img
            src=${image}
            alt=""
            class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title font-bold">${
            pet_name ? pet_name : "Not Available"
          }</h2>
          <p><i class="fa-solid fa-grip"></i> Breed: ${
            breed ? breed : "Not Available"
          }</p>
          <p><i class="fa-regular fa-calendar"></i> Birth: ${
            date_of_birth ? date_of_birth.slice(0, 4) : "Not Available"
          }</p>
          <p><i class="fa-solid fa-venus"></i> Gender: ${
            gender ? gender : "Not Available"
          }</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
            price ? price + "$" : "Not Available"
          }</p>
          <div class="card-actions flex justify-between">
            <button onclick="addedItems('${image}')" class="btn hover:bg-[#0E7A81] hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="btn text-[#0E7A81] font-semibold hover:bg-[#0E7A81] hover:text-white adopt-btn">Adopt</button>
            <button class="btn text-[#0E7A81] font-semibold hover:bg-[#0E7A81] hover:text-white" data-pet-id="${petId}">Details</button>
          </div>
        </div>
      </div>`;
    petDescription.appendChild(div);
  });
};

document
  .getElementById("pet-description-left")
  .addEventListener("click", function (e) {
    if (e.target.matches("button[data-pet-id]")) {
      const petId = e.target.getAttribute("data-pet-id");
      animalDetails(petId);
    }

    if (e.target.matches(".adopt-btn")) {
      animalAdopt(e); // Handle the "Adopt" button click
    }
  });

const addedItems = (photo) => {
  console.log("Clicked");
  const container = document.getElementById("pet-description-right");
  const div = document.createElement("div");
  const image = document.createElement("img");
  image.src = photo;
  image.classList = "rounded-xl";
  div.appendChild(image);
  div.classList = "px-2 pt-2";
  container.appendChild(div);
};

const showCardByCategory = (animal) => {
  const parentDiv = document.getElementById("pet-description-left");
  const children = Array.from(parentDiv.children);

  children.forEach((element) => {
    if (element.matches(".hidden")) {
      element.classList.remove("hidden");
    }
  });
  children.forEach((element) => {
    console.log(`Hello ${animal}`);
    console.log(element);
    if (element.className !== animal) {
      element.classList.add("hidden");
    } else {
      element.classList.remove("hidden");
    }
  });

  if (animal === "Bird") {
    parentDiv.classList =
      "w-4/5 flex justify-center items-center border-solid border-2 border-gray-300 rounded-xl bg-[#131313]/[0.03] py-20";
    document.getElementById("error").classList.remove("hidden");
  } else {
    parentDiv.classList =
      "w-4/5 border-solid border-2 border-gray-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 space-x-4 p-4 rounded-xl";
  }
};

const displayCategories = (animals) => {
  const container = document.getElementById("pet-header");
  animals.forEach((animal) => {
    const div = document.createElement("div");
    div.innerHTML = `<img class="w-[3.5rem] h-[2.5rem]" src='${animal.category_icon}'/>
      <p class="font-bold">${animal.category}</p>`;

    div.classList = "btn w-[40%] md:w-[45%] flex justify-center items-center";

    container.appendChild(div);

    div.addEventListener("click", () => {
      document.getElementById("spinner").style.display = "block";
      document.getElementById("pet-description-left").style.display = "none";
      document.getElementById("pet-description-right").style.display = "none";
      setTimeout(() => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("pet-description-left").style.display = "grid";
        document.getElementById("pet-description-right").style.display = "grid";
        showCardByCategory(animal.category);
      }, 2000);
    });
  });

  const p = document.createElement("p");
  p.innerHTML = "Best Deal For You";
  p.classList = "font-bold text-xl";

  const div2 = document.createElement("div");
  div2.innerText = "Sort by Price";
  div2.classList = "btn bg-[#0E7A81] rounded-lg";
  div2.id = "sortByPriceBtn";

  const container2 = document.getElementById("pet-container");

  container2.appendChild(p);
  container2.appendChild(div2);

  fetchAPI();

  const sortid = document.getElementById("sortByPriceBtn");
  sortid.addEventListener("click", () => {
    fetchAndSortByPrice();
  });
};

const categories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategories(data.categories);
};

/* 
"petId": 1,
      "breed": "Golden Retriever",
      "category": "Dog",
      "date_of_birth": "2023-01-15",
      "price": 1200,
      "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
      "gender": "Male",
      "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
      "vaccinated_status": "Fully",
      "pet_name": "Sunny" 
  */

const animalDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );

  const data = await response.json();
  console.log("Animal Details button clicked(animalDetails)");
  console.log(data);
  const {
    image,
    breed,
    category,
    date_of_birth,
    price,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
  } = data.petData;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal modal-middle">
        <div class="modal-box space-y-4">
          <img class="w-full" src= ${image} />
          <h3 class="text-lg font-bold">${
            pet_name ? pet_name : "Not Available"
          }</h3>
          <div class="flex justify-items-start space-x-20">
            <div>
              <p><i class="fa-solid fa-grip"></i> Breed: ${
                breed ? breed : "Not Available"
              }</p>
              <p><i class="fa-solid fa-venus"></i> Gender: ${
                gender ? gender : "Not Available"
              }</p>
              <p><i class="fa-solid fa-syringe"></i> Vaccinated Status: ${
                vaccinated_status ? vaccinated_status : "Not Available"
              }</p>
            </div>
            <div>
              <p><i class="fa-regular fa-calendar"></i> Birth: ${
                date_of_birth ? date_of_birth.slice(0, 4) : "Not Available"
              }</p>
              <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
                price ? price + "$" : "Not Available"
              }</p>
            </div>
          </div>
          <hr>
          <p class="font-bold text-xl">Details Information</p>
          <p>${pet_details}</p>
          <div class="modal-action">
            <form method="dialog" class="w-full">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn w-full bg-[#0E7A81]/[0.6]">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
  `;

  // my_modal_1.showModal(); won't work
  const my_modal_1 = document.getElementById("my_modal_1");
  my_modal_1.showModal();
};

const animalAdopt = (event) => {
  const container = document.getElementById("modal-adopt");
  console.log("Adopt Button Clicked(animalAdopt)");
  const adoptButton = event.target;
  adoptButton.disabled = true;
  adoptButton.innerText = "Adopted";

  container.innerHTML = `
    <dialog id="my_modal_2" class="modal text-center">
      <div class="modal-box">
      <i class="fas fa-handshake"></i>
        <h3 class="text-lg font-bold">Congrates</h3>
        <p class="py-4">Adoptation process is start for your pet</p>

        <!-- DaisyUI countdown -->
        <span class="countdown font-mono text-6xl text-center">
          <span id="countdown" style="--value: 3;"></span>
        </span>
      </div>
    </dialog>
    `;
  const my_modal_2 = document.getElementById("my_modal_2");
  my_modal_2.showModal();

  let timeLeft = 3;
  const countdownEl = document.getElementById("countdown");
  countdownEl.style.setProperty("--value", timeLeft);

  const countdownInterval = setInterval(function () {
    timeLeft--;
    countdownEl.style.setProperty("--value", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      my_modal_2.close();
    }
  }, 1000);
};

categories();

const fetchAndSortByPrice = async () => {
  /* const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${selectedCategory}`
  ); */

  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pets`
    );

    const data = await response.json();

    const pets = data.pets;

    pets.sort((x, y) => {
      const priceX = x.price ? parseFloat(x.price) : 0;
      const priceY = y.price ? parseFloat(y.price) : 0;

      return priceY - priceX;
    });

    displaySortedPets(pets);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displaySortedPets = (pets) => {
  const petDescription = document.getElementById("pet-description-left");
  petDescription.innerHTML = "";

  pets.forEach((pet) => {
    const {
      petId,
      image,
      breed,
      pet_name,
      date_of_birth,
      gender,
      category,
      price,
    } = pet;

    const div = document.createElement("div");
    div.className = pet.category;
    div.innerHTML = `
      <div class="card bg-base-100 max-w-sm shadow-md">
        <figure class="px-2 pt-2">
          <img src=${image} alt="" class="rounded-xl" />
        </figure>
        <div class="card-body">
          <h2 class="card-title font-bold">${
            pet_name ? pet_name : "Not Available"
          }</h2>
          <p><i class="fa-solid fa-grip"></i> Breed: ${
            breed ? breed : "Not Available"
          }</p>
          <p><i class="fa-regular fa-calendar"></i> Birth: ${
            date_of_birth ? date_of_birth.slice(0, 4) : "Not Available"
          }</p>
          <p><i class="fa-solid fa-venus"></i> Gender: ${
            gender ? gender : "Not Available"
          }</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
            price ? price + "$" : "Not Available"
          }</p>
          <div class="card-actions flex justify-between">
            <button onclick="addedItems('${image}')" class="btn hover:bg-[#0E7A81] hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick="animalAdopt(event)" class="btn text-[#0E7A81] font-semibold hover:bg-[#0E7A81] hover:text-white">Adopt</button>
            <button onclick="animalDetails('${petId}')" class="btn text-[#0E7A81] font-semibold hover:bg-[#0E7A81] hover:text-white">Details</button>
          </div>
        </div>
      </div>`;
    petDescription.appendChild(div);
  });
};
