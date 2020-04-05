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

interface Entity {
  value: string;
  valid: boolean;
}

export default class EmailsInputComponent {
  static readonly COMPONENT_CLASSNAME = 'emails-input';
  static readonly INPUT_CLASSNAME = 'emails-input__input';
  static readonly ENTITY_CLASSNAME = 'emails-input__entity';
  static readonly REMOVE_BUTTON_CLASSNAME = 'emails-input__entity-btn';
  static readonly FOCUSED_CLASSNAME = 'is-focused';
  static readonly INVALID_CLASSNAME = 'is-invalid';

  /**
   * Component node which contains the entities and the input.
   * @type {HTMLElement}
   * @memberof EmailsInputComponent
   */
  componentNode: HTMLElement;

  /**
   * The hidden input that holds the value of all valid added entities.
   * This value is taken on form submit.
   * @private
   * @type {HTMLInputElement}
   * @memberof EmailsInputComponent
   */
  private _hiddenInput: HTMLInputElement;

  /**
   * The input which is responsible for adding and removing new entities.
   * @private
   * @type {HTMLInputElement}
   * @memberof EmailsInputComponent
   */
  private _input: HTMLInputElement;

  /**
   * List containing all the added entities. Both valid and invalid.
   * @private
   * @type {Entity[]}
   * @memberof EmailsInputComponent
   */
  private _entityList: Entity[] = [];

  /**
   * Callback which returns added entity value.
   * @private
   * @memberof EmailsInputComponent
   */
  private _addCallback: (entityValue: string) => string;

  /**
   * Callback which returns removed entity value.
   * @private
   * @memberof EmailsInputComponent
   */
  private _removeCallback: (entityValue: string) => string;

  constructor(private _containerNode: HTMLElement) {
    this._renderComponent();
    this._addEventListeners();
  }

  /**
   * Renders emails input component and the input inside of it.
   * Replaces container node with the generated element.
   */
  private _renderComponent() {
    this.componentNode = this._createElement('div', EmailsInputComponent.COMPONENT_CLASSNAME);
    this.componentNode.tabIndex = 0;

    const attributes = Array.prototype.slice
      .call(this._containerNode.attributes)
      .filter((att) => att.name !== 'data-component');

    this._input = this._createElement(
      'input',
      EmailsInputComponent.INPUT_CLASSNAME,
    ) as HTMLInputElement;
    this._input.type = 'email';
    const inputAttributes = attributes.filter((att) => att.name !== 'name');
    inputAttributes.forEach((att) => this._input.setAttribute(att.name, att.value));
    this.componentNode.appendChild(this._input);

    this._hiddenInput = this._createElement('input') as HTMLInputElement;
    this._hiddenInput.type = 'hidden';
    const hiddenInputAttributes = attributes.filter((att) => att.name === 'name');
    hiddenInputAttributes.forEach((att) => this._hiddenInput.setAttribute(att.name, att.value));
    this.componentNode.appendChild(this._hiddenInput);

    this._containerNode?.parentNode?.replaceChild(this.componentNode, this._containerNode);
  }

  /**
   * Saves all the valid entities as a value of the hidden input.
   */
  private _saveHiddenInputValue() {
    this._hiddenInput.value = this._entityList
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
  private _createElement<K extends keyof HTMLElementTagNameMap>(
    type: K,
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
   * Adds event listeners to the emails input.
   */
  private _addEventListeners() {
    this.componentNode.addEventListener('focus', this._handleComponentFocus);
    this._input.addEventListener('focus', this._handleInputFocus);
    this._input.addEventListener('blur', this._handleBlur);
    this._input.addEventListener('paste', this._handlePaste);
    this._input.addEventListener('keydown', this._handleKeydown);
  }

  /**
   * Handles focus event on component. Redirects focus to the input and styles the emails input.
   * @private
   * @memberof EmailsInputComponent
   */
  private _handleComponentFocus = () => {
    this._input.focus();
    this.componentNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles focus event on input and styles emails input.
   * @private
   * @memberof EmailsInputComponent
   */
  private _handleInputFocus = () => {
    this.componentNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles blur event. Adds entity if it's not empty and removes focus styling.
   * @private
   * @memberof EmailsInputComponent
   */
  private _handleBlur = () => {
    this.addEntity(this._input.value);
    this.componentNode.classList.remove(EmailsInputComponent.FOCUSED_CLASSNAME);
  };

  /**
   * Handles paste event. Parses the pasted string and adds entities.
   * @private
   * @memberof EmailsInputComponent
   */
  private _handlePaste = () => {
    setTimeout(() => this._input.value.split(SEPARATOR).forEach((item) => this.addEntity(item)), 0);
  };

  /**
   * Handles keydown event.
   * On pressing ENTER and COMMA adds entity to the emails input.
   * On pressing TAB adds entity to the emails input. If the value in empty focus jumps to the next tabindex.
   * On pressing BACKSPACE removes the last entity in the list.
   * @private
   * @memberof EmailsInputComponent
   */
  private _handleKeydown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case Key.ENTER:
      case Key.COMMA:
        event.preventDefault();
        this.addEntity(this._input.value);
        break;
      case Key.TAB:
        const inputValue = this._input.value;

        if (inputValue === '') {
          return;
        }

        event.preventDefault();
        this.addEntity(inputValue);
        break;
      case Key.BACKSPACE:
        const lastEntity = this._entityList[this._entityList.length - 1];

        if (this._input.value === '' && lastEntity) {
          event.preventDefault();
          this.removeEntity(lastEntity.value);
        }
        break;
    }
  };

  /**
   * Adds new entity to the emails input.
   * @param entityValue Entity value that needs to be added to the emails input.
   */
  addEntity(entityValue: string) {
    entityValue = entityValue.trim();

    if (entityValue === '') {
      return;
    }

    if (this._entityList.some((item) => item.value === entityValue)) {
      return;
    }

    const removeBtn = this._createElement('button', EmailsInputComponent.REMOVE_BUTTON_CLASSNAME);
    removeBtn.innerHTML = REMOVE_ICON;
    removeBtn.addEventListener('click', () => this.removeEntity(entityValue));

    const isValid = EMAIL_REGEX.test(entityValue);
    const className = isValid
      ? EmailsInputComponent.ENTITY_CLASSNAME
      : `${EmailsInputComponent.ENTITY_CLASSNAME} ${EmailsInputComponent.INVALID_CLASSNAME}`;
    const entityNode = this._createElement('div', className, entityValue);
    entityNode.appendChild(removeBtn);
    this.componentNode.insertBefore(entityNode, this._input);
    this._entityList.push({ value: entityValue, valid: isValid });
    this._saveHiddenInputValue();
    this._input.value = '';
    this._addCallback?.(entityValue);
  }

  /**
   * Removes existing entity from the emails input.
   * @param entityValue Entity value that needs to be removed from the emails input.
   */
  removeEntity(entityValue: string) {
    const entityNode = Array.prototype.slice
      .call(this.componentNode.querySelectorAll(`.${EmailsInputComponent.ENTITY_CLASSNAME}`))
      .filter((node) => node.textContent === entityValue)[0];
    this.componentNode.removeChild(entityNode);
    this._entityList = this._entityList.filter((item) => item.value !== entityValue);
    this._saveHiddenInputValue();
    this._removeCallback?.(entityValue);
  }

  /**
   * Returns the list of all entities added to the emails-input. Both valid and invalid.
   */
  getEntities(): Entity[] {
    return this._entityList;
  }

  /**
   * Replaces all entities added to the emails-input with provided entity list.
   * @param newEntityValues A list of new entity values that need to be added to the emails input.
   */
  replaceAll(newEntityValues: string[]) {
    this._entityList.forEach((item) => this.removeEntity(item.value));
    newEntityValues.forEach((value) => this.addEntity(value.trim()));
  }

  /**
   * Callback firing when the entity is added to the emails-input.
   * @param callback Callback handler function.
   */
  onEntityAdded(callback: any) {
    this._addCallback = (entityValue: string) => callback(entityValue);
  }

  /**
   * Callback firing when the entity is removed from the emails-input.
   * @param callback Callback handler function.
   */
  onEntityRemoved(callback: any) {
    this._removeCallback = (entityValue: string) => callback(entityValue);
  }
}
