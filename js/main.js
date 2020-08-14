


let GameData = (function () {
    
    // hard coded categories to create options for html select element
    const hardCodedCategories = [[,-1],['Potpourriiii', 306], ['Stupid Answers', 136], ['Sports', 42], ['American History', 780], ['Animals', 21], ['3 Letter Words', 105], ['Science', 25], ['Transportation', 103], ['U.S. Cities', 7], ['People', 442], ['Television', 67], ['Hodgepodge', 227], ['State Capitals', 109], ['History', 114], ['The Bible', 31], ['Business & Industry', 176], ['U.S. Geography', 582], ['Annual Events', 1114], ['Common Bonds', 508], ['Food', 49], ['Rhyme Time', 561], ['Word Origins', 223], ['Holidays & Observances', 622], ['Americana', 313], ['Food & Drink', 253], ['Weights & Measures', 420], ['Potent Potables', 83], ['Musical Instruments', 184], ['Bodies Of Water', 211], ['4 Letter Words', 51], ['Museums', 539], ['Nature', 267], ['Organizations', 357], ['World History', 530], ['Travel & Tourism', 369], ['Colleges & Universities', 672], ['Nonfiction', 793], ['World Capitals', 78], ['Literature', 574], ['Fruits & Vegetables', 777], ['Mythology', 680], ['U.S. History', 50], ['Religion', 99], ['The Movies', 309], ['First Ladies', 41], ['Fashion', 26], ['Homophones', 249], ['Quotations', 1420], ['Science & Nature', 218], ['Foreign Words & Phrases', 1145], ['Around The World', 1079], ['5 Letter Words', 139], ['Double Talk', 89], ['U.S. States', 17], ['Books & Authors', 197], ['Nursery Rhymes', 37], ['Brand Names', 2537], ['Familiar Phrases', 705], ['Before & After', 1800], ['Body Language', 897], ['Number, Please', 1195], ['The Old Testament', 128]]

    

    // game variables that will be manipulated by the game controller
    let gameVar = {
        pickedCategories: [], //categories that were picked
        questions: [[],[],[],[],[],[]],//each nested array represents 1 of 6 categories to choose from
        playerNames: [''], // player names
        playerScore: 0, //player scores
        difficulty: 'Easy',
        generatedQuestions: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        }
    }
    return {
        // gets the questions from the fetch function
        getQuestionsData: function (idx, id, category_id, title, question, answer, value) {
            gameVar.questions[idx].push({
                questionID: id,
                categoryID: category_id,
                category: title,
                question: question, 
                answer: answer,
                value: value
            })
            gameVar.pickedCategories[idx] = title
           
            
        },

        // empty the questions data so that new questions can be filled in and old questions get removed
        emptyData: function (idx) {
            gameVar.questions[idx] = []
        },
        cleanQuestions: function (idx, char) {
            let tempStr = ''
            gameVar.questions[idx].forEach( question => {
               
                tempStr = question.question.slice(question.question.indexOf(char, 2) + 1)
                tempStr = tempStr.slice(tempStr.indexOf(char)+1)
                question.question = tempStr.trim()
            })
            
        },
        // cleans invalid characters from answers 
        cleanInvalidCharAs: function (idx) {
            let tempStr = ''
         
            for (let i = 0; i < gameVar.questions[idx].length; i++) {
                tempStr = ''
                for (let j = 0; j < gameVar.questions[idx][i].answer.length; j++){
                    if (gameVar.questions[idx][i].answer[j] === '') {
                        tempStr += "'"
                    }else if (gameVar.questions[idx][i].answer[j] === '') {
                        tempStr += '"'
                    
                    } else if (gameVar.questions[idx][i].answer[j] === '') {
                        tempStr += '"'
                    } else if (gameVar.questions[idx][i].answer[j] === '\\') { 
                        tempStr += ''
                    }else {
                        tempStr += gameVar.questions[idx][i].answer[j]
                    }
                }
             
                gameVar.questions[idx][i].answer = tempStr
            }
        },
        // cleans invalid characters from questions
        cleanInvalidCharQs: function (idx) {
            let tempStr = ''
            for (let i = 0; i < gameVar.questions[idx].length; i++) {
                tempStr = ''
                for (let j = 0; j < gameVar.questions[idx][i].question.length; j++){
                    if (gameVar.questions[idx][i].question[j] === '') {
                     
                        tempStr += "'"
                    }else if (gameVar.questions[idx][i].question[j] === '') {
                        tempStr += '"'
                    
                    } else if (gameVar.questions[idx][i].question[j] === '') {
                        tempStr += '"'
                    }else {
                        tempStr += gameVar.questions[idx][i].question[j]
                    }
                }
                gameVar.questions[idx][i].question = tempStr
            }
        },
        // final pass through of the data to clean it up. 
        finalClean: function (arr, idx) {
            arr[idx].forEach((el, i) => {
                if (el.question === '') {
                    arr[idx].splice(i,1)
                }
            })
        },
        // generates random questions based on picked categories
        generateRandomQs: function (questions, idx, generatedQuestions, difficulty) {
            let qArr = []
            let randomIdx;
            let value;
            if (difficulty === 'Easy') {
                value = 100
            } else if (difficulty === 'Hard') {
                value = 200
            }
            while (qArr.length < 5) {
                randomIdx = Math.floor(Math.random() * questions[idx].length)
             
                if (!qArr.includes(randomIdx) && (questions[idx][randomIdx].value === value)) {
                    qArr.push(randomIdx)
                    if (difficulty === 'Easy' ) {
                        value += 100
                    } else if (difficulty === 'Hard' ) {
                        value += 200
                    }
                }
            }
            generatedQuestions[idx] = qArr
            return generatedQuestions
        },
        // fixes formating for categories to show on board, proper capitalization
        fixFormat: function (arr, idx) {
            arr[idx] = arr[idx].split(' ')
            for (let i = 0; i < arr[idx].length; i++){
                if (arr[idx][i].includes('.')) {
                    arr[idx][i] = arr[idx][i].toUpperCase()
                } else {
                    arr[idx][i] = arr[idx][i][0].toUpperCase() + arr[idx][i].slice(1)
                }
            }
            arr[idx] = arr[idx].join(' ')
        },
     
        // function to return the hard coded categories to be used by the app controller
        hardCodedCategories: function () {
            return hardCodedCategories
        },
        // returns the answers to use in app controller
        answer: function (questions, generatedQuestions, colIdx, qIdx) {
           return questions[colIdx][generatedQuestions[colIdx][qIdx]].answer
        },
        // returns the game vars to be used in app controller
        gameVars: function () {
            return gameVar
        },
        // prints game vars for debugging purposes
        print: function () {
            console.log(gameVar.questions)
        }
    }

 })();



