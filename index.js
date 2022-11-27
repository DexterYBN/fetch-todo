let url = 'https://jsonplaceholder.typicode.com/todos';

let form = document.querySelector('.form');

let addbtn = document.querySelector('.btn');
let input = document.querySelector('.input');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    input.value = ''
})

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(element => {
            let list = document.querySelector('.list');
            let input = document.createElement('input');
            let btn = document.createElement('button');
            let div = document.createElement('div');

            btn.classList.add('dltBtn')
            div.classList.add('userList');

            btn.textContent = 'УДАЛИТЬ';
            btn.addEventListener('click', () => {
                remove(element.id, btn)
            })

            input.type = 'checkbox';
            input.addEventListener('change', () => {
                div.classList.add('patchist')
            })

            div.textContent = element.title;
            div.prepend(input);
            div.append(btn);
            list.append(div);

        })
    })

async function remove(id, node) {
    try {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            if (res.ok) {
                console.log('user removed');
            }
        })
        node.parentNode.remove()
    } catch (error) {
        error.message
    }
}

async function postList(str) {
    try {
        let res = await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: str,
                completed: false
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}

async function patchist(id, complete) {
    try {
        let res = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                completed: !complete
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}