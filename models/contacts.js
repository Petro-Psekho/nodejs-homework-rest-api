// const fs = require('fs/promises');
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async id => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async data => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async id => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

// const listContacts = async () => {};

// const getContactById = async contactId => {};

// const removeContact = async contactId => {};

// const addContact = async body => {};

// const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
