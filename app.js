var currentProductPage = 1
var maxProductByPage = 7
var serachValue = ""
var filterBy = "1"
var currentColor = ""
var currentCategory = ""
var currentCollection = ""
const serachBar = document.getElementById('searchBar')
const products = document.getElementById('products')
const pagesSelector = document.getElementById('pagesSelector')

const init = () => {
 
    const colors = []


    data.forEach((product) => {
        product.colors.forEach((color) => {
            if (!colors.includes(color)) {
                colors.push(color)
            }
        })
        if (!document.getElementById('collection').innerHTML.toLowerCase().includes(product.collection)) {
            document.getElementById('collection').innerHTML += `<option value="${product.collection}">${product.collection.charAt(0).toUpperCase()+product.collection.slice(1)}</option>`
        }
        if (!document.getElementById('category').innerHTML.toLowerCase().includes(product.cathegory)) {
            document.getElementById('category').innerHTML += `<option value="${product.cathegory}">${product.cathegory.charAt(0).toUpperCase()+product.cathegory.slice(1)}</option>`
        }
        //document.getElementById('color').innerHTML += `<option>${}</option>`
    })

    colors.forEach((color) => {
        document.getElementById('color').innerHTML += `<option value="${color}">${color.charAt(0).toUpperCase()+color.slice(1)}</option>`
    })

    filtresProducts()

    if (window.matchMedia("(max-width: 500px)").matches) {
        maxProductByPage = 3
        filtresProducts()
    } else {
        maxProductByPage = 7
        filtresProducts()
    }
}

const setCurrentColor = (e) => {
    currentColor = e.value
    filtresProducts()
}
const setCurrentCategory = (e) => {
    currentCategory = e.value
    filtresProducts()
}
const setCurrentCollection = (e) => {
    currentCollection = e.value
    filtresProducts()
}

serachBar.addEventListener('input', function (evt) {
    serachValue = this.value
    filtresProducts()
});

const setFilterBy = (e) => {
    filterBy = e.value
    filtresProducts()
}

const filtresProducts = () => {
    const result = []
    
    data.forEach((product) => {
        if (product.name.toLocaleLowerCase().includes(serachValue.toLocaleLowerCase()) || serachValue === "") {
            if (product.cathegory.includes(currentCategory) || currentCategory === "")  {
                if (product.colors.includes(currentColor) || currentColor === "")  {
                    if (product.collection.includes(currentCollection) || currentCollection === "")  {
                        result.push(product)
                    }
                }
            }
        }
    })

    switch (filterBy) {
        case "1":
            break;
        case "2":
            result.sort(function(a,b) {
                return a.price - b.price
            });
            break;
        case "3":
            result.sort(function(a,b) {
                return b.price - a.price
            });
            break;
        default:
            break;
    }

    addPagesSelectorToDOM(result)
    addProductToDOM(result)
}

const makeStars = (num) => {
    var result = ""
    for (let index = 0; index < 5; index++) {
        if (index < num) {
            result += `<img src="https://cdn-icons-png.flaticon.com/512/2893/2893811.png"  />`
        } else {
            result += `<img src="https://cdn-icons-png.flaticon.com/512/2658/2658473.png"  />`
        }
        
    }

    return result
}

const createProduct = (product) => {
    if (product == null) {
        return ""
    }
    return `
    <div class="product">
        <div class="image-container">
        <div class="image" style="background-image: url(${product?.image})"></div>
        </div>
        <div class="info">
            <div class="left">
                <h3>${product?.name}</h3>
                <p class="cathegory">${product?.cathegory}</p>
                <div class="stars">${makeStars(product?.stars)}</div>
            </div>
            <div class="right">
            <div class="price">$${product?.price}</div>
            <img src="https://cdn-icons-png.flaticon.com/512/4766/4766056.png" alt="add to bag" />
            </div>
        </div>
    </div>
    `
}
const createPagesSelector = (id) => {
    return `
    <div class="pageSelector" onclick="changePage(${id})">
        ${id}
    </div>
    `
}

const addProductToDOM = (productsToAdd) => {
    var productsHTML = ""

    products.querySelectorAll('.product').forEach((product) => { product.remove() })

    const x = Math.min(productsToAdd.length, maxProductByPage) * (currentProductPage - 1);

    for (let index = x; index < Math.min(productsToAdd.length, maxProductByPage) + x; index++) {
        productsHTML += createProduct(productsToAdd[index]);
    }

    products.innerHTML += productsHTML
}




window.addEventListener("resize", () => {
    if (window.matchMedia("(max-width: 500px)").matches) {
        maxProductByPage = 3
        filtresProducts()
    } else {
        maxProductByPage = 7
        filtresProducts()
    }
})

const addPagesSelectorToDOM = (productsToAdd) => {
    var pagesSelectorHTML = ""

    pagesSelector.querySelectorAll('.pageSelector').forEach((product) => { product.remove() })

    for (let index = 0; index < productsToAdd.length / maxProductByPage; index++) {
        pagesSelectorHTML += createPagesSelector(index + 1);
    }

    pagesSelector.innerHTML += pagesSelectorHTML

    changeActiveSelectedPage()
}

const changeActiveSelectedPage = () => {
    pagesSelector.querySelectorAll('.pageSelector').forEach((p) => {
        if (p.innerHTML == currentProductPage) {
            p.classList.add('active')
        } else {
            p.classList.remove('active')
        }
    })
}

const changePage = (id) => {
    currentProductPage = id
    filtresProducts()
}



init()