let a, b, startTime, endTime;

function generateQuestion() {
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
    document.getElementById('question').innerText = `${a} × ${b} = ?`;
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = '';
    document.getElementById('answer').value = '';
    startTime = new Date();
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;

    if (answer === a * b) {
        document.getElementById('result').innerText = '正解！';
    } else {
        document.getElementById('result').innerText = '不正解。';
    }
    
    document.getElementById('time').innerText = `回答時間: ${timeTaken}秒`;
}

function nextQuestion() {
    generateQuestion();
}

// 初期問題を生成
generateQuestion();
