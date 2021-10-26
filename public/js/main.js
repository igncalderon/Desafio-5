const socket = io.connect();


const addProduct = (e) => {
    e.preventDefault()
    const product = {
        title: document.getElementById('form-title').value,
        price: document.getElementById('form-price').value,
        thumbnail: document.getElementById('form-thumbnail').value
    }
    socket.emit('new-product', product)
}
const render = (products) => {
    const productsTr = products.map(product => {
        return(`
        <tr>
        <th>${product.title}</th>:
        <th>${product.price}</th> 
        <th><img src="${product.thumbnail}"/></th> 
        </tr>
        `)
    }).join(" ")
    const tableTr = (`
    <tr>
    <th>Titulo</th>
    <th>Precio</th>
    <th>Imagen</th>
  </tr>`)
    document.getElementById('table-form').innerHTML = tableTr + productsTr

}


// socket.on('products', (products) => { 
//     console.log(products)
//     render(products); 
// })
socket.on('products', function(products) { render(products); });
const form = document.getElementById('form-product')
form.addEventListener('submit', addProduct)


