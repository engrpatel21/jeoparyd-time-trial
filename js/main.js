let GameData = (function () {



 })();


let GameUI = (function () { 
    const cachedRef = {
        board: document.querySelector('.board'),
        categories: document.querySelectorAll('.category'),
        questions: document.querySelectorAll('.questions'),
        players: document.querySelector('.players')
    }
 
    return {
        
        refs: function () {
            return cachedRef
        }

    }


})();


let GameController = (function (gD, gUI) { 
    
    let questionsData = []
    const refs = gUI.refs();
    console.log(refs.board)
    function setupEvents() {
        refs.board.onclick = (e) => {
            console.log(e.target.id)
            fetch("http://jservice.io/api/category?id=136")
            .then(response => {
                return response.json()
            })
            .then(data => {
                let newQuestions = {}
                newQuestions.questionID = data.clues[0].id
                newQuestions.category = data.title
                newQuestions.question = data.clues[0].question
                newQuestions.answer = data.clues[0].answer
                questionsData.push(newQuestions)
                console.log(questionsData)
                // render()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return {
        init: function () {
            console.log('start')
            setupEvents();
        }
    }

})(GameData, GameUI);

GameController.init();

