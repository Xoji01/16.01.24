

let form = document.forms.create
let cont = document.querySelector('.container')
const spaan = document.querySelector('.top')
const url = 'http://localhost:9000/users'
let todos = []

fetch(url)
    .then(res => res.json())
    .then(res => {
        reload(res)
        todos = res
    })

form.onsubmit = (e) => {
    e.preventDefault();

    let fm = new FormData(form)

    let user = { fullName: fm.get('fullName') }

    if (user.fullName === "") return

    fetch(url, {
        method: "post",
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            todos.push(res)
            reload(todos)
        })
        }


function reload(arr) {

    cont.innerHTML = ""

    for (let item of arr) {
        let todo = document.createElement('div')
        let top_div = document.createElement('div')
        let title = document.createElement('span')
        let remove_btn = document.createElement('button')
        let time = document.createElement('span')

        todo.classList.add('todo')
        top_div.classList.add('top')
        title.classList.add('title')

        title.innerHTML = item.fullName
        remove_btn.innerHTML = "x"
        remove_btn = () => {
            fetch(url + "/" + item.id, {
                method:'delete'
            })
            .then(res =>{
                if(res.status === 200 || res.status === 201){
                    cont.remove()
                }
            })
        }


        top_div.append(title, remove_btn)
        todo.append(top_div, time)
        place.append(todo)

        }
    }