const SEPARATOR = ',';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const REMOVE_ICON =
  '<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" /></svg>';

export enum Key {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  COMMA = 188,
}

interface Email {
  value: string;
  valid: boolean;
}

export default class EmailsInputComponent {
  static readonly COMPONENT_CLASSNAME = 'emails-input';
  static readonly INPUT_CLASSNAME = 'emails-input__input';
  static readonly EMAIL_CLASSNAME = 'emails-input__email';
  static readonly REMOVE_BUTTON_CLASSNAME = 'emails-input__email-btn';
  static readonly FOCUSED_CLASSNAME = 'is-focused';
  static readonly INVALID_CLASSNAME = 'is-invalid';

  /**
   * Component node which contains the emails and the input.
   * @type {HTMLElement}
   */
  componentNode: HTMLElement;

  /**
   * The hidden input that holds the value of all valid added emails.
   * This value is taken on form submit.
   * @private
   * @type {HTMLInputElement}
   */
  private hiddenInput: HTMLInputElement;

  /**
   * The input which is responsible for adding and removing new emails.
   * @private
   * @type {HTMLInputElement}
   */
  private input: HTMLInputElement;

  /**
   * List containing all the added emails. Both valid and invalid.
   * @private
   * @type {Email[]}
   */
  private emailList: Email[] = [];

  /**
   * Callback which returns added email value.
   * @private
   */
  private addCallback: (emailValue: string) => string;

  /**
   * Callback which returns removed email value.
   * @private
   */
  private removeCallback: (emailValue: string) => string;

  constructor(private containerNode: HTMLElement) {
    if (!this.containerNode) {
      throw new Error('Container node is not found.');
    }

    this.renderComponent();
    this.addEventListeners();
  }

  /**
   * Renders emails input component and the input inside of it.
   * Replaces container node with the generated element.
   */
  private renderComponent() {
    this.componentNode = this.createElement('div', EmailsInputComponent.COMPONENT_CLASSNAME);
    this.componentNode.tabIndex = 0;

    const attributes = Array.prototype.slice
      .call(this.containerNode.attributes)
      .filter((att) => att.name !== 'data-component');

    this.input = this.createElement(
      'input',
      EmailsInputComponent.INPUT_CLASSNAME,
    ) as HTMLInputElement;
    this.input.type = 'email';
    const inputAttributes = attributes.filter((att) => att.name !== 'name');
    inputAttributes.forEach((att) => this.input.setAttribute(att.name, att.value));
    this.componentNode.appendChild(this.input);

    this.hiddenInput = this.createElement('input') as HTMLInputElement;
    this.hiddenInput.type = 'hidden';
    const hiddenInputAttributes = attributes.filter((att) => att.name === 'name');
    hiddenInputAttributes.forEach((att) => this.hiddenInput.setAttribute(att.name, att.value));
    this.componentNode.appendChild(this.hiddenInput);

    this.containerNode!.parentNode!.replaceChild(this.componentNode, this.containerNode);
  }

  /**
   * Saves all the valid emails as a value of the hidden input.
   */
  private saveHiddenInputValue() {
    this.hiddenInput.value = this.emailList
      .filter((item) => item.valid)
      .map((item) => item.value)
      .toString();
  }

  /**
   * Utility method for creating an element.
   * @param type HTML tag name.
   * @param className Class name.
   * @param content Text content.
   */
  private createElement(
    type: keyof HTMLElementTagNameMap,
    className?: string,
    content?: string,
  ): HTMLElement | HTMLInputElement {
    const element = document.createElement(type);

    if (className) {
      element.className = className;
    }

    if (content) {
      element.textContent = content;
    }

    return element;
  }

  /**
   * Creates email element and add a close button.
   * @param value Email value.
   * @param valid Indicates if the email is valid.
   */
  private createEmailElement(value: string, valid: boolean): HTMLElement {
    const className = valid
      ? EmailsInputComponent.EMAIL_CLASSNAME
      : `${EmailsInputComponent.EMAIL_CLASSNAME} ${EmailsInputComponent.INVALID_CLASSNAME}`;
    const emailNode = this.createElement('div', className, value);

    const removeBtn = this.createElement('button', EmailsInputComponent.REMOVE_BUTTON_CLASSNAME);
    removeBtn.innerHTML = REMOVE_ICON;
    removeBtn.addEventListener('click', () => this.removeEmail(value));
    emailNode.appendChild(removeBtn);

    return emailNode;
  }

  /**
   * Adds event listeners to the emails input.
   */
  private addEventListeners() {
    this.componentNode.addEventListener('focus', this.handleComponentFocus);
    this.input.addEventListener('focus', this.handleInputFocus);
    this.input.addEventListener('blur', this.handleBlur);
    this.input.addEventListener('paste', this.handlePaste);
    this.input.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Handles focus event on component. Redirects focus to the input and styles the emails input.
   * @private
   */
  private handleComponentFocus = () => {
    this.input.focus();
    this.componentNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles focus event on input and styles emails input.
   * @private
   */
  private handleInputFocus = () => {
    this.componentNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles blur event. Adds email if it's not empty and removes focus styling.
   * @private
   */
  private handleBlur = () => {
    this.addEmail(this.input.value);
    this.componentNode.classList.remove(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles paste event. Parses the pasted string and adds emails.
   * @private
   */
  private handlePaste = () => {
    setTimeout(() => this.input.value.split(SEPARATOR).forEach((item) => this.addEmail(item)), 0);
  };

  /**
   * Handles keydown event.
   * On pressing ENTER and COMMA adds email to the emails input.
   * On pressing TAB adds email to the emails input. If the value in empty focus jumps to the next tabindex.
   * On pressing BACKSPACE removes the last email in the list.
   * @private
   */
  private handleKeydown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case Key.ENTER:
      case Key.COMMA:
        event.preventDefault();
        this.addEmail(this.input.value);
        break;
      case Key.TAB:
        const inputValue = this.input.value;

        if (inputValue === '') {
          return;
        }

        event.preventDefault();
        this.addEmail(inputValue);
        break;
      case Key.BACKSPACE:
        const lastEmail = this.emailList[this.emailList.length - 1];

        if (this.input.value === '' && lastEmail) {
          event.preventDefault();
          this.removeEmail(lastEmail.value);
        }
        break;
    }
  };

  /**
   * Validates email value and returns true if it's valid.
   * @param value Email value.
   */
  private validateEmail(value: string): boolean {
    return EMAIL_REGEX.test(value);
  }

  /**
   * Removes all emails from the emails-input.
   */
  private clearAll() {
    const emailNodes = this.componentNode.querySelectorAll(
      `.${EmailsInputComponent.EMAIL_CLASSNAME}`,
    );
    emailNodes.forEach((emailNode) => {
      this.componentNode.removeChild(emailNode);
      this.removeCallback?.(emailNode.textContent as string);
    });
    this.emailList = [];
    this.saveHiddenInputValue();
  }

  /**
   * Adds new email to the emails input.
   * @param emailValue Email value that needs to be added to the emails input.
   */
  addEmail(emailValue: string): any {
    emailValue = emailValue.trim();

    if (emailValue === '') {
      return;
    }

    if (emailValue.indexOf(SEPARATOR) !== -1) {
      const emailValueList = emailValue.split(SEPARATOR);
      return emailValueList.forEach((item) => this.addEmail(item));
    }

    if (this.emailList.some((item) => item.value === emailValue)) {
      return console.error(`Value "${emailValue}" is already in the list!`);
    }

    const isValid = this.validateEmail(emailValue);
    const emailNode = this.createEmailElement(emailValue, isValid);
    this.componentNode.insertBefore(emailNode, this.input);

    this.emailList.push({ value: emailValue, valid: isValid });
    this.saveHiddenInputValue();
    this.input.value = '';
    this.addCallback?.(emailValue);
  }

  /**
   * Removes existing email from the emails input.
   * @param emailValue Email value that needs to be removed from the emails input.
   */
  removeEmail(emailValue: string) {
    const emailNode = Array.prototype.slice
      .call(this.componentNode.querySelectorAll(`.${EmailsInputComponent.EMAIL_CLASSNAME}`))
      .filter((node) => node.textContent === emailValue)[0];
    this.componentNode.removeChild(emailNode);
    this.emailList = this.emailList.filter((item) => item.value !== emailValue);
    this.saveHiddenInputValue();
    this.removeCallback?.(emailValue);
  }

  /**
   * Returns the list of all emails added to the emails-input. Both valid and invalid.
   */
  getEmails(): Email[] {
    return this.emailList;
  }

  /**
   * Replaces all emails added to the emails-input with provided email list.
   * @param newEmailValues A list of new email values that need to be added to the emails input.
   */
  replaceAll(newEmailValues: string[]) {
    this.clearAll();
    newEmailValues.forEach((value) => this.addEmail(value));
  }

  /**
   * Callback firing when the email is added to the emails-input.
   * @param callback Callback handler function.
   */
  onEmailAdded(callback: any) {
    this.addCallback = (emailValue: string) => callback(emailValue);
  }

  /**
   * Callback firing when the email is removed from the emails-input.
   * @param callback Callback handler function.
   */
  onEmailRemoved(callback: any) {
    this.removeCallback = (emailValue: string) => callback(emailValue);
  }
}
