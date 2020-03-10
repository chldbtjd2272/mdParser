var proc = require('child_process');
var fs = require('fs');
var showdown = require('showdown'),
    converter = new showdown.Converter();
var fileName = process.argv.slice(2)[0];

const TISTORY_STYLE = [
    {
        'tag': /<ul>/gi,
        'style': `<ul style="list-style-type: disc;">`
    },
    {
        'tag': /<ol>/gi,
        'style': `<ol style="list-style-type: decimal;" data-ke-list-type="decimal">`
    }
];

function run() {
    try {
        const data = fs.readFileSync(`${fileName}.md`, 'utf8');
        const html = converter.makeHtml(data);

        const htmlWitStyle = appendUlStyle(html);

        fs.writeFileSync(`${fileName}.html`, htmlWitStyle, 'utf8');
        copyBoard(htmlWitStyle);
        console.log(`${fileName}.html이 생성되었습니다.`);
    } catch (err) {
        console.log(err);
    }
}

function appendUlStyle(html) {
    let appendStyle = html;
    TISTORY_STYLE.forEach(item => {
        appendStyle = appendStyle.replace(item.tag, item.style)
    });
    return appendStyle;
}

function copyBoard(html) {
    const copyProc = proc.spawn('pbcopy');
    copyProc.stdin.write(html);
    copyProc.stdin.end();
}

run();