document.addEventListener('DOMContentLoaded', () => {
    const registeredDogs = document.querySelector("#table-body")
    const dogForm = document.querySelector("#dog-form")

    function handleSubmit(e) {
        //e.preventDefault()
        let dogObj = {
            id: dogForm.dataset.id,
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value,
        }

        updateDogName(dogObj)
    }

    dogForm.addEventListener("submit", handleSubmit)
    
    function fetchDogs() {
        fetch(`http://localhost:3000/dogs`)
            .then(response => response.json())
            .then(data => {
                data.forEach(dog => renderDogs(dog))
            })
            .catch(error => console.log(error))
    }

    function updateDogName (dogObj) {
        console.log(dogObj)
        fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(dogObj),
        })
        .then(response => response.json())
        .then(data => {
            dogForm.innerHTML= ""
            console.log(data)
        })
        .catch(error => console.log(error))
    }

    function renderDogs(dogInfo) {
        // console.log(dogInfo)
        const dogEntry = document.createElement("tr")
        dogEntry.dataset.id = dogInfo.id
        dogEntry.innerHTML = `
            <td>${dogInfo.name}</td>
            <td>${dogInfo.breed}</td>
            <td>${dogInfo.sex}</td>
            <td>
                <button class="edit-dog">Edit Dog</button>
            </td>
        `
        registeredDogs.appendChild(dogEntry)
    }

    function editDog() {
        registeredDogs.addEventListener("click", (e) => {
            if (e.target.classList.contains("edit-dog")) {
                const row = e.target.closest("tr")
                const cells = row.querySelectorAll("td")
                const id = row.dataset.id
                const name = cells[0].textContent
                const breed = cells[1].textContent
                const sex = cells[2].textContent
                dogForm.name.value = name
                dogForm.breed.value = breed
                dogForm.sex.value = sex
                dogForm.setAttribute('data-id', id)
            }
        })
    }

    //initialize 
    function init() {
        fetchDogs()
        editDog()
    }

    init()
})