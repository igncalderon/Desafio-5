const socket = io.connect();

const addMessage = (e) => {
    e.preventDefault()
    const date = new Date();
    const formatDate = (date)=>{
    let formatted_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    return formatted_date;
}
    const message = {
        message: document.getElementById('form-message').value,
        email: document.getElementById('form-email').value,
        time: formatDate(date)
    };
    socket.emit('new-message', message);
}

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
const renderMessages = (messages) => {
    const html = messages.map((message) => {
        return(`
            <div>
                <strong>${message.email}</strong>:
                <em>${message.message}</em> 
                <em>${message.time}</em>
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
    return false
}

// socket.on('products', (products) => { 
//     console.log(products)
//     render(products); 
// })
socket.on('products', function(products) { render(products); });

socket.on('messages', function(messages) { renderMessages(messages); })
const form = document.getElementById('form-product')
const formMessage = document.getElementById('form-message')


form.addEventListener('submit', addProduct)
formMessage.addEventListener('submit', addMessage)



