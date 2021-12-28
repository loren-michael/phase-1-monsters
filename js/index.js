
// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    let page = 1;
    const fwdButton = document.getElementById('forward');
    const backButton = document.getElementById('back');
    const monsterContainer = document.getElementById('monster-container');
    const formContainer = document.getElementById('create-monster')


    const monsterForm = document.createElement("form")
    monsterForm.innerHTML = `
        <label>Name</label>
        <input type="text" id="monster-name"/>
        <label>Age</label>
        <input type="number" id="monster-age"/>
        <label>Description</label>
        <input type="text" id="monster-description"/>
        <input type="submit" id="monster-submit" value="Create Monster"/>
    `
    formContainer.append(monsterForm);

    const monsterSubmit = document.getElementById('monster-submit');

    monsterSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById('monster-name').value,
                age: document.getElementById('monster-age').value,
                description: document.getElementById('monster-description').value
            })
        })
        .then(resp => resp.json()
        )
        monsterForm.reset()
    })


    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then (resp => resp.json())
    .then (monsters => {
        monsters.forEach((monster) => {
            monsterContainer.append(renderMonster(monster))
        })
    })

backButton.addEventListener('click', () =>{
    if (page > 1) {
        page -= 1;
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then (resp => resp.json())
        .then (monsters => {
            monsterContainer.innerHTML = '';
            monsters.forEach((monster) => {
                monsterContainer.append(renderMonster(monster))
            })
        })} else if (page = 1) {
            alert("No monsters here!")
        }
    })

fwdButton.addEventListener('click', () => {
    page += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then (resp => resp.json())
        .then (monsters => {
            if (monsters.length === 0) {
                page -= 1;
                alert("No monsters here!")
            } else {
                monsterContainer.innerHTML = '';
                monsters.forEach((monster) => {
                    monsterContainer.append(renderMonster(monster))
                }
            )}
        })
    })
})



// Functions

function renderMonster(monster) {
    const monsterDiv = document.createElement('div');
    monsterDiv.innerHTML = `
        <h1>${monster.name}</h1>
        <h4>Age: ${monster.age}</h4>
        <p>Description: ${monster.description}</p>
    `;
    return monsterDiv;
}



//✅  When the page loads, show the first 50 monsters.

//✅ Each monster's name, age, and description should be shown.

//✅ Above your list of monsters, you should have a form to create a new monster.

//✅ You should have fields for name, age, and description, and a 'Create Monster Button'.

//✅ When you click the button, the monster should be added to the list and saved in the API.

//✅ At the end of the list of monsters, show a button.

//✅ When clicked, the button should load the next 50 monsters and show them.