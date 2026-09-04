class EnglishWord {
        constructor(word, type, meaning) {
            this.word = word;
            this.type = type;
            this.meaning = meaning;
        }

        showWord() {
        console.log(`Word: ${this.word}, Type: ${this.type}, Meaning: ${this.meaning}`);
        }

        check(answer) {
        if (answer.toLowerCase() === this.meaning.toLowerCase()) {
            console.log("Correct!")
        } else {
            console.log(`Incorrect! The correct answer is ${this.meaning}`)
        }   
    }
}