const fs = require("fs");

const init = (async () => {
    let txtKlingon = await getParchment("TextoB.txt");
    await treatPrepositionFile(txtKlingon);
    await treatVerbsFile(txtKlingon);
    await treatVocabularyFile(txtKlingon);
    await treatNumbersFile(txtKlingon);
})

async function getParchment(txtFile) {
    let txtKlingon = fs.readFileSync(txtFile, 'utf8', (e, data) => {
        if (e) throw e;
        console.log("OK" + data);
    });
    console.log(`
---------------------------------------------------------------------------------------------------------------------------------------------------------         
                                            Pergaminho original:

${txtKlingon}
                    
                    
---------------------------------------------------------------------------------------------------------------------------------------------------------  `);
    txtKlingon = txtKlingon.split(" ");

    return txtKlingon;
};
async function treatPrepositionFile(txtKlingon) {
    var pre = 0;
    for (let i = 0; i < txtKlingon.length; i++) {
        let reg = /([sflwk])/gi;

        if (txtKlingon[i].length == 3 && !txtKlingon[i][2].match(RegExp(reg)) && !txtKlingon[i].includes("d")) {
            //console.log("Palavra Klingon: " + txtKlingon[i])
            pre++;
        }
    }
    console.log("\n\nNumero de preposições: " + pre);
};
async function treatVerbsFile(txtKlingon) {
    var verbs = 0;
    var verbsFirstPerson = 0;
    for (let i = 0; i < txtKlingon.length; i++) {
        let reg = /([sflwk])/gi;
        if (txtKlingon[i].length >= 8 && txtKlingon[i][txtKlingon[i].length - 1].match(RegExp(reg))) {
            verbs++;
            //console.log("Verbo: " + txtKlingon[i]);
            if (!txtKlingon[i][0].match(RegExp(reg))) {
                verbsFirstPerson++;
                //console.log("Verbo em primeira pessoa: " + txtKlingon[i]);
            }
        }
    }
    console.log("\nQuantidade de verbos: " + verbs);
    console.log("Quantidade de verbos em primeira pessoa: " + verbsFirstPerson);

};
async function treatVocabularyFile(txtKlingon) {
    let alphabetKlingon = ["k", "b", "w", "r", "q", "d", "n", "f", "x", "j", "m", "l", "v", "h", "t", "c", "g", "z", "p", "s"]
    let arrAux = [];
    for (let i = 0; i < txtKlingon.length; i++) {
        for (let j = 0; j < txtKlingon[i].length; j++) {
            if (alphabetKlingon.indexOf(txtKlingon[i][j]) < 10) {
                arrAux.push("0" + alphabetKlingon.indexOf(txtKlingon[i][j]).toString());
            } else
                arrAux.push(alphabetKlingon.indexOf(txtKlingon[i][j]).toString());
        }
        arrAux.push(" ");
    }
    arrAux = arrAux.join("").split(" ");
    for (let i = 0; i < arrAux.length - 1; i++) {
        if (arrAux[i].startsWith("."))
            arrAux[i] = arrAux[i].replace(".", "");
        if (arrAux[i].endsWith("."))
            arrAux[i] = arrAux[i].substr(0, arrAux[i].length - 1);
    }
    arrAux = arrAux.filter(Boolean);
    arrAux = arrAux.sort()
    let vocabularyKlingon = [];
    for (let i = 0; i < arrAux.length; i++) {
        for (let j = 0; j < arrAux[i].length; j += 2) {
            vocabularyKlingon.push(alphabetKlingon[parseInt(arrAux[i][j] + arrAux[i][j + 1])])
        }
        vocabularyKlingon.push(" ");
    }
    vocabularyKlingon = vocabularyKlingon.join("").split(" ");
    vocabularyKlingon = vocabularyKlingon.filter(Boolean);
    vocabularyKlingon = vocabularyKlingon.join(" ").split(",");

    console.log(vocabularyKlingon);
 }
async function treatNumbersFile(txtKlingon) {
    let alphabetKlingon = ["k", "b", "w", "r", "q", "d", "n", "f", "x", "j", "m", "l", "v", "h", "t", "c", "g", "z", "p", "s"]
    let beautyNumbersKlingon = [];
    for (let i = 0; i < txtKlingon.length; i++) {
        let num = 1;
        let sum = 0;
        for (let j = 0; j < txtKlingon[i].length; j++) {
            //console.log('IndexOf alfabeto: ' + alphabetKlingon.indexOf(txtKlingon[i][j]));
            //console.log('valor numero: ' + num);

            sum = sum + num * alphabetKlingon.indexOf(txtKlingon[i][j]);
            num = num * 20;
            //console.log('Soma: ' + sum);
        }
        if (sum >= 440566 && sum % 3 == 0)
            beautyNumbersKlingon.push(sum);
    }
    console.log("\nQuantidade de numeros bonitos: " + beautyNumbersKlingon.length);
};
init();