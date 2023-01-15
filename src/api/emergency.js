import { getEmergencyContacts } from './contactService';

const emergencyNumbers = {
  police: '911',
  fire: '911',
  ambulance: '911',
};

export function getEmergencyNumbers() {
  return emergencyNumbers;
}

export function handleDialEmergencyNumber(emergencyNumber) {
  callEmergencyContact(emergencyNumber);
}

export function getEmergencyContacts() {
  return new Promise((resolve, reject) => {
    getEmergencyContacts().then((emergencyContacts) => {
      resolve(emergencyContacts);
    }).catch((err) => {
      reject(err);
    });
  });
}