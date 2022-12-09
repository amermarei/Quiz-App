///<reference path="../typings/globals/jquery/index.d.ts" />


import { Quiz } from "./quiz.js"
export class Settings {
    constructor() {
        this.categoryElement = document.getElementById("category")
        this.difficultyElement = Array.from(document.getElementsByName("difficulty"))
        this.numberOfQuestions = document.getElementById("numberOfQuestions")
        this.startBtn = document.getElementById("startBtn")
        this.startBtn.addEventListener("click", () => this.startQuiz())
    }
    async startQuiz() {
        let category = this.categoryElement.value;
        let difficulty = this.difficultyElement.filter((e) => e.checked)[0].value;
        let questNumber = this.numberOfQuestions.value;
        let ApiResult = await this.fetchApi(`https://opentdb.com/api.php?amount=${questNumber}&category=${category}&difficulty=${difficulty}`);
        if (ApiResult.length > 0) {
            $('#setting').fadeOut(300, () => $("#quiz").fadeIn(300));
            new Quiz(ApiResult, questNumber)
        }
    }
    async fetchApi(url) {
        let Api = await fetch(url);
        Api = await Api.json();
        return Api.results;
    }
}