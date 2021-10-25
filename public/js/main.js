const socket = io.connect();


const render = (products) => {
    const html = products.map(product => {
        return(`<article>
        <strong>${product.title}</strong>:
        <em>${product.price}</em> </article>`)
    }).join(" ")
    document.getElementById('products').innerHTML = html

}


// socket.on('products', (products) => { 
//     console.log(products)
//     render(products); 
// })
socket.on('products', function(products) { render(products); });
const form = document.getElementById('form-product')
form.addEventListener('submit', addProduct)


const addProduct = (e) => {
    e.preventDefault()
    const product = {
        title: document.getElementById('form-title').value,
        price: document.getElementById('form-price').value
    }
    socket.emit('new-product', product)
}
