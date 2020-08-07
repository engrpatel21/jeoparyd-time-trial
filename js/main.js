let GameData = (function () {

    const hardCodedCategories = [['Potpourriiii', 306], ['Stupid Answers', 136], ['Sports', 42], ['American History', 780], ['Animals', 21], ['3 Letter Words', 105], ['Science', 25], ['Transportation', 103], ['U.S. Cities', 7], ['People', 442], ['Television', 67], ['Hodgepodge', 227], ['State Capitals', 109], ['History', 114], ['The Bible', 31], ['Business & Industry', 31], ['U.S. Geography', 582], ['Annual Events', 1114], ['Common Bonds', 508], ['Food', 49], ['Rhyme Time', 561], ['Word Origins', 223], ['Pop Music', 770], ['Holidays & Observances', 662], ['Americana', 313], ['Food & Drink', 253], ['Weights & Measures', 420], ['Potent Potables', 83], ['Musical Instruments', 184], ['Bodies Of Water', 221], ['4 Letter Words', 51], ['Museums', 531], ['Nature', 267], ['Organizations', 357], ['World History', 530], ['Travel & Tourism', 369], ['Colleges & Universities', 672], ['Nonfiction', 793], ['World Capitals', 78], ['Literature', 574], ['Fruits & Vegetables', 777], ['Mythology', 680], ['U.S. History', 50], ['Religion', 99], ['The Movies', 309], ['First Ladies', 40], ['Fashion', 26], ['Homophones', 249], ['Quotations', 1420], ['Science & Nature', 218], ['Foreign Words & Phrases', 1145], ['Around The World', 1079], ['5 Letter Words', 139], ['Double Talk', 89], ['U.S. States', 17], ['Books & Authors', 197], ['Nursery Rhymes', 37], ['Brand Names', 2537], ['Familiar Phrases', 705], ['Before & After', 1800], ['Body Language', 897], ['Number, Please', 1195],['The Old Testament', 128]]
    
    let gameVar = {
        pickedCategories: [],
        questions: [[],[],[],[],[],[]],
        playerNames: [],
        playerScores: [],
        questionTimer: null
    }
    return {
        fetchCategory: function (categoryID,category) {
            fetch(`http://jservice.io/api/category?id=${categoryID}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                gameVar.questions[category] = []
                data.clues.forEach(i => {
                    
                    // newQuestions.questionID = i.id
                    // newQuestions.category = data.title
                    // newQuestions.question = i.question
                    // newQuestions.answer = i.answer
                    gameVar.questions[category].push({ questionID: i.id, category: i.category_id, categoryID: data.title, question: i.question, answer: i.answer })
                })
                
                console.log(gameVar.questions)
            })
            .catch(err => {
                console.log(err)
            })
        },

        hardCodedCategories: function () {
            return hardCodedCategories
        }
    }

 })();


let GameUI = (function () { 
    const cachedRef = {
        board: document.querySelector('.board'),
        categories: document.querySelectorAll('.category'),
        questions: document.querySelectorAll('.questions'),
        players: document.querySelector('.players'),
        categorySelector: document.querySelectorAll('.select-category')
    }

    function newOps(arr) {
        return arr.map(el => new Option(el[0],el[1],true,false))
    }
 
    return {
        
        refs: function () {
            return cachedRef
        },

        addSelection: function (arr, category) {
            newOps(arr).map((el, i) => category.add(el, i))

        }

    }


})();


let GameController = (function (gD, gUI) { 
    
    const refs = gUI.refs();
    const hardCodedCategories = gD.hardCodedCategories()
    
    refs.categorySelector.forEach(i => gUI.addSelection(hardCodedCategories, i))

    function setupEvents() {
        refs.board.onclick = (e) => {
            gD.fetchCategory(306)
        }
        refs.categorySelector.forEach(i => i.onclick = (e) => {
            
            gD.fetchCategory(e.target.value, e.target.id[3])
            console.log(e.target.id)
        })
    }

    return {
        init: function () {
            console.log('start')
            setupEvents();
        }
    }

})(GameData, GameUI);

GameController.init();

