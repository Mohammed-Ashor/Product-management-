//colors
let spanOne = document.getElementById("one")
let spanTwo = document.getElementById("two")

spanOne.onclick = function() {
    document.body.style.backgroundColor = "#222"
    spanTwo.classList.remove("active")
    spanOne.classList.add("active")
    title.style.backgroundColor = "#111"
    taxes.style.backgroundColor = "#111"
    ads.style.backgroundColor = "#111"
    discount.style.backgroundColor = "#111"
    count.style.backgroundColor = "#111"
    catergory.style.backgroundColor = "#111"
    price.style.backgroundColor = "#111"
    search.style.backgroundColor = "#111"


    title.style.color = "white"
    taxes.style.color = "white"
    ads.style.color = "white"
    discount.style.color = "white"
    count.style.color = "white"
    catergory.style.color = "white"
    price.style.color = "white"
    search.style.color = "white"
}


spanTwo.onclick = function() {
    document.body.style.backgroundColor = "#8d8c8c"
    spanOne.classList.remove("active")
    spanTwo.classList.add("active")
    title.style.backgroundColor = "#c3b5b5"
    taxes.style.backgroundColor = "#c3b5b5"
    ads.style.backgroundColor = "#c3b5b5"
    discount.style.backgroundColor = "#c3b5b5"
    count.style.backgroundColor = "#c3b5b5"
    catergory.style.backgroundColor = "#c3b5b5"
    price.style.backgroundColor = "#c3b5b5"
    search.style.backgroundColor = "#c3b5b5"
    document.body.style.color = "black"

    title.style.color = "black"
    taxes.style.color = "black"
    ads.style.color = "black"
    discount.style.color = "black"
    count.style.color = "black"
    catergory.style.color = "black"
    price.style.color = "black"
    search.style.color = "black"
    
    
}



//colors







let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let catergory = document.getElementById("catergory")
let submit = document.getElementById("submit")


let mood = "create"
let temp

// get total

function getTotal() {
    if(price.value != "" ) {
        let result = (+price.value + +taxes.value + +ads.value )- +discount.value 
        total.innerHTML = result
        total.style.backgroundColor = "#040"
    } else {
        total.innerHTML = ""
        total.style.backgroundColor = "rgb(194, 0, 0)"
    }
}
// create product
// save localstorage


let dataPro = []
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = []
}
submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes: taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catergory:catergory.value.toLowerCase(),
    }
    
// count
    if(title.value !== "" && price.value !== "" && catergory !== "" && newPro.count < 100) {
        if(mood === "create") {
            if(newPro.count > 1) {
                for(let i =0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[temp] = newPro
            mood = "create"
            submit.innerHTML = "Create"
            count.style.display = "block"
        }
    }
    
    
    localStorage.setItem("product", JSON.stringify(dataPro))
    clearData()
    showData()
}



// clear inputs after creation 

function clearData() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    catergory.value = ""
}
// read
showData()
function showData() {
    getTotal()
    let table =""
    for(let i =0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catergory}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        
        `
    }
    document.getElementById("tbody").innerHTML = table
    let btnDelete = document.getElementById("deletAll")
    if(dataPro.length > 0) {
        btnDelete.innerHTML = `
        <td><button onclick="deletAll()">Delete All(${dataPro.length})</button></td>
        
        `
    } else {
        btnDelete.innerHTML = ""
    }
}

// delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

// delete all 
function deletAll() {
    dataPro.splice(0)
    localStorage.clear()
    showData()

}



// update

function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = "none"
    submit.innerHTML = "Update"
    catergory.value = dataPro[i].catergory
    mood = "update"
    temp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search

let searchMood = "title"
function getSearchMood(id) {
    let search = document.getElementById("search")
    if(id === "searchTitile") {
        searchMood = "title"
        search.placeholder = "Search By Title"
    } else {
        searchMood = "category"
        search.placeholder = "Search By category"
    }
    search.focus()
    search.value = ""
    showData()
}



function searchData(value) {
    let table = ""
    if(searchMood == "title") {
        for(let i=0; i< dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catergory}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    
                    `
            }
        }
    }else {
        for(let i=0; i< dataPro.length; i++) {
            if(dataPro[i].catergory.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catergory}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    
                    `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table
}



// clean data

