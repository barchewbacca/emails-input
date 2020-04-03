import './index.scss';
// import faker from 'faker';
import EmailsInputComponent from './components/emails-input/emails-input.component';

const emailsInput = document.querySelector('[data-component="emails-input"]') as HTMLElement;
const emailsInputInstance = new EmailsInputComponent(emailsInput);

const addRandomBtn = document.querySelector('[data-component="add-random"]');
let mockRandomEmails = [
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
const mockReplaceEmails = [...mockRandomEmails];
// addEmailBtn?.addEventListener('click', () => emailsInputInstance.addEntity(faker.internet.email()));
addRandomBtn?.addEventListener('click', () => {
  const randomEmail = mockRandomEmails[Math.floor(Math.random() * mockRandomEmails.length)];
  if (randomEmail) {
    emailsInputInstance.addEntity(randomEmail);
    mockRandomEmails = mockRandomEmails.filter((email) => email !== randomEmail);
  } else {
    alert('No random emails left!');
  }
});

const getValidCountBtn = document.querySelector('[data-component="get-valid-count"]');
getValidCountBtn?.addEventListener('click', () =>
  alert(
    `Valid emails count: ${
      emailsInputInstance.componentNode.querySelectorAll('.emails-input__entity:not(.is-invalid)')
        .length
    }`,
  ),
);

const replaceAllBtn = document.querySelector('[data-component="replace-all"]');
replaceAllBtn?.addEventListener('click', () => emailsInputInstance.replaceAll(mockReplaceEmails));

emailsInputInstance.onEntityAdded((entity: string) => console.log('Added:', entity));
emailsInputInstance.onEntityRemoved((entity: string) => console.log('Removed:', entity));
