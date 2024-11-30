let a, b, startTime, endTime;

function getSelectedMode() {
    return document.getElementById('mode').value;
}

function getNumberRange() {
    return document.getElementById('numberRange').value;
}

// 最大公約数を計算する関数
function gcd(x, y) {
    return y === 0 ? x : gcd(y, x % y);
}

// 分数を既約分数にする関数
function reduceFraction(fraction) {
    const { numerator, denominator } = fraction;
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
        numerator: numerator / divisor,
        denominator: denominator / divisor
    };
}

// 文字列から括弧 () を取り除く
function removeParentheses(str) {
    return str.replace(/[()]/g, "");
}

// 分数を整形する関数（分母が1のとき整数にする、負の数のとき(－(分数))の形にする）
function formatFraction(fraction) {
    const { numerator, denominator } = fraction;
    const isNegative = numerator * denominator < 0;
    const isInteger = denominator === 1 || denominator === -1;
    const formattedNumerator = numerator < 0 ? -numerator : numerator;
    const formattedDenominator = denominator < 0 ? -denominator : denominator;
    const formattedFraction = `${formattedNumerator}/${formattedDenominator}`;
    let ret;
    if (isNegative && isInteger) {
        ret = `-${formattedNumerator}`;
    } else if (isNegative && !isInteger) {
        ret = `-(${formattedFraction})`;
    } else if (!isNegative && isInteger) {
        ret = `${formattedNumerator}`;
    } else if (!isNegative && !isInteger) {
        ret = `${formattedFraction}`;
    }
    return `${ret}`;
}

// 負の数のとき()をつける
function wrapNegative(strTerm) {
    if (strTerm.startsWith("-")) {
        return `(${strTerm})`;
    }
    return strTerm;
}

function generateQuestion() {
    const mode = getSelectedMode();
    const rangeType = getNumberRange();
    document.getElementById('result').innerText = '';
    document.getElementById('time').innerText = '';
    document.getElementById('answer').value = '';
    startTime = new Date();

    if (rangeType === "rational") {
        const numerator1 = Math.floor(Math.random() * 21) - 10;
        const denominator1 = Math.floor(Math.random() * 9) + 1;
        const numerator2 = Math.floor(Math.random() * 21) - 10;
        const denominator2 = Math.floor(Math.random() * 9) + 1;

        // 分数を生成し、既約分数に変換
        a = reduceFraction({ numerator: numerator1, denominator: denominator1 });
        b = reduceFraction({ numerator: numerator2 === 0 ? 1 : numerator2, denominator: denominator2 });

        // 問題文の生成
        if (mode === "multiplication") {
            document.getElementById('question').innerText = `${formatFraction(a)} × ${wrapNegative(formatFraction(b))} = ?`;
        } else if (mode === "division") {
            document.getElementById('question').innerText = `${formatFraction(a)} ÷ ${wrapNegative(formatFraction(b))} = ?`;
        } else if (mode === "addition") {
            document.getElementById('question').innerText = `${formatFraction(a)} + ${wrapNegative(formatFraction(b))} = ?`;
        } else if (mode === "substraction") {
            document.getElementById('question').innerText = `${formatFraction(a)} - ${wrapNegative(formatFraction(b))} = ?`;
        }
    } else {
        const range = rangeType === "nonNegative" ? 99 : 199;
        const offset = rangeType === "nonNegative" ? 1 : -99;

        a = Math.floor(Math.random() * (range + 1)) + offset;
        b = Math.floor(Math.random() * (range + 1)) + offset;

        if (mode === "multiplication") {
            document.getElementById('question').innerText = `${a} × ${wrapNegative(b.toString())} = ?`;
        } else if (mode === "division") {
            if (a === 0) a = 1;
            const product = a * b;
            document.getElementById('question').innerText = `${product} ÷ ${wrapNegative(a.toString())} = ?`;
        } else if (mode === "addition") {
            document.getElementById('question').innerText = `${a} + ${wrapNegative(b.toString())} = ?`;
        } else if (mode === "substraction") {
            document.getElementById('question').innerText = `${a} - ${wrapNegative(b.toString())} = ?`;
        }
    }
}

function parseFraction(input) {
    const formattedInput = removeParentheses(input);
    const parts = formattedInput.split('/');
    if (parts.length === 1) {
        const numerator = parseInt(parts[0], 10);
        return {
            numerator: numerator,
            denominator: 1
        };
    }
    const numerator = parseInt(parts[0], 10);
    const denominator = parseInt(parts[1], 10);
    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
        return null;
    }
    return { 
        numerator: numerator, 
        denominator: denominator
    };
}

function areFractionsEqual(frac1, frac2) {
    return frac1.numerator * frac2.denominator === frac2.numerator * frac1.denominator;
}

function isReducedFraction(frac) {
    return gcd(Math.abs(frac.numerator), Math.abs(frac.denominator)) === 1;
}

function submitAnswer() {
    const answer = document.getElementById('answer').value.trim();
    endTime = new Date();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const mode = getSelectedMode();
    const rangeType = getNumberRange();

    let correctAnswer;

    if (rangeType === "rational") {
        if (mode === "multiplication") {
            correctAnswer = reduceFraction({
                numerator: a.numerator * b.numerator,
                denominator: a.denominator * b.denominator
            });
        } else if (mode === "division") {
            correctAnswer = reduceFraction({
                numerator: a.numerator * b.denominator,
                denominator: a.denominator * b.numerator
            });
        } else if (mode === "addition") {
            correctAnswer = reduceFraction({
                numerator: a.numerator * b.denominator + b.numerator * a.denominator,
                denominator: a.denominator * b.denominator
            });
        } else if (mode === "substraction") {
            correctAnswer = reduceFraction({
                numerator: a.numerator * b.denominator - b.numerator * a.denominator,
                denominator: a.denominator * b.denominator
            });
        }

        const parsedAnswer = parseFraction(answer);
        if (parsedAnswer && areFractionsEqual(correctAnswer, parsedAnswer) && isReducedFraction(parsedAnswer)) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = `不正解... 正解は ${formatFraction(correctAnswer)}`;
        }
    } else {
        if (mode === "multiplication") {
            correctAnswer = a * b;
        } else if (mode === "division") {
            correctAnswer = b;
        } else if (mode === "addition") {
            correctAnswer = a + b;
        } else if (mode === "substraction") {
            correctAnswer = a - b;
        }

        if (parseInt(answer, 10) === correctAnswer) {
            document.getElementById('result').innerText = '正解！';
        } else {
            document.getElementById('result').innerText = `不正解... 正解は ${correctAnswer}`;
        }
    }

    document.getElementById('time').innerText = `回答時間: ${timeTaken}秒`;
}
