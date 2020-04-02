import './index.scss';
import EmailsInputComponent from './components/emails-input/emails-input.component';

const emailsInputList = [
  ...document.querySelectorAll('[data-component="emails-input"]'),
] as HTMLElement[];

emailsInputList.forEach((item) => new EmailsInputComponent(item));
