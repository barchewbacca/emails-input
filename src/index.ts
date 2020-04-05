import './index.scss';
import faker from 'faker';
import EmailsInputComponent from './components/emails-input/emails-input.component';

// Init EmailsInputComponent
const emailsInput = document.querySelector('[data-component="emails-input"]') as HTMLElement;
const emailsInputInstance = new EmailsInputComponent(emailsInput);

// Initialize 'Add random' button
const addRandomBtn = document.querySelector('[data-component="add-random"]');
addRandomBtn?.addEventListener('click', () => emailsInputInstance.addEmail(faker.internet.email()));

// Init 'Get emails count' button
const getValidCountBtn = document.querySelector('[data-component="get-valid-count"]');
getValidCountBtn?.addEventListener('click', () =>
  alert(
    `Valid emails count: ${emailsInputInstance.getEmails().filter((item) => item.valid).length}`,
  ),
);

// Init 'Replace all' button
const replaceAllBtn = document.querySelector('[data-component="replace-all"]');
const mockReplaceEmails = [
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
replaceAllBtn?.addEventListener('click', () => emailsInputInstance.replaceAll(mockReplaceEmails));

// Subscribe to onEmailAdded and onEmailRemoved callbacks
emailsInputInstance.onEmailAdded((email: string) => console.log('Added:', email));
emailsInputInstance.onEmailRemoved((email: string) => console.log('Removed:', email));
