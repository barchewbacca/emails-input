import './index.scss';
import EmailsInputComponent from './components/emails-input/emails-input.component';

const emailsInputList: Element[] = [
  ...document.querySelectorAll('[data-component="emails-input"]'),
];

emailsInputList.forEach((item) => new EmailsInputComponent(item));
