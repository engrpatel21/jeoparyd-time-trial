


let GameData = (function () {
    
    // hard coded categories to create options for html select element
    const hardCodedCategories = [['Potpourriiii', 306], ['Stupid Answers', 136], ['Sports', 42], ['American History', 780], ['Animals', 21], ['3 Letter Words', 105], ['Science', 25], ['Transportation', 103], ['U.S. Cities', 7], ['People', 442], ['Television', 67], ['Hodgepodge', 227], ['State Capitals', 109], ['History', 114], ['The Bible', 31], ['Business & Industry', 176], ['U.S. Geography', 582], ['Annual Events', 1114], ['Common Bonds', 508], ['Food', 49], ['Rhyme Time', 561], ['Word Origins', 223], ['Holidays & Observances', 622], ['Americana', 313], ['Food & Drink', 253], ['Weights & Measures', 420], ['Potent Potables', 83], ['Musical Instruments', 184], ['Bodies Of Water', 211], ['4 Letter Words', 51], ['Museums', 539], ['Nature', 267], ['Organizations', 357], ['World History', 530], ['Travel & Tourism', 369], ['Colleges & Universities', 672], ['Nonfiction', 793], ['World Capitals', 78], ['Literature', 574], ['Fruits & Vegetables', 777], ['Mythology', 680], ['U.S. History', 50], ['Religion', 99], ['The Movies', 309], ['First Ladies', 41], ['Fashion', 26], ['Homophones', 249], ['Quotations', 1420], ['Science & Nature', 218], ['Foreign Words & Phrases', 1145], ['Around The World', 1079], ['5 Letter Words', 139], ['Double Talk', 89], ['U.S. States', 17], ['Books & Authors', 197], ['Nursery Rhymes', 37], ['Brand Names', 2537], ['Familiar Phrases', 705], ['Before & After', 1800], ['Body Language', 897], ['Number, Please', 1195], ['The Old Testament', 128]]

    

    // game variables that will be manipulated by the game controller
    let gameVar = {
        pickedCategories: [null, null, null, null, null, null], //categories that were picked
        questions: [[],[],[],[],[],[]],//each nested array represents 1 of 6 categories to choose from
        playerNames: [], // player names
        playerScores: [], //player scores
        questionTimer: null // timer variable 
    }
    return {

        getQuestionsData: function (idx, id, category_id, title, question, answer, invalid) {
            gameVar.questions[idx].push({
                questionID: id,
                categoryID: category_id,
                category: title,
                question: question, //.slice(question.indexOf(")",2)+1),
                answer: answer,
                invalid: invalid
            })
            gameVar.pickedCategories[idx] = title
           
            
        },
        emptyData: function (idx) {
            gameVar.questions[idx] = []
        },
        cleanParentheses: function (idx, str) {
            let tempStr = str.slice(str.indexOf(")",2)+1)
            //let tempStr = str.splice(str.indexOf(')', 2) + 1)
            gameVar.questions[idx][0].question = null
            //console.log(tempStr)
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
        questions: document.querySelectorAll('.questions'),
        players: document.querySelector('.players'),
        categorySelector: document.querySelectorAll('.select-category')
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
            return response.json()
        })
        .then(data => {
            gD.emptyData(idx)
            data.clues.forEach(i => {
                if (i.question.length > 1 && (!(i.question.toLowerCase().includes('audio')) || !(i.question.toLowerCase().includes('video'))) ) {
                    gD.getQuestionsData(idx, i.id, i.category_id, data.title, i.question, i.answer, i.invalid_count) 
                    gD.cleanParentheses(idx, i.question)
                } 
            })

            refs.categories[idx].textContent = data.title
            refs.questions[0].textContent = gameVars.questions[0][97].question
            console.log(gameVars.pickedCategories)
            gD.print()
        })
        .catch(err => {
            console.log(err)
        })
    }

    // this function runs all the event listeners 
    function setupEvents() {

        // event listener for the game board
        refs.board.onclick = (e) => {
            
        }
        
        // event listener for selecting categories 
        refs.categorySelector.forEach(i => i.onclick = (e) => {
            
            // fetches data from the api depending on the user selected category
            fetchCategory(e.target.value, e.target.id[3])
            console.log(gameVars.questions[0][12].question)
        })
    }

    return {
        // starts the game
        init: function () {
            console.log('start')
            
            setupEvents();
        }
    }

})(GameData, GameUI);

GameController.init();

