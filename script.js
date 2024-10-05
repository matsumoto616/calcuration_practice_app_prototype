let a, b, startTime, endTime, mode = "multiplication";

function getSelectedMode() {
    const radios = document.getElementsByName('mode');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "multiplication"; // デフォルトで掛け算モード
}

function generateQuestion() {
    mode = getSelectedMode();
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = '';
    document.getElementById('answer').value = '';
    startTime = new Date();

    if (mode === "multiplication") {
        // 掛け算モード
        document.getElementById('question').innerText = `${a} × ${b} = ?`;
    } else {
        // 割り算モード（aとbを掛けて、その結果を出題する）
        const product = a * b;
        document.getElementById('question').innerText = `${product} ÷ ${a} = ?`;
    }
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;

    if (mode === "multiplication") {
        // 掛け算モードの判定
        if (answer === a * b) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = '不正解。';
        }
    } else {
        // 割り算モードの判定
        const product = a * b;
        if (answer === b) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = '不正解。';
        }
    }
    
    document.getElementById('time').innerText = `回答時間: ${timeTaken}秒`;
}

function nextQuestion() {
    generateQuestion();
}

// 初期問題を生成
generateQuestion();
