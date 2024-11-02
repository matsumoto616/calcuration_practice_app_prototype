let a, b, startTime, endTime;

function getSelectedMode() {
    return document.getElementById('mode').value;
}

function generateQuestion() {
    const mode = getSelectedMode();  // ドロップダウンからモードを取得
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = '';
    document.getElementById('answer').value = '';
    startTime = new Date();

    if (mode === "multiplication") {
        // 掛け算モード
        document.getElementById('question').innerText = `${a} × ${b} = ?`;
    } else if (mode === "division") {
        // 割り算モード（aとbを掛けて、その結果を出題する）
        const product = a * b;
        document.getElementById('question').innerText = `${product} ÷ ${a} = ?`;
    } else if (mode === "addition") {
        // 足し算モード（正または負の整数）
        a = Math.floor(Math.random() * 19) - 9; // -9 から 9 の範囲でランダム生成
        b = Math.floor(Math.random() * 19) - 9; // -9 から 9 の範囲でランダム生成

        // a または b が負の場合に括弧で囲む
        const formattedA = a < 0 ? `(${a})` : a;
        const formattedB = b < 0 ? `(${b})` : b;

        document.getElementById('question').innerText = `${formattedA} + ${formattedB} = ?`;
    }
}

function submitAnswer() {
    const answer = parseInt(document.getElementById('answer').value);
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const mode = getSelectedMode();  // ドロップダウンからモードを取得

    if (mode === "multiplication") {
        // 掛け算モードの判定
        if (answer === a * b) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = '不正解。';
        }
    } else if (mode === "division") {
        // 割り算モードの判定
        const product = a * b;
        if (answer === b) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = '不正解。';
        }
    } else if (mode === "addition") {
        // 足し算モードの判定
        if (answer === a + b) {
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
