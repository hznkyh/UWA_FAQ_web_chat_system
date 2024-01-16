const API_KEY = ''; // apikey from OpenAI

const form = document.getElementById('input-form');
const mytextInput = document.getElementById('chat-input-message');
const responseTextarea = document.getElementById('response');

// Scroll to bottom of responseTextarea
function scrollToBottom() {
  var div = document.getElementById('response');
  div.scrollTop = div.scrollHeight;
}

// Function to perform the query
async function performQuery(query) {
  try {
    const response = await fetch('/perform_query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    });

    if (response.ok) {
      const data = await response.json();
      return data.response;
    } else {
      console.error('Error1: ' + response.statusText);
      return 'Error1: ' + response.statusText;
    }
  } catch (error) {
    console.error('Error2: ' + error);
    return 'Error2: ' + error;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Display Input message
  console.log('Input: ' + mytextInput.value);
  const timestamp = new Date().toLocaleString();
  const newMessage = document.createElement('div');
  newMessage.innerHTML = '<p class="message-content">' + mytextInput.value + '</p><p class="message-timestamp">' + timestamp + '</p>';
  newMessage.classList.add('message', 'message-input');
  responseTextarea.appendChild(newMessage);

  // Scroll to bottom of responseTextarea
  scrollToBottom();

  const mytext = mytextInput.value.trim(); // remove unnecessary white spaces
  mytextInput.value = ''; // clear mytextInput field

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
      const response = await performQuery(mytext);
      // Remove loading message
      const loading = document.getElementById('loading');
      loading.remove();

      console.log('Response: ' + response);
      const newMessage = document.createElement('div');
      newMessage.innerHTML = '<p class="message-content">' + response + '</p><p class="message-timestamp">' + timestamp + '</p>';
      newMessage.classList.add('message', 'message-response');
      responseTextarea.appendChild(newMessage);

      // Scroll to bottom of responseTextarea
      scrollToBottom();
    } catch (error) {
      console.error('Error3: ' + error);
      responseTextarea.value = 'Error3: ' + error;
    }
  }
});

//OLD chat.js CODE

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
    xhr.open('POST', '/send-text', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
        }
    };

    var data = JSON.stringify({ questions: questions, responses: responses});
    xhr.send(data);

    // Reload page
    location.reload();
}


