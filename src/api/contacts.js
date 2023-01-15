import { Contacts } from 'react-native-contacts';

export function getContacts() {
  return new Promise((resolve, reject) => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        reject(err);
      } else {
        resolve(contacts);
      }
    });
  });
}

export function handleAddContact(contact) {
  return new Promise((resolve, reject) => {
    Contacts.addContact(contact, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}