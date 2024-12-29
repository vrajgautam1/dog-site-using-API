// Get the sidebar and image container elements
let sideBar = document.getElementById('sideBar');
let imageContainer = document.getElementById('imageContainer');
let loader = document.getElementById('loader');

function showLoader() {
    loader.classList.remove('d-none');
}

function hideLoader() {
    loader.classList.add('d-none');
}

const sideBarCreate = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then((result) => result.json())
        .then((res) => {
            let DogListObj = res.message;

            for (let dogBreed in DogListObj) {
                let subBreedList = DogListObj[dogBreed];
                let dropdownHTML = "";
                
                let dogName = dogBreed[0].toUpperCase() + dogBreed.slice(1)
                
                if (subBreedList.length >= 1) {
                    // Create dropdown structure
                    dropdownHTML += `
        <div class="">
            <div class="btn-group w-100">

                <button type="button" class="btn main-btn mainBtn" onclick="getDogBreedImage('${dogBreed}')">${dogName}</button>

                <button type="button" class="btn rounded-end dropdown-toggle sub-btn"
                onclick="toggleSubbreeds('${dogBreed}')" id="second-btn"></button>
            </div>
            <!-- Subbreeds Div -->
            <div class="subbreeds d-none" id="${dogBreed}">
                <div class="d-flex flex-column gap-1 py-1">`;
                    // Add sub-breeds as anchor tags
                    for (let subBreed of subBreedList) {
                        let dogSubName = subBreed[0].toUpperCase() + subBreed.slice(1);
                        dropdownHTML += `<a href="#" class="ps-4 py-1" onclick="getDogSubBreedImage('${subBreed}', '${dogBreed}')">${dogSubName}</a>`;
                    }

                    dropdownHTML += `</div></div></div>`
                    sideBar.innerHTML += dropdownHTML;
                } else {
                    // Add a button for breeds without sub-breeds
                    sideBar.innerHTML += `<button type="button" class="btn  w-100 mainBtn" onclick="getDogBreedImage('${dogBreed}')">${dogName}</button>`;
                }
            }
        });
};

sideBarCreate();

function toggleSubbreeds(id) {

    const subbreedsDiv = document.getElementById(id);
    if (subbreedsDiv) {
        subbreedsDiv.classList.toggle('d-none');
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

window.getDogBreedImage = (breedName) => {
    showLoader(); // Show loader before fetching data
    fetch(`https://dog.ceo/api/breed/${breedName}/images`)
        .then((result) => result.json())
        .then((res) => {
            let dogImgArr = res.message;
            imageContainer.innerHTML = ""; // Clear existing images
            for (let dogImg of dogImgArr) {
                imageContainer.innerHTML += `<img src="${dogImg}" width="auto" height="200" class="m-2" loading="lazy">`;
            }
        })
        .catch((error) => {
            console.error("Error fetching breed images:", error);
        })
        .finally(() => {
            hideLoader(); // Hide loader once images are loaded
        });
};


window.getDogSubBreedImage = (subBreed, dogBreed) => {
    showLoader(); 
    fetch(`https://dog.ceo/api/breed/${dogBreed}/${subBreed}/images`)
        .then((result) => result.json())
        .then((res) => {
            let dogImgArr = res.message;
            console.log(dogImgArr);
            imageContainer.innerHTML = ""; 
            for (let dogImg of dogImgArr) {
                imageContainer.innerHTML += `<img src="${dogImg}" width="auto" height="200" class="m-2" loading="lazy">`;
            }
        })
        .catch((error) => {
            console.error("Error fetching sub-breed images:", error);
        })
        .finally(() => {
            hideLoader(); 
        });
};