let GameUI = (function () { 

    // an object for all the needed cached elements for dom minipulation
    const cachedRef = {
        board: document.querySelector('.board'),
        categories: document.querySelectorAll('.category'),
        questions: document.querySelectorAll('.question'),
        categorySelector: document.querySelectorAll('.select-category'),
        submit: document.getElementById('submit-btn'),
        categorySelectorContainer: document.querySelector('.category-container'),
        reset: document.getElementById('reset-btn'),
        p0Name: document.getElementById('plyr0-name'),
        p0btn: document.getElementById('plyr0-btn'),
        score: document.getElementById('score'),
        time: document.getElementById('time'),
        name: document.getElementById('name'),
        answer: document.getElementById('answer'), 
        playerNameSetting: document.querySelector('.players'),
        answerContainer: document.querySelector('.submit-answer'),
        difficulty: document.querySelector('.difficulty'),
        difficultyMsg: document.getElementById('difficulty-msg'),
        gameEnd: document.getElementById('game-end'),
        body: document.querySelector('body'),
        nameInputShow: document.getElementById('name-input')
    }

    // function that creates options to be used in html select element
    function newOps(arr) {
        return arr.map(el => new Option(el[0],el[1],true,false))
    }
 
    return {
        
        // returns the cached refs to be used by the game controller
        refs: function () {
            return cachedRef
        },
        // function that adds the options to the select inputs and renders them in the UI
        addSelection: function (arr, category) {
            newOps(arr).map((el, i) => category.add(el, i))

        },

        // renders the categories to display on board
        renderC: function (idx, categoryArray) {
            cachedRef.categories[idx].textContent = categoryArray[idx]
        },
        // renders questions for the game board
        renderQ: function (question, colIdx, qIdx, questions, generatedQuestions) {
            question.style.fontSize = '1rem'
            question.textContent = questions[colIdx][generatedQuestions[colIdx][qIdx]].question
            
        },
        // renders the game time
        renderTime: function ( sec) {
            cachedRef.time.textContent = `Time: ${sec}`
        },
        // renders the end of the game
        renderGameEnd: function (score) {
            cachedRef.board.style.display = 'none'
            cachedRef.answerContainer.style.display = 'none'
            cachedRef.gameEnd.textContent = `Congradulations! Your Score is: ${score}`
        },

        // renders the board and questions/scores based on difficulty
        renderBoard: function (difficulty) {
            let value;
            if (difficulty === 'Easy') {
                value = 100
            } else if (difficulty === 'Hard') {
                value = 200
            }
            for (let i = 0; i < 5; i++){
                cachedRef.questions.forEach(question => {
                    if (question.className[5] == i) {
                       
                        question.textContent = value
                    }
                })
                if (difficulty === 'Easy') {
                    value += 100
                } else if (difficulty === 'Hard') {
                    value += 200
                }
            }
        },

        // animates the landing page
        animateLandingPage: function () {
            anime({
                targets: [cachedRef.playerNameSetting, cachedRef.difficulty, cachedRef.categorySelectorContainer, cachedRef.submit],
                translateY: [
                    { value: -1000, duration: 0 },
                    {value: 0, duration: 1500 }
                    
                ],
                rotate: '1turn',
                duration: 800,
                delay: anime.stagger(500)
              
              });
        },
        // enlarges each individual question to be visible
        enlargeQ: function (idx, colIdx, qIdx) {
            
            if (colIdx == 0 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: 250, duration: 500 }]
                })
            }
            if (colIdx == 1 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: 150, duration: 500 }]
                })
            }
            if (colIdx == 2 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: 50, duration: 500 }]
                })
            }  if (colIdx == 3 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: -50, duration: 500 }]
                })
            }if (colIdx == 4 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: -150, duration: 500 }]
                })
            }if (colIdx == 5 && qIdx == 0) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 56, duration: 500 }],
                    translateX: [{ value: -250, duration: 500 }]
                })
            }if (colIdx == 0 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: 250, duration: 500 }]
                })
            }if (colIdx == 1 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: 150, duration: 500 }]
                })
            }if (colIdx == 2 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: 50, duration: 500 }]
                })
            }if (colIdx == 3 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: -50, duration: 500 }]
                })
            }if (colIdx == 4 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: -150, duration: 500 }]
                })
            }if (colIdx == 5 && qIdx == 1) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: 19, duration: 500 }],
                    translateX: [{ value: -250, duration: 500 }]
                })
            }if (colIdx == 0 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: 250, duration: 500 }]
                })
            }if (colIdx == 1 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: 150, duration: 500 }]
                })
            }if (colIdx == 2 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: 50, duration: 500 }]
                })
            }if (colIdx == 3 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: -50, duration: 500 }]
                })
            }if (colIdx == 4 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: -150, duration: 500 }]
                })
            }if (colIdx == 5 && qIdx == 2) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateX: [{ value: -250, duration: 500 }]
                })
            }if (colIdx == 0 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: 250, duration: 500 }]
                })
            }if (colIdx == 1 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: 150, duration: 500 }]
                })
            }if (colIdx == 2 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: 50, duration: 500 }]
                })
            }if (colIdx == 3 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: -50, duration: 500 }]
                })
            }if (colIdx == 4 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: -150, duration: 500 }]
                })
            }if (colIdx == 5 && qIdx == 3) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -19, duration: 500 }],
                    translateX: [{ value: -250, duration: 500 }]
                })
            }if (colIdx == 0 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: 250, duration: 500 }]
                })
            }if (colIdx == 1 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: 150, duration: 500 }]
                })
            }if (colIdx == 2 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: 50, duration: 500 }]
                })
            }if (colIdx == 3 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: -50, duration: 500 }]
                })
            }if (colIdx == 4 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: -150, duration: 500 }]
                })
            }if (colIdx == 5 && qIdx == 4) {
                anime({
                    targets: cachedRef.questions[idx],
                    background: '#060CE9',
                    scale: 2,
                    translateY: [{ value: -56, duration: 500 }],
                    translateX: [{ value: -250, duration: 500 }]
                })
            }
            
            
            
        },
        // shrinks the questions
        shringQ: function (idx) {
            anime({
                targets: cachedRef.questions[idx],
                scale: 1,
                translateY: [{ value: 0, duration: 500 }],
                translateX: [{ value: 0, duration: 500 }]
            })
        }


    }


})();



