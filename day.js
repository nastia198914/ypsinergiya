const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

async function main() {
    try {
        const day = parseInt(await question('Введите день рождения: '), 10);
        const month = parseInt(await question('Введите месяц рождения: '), 10);
        const yearInput = await question('Введите год рождения (4 цифры): ');
        const year = parseInt(yearInput, 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            console.log('Ошибка: введите числа для даты рождения.');
            rl.close();
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        
        if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
            console.log('Ошибка: некорректная дата.');
            rl.close();
            return;
        }

        const dayOfWeek = getDayOfWeek(birthDate);
        console.log(`Этот день недели: ${dayOfWeek}`);

        const isLeap = isLeapYear(year);
        console.log(`Год ${isLeap ? 'високосный' : 'не високосный'}`);

        const age = calculateAge(birthDate);
        console.log(`Сейчас вам: ${age} лет`);

        const dayStr = String(day).padStart(2, '0');
        const monthStr = String(month).padStart(2, '0');
        const yearStr = yearInput.padStart(4, '0');

        const digits = {
            '0': [" ***", " * *", " * *", " * *", " ***"],
            '1': ["   *", "   *", "   *", "   *", "   *"],
            '2': [" ***", "   *", " ***", " *  ", " ***"],
            '3': [" ***", "   *", " ***", "   *", " ***"],
            '4': [" * *", " * *", " ***", "   *", "   *"],
            '5': [" ***", " *  ", " ***", "   *", " ***"],
            '6': [" ***", " *  ", " ***", " * *", " ***"],
            '7': [" ***", "   *", "   *", "   *", "   *"],
            '8': [" ***", " * *", " ***", " * *", " ***"],
            '9': [" ***", " * *", " ***", "   *", " ***"],
            ' ': [" ", " ", " ", " ", " "]
        };

        console.log('Дата рождения в стиле электронного табло:');
        for (let row = 0; row < 5; row++) {
            let line = '';
            line += addDigitLine(dayStr, digits, row);
            line += digits[' '][row];
            line += addDigitLine(monthStr, digits, row);
            line += digits[' '][row];
            line += addDigitLine(yearStr, digits, row);
            console.log(line);
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
    } finally {
        rl.close();
    }
}

function addDigitLine(str, digits, row) {
    let line = '';
    for (let char of str) {
        if (digits[char]) {
            line += digits[char][row];
        } else {
            line += '   ';
        }
    }
    return line;
}

function getDayOfWeek(date) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[date.getDay()];
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

main();