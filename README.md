# CITS3403Project

[FAQ Chat](https://github.com/lainemulvay/CITS3403-Project) UWA FAQ chat system [CITS3403-Project](https://teaching.csse.uwa.edu.au/units/CITS3403/) Semester 1, 2023 
by [Yinghao Zhang](https://github.com/hznkyh) (23072214), [Vicky Cow](https://github.com/vicky-chow) (23638279), [Laine Mulvay](https://github.com/lainemulvay) (22708032) and [Murray Lewin](https://github.com/GrassTree-Muzz) (22967374)

## Features
A chat interface where a user can input messages, which are then sent to the OpenAI Chat API for a response, and the conversation is displayed in real-time.
- Account registration and login
- User authentication
- Chat history navigation
- Chat history saving
- Chat history viewing
- Account profile viewing
- Account profile and password change
- Account logout

## Design 
### Code structure 
```
app/                                  <--Main App Module-->
      chat/                           <--Chat Page functionality-->
            __init__.py               ---Initialize blueprint for chat module---
            routes.py                 ---chat/ logout/ send-text/ routes---
      history/                        <--History page functionality-->
            __init__.py               ---Initialize blueprint for history module--- 
            routes.py                 ---history/ history/<id>/ routes---
      intro/                          <--Introduction page functionality-->
            __init__.py               ---Initialize blueprint for intro module---
            routes.py                 ---/ route---
      login/                          <--Login page functionality-->
            __init__.py               ---Initialize blueprint for login module---
            routes.py                 ---login/ me/ routes---
      profile/                        <--Profile page funtionality-->
            __init__.py               ---Initialize blueprint for profile module---
            routes.py                 ---profile/ route---
      register/                       <--Regitser page functionality-->
            __init__.py               ---Initialize blueprint for register module---
            routes.py                 ---register/ route---
      static/                         <--Templates-->
            css/    
                  base_styles.css     --- styling for the base html
                  chat_styles.css     --- styling for the chat page html              
                  hist_styles.css     --- styling for the history page html
                  login_styles.css    --- styling for the intro, login, register, and profile page html
            images/   
                  UWA_Logo_Full.svg   --- UWA full logo
                  UWA_Logo_small.png  --- UWA smalllogo
            js/
                  chat.js             --- Sets up a chat interface where a user can input messages, which are then sent to the OpenAI Chat API for a response, and the conversation is displayed in real-time. Additionally, there is a functionality to send the conversation history to the server. and API
                  scripts.js          --- Implements various functionalities for a web application, including dropdown menu toggling, user authentication (login/logout), password validation, user registration, and chat history navigation.
      templates/                      <--Templates-->
            base_chat                 --- Base template for viewing of chat history
            base                      --- Base template for all pages
            chat_view                 --- Chat page template
            hist_view                 --- History page template
            intro_view                --- Introduction page template
            login_view                --- Login page template
            profile_view              --- Profile page template 
            reg_view                  --- Registration page template
            ....html
      __init__.py                     ---Initialize app---
      controller.py                   ---Functions for app models---
      model.py                        ---Database models---
management/                           <--Information record of team management-->
      Flask set up steps.txt          ---Shared instructions for project set up.---
      meeting_log.txt                 ---Meeting log---
migrations/                           <--migration folder for SQLAlchemy>
      versions/                       <--migration versions-->
tests/                                <--Unit tests-->
      functional/                     <--Test website functionality-->
            __init__.py               ---init file for pytest---
            test_chat.py              ---Test app routes functionality---
      unit/                           <--Test module functionality-->
            __init__.py               ---init file for pytest---
            test_controller.py        ---Test functions in controller.py---
            test_model.py             ---Test functions in model.py---
      __init__.py                     ---init file for pytest---
      conftest.py                     ---Fixture setup for pytest---
.gitignore                            ---Git ignore file---
app.db                                ---Database. Contains a Test user and test chat instance---
chat.py                               ---Application of chat db---
config.py                             ---configuration---
gitlog.txt                            ---Log of git commits up till 21st May 2023---
requirements.txt                      ---text file containing modules for install---
selenium_test.py                      ---Selenium test---
test.db                               ---Test database---
```

### Model representations 
```
User(
    'id', Integer, PRIMARY KEY 
    'email', String(100), UNIQUE, NOT NULL
    'first_name', String(100), NOT NULL
    'last_name', String(100), NOT NULL
    'password', String(100), NOT NULL
    'date_added', DateTime, DEFAULT=datetime.now
)

Chat(
    'id', Integer, PRIMARY KEY
    'user_id', Integer, FOREIGN KEY
    'datetime', DataTime, DEFAULT=datetime.now
)

ChatQuestions(
    'id', Integer, PRIMARY KEY
    'chat_id', Integer, FOREIGN KEY
    'content', TEXT, NOT NULL
    'timestamp', TEXT, NOT NULL
)

ChatResponse(
    'id', Integer, PRIMARY KEY
    'chat_id', Integer, FOREIGN KEY
    'content', TEXT, NOT NULL
    'timestamp' TEXT, NOT NULL
)
```

### User types 
![Anonymous](https://img.shields.io/badge/-Anonymous-black.svg)
- Can view introduction page, login page, and register page
- Can register to become an user

![Registered Users](https://img.shields.io/badge/-User-yellow.svg)
- Can login and logout using username and password
- Can ask the chat questions
- Can receive responses from the server based on questions
- Can view their individual history of past chats that have been saved
- Can view their profile page and change their password and account details 

## Testing
### Unit test coverage 
- All routes in the app
- All functions in the controller
- All functions in the model
- User register case
- User login case
- User save chat case
- User view history and chat case
- User change account details and password case
- User logout case

### Selenium test coverage
- User view all pages case
- User register case
- User login case
- User chat case
- User view history and chat case
- User change account details and password case
- User logout case

## Running the application
### Requirements
```
python 3.11.3 or above
```

If you don't have python installed, you can download it [here](https://www.python.org/downloads/)

```
OpenAI API key
```

The chatbot is based on OpenAI API, please enter your own key in the file "chat.js".

### Installation
Download the project from github. Skip this step if you have already downloaded the project.
```
$ git clone https://github.com/lainemulvay/CITS3403-Project.git
```

Navigate to the project directory.
```
$ cd CITS3403-Project
```

## For Mac/Linux
If required, create a virtual environment. Skip this and the following step if you do not wish to use a virtual environment.
```
$ python3 -m venv venv
```

Activate the virtual environment.
```
$ source venv/bin/activate
```

Download the required modules.
```
$ pip install -r requirements.txt
```

Export the flask app.
```
$ export FLASK_APP=chat.py
```

## For Windows
If required, create a virtual environment. Skip this and the following step if you do not wish to use a virtual environment.
```
> py -3 -m venv venv
```

Activate the virtual environment.
```
> venv\Scripts\activate

if prompt says "cannot be loaded because running scripts is disabled on this system", run the following command, then try again:
> Set-ExecutionPolicy Unrestricted -Scope Process
```

Download the required modules.
```
> pip install -r requirements.txt
```

Export the flask app.
```
> setx FLASK_APP "chat.py"
```

## Launch
### For Mac/Linux and Windows
```
$ flask run
```
## Test
Before running the tests, launch the application (using 'flask run') and ensure that the application is running on port 5000. Otherwise selenium tests will not work.  
To run tests, run the following command in the root directory of the project:
```
python -m pytest -v
```

To view the coverage report, run the following command in the root directory of the project:
```
python -m pytest --cov=app
```

To run only the selenium tests, run the following command in the root directory of the project:
```
$ python selenium_test.py
```

Note that selenium test will pass on mac but not windows, due to different chrome implementations on the warning for empty field.

## Libraries Used
- [Sweet Alert](https://sweetalert2.github.io/) - Used for displaying alerts to the user. Approved

## Acknowledgment
- [CITS3403 Lecture material](https://teaching.csse.uwa.edu.au/units/CITS3403/) by Dr Tim French
- [FLASK MEGA tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) by Miguel Grinberg
