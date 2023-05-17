# CITS3403Project

[Note](https://github.com/lainemulvay/CITS3403-Project) FAQ chat system [CITS3403-Project](https://teaching.csse.uwa.edu.au/units/CITS3403/) semester 1, 2023 
by [Murray Lewin](https://github.com/GrassTree-Muzz) (22967374), [Laine Mulvay](https://github.com/lainemulvay) (22708032), [Vicky Cow](https://github.com/vicky-chow) (23638279) and [Hank Zhang](https://github.com/hznkyh) (23072214)

## Features


- A Question and Response box are provided where the user can access the Open AI API and ask it any question, where a response willbe recieved.

## Design 
### Code structure 
```
app/                                      <--Main App Module-->
      assessment/                         <--Package User Assessment-->
                __init__.py               ---initialize blueprint for assessment module---
                forms.py                  ---assessment form---
                routes.py                 ---assessment submission/feedback/view routes---

      auth/                               <--Package User Login-->
                __init__.py               ---initialize blueprint for login module--- 
                forms.py                  ---login form---
                routes.py                 ---authentication view route---

      index/                              <--Package Main functionality-->
                __init__.py               ---initialize blueprint for index module---
                routes.py                 ---User view routes---

      register/                           <--Package Register-->
                __init__.py               ---initialize blueprint for register module---
                forms.py                  ---register form---
                routes.py                 ---register view route---

      static/                             
                css/    
                js/
                          note.js         ---Note rendering functionality useing VexFlow---
                          assessment.js   ---Note rendering for assessment module useing VexFlow---
                          timer.js        ---Timed test functionality---
                          formattime.js   ---Reformat utc time---
                          validate.js     ---Form validation--

      templates/                          <--Templates-->
                content/                   
                imports/
                profile/
                quiz/
                ....html

      __init__.py                         ---Blueprint registration and creating app object---
      controller.py                       ---CURD and Ajax response---
      model.py                            ---user and submission model---

config.py                                 ---configuration---
sidenote.py                               ---Application---
seleniumTest.py                           ---User test---
test.py                                   ---Unittest---
    
```
### Model representations 
```
users(
    'id' Integer, PRIMRARY KEY AUTOINCRIMENT NOT NULL
    'username' String(100), UNIQUE NOT NULL
    'password' String(96), NOT NULL
    'email' String(128), UNIQUE NOT NULL
    'firstname' String(130), NOT NULL
    'lastname' String(130), NOT NULL
    'lastLogin' DateTime,
    'isActive' Boolean,
    'isAdmin' Boolean,
    'noteHighScore' Integer,
    'KeyHighScore' Integer,
)

submission(
    'id' Integer, PRIMRARY KEY AUTOINCRIMENT NOT NULL
    'createdAt' DateTime, NOT NULL
    'markedAt' DateTime,
    'feedback' Boolean,
    'totalmark' Integer,
    'difficulty' String(30), NOT NULL
    'passed' Boolean,
    'creater_id' FOREIGNKEY, REFERENCES users("id") NOT NULL
)

answer(
    'id' Integer, PRIMRARY KEY AUTOINCRIMENT NOT NULL
    'answerSeq' Integer, NOT NULL
    'submittedAnswer' String(400), NOT NULL
    'feedback' String(400),
    'markreceived' Boolean,
    'submissionId' FOREIGNKEY, REFERENCES submission("id") NOT NULL
)
```
### User types 
![Anonymous](https://img.shields.io/badge/-Anonymous-black.svg)
- Can view introduction 
- Can register to become an user

![Registed Users](https://img.shields.io/badge/-User-yellow.svg)
- Can login and logout useing username and password
- Can view provided content
- Can create submissions 
- Can compelete Timed assessments
- Can view feedback on performance/assessments
- Can view global user performance on timed assessments

![Admin Users](https://img.shields.io/badge/-Admin-blue.svg)
- Can login and logout useing username and password
- Can delete users
- Can provide feedback* on a submission
- Can view useage statistic 

### Submission type 
![Compeleted Submission](https://img.shields.io/badge/Sub-Compeleted-orange.svg)  
A user can chose to compelete and submit assessment at desired difficulty.
Automark result will be avliable after submission. 

![Marked Submission](https://img.shields.io/badge/Sub-Marked-greed.svg)  
Manuel feedback become visible to users once the marker have submitted the feedback. 

## Project Management 

* Planing phase  

      > Inital planing were carried out to outline the content, scope and workflow. 
      > Estimation were made on required framework, library and implimentation time.
      
* Agile Methodology 

      > Scope of each iterations were outlined based on the analysis of requirements constructed from user storys.
      > Determine functionalities that needs to be delivered. 

* Implimentation phase

      > Writing code.

* Testing

      > Basic unittest were automated and carried out at each iteration.
## Testing
### Unit test coverage 
- ***CURD operation*** on user and submission model 
- User ***login*** and ***registration*** control mechanism and validation
- Submission control and validation 
- Auto marking 

### Selenium test coverage
- User register case
- User Login case
- User submission case

## Install
```
$ sudo apt install python3
$ sudo apt install python3-pip
$ sudo apt-get install python3-setuptools
$ sudo apt install python3-flask
$ git clone https://github.com/kurapikaaaa/CITS3403Project.git
$ pip3 install -r requirements.txt
$ export FLASK_APP=sidenote.py
```
## Launch
```
$ flask run
```
## Unittest
```
$ python3 -W ignore test.py
```
## Selenium Test
```
$ export DRIVER='**PATH_TO_WEB_DRIVER**'
$ python3 -W ignore seleniumTest.py
```
## Libraries Used
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [VexFlow](https://github.com/0xfe/vexflow)
- [GoogleFont](https://fonts.google.com/specimen/Zilla+Slab#standard-styles)

## Acknowledgment
- [CITS3403 Lecture material](https://teaching.csse.uwa.edu.au/units/CITS3403/) by Dr Tim French
- [FLASK MEGA tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) by Miguel Grinberg
