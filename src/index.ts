import './index.scss';
// import faker from 'faker';
import EmailsInputComponent from './components/emails-input/emails-input.component';

const emailsInput = document.querySelector('[data-component="emails-input"]') as HTMLElement;
const emailsInputInstance = new EmailsInputComponent(emailsInput);

const addRandomBtn = document.querySelector('[data-component="add-random"]');
let randomEmails = [
  'kawasaki@outlook.com',
  'scarlet@msn.com',
  'kmself@gmail.com',
  'frederic@aol.com',
  'stecoop@yahoo.com',
  'rfoley@aol.com',
  'mthurn@msn.com',
  'gastown@att.net',
  'jrifkin@icloud.com',
  'smcnabb@optonline.net',
  'avalon@msn.com',
  'draper@live.com',
];
const replaceAllCsv = randomEmails.toString();
// addEmailBtn?.addEventListener('click', () => emailsInputInstance.addEntity(faker.internet.email()));
addRandomBtn?.addEventListener('click', () => {
  const randomEmail = randomEmails[Math.floor(Math.random() * randomEmails.length)];
  if (randomEmail) {
    emailsInputInstance.addEntity(randomEmail);
    randomEmails = randomEmails.filter((email) => email !== randomEmail);
  } else {
    alert('No random emails left!');
  }
});

const getValidCountBtn = document.querySelector('[data-component="get-valid-count"]');
getValidCountBtn?.addEventListener('click', () =>
  alert(
    `Valid emails count: ${
      emailsInputInstance.component.querySelectorAll('.emails-input__entity:not(.invalid)').length
    }`,
  ),
);

const replaceAllBtn = document.querySelector('[data-component="replace-all"]');
replaceAllBtn?.addEventListener('click', () => emailsInputInstance.replaceAll(replaceAllCsv));

emailsInputInstance.onEntityAdded((entity: string) => console.log('Entity added', entity));
emailsInputInstance.onEntityRemoved((entity: string) => console.log('Entity removed', entity));
