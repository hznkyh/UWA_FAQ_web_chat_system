const API_KEY = '' // apikey from openai

const form = document.getElementById('input-form');
const mytextInput = document.getElementById('chat-input-message');
const responseTextarea = document.getElementById('response');

// Scroll to bottom of responseTextarea
function scrollToBottom() {
    var div = document.getElementById('response');
    div.scrollTop = div.scrollHeight;
  }

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Display Input message
    console.log('Input: ' + mytextInput.value)
    const timestamp = new Date().toLocaleString('en-US', { hour12: true });
    const newMessage = document.createElement('div');
    newMessage.innerHTML = '<p class="message-content">' + mytextInput.value + '</p><p class="message-timestamp">' + timestamp + '</p>';
    newMessage.classList.add('message', 'message-input');
    responseTextarea.appendChild(newMessage);

    // Scroll to bottom of responseTextarea
    scrollToBottom();
    
    const mytext = mytextInput.value.trim(); // remove unnecessary white spaces
    mytextInput.value = []; // clear mytextInput field

    // Delay for 0.5 second for realism
    await new Promise(r => setTimeout(r, 500));
    // Display Loading message
    const loading = document.createElement('div');
    loading.innerHTML = 'typing...';
    loading.classList.add('message', 'message-response');
    loading.id = 'loading';
    responseTextarea.appendChild(loading);

    // Scroll to bottom of responseTextarea
    scrollToBottom();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });
            if (response.ok) {
                // Remove loading message
                const loading = document.getElementById('loading');
                loading.remove();

                const data = await response.json();
                const messageContent = data.choices[0].message.content;
                console.log('Response: ' + messageContent)
                const timestamp = new Date().toLocaleString('en-US', { hour12: true });
                const newMessage = document.createElement('div');
                newMessage.innerHTML = '<p class="message-content">' + messageContent + '</p><p class="message-timestamp">' + timestamp + '</p>';
                newMessage.classList.add('message', 'message-response');
                responseTextarea.appendChild(newMessage);

                // Scroll to bottom of responseTextarea
                scrollToBottom();
            } 
            else {
                // Remove loading message
                const loading = document.getElementById('loading');
                loading.remove();
                
                const newMessage = document.createElement('div');
                newMessage.innerHTML = '<p class="message-content"> It looks like you are asking questions too frequently. Please take a moment to gather your thoughts, and then feel free to ask again.</p><p class="message-timestamp">' + timestamp + '</p>';
                newMessage.classList.add('message', 'message-response');
                responseTextarea.appendChild(newMessage);

                responseTextarea.value = 'Error';
            }
        } 

        catch (error) {
            console.log("test");
            console.log(error);
            responseTextarea.value = 'Error';
        }
    }
})

form.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.querySelector('.submit-button').click();
    }
  });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.chat-inputfield').focus();
});


function sendText() {
    var inputfield = document.getElementById('input-container');
    var savebtn = document.getElementById('save-button');

    var questionsDivs = document.getElementsByClassName('message-input');
    var questions = []
    for (var i = 0; i < questionsDivs.length; i++) {
        questions.push(questionsDivs[i].innerText);
    }

    var responsesDivs = document.getElementsByClassName('message-response');
    var responses = []
    for (var i = 1; i < responsesDivs.length; i++) {
        responses.push(responsesDivs[i].innerText);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-text/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
        inputfield.remove();
        savebtn.disabled = true;
        Swal.fire({
            icon: 'success',
            title: 'Your chat is saved',
            confirmButtonText: 'Start a new chat',
            showDenyButton: true,
            denyButtonColor: '#b3b3b3',
            denyButtonText: 'Go to History page',
          }).then((result) => {
            if (result.isConfirmed) {
                // refresh chat page
                window.location.href = '/chat';
            } else if (result.isDenied) {
                // go to history page
                window.location.href = '/history';
            }
          })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'There is no message',
                confirmButtonText: 'Start chat',
              })
        }
    };

    var data = JSON.stringify({ questions: questions, responses: responses});
    xhr.send(data);
}


