// mengimport core module yang dibutuhkan
const fs = require('fs');
var validator = require('validator');
// const readline = require('readline');

// jika tidak ada folder data maka buat foldernya
if (!fs.existsSync('./data')) {
  fs.mkdirSync('data');
}

// jika tidak ada file contacts.json dalam folder data maka buat filenya
if (!fs.existsSync('./data/contacts.json')) {
  fs.writeFileSync('data/contacts.json', '[]');
}

const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf-8'); //membaca file contacts dari folder data
  const contacts = JSON.parse(file); //memparsing data contacts ke object
  return contacts;
};

// membuat fungsi menyimpan contacts
const saveContacts = (name, email, nomorhp) => {
  const contact = { name, email, nomorhp }; //menyimpan object dari parameter fungsi ke variabel contact
  const contacts = loadContact();
  const duplicate = contacts.find((contact) => contact.name === name);
  //cek apakah nama duplikat
  if (duplicate) {
    console.log('Contact name is already recorded. Use another contact name');
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log('Invalid email contact');
      return false;
    }
  }

  // cek mobile phone
  if (!validator.isMobilePhone(nomorhp, 'id-ID')) {
    console.log('Invalid Phone number contact');
    return false;
  }

  contacts.push(contact); //menambahkan data contact baru ke variable contacts
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); //menulis data contacts ke file contacts.json
  console.log('Terima kasih sudah memasukkan data!'); //memberitahu bahwa data contact telah dimasukkan
};

// fungsi untuk menampilkan data contact
const listContact = () => {
  const contacts = loadContact();

  if (contacts[0] === undefined) {
    console.log('--- No Data yet ---');
    return false;
  }

  console.log('Contact List:');
  contacts.forEach((contact, i) => {
    if (contact.email) {
      console.log(`${i + 1}. ${contact.name} - ${contact.email} - ${contact.nomorhp}`);
    } else {
      console.log(`${i + 1}. ${contact.name} - ${contact.nomorhp}`);
    }
  });
};

// membuat fungsi detail kontak
const detailContact = (name) => {
  // membaca semua contacts
  const contacts = loadContact();
  //memasukkan contacts ke yang dipilih berdasarkan nama ke variabel contact
  const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

  //   jika contact tidak ada maka tampilkan pesan dan keluar dari fungsi
  if (!contact) {
    console.log('contact not found!');
    return false;
  }

  console.log(contact.name);
  if (contact.email) {
    console.log(contact.email);
  }
  console.log(contact.nomorhp);
};

// fungsi untuk menghapus kontak berdasarkan nama
const deleteContact = (name) => {
  // panggil fungsi untuk membaca file contacts.json
  const contacts = loadContact();
  //   cari kontak selain nama kontak yang diinputkan
  const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());

  //  jika tidak ada nama contact maka munculkan pesan dan keluarkan dari fungsi
  if (contacts.length === newContacts.length) {
    console.log('Contact not found!');
    return false;
  }

  // tulis ke file contacts.json yang ada di dalam folder data
  fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts));

  console.log('Contact data deleted successfully!');
};

// fungsi untuk mengedit data kontak berdasarkan nama
const updateContact = (name, email, nomorhp, updatedName) => {
  // membaca semua contacts
  const contacts = loadContact();
  //memasukkan contacts ke yang dipilih berdasarkan nama ke variabel contact
  const newContact = contacts.filter((contact) => contact.name.toLowerCase() !== updatedName.toLowerCase());

  //   jika tidak ada nama contact maka munculkan pesan dan keluarkan dari fungsi
  if (contacts.length === newContact.length) {
    console.log(`Contact ${updatedName} not found!`);
    return false;
  }

  const oldContact = contacts.find((contact) => contact.name.toLowerCase() === updatedName.toLowerCase());
  const index = contacts.indexOf(oldContact);

  //   cek nama jika ada
  if (name) {
    //cek apakah nama duplikat
    const duplicate = newContact.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
      console.log('Contact name is already recorded. Use another contact name');
      return false;
    }
    contacts[index].name = name;
  }

  // cek email jika ada
  if (email) {
    // cek email
    if (!validator.isEmail(email)) {
      console.log('Invalid email contact');
      return false;
    }
    contacts[index].email = email;
  }

  //   cek nomorhp jika ada
  if (nomorhp) {
    // cek mobile phone
    if (!validator.isMobilePhone(nomorhp, 'id-ID')) {
      console.log('Invalid Phone number contact');
      return false;
    }
    contacts[index].nomorhp = nomorhp;
  }

  //   tulis ke file contacts.json yang ada di dalam folder data
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));

  //   tampilkan pesan
  console.log('Contact data updated successfully!');
};

// mengekspor fungsi-fungsi
module.exports = { saveContacts, listContact, detailContact, deleteContact, updateContact };
