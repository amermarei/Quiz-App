export class Quiz {
    constructor (ApiResult,questNumber){
        this.currentQuestion=document.getElementById("currentQuestion");
        this.totalNumberOfQuestions=document.getElementById("totalNumberOfQuestions");
        this.question=document.getElementById("question");
        this.rowAnswer=document.getElementById("rowAnswer");
        this.ApiResult=ApiResult;
        this.questNumber=questNumber;
        this.index=0;
        this.score=0;
        this.showQuiz();
        this.nextElement = document.getElementById("next")
        this.nextElement.addEventListener("click",()=>this.next())
        this.tryBtn = document.getElementById("tryBtn")
        this.tryBtn.addEventListener("click",()=>this.tryAgain())
    }
    showQuiz(){
        this.currentQuestion.innerHTML= this.index + 1;
        this.totalNumberOfQuestions.innerHTML=this.questNumber;
        this.question.innerHTML=this.ApiResult[this.index].question;
         let answers= [this.ApiResult[this.index].correct_answer,...this.ApiResult[this.index].incorrect_answers];
         let ranAnswers= this.ranAns(answers)
        this.displayQuiz(ranAnswers)
    }
    displayQuiz(Ans){
        let x = ``;
        for(let i=0;i<Ans.length;i++){
            x += `
                <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${Ans[i]}" >
                ${Ans[i]} <br/>
             `
        }
        this.rowAnswer.innerHTML= x ; 
    }
    ranAns(ansArray) {
        let ranNums = [],
            i = ansArray.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(ansArray[j]);
            ansArray.splice(j, 1);

        }
        return ranNums ;
    }
    nextQuestion(){
        this.index++;
        (this.index < this.questNumber) ? this.showQuiz() : this.finish()
    }
    checkAns(){
        let answer = Array.from(document.getElementsByName("answer"));
        let checkedAnswer = answer.filter((e)=>e.checked);
        if (checkedAnswer.length == 0) {
            $(".alert").fadeIn(500)
        }
        else{
            $(".alert").hide();
            if(checkedAnswer[0].value == this.ApiResult[this.index].correct_answer){
                $("#Correct").fadeIn(700, () => {
                    $("#Correct").hide()
                });
                this.score++;
            }else {
                $("#inCorrect").fadeIn(700, () => {
                    $("#inCorrect").hide()
                });
            }
            this.nextQuestion();
        }
    }
    next(){
        this.checkAns()
    }
    finish() {
        $("#quiz").fadeOut(500,()=>{
            $("#finish").fadeIn(500,()=>{
              $("#score").text(this.score)
            })
        })
    }
    tryAgain(){
        $("#finish").fadeOut(500,()=>{
            $("#setting").fadeIn(500)
        })
    }
}


