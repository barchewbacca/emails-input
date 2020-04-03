enum Key {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  COMMA = 188,
}

const SEPARATOR = ',';

// interface Option {
//   key: string;
//   value: string;
// }

export default class EmailsInputComponent {
  static readonly COMPONENT_CLASSNAME = 'emails-input';
  static readonly INPUT_CLASSNAME = 'emails-input__input';
  static readonly ENTITY_CLASSNAME = 'emails-input__entity';
  static readonly REMOVE_BUTTON_CLASSNAME = 'emails-input__entity-btn';

  private containerNode: HTMLElement;
  // private options: Option[];
  component = this.createElement('div', EmailsInputComponent.COMPONENT_CLASSNAME);
  private input = this.createElement(
    'input',
    EmailsInputComponent.INPUT_CLASSNAME,
  ) as HTMLInputElement;
  private entities: string[] = [];
  private _addCallback: (entity: string) => string;
  private _removeCallback: (entity: string) => string;

  constructor(containerNode: HTMLElement) {
    this.containerNode = containerNode;
    // this.options = options;
    this.initComponent();
    this.addEventListeners();
  }

  private createElement<K extends keyof HTMLElementTagNameMap>(
    type: K,
    className: string,
    content?: string,
  ): HTMLElement | HTMLInputElement {
    const el = document.createElement(type);
    el.className = className;
    if (content) el.textContent = content;

    return el;
  }

  private initComponent() {
    this.containerNode
      .getAttributeNames()
      .filter((attName) => attName !== 'data-component')
      .forEach((attName) =>
        this.input.setAttribute(attName, this.containerNode.getAttribute(attName) as string),
      );
    this.component.tabIndex = 0;
    this.component.appendChild(this.input);
    this.containerNode?.parentNode?.replaceChild(this.component, this.containerNode);
  }

  private addEventListeners() {
    this.component.addEventListener('focus', () => {
      this.input.focus();
      this.component.classList.add('is-focused');
    });

    this.input.addEventListener('focus', () => this.component.classList.add('is-focused'));

    this.input.addEventListener('blur', () => {
      this.addEntity(this.input.value);
      this.component.classList.remove('is-focused');
    });

    this.input.addEventListener('paste', () =>
      setTimeout(
        () => this.input.value.split(SEPARATOR).forEach((item) => this.addEntity(item.trim())),
        0,
      ),
    );

    this.input.addEventListener('keydown', this.handleKeydown);
  }

  addEntity(value: string) {
    if (value === '') {
      return;
    }

    if (this.entities.some((item) => item === value)) {
      return;
    }

    const emailRegExp = /^\S+@\S+\.\S+$/;
    const isValid = emailRegExp.test(value);

    let className = EmailsInputComponent.ENTITY_CLASSNAME;
    if (!isValid) {
      className += ' invalid';
    }
    const entity = this.createElement('div', className, value);
    const icon =
      '<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" /></svg>';
    const removeBtn = this.createElement('button', EmailsInputComponent.REMOVE_BUTTON_CLASSNAME);
    removeBtn.innerHTML = icon;
    removeBtn.addEventListener('click', () => this.removeEntity(value));
    entity.appendChild(removeBtn);
    this.component.insertBefore(entity, this.input);
    this.entities.push(value);
    this.input.value = '';
    this._addCallback(value);
  }

  removeEntity(entityValue: string) {
    const entityNode = [
      ...this.component.querySelectorAll(`.${EmailsInputComponent.ENTITY_CLASSNAME}`),
    ].find((entity) => entity.textContent === entityValue) as Element;

    this.component.removeChild(entityNode);
    this.entities = this.entities.filter((item) => item !== entityValue);
    this._removeCallback(entityValue);
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const key = event.keyCode || event.which;
    switch (key) {
      case Key.ENTER:
      case Key.COMMA:
      case Key.ENTER:
        event.preventDefault();
        this.addEntity(this.input.value);
        break;
      case Key.TAB:
        if (this.input.value === '') {
          return;
        }
        event.preventDefault();
        this.addEntity(this.input.value);
        break;
      case Key.BACKSPACE:
        const lastEntity = this.entities[this.entities.length - 1];
        if (this.input.value === '' && lastEntity) {
          event.preventDefault();
          this.removeEntity(lastEntity);
        }
        break;
    }
  };

  getEntities(): string[] {
    return this.entities;
  }

  replaceAll(newEntities: string[]) {
    this.entities.forEach((item) => this.removeEntity(item));
    newEntities.forEach((item) => this.addEntity(item.trim()));
  }

  onEntityAdded(callback: any) {
    this._addCallback = (entity: string) => callback(entity);
  }

  onEntityRemoved(callback: any) {
    this._removeCallback = (entity: string) => callback(entity);
  }
}
