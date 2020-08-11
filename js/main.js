


let GameData = (function () {
    
    // hard coded categories to create options for html select element
    const hardCodedCategories = [[,-1],['Potpourriiii', 306], ['Stupid Answers', 136], ['Sports', 42], ['American History', 780], ['Animals', 21], ['3 Letter Words', 105], ['Science', 25], ['Transportation', 103], ['U.S. Cities', 7], ['People', 442], ['Television', 67], ['Hodgepodge', 227], ['State Capitals', 109], ['History', 114], ['The Bible', 31], ['Business & Industry', 176], ['U.S. Geography', 582], ['Annual Events', 1114], ['Common Bonds', 508], ['Food', 49], ['Rhyme Time', 561], ['Word Origins', 223], ['Holidays & Observances', 622], ['Americana', 313], ['Food & Drink', 253], ['Weights & Measures', 420], ['Potent Potables', 83], ['Musical Instruments', 184], ['Bodies Of Water', 211], ['4 Letter Words', 51], ['Museums', 539], ['Nature', 267], ['Organizations', 357], ['World History', 530], ['Travel & Tourism', 369], ['Colleges & Universities', 672], ['Nonfiction', 793], ['World Capitals', 78], ['Literature', 574], ['Fruits & Vegetables', 777], ['Mythology', 680], ['U.S. History', 50], ['Religion', 99], ['The Movies', 309], ['First Ladies', 41], ['Fashion', 26], ['Homophones', 249], ['Quotations', 1420], ['Science & Nature', 218], ['Foreign Words & Phrases', 1145], ['Around The World', 1079], ['5 Letter Words', 139], ['Double Talk', 89], ['U.S. States', 17], ['Books & Authors', 197], ['Nursery Rhymes', 37], ['Brand Names', 2537], ['Familiar Phrases', 705], ['Before & After', 1800], ['Body Language', 897], ['Number, Please', 1195], ['The Old Testament', 128]]

    

    // game variables that will be manipulated by the game controller
    let gameVar = {
        pickedCategories: [], //categories that were picked
        questions: [[],[],[],[],[],[]],//each nested array represents 1 of 6 categories to choose from
        playerNames: [], // player names
        playerScores: [], //player scores
        timeInterval: null,
        clock: 0,
        generatedQuestions: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        },
        checkCategories: null
    }
    return {

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
        checkCategories: function (categories) {
            let obj = {}
            categories.forEach((category, idx) => {
                if (!obj[idx] && category !== null) obj[idx] = category
            });
            return obj
            
        },
        finalClean: function (arr, idx) {
            arr[idx].forEach((el, i) => {
                if (el.question === '') {
                    arr[idx].splice(i,1)
                }
            })
        },


        generateRandomQs: function (questions, idx, generatedQuestions) {
            let qArr = []
            console.log(idx)
            let randomIdx;
            let valueLow = 100;
            let valueHigh = 200;
            while (qArr.length < 5) {
                randomIdx = Math.floor(Math.random() * questions[idx].length)
             
                if (!qArr.includes(randomIdx) && (questions[idx][randomIdx].value === valueLow || questions[idx][randomIdx].value === valueHigh)) {
                    qArr.push(randomIdx)
                    valueLow += 100
                    valueHigh += 200
                }
            }
            generatedQuestions[idx] = qArr
            return generatedQuestions
        },
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
        cleanAnsewrs: function (idx) {
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
        tick: function (timer, timerInterval) {
            timer++
            if (timer === 0) {
                clearInterval(timerInterval)
            }
            console.log(timer)
        },
        startTimer: function (tick,timerInterval) {
            clearInterval(timerInterval)
            timerInterval = setInterval(tick, 1000)
        },
        // function to return the hard coded categories to be used by the app controller
        hardCodedCategories: function () {
            return hardCodedCategories
        },

        gameVars: function () {
            return gameVar
        },
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
        players: document.querySelector('.players'),
        categorySelector: document.querySelectorAll('.select-category'),
        col0: document.querySelectorAll('.col0'),
        col1: document.querySelectorAll('.col1'),
        col2: document.querySelectorAll('.col2'),
        col3: document.querySelectorAll('.col3'),
        col4: document.querySelectorAll('.col4'),
        col5: document.querySelectorAll('.col5'),
        submit: document.getElementById('submit-btn'),
        categorySelectorContainer: document.querySelector('.category-container'),
        reset: document.getElementById('reset-btn'),
        p0Name: document.getElementById('plyr0-name'),
        p0btn: document.getElementById('plyr0-btn'),
        score0: document.getElementById('sp0'),
        time: document.getElementById('time')
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
        renderC: function (idx, categoryArray) {
            cachedRef.categories[idx].textContent = categoryArray[idx]
        },
        renderQ: function (question, colIdx, qIdx, questions, generatedQuestions) {
            
            question.textContent = questions[colIdx][generatedQuestions[colIdx][qIdx]].question
            
        },
        renderTime: function (hr, min, sec) {
            cachedRef.time.textContent = `Time: ${hr}:${min}:${sec}`
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
                        if (clue.question.length > 3
                           && (!clue.question.toLowerCase().includes('audio') || !clue.question.toLowerCase().includes('video'))){
                            gD.getQuestionsData(idx, clue.id, clue.category_id, data.title, clue.question, clue.answer, clue.value)
                        }
                    })
                   
                    gD.cleanQuestions(idx, ')')
                    gD.cleanQuestions(idx, ']')
                    gD.cleanInvalidCharQs(idx)
                    gD.cleanAnsewrs(idx)
                    gameVars.checkedCategories = gD.checkCategories(gameVars.pickedCategories)
                    gameVars.generatedQuestions = gD.generateRandomQs(gameVars.questions, idx, gameVars.generatedQuestions)
                    gD.finalClean(gameVars.questions, idx)
                    console.log(gameVars.generatedQuestions)
                })
                .then(() => {
                    gD.fixFormat(gameVars.pickedCategories, idx)
                    gUI.renderC(idx, gameVars.pickedCategories, gameVars.questions, gameVars.generatedQuestions)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }

    let timerInterval;
    let hr, min, sec = 0;
    let idx = 0
    let colIdx = 0
    let qIdx = 0;
    let rowEnd = 25;

    function tick() {
        sec++
        if (sec === 0) {
            clearInterval(timerInterval)
        }

        gUI.renderTime(hr, min, sec)
        if (sec % 10 === 0) {
            gUI.renderQ(refs.questions[idx], colIdx, qIdx, gameVars.questions, gameVars.generatedQuestions)
            
            colIdx++;
            
            if (refs.questions[idx].id === `q${rowEnd}`) {
                colIdx = 0
                qIdx++
                rowEnd++
            }
            idx++
            if (sec === 300) {
                clearInterval(timerInterval)
                return timerInterval = null
               }
        }
    }
 
    function startTimer() {
        clearInterval(timerInterval)
        timerInterval = setInterval(tick, 100)
    }

    // this function runs all the event listeners 
    function setupEvents() {

        refs.p0btn.onclick = (e) => {
        
            gameVars.playerNames[0] = refs.p0Name.value
            console.log(gameVars.playerNames)
        }
  

        // event listener for the game board
        refs.board.onclick = (e) => {
            let colIdx = e.target.className[3]
            let qIdx = e.target.className[5]
                // console.log(gameVars.questions[colIdx][gameVars.generatedQuestions[colIdx][qIdx]].answer)
            console.log(e.target)
            gUI.renderQ(e.target, colIdx, qIdx, gameVars.questions, gameVars.generatedQuestions)
        }
        
        // event listener for selecting categories 
        refs.categorySelector.forEach(category => category.onclick = (e) => {
            
      
            // fetches data from the api depending on the user selected category
            if (e.target.value != -1) { 
                fetchCategory(e.target.value, e.target.id[3])
            }
           
        })

        refs.submit.onclick = (e) => {
            if (gameVars.pickedCategories.length === 6 && gameVars.playerNames.length === 1) {
                refs.board.style.display = ''
                refs.categorySelectorContainer.style.display = 'none'
                refs.reset.style.display = ''
                refs.submit.style.display = 'none'
                startTimer()
            }
            
        }  
        refs.reset.onclick = (e) => {
            refs.board.style.display = 'none'
            refs.categorySelectorContainer.style.display = ''
            refs.submit.style.display = ''
            refs.reset.style.display = 'none'
            refs.categorySelector.forEach(category => {
                category.selectedIndex = 0
            })
            gameVars.questions = [[], [], [], [], [], []]
            gameVars.pickedCategories = []
            refs.questions.forEach(question => {
                question.innerHTML = ''
            })
        }
    }

    return {
        // starts the game
        init: function () {
            console.log('start')
            // refs.categorySelector.forEach((category,idx) => {
            //     fetchCategory(category.value, idx )
            // })
            refs.board.style.display = ''
            refs.reset.style.display = 'none'
            setupEvents();
        }
    }

})(GameData, GameUI);

GameController.init();

