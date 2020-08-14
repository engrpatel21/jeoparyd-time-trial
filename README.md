# Jeopardy! Time Trial!
Jeopardy time trial was inspired by the jservice.io API. For this project I wanted to learn how to incorporate an API into a project and use that API to build a game. 



## Screen Shots
Game Settigns: 
![Imgur](https://i.imgur.com/hn6Xjet.png)

Game Screen: 
![Imgur](https://i.imgur.com/dxYBlx4.png)

## How to play
The game starts you on the game settings scren where the player will enter their name, set the difficulty setting and choose among popular Jeopardy categories available from the API.

The difficulty setting sets the the difficulty of the board, easy difficulty sets the question ranges from 100 to 500, hard difficulty sets teh quetsion ranges from 200 to 1000. 

Once the game starts players will see the question to answer pop out from the board and will have 10 seconds to answer the question correctly. If they guess correctly, they will recieve the points, if incorrect, the points will be deducted from their total score. The game ends when all questions have been answered or the time runs out. 

### Play the game here
[Jeopardy-Game](http://jeopardy-time-trial.surge.sh/)

## Technolgies Used

The game was used using Bootstrap 4.5.2 to help create html elements. As mentioned, the API used for this project was the jservice.io API. Sounds were obtained from: 

count down - http://freesoundeffect.net/sites/default/files/race-countdown-beeps-long-02-sound-effect-34442139.mp3

yes - 101soundboards.com

wrong - https://freesound.org/people/nofeedbak/sounds/21871/download/21871__nofeedbak__sarahbuzzer.mp3

game show music - https://assets.mixkit.co/music/download/mixkit-kidding-around-9.mp3

The font used was Luckiest Guy from Google Fonts. 

anime.js was used to animate CSS elements. 

## User Stories
As a user I would I want to be able to select a category more than once. 

As a user I would like to select between hard and easy questions. 

As a user I would like to know if I got a question right or wrong. 

## Wire Frames

![Imgur](https://i.imgur.com/Cg3Wqin.jpg)

![Imgur](https://i.imgur.com/bmH6nHK.jpg)

## Pseudo Code
// Data Module 

// game variables
* player name
* player points
* question points
* timer
* cateogories 
* clues
* answers

// data moduel methods
* calculate player points based on right/wrong answers
* host awards points
* remove picked questions from data structure
// api calls 
* categories
* clues 
* answers

----------------------------------------------------------------------------

//UI Module

// UI variables
* cached element references

// ui controller methods
*change scores
*change player names
*delete out questions
*populate questions
*populate clues
*populate answers
*show timer
*ability to bet (daily double)
*creating new options for selecting categories 


//sound controller?


----------------------------------------------------------------------------------

// App controller
* event listenrs for question picking

* collect data info from data controller to populate game board * with ui module methods
* collect inputs ui and update data with data module methods

* reset game

* game initialization

## Stretch Goals
* Better Animations
* Better Styleing
* Multiplayer support 
