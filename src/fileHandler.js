const fs = require('fs');
const { printColor } = require('./utils');

/**
 * Adds a notes
 * @param {*} title 
 * @param {*} body 
 */

const addNotes = (title, body) => {
    let data = [];
    loadNotes().then(notesData => {
        if (notesData) {
            data = [...JSON.parse(notesData).data];
        }
        const isDuplicate = data.filter(item => item.title === title);
        if (isDuplicate.length === 0) {
            data.push({ title, body });
            saveNotes(JSON.stringify({ data: [...data] }));
        } else {
            printColor('yellow', 'Notes Already exists');
        }
    }).catch(p => printColor('red', p));
}

/**
 * list the notes
 */

const listNotes = () => {
    loadNotes().then(notes => {
        if (notes) {
            printColor('yellow', notes);
        }
    }).catch(p => printColor('red', p));
}

/**
 * load the notes
 */
const loadNotes = () => {
    return new Promise((res, rej) => {
        fs.exists('db.json', (check) => {
            if (check) {
                const dataBuffer = fs.readFileSync('db.json');
                return res(dataBuffer.toString());
            }
            printColor('red', 'File Not exists');
            rej(null);
            return null;
        });
    })
}

/**
 * save the notes
 * @param {*} data 
 */

const saveNotes = (data) => {
    fs.writeFile('db.json', data, (err) => {
        if (err) {
            printColor('red', 'Saveing to DB Interrupt');
            throw err;
        } else {
            printColor('green', 'Notes Saved Successfully.');
        }
    })
}


const removeNote = (title) => {
    loadNotes().then((notes) => {
        let data = [];
        if (notes) {
            data = [...JSON.parse(notes).data];
        }
        const index = data.findIndex(item => item.title === title);
        if (index >= 0) {
            data.splice(index, 1);
            saveNotes(JSON.stringify({ data: [...data] }));
        } else {
            printColor('yellow', `Notes with title ${title} not found.`)
        }
    }).catch((err) => printColor('red', err))
}

module.exports = {
    addNotes,
    listNotes,
    removeNote
}