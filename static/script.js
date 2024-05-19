const chatForm = document.getElementById('chat-form');
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// отправка сообщений / send message to ai 
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  if (!message) {
    return;
  }

  const formattedMessage = message.replace(/\n/g, '<br>');

  // НУ вы поняли/clear the input field 
  messageInput.value = '';

  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: formattedMessage })
  })
  .then(response => response.json())
  .then(data => {
    // попытка сделать перенос предложений...
    //const formattedResponse = data.response.replace(/\n/g, '<br>');
	// Внешний вид сообщений / message design
    const responseHTML = `
        <div class="message-container">
            <div class="message-bubble ai">${formattedResponse}</div>
        </div>
    `;
    chatLog.innerHTML += responseHTML;
  })
  .catch(error => console.error('Error:', error));
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message !== '') {
        const messageHTML = `
            <div class="message-container">
                <div class="message-bubble user">${message}</div>
            </div>
        `;
        chatLog.innerHTML += messageHTML;
        userInput.value = '';
        sendRequestToPythonBackend(message); // отправка запроса / send request to Python
    }
});

// букенд.... заеб*** с ним /backend...
function sendRequestToPythonBackend(message) {
	fetch('/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message: message })
	})
	.then(response => response.json())
	.then(data => {
		console.log("Response Data:", data);
		const responseHTML = `
			<div class="message-container">
				<div class="message-bubble ai">${data.response}</div>
			</div>
		`;
		chatLog.innerHTML += responseHTML;
	})
	.catch(error => console.error('Error:', error));
}
