console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
let breedObj = {};
let allBreedsArr;

fetch(imgUrl)
    .then((resp) => resp.json())
    .then(data => addImages(data))

fetch("https://dog.ceo/api/breeds/list/all")
    .then((resp) => resp.json())
    .then((data) => {
        breedObj = data.message
        allBreedsArr = getAllBreeds(breedObj)
        createBreedsList(allBreedsArr)
    })

const ul = document.querySelector('ul');

function addImages(dataObj){
    const div = document.querySelector('div');
    const dogsArr = dataObj.message;
    dogsArr.forEach(dogImage => {
        let img = document.createElement('img');
        let imgURL = dogImage;
        img.src = imgURL;
        div.appendChild(img);
    })
}


function getAllBreeds(obj){
    
    let index = 0;
    let arr = []
    for(const [dog,subBreed] of Object.entries(obj)){
        if (subBreed.length == 0){
            arr[index] = dog;
            index++
        }
        else {
            subBreed.forEach(breed =>{ 
            arr[index] = `${dog} ${breed}`
            index++})
        }
    }
    return arr;
}


function createBreedsList(breedsArr){    
    breedsArr.forEach(dog => {
        let li = document.createElement ('li');
        li.textContent = dog;
        li.addEventListener('click', () => li.style.color = "red");
        ul.appendChild(li);
    })
}

const dropdown = document.querySelector('#breed-dropdown')
dropdown.addEventListener("change", (e) => handleSelectChange(e));

function handleSelectChange(e) {
    const selectedLetter = e.target.value;
    let selectedDogs = [];
    let indexValue = 0;
    allBreedsArr.forEach(dog =>{
        if (dog.charAt(0) == selectedLetter){
            selectedDogs[indexValue] = dog
            indexValue++;
        }
    })
    removeAllLi(ul);
    createBreedsList(selectedDogs);
}

function removeAllLi(list){
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}