let GameController = (function (gD, gUI) { 
    
    // hard coded categories to create options for html select element
    const hardCodedCategories = gD.hardCodedCategories()
    
    // store gameVars to be used by the app GameController 
    let gameVars = gD.gameVars()
 

    // cached references pulled from the gameUI
    const refs = gUI.refs();

    
    //sound
    const countDown = new Audio('audio/count-down.mp3')
    const correct = new Audio('audio/yes.mp3')
    const wrong = new Audio('audio/wrong.mp3')
    const gameMusic = new Audio('audio/gamemusic.mp3')
    const congratz = new Audio('audio/congratz.mp3')
    

    // sets the options for all the select elements using the hard coded categories
    refs.categorySelector.forEach(i => gUI.addSelection(hardCodedCategories, i))

    function fetchCategory(categoryID, idx) {
     
            fetch(`http://jservice.io/api/category?id=${categoryID}`)
                .then(response => {
                   
                    // console.log(response)
                    return response.json()
                })
                .then(data => {
                    gD.emptyData(idx)
                    data.clues.forEach(clue => {
                        //initial pass through the data to delete blank questions and audio/video questions
                        if (clue.question.length > 1
                           && (!clue.question.toLowerCase().includes('audio') || !clue.question.toLowerCase().includes('video'))){
                            gD.getQuestionsData(idx, clue.id, clue.category_id, data.title, clue.question, clue.answer, clue.value)
                        }
                    })
                   
                    gD.cleanQuestions(idx, ')')
                    gD.cleanQuestions(idx, ']')
                    gD.cleanInvalidCharQs(idx)
                    gD.cleanInvalidCharAs(idx)
                    gD.finalClean(gameVars.questions, idx)
                    gameVars.generatedQuestions = gD.generateRandomQs(gameVars.questions, idx, gameVars.generatedQuestions, gameVars.difficulty)
                    gD.fixFormat(gameVars.pickedCategories, idx)
                    gUI.renderC(idx, gameVars.pickedCategories, gameVars.questions, gameVars.generatedQuestions)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }
    // variables to keep track of time and question being asked
    let timerInterval;
    let sec = 0;
    let idx = 0
    let colIdx = 0
    let qIdx = 0;
    let rowEnd = 25;
    let inputAnswerTS = 0;

    function tick() {
        sec++
        if (sec === 500 || idx === 30) {
            congratz.play()
            gUI.renderGameEnd(gameVars.playerScore)
            clearInterval(timerInterval)
            return timerInterval = null
        }
        gUI.renderTime(sec)
        if (sec === 0) {
            clearInterval(timerInterval)
        }

        gUI.enlargeQ(idx, colIdx, qIdx)
        gUI.renderQ(refs.questions[idx], colIdx, qIdx, gameVars.questions, gameVars.generatedQuestions)
      
       
        if (sec === inputAnswerTS + 20) {
            checkAnswer(colIdx, qIdx, idx)
         
        }
        
    }
 
    function startTimer() {
        clearInterval(timerInterval)
        timerInterval = setInterval(tick, 1000)
    }

    function nextQuestion() {
        colIdx++;
        refs.questions[idx].style.fontSize = '3rem'  
        if (refs.questions[idx].id === `q${rowEnd}`) {
            colIdx = 0
            qIdx++
            rowEnd++
        }
        idx++
    }

    function checkAnswer(colIdx, qIdx, idx) {
        if (refs.answer.value.toLowerCase() === gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].answer.toLowerCase()) {
            correct.play()
            gameVars.playerScore += gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].value
            refs.score.textContent = `Score: ${gameVars.playerScore}`
            gUI.shringQ(idx)
            refs.questions[idx].textContent =`Score: +${gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].value}`
            nextQuestion()
            inputAnswerTS = sec
        } else {
            wrong.play()
            gameVars.playerScore -= gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].value
            refs.score.textContent = `Score: ${gameVars.playerScore}`
            refs.questions[idx].textContent =`Score: -${gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].value}`
            gUI.shringQ(idx)
            nextQuestion()
            inputAnswerTS = sec
        }
        
        
    }

    // this function runs all the event listeners 
    function setupEvents() {

        // plays sound when clicking on the page
        refs.body.onclick = () => {
            gameMusic.volume = 0.25
            countDown.volume = .25
            wrong.volume = .25
            correct.volume = .25
            gameMusic.play()
        }

        // submits player name
        refs.p0btn.onclick = (e) => {
            gameVars.playerNames[0] = refs.p0Name.value
            refs.nameInputShow.textContent = `Name: ${gameVars.playerNames[0]}`
           
        }
        // toggles the difficulty of the game
        refs.difficulty.onclick = (e) => {
            if (e.target.id === 'easy') {
                gameVars.difficulty = 'Easy'
                gUI.renderBoard(gameVars.difficulty)
                gameVars.pickedCategories.forEach((category, i ) => {
                    if (category !== undefined) {
                        gD.generateRandomQs(gameVars.questions, i, gameVars.generatedQuestions, gameVars.difficulty)
                    }
                })
            } else if (e.target.id === 'hard') {
                gameVars.difficulty = 'Hard'
                gUI.renderBoard(gameVars.difficulty)
                gameVars.pickedCategories.forEach((category, i ) => {
                    if (category !== undefined) {
                        gD.generateRandomQs(gameVars.questions, i, gameVars.generatedQuestions, gameVars.difficulty)
                    }
                })
            }
            
            refs.difficultyMsg.textContent = `Difficulty: ${gameVars.difficulty}`
        }

        // event listener for the game board - debuging to see answers
        refs.board.onclick = (e) => {
            let colIdx = e.target.className[3]
            let qIdx = e.target.className[5]
            console.log(gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].answer)
            
            
        }
        
        // event listener for selecting categories 
        refs.categorySelector.forEach(category => category.onclick = (e) => {
            // fetches data from the api depending on the user selected category
            if (e.target.value != -1) { 
                fetchCategory(e.target.value, e.target.id[3])
            }
          
           
        })

        // checks the inputed answer
        refs.answer.addEventListener('keypress', (e) => {
            if(event.key === 13 || event.which == 13){
                checkAnswer(colIdx,qIdx, idx)
                e.target.value = ''
            }
        })

        // starts the game - waits for the countdown to finsh before game begins
        refs.submit.onclick = (e) => {
            if (gameVars.pickedCategories.length === 6 && gameVars.playerNames.length === 1 ) {
                refs.board.style.display = ''
                refs.categorySelectorContainer.style.display = 'none'
                refs.reset.style.display = ''
                refs.submit.style.display = 'none'
                refs.name.textContent = `Name: ${gameVars.playerNames[0]}`
                refs.playerNameSetting.style.display = 'none'
                refs.difficulty.style.display = 'none'
                refs.answerContainer.style.display = ''
                gUI.renderTime(sec)
                countDown.play()
                setTimeout(startTimer, 4400)
                
                
            }
            
        }  
        //resets the game 
        refs.reset.onclick = (e) => {
            document.location.reload();
        }
    }

    return {
        // starts the game
        init: function () {
            console.log('start')
            refs.difficultyMsg.textContent = `Difficulty: ${gameVars.difficulty}`
            refs.board.style.display = 'none'
            refs.reset.style.display = 'none'
            refs.answerContainer.style.display = 'none'
            gUI.animateLandingPage()
            setupEvents()
            
        }
    }

})(GameData, GameUI);

GameController.init();

