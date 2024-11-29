let a, b, startTime, endTime;

function getSelectedMode() {
    return document.getElementById('mode').value;
}

function getNumberRange() {
    return document.getElementById('numberRange').value;
}

function generateQuestion() {
    const mode = getSelectedMode(); // ドロップダウンからモードを取得
    const rangeType = getNumberRange(); // 数字範囲（自然数 or 整数）を取得
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = '';
    document.getElementById('answer').value = '';
    startTime = new Date();

    const range = rangeType === "natural" ? 99 : 199;
    const offset = rangeType === "natural" ? 1 : -99;

    a = Math.floor(Math.random() * (range + 1)) + offset;
    b = Math.floor(Math.random() * (range + 1)) + offset;

    if (mode === "multiplication") {
        // 掛け算モード
        const formattedA = formatNumber(a);
        const formattedB = formatNumber(b);
        document.getElementById('question').innerText = `${formattedA} × ${formattedB} = ?`;
    } else if (mode === "division") {
        // 割り算モード
        if (a === 0) a = 1; // a が 0 の場合を回避
        const product = a * b;
        const formattedA = formatNumber(a);
        const formattedP = formatNumber(product);
        document.getElementById('question').innerText = `${formattedP} ÷ ${formattedA} = ?`;
    } else if (mode === "addition") {
        // 足し算モード
        const formattedA = formatNumber(a);
        const formattedB = formatNumber(b);
        document.getElementById('question').innerText = `${formattedA} + ${formattedB} = ?`;
    } else if (mode === "substraction") {
        // 引き算モード
        const formattedA = formatNumber(a);
        const formattedB = formatNumber(b);
        document.getElementById('question').innerText = `${formattedA} - ${formattedB} = ?`;
    }
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value, 10);
    endTime = new Date();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const mode = getSelectedMode();

    let correctAnswer;
    if (mode === "multiplication") {
        correctAnswer = a * b;
    } else if (mode === "division") {
        correctAnswer = b;
    } else if (mode === "addition") {
        correctAnswer = a + b;
    } else if (mode === "substraction") {
        correctAnswer = a - b;
    }

    if (answer === correctAnswer) {
        document.getElementById('result').innerText = '正解！';
    } else {
        document.getElementById('result').innerText = `不正解... 正解は ${correctAnswer}`;
    }
    document.getElementById('time').innerText = `回答時間: ${timeTaken}秒`;
}

function nextQuestion() {
    generateQuestion();
}

function formatNumber(num) {
    return num < 0 ? `(${num})` : num;
}

// 初期問題を生成
generateQuestion();
