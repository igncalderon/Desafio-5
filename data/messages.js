const messages = []

const getMessages = () => messages

const saveMessage = (message) => {
    messages.push(message)
}

module.exports = {
    getMessages,
    saveMessage
}