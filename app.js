const { saveContacts, listContact, detailContact, deleteContact, updateContact } = require('./contacts');
const yargs = require('yargs');

// menambahkan data contact
yargs.command({
  command: 'add',
  describe: 'add new contact',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'contact email',
      demandOption: false,
      type: 'string',
    },
    mobile: {
      describe: 'Contact mobile phone number',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    saveContacts(argv.name, argv.email, argv.mobile);
  },
});

// menampilkan daftar contact
yargs.command({
  command: 'list',
  describe: 'see contact list',
  handler() {
    listContact();
  },
});

// menampilkan detail contact
yargs.command({
  command: 'detail',
  describe: 'see contact detail base on name',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.name);
  },
});

// mengedit edit
yargs.command({
  command: 'edit',
  describe: 'edit contacts by name',
  builder: {
    newName: {
      describe: 'Contact Name',
      demandOption: false,
      type: 'string',
    },
    newEmail: {
      describe: 'contact email',
      demandOption: false,
      type: 'string',
    },
    newMobile: {
      describe: 'Contact mobile phone number',
      demandOption: false,
      type: 'string',
    },
    updatedName: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    updateContact(argv.newName, argv.newEmail, argv.newMobile, argv.updatedName);
  },
});

// menghapus contact
yargs.command({
  command: 'delete',
  describe: 'Delete contacts by name',
  builder: {
    name: {
      describe: 'Contact Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.name, false);
  },
});

yargs.parse();
