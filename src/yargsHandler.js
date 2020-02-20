const yargs = require('yargs');
const { printColor } = require('./utils');

const { addNotes, listNotes, removeNote } = require('./fileHandler');
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        printColor('yellow', 'Saving Notes');
        addNotes(argv.title, argv.body);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: () => listNotes()
});

yargs.command({
    command: 'remove',
    describe: 'Removing notes',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'Type the title you want to remove'
        }
    },
    handler: (argv) => removeNote(argv.title)
});

module.exports = yargs;