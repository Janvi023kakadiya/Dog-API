let list = document.getElementById('list');
let dogimage = document.getElementById('dogImg');

const getList = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(res => res.json())
        .then(data => {
            const breedList = data.message;
            let firstBreed = null;
            for (let breed in breedList) {
                let breedName = breed.charAt(0).toUpperCase() + breed.slice(1); 
                if (!firstBreed) {
                    firstBreed = breed; 
                }
                if (breedList[breed].length == 0) {
                    list.innerHTML += `<li onclick="return listImage('${breed}', this)" class="text-white">${breedName}</li>`;
                } else {
                    let dogsub = "<ol>";
                    for (let subBreed in breedList[breed]) {
                        let subBreedName = breedList[breed][subBreed].charAt(0).toUpperCase() + breedList[breed][subBreed].slice(1);
                        dogsub += `<li class="text-white" onclick="return listImage('${breedList[breed][subBreed]}', this)">${subBreedName}</li>`;
                    }
                    dogsub += "</ol>";
                    list.innerHTML += `<li>${breedName} ${dogsub}</li>`;
                }
            }
            if (firstBreed) {
                listImage(firstBreed, list.querySelector('li')); 
            }
        })
        .catch(err => console.log(err));
}

const listImage = (breed, elem) => {
    let allItems = document.querySelectorAll('.side-bar li');
    allItems.forEach(item => item.classList.remove('active'));
    if (elem) elem.classList.add('active');

    fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(res => res.json())
        .then(data => {
            let images = data.message;
            dogimage.innerHTML = "";
            images.forEach((img) => {
                dogimage.innerHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <div class="dog-frame">
                        <img src="${img}" alt="${breed}">
                    </div>
                </div>`;
            });
        })
        .catch(err => console.log(err));
}
getList();
