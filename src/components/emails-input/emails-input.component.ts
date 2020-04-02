import './emails-input.component.scss';

enum Key {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
  LEFT = 37,
  RIGHT = 39,
  DELETE = 46,
  COMMA = 188,
}

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
  private component = this.createElement('div', EmailsInputComponent.COMPONENT_CLASSNAME);
  private input = this.createElement(
    'input',
    EmailsInputComponent.INPUT_CLASSNAME,
  ) as HTMLInputElement;

  constructor(containerNode: HTMLElement) {
    this.containerNode = containerNode;
    // this.options = options;
    this.initComponent();
    this.addEventListeners();
  }

  private createElement<K extends keyof HTMLElementTagNameMap>(
    type: K,
    className?: string,
    content?: string,
  ): HTMLElement | HTMLInputElement {
    const el = document.createElement(type);
    if (className) el.className = className;
    if (content) el.textContent = content;

    return el;
  }

  private initComponent() {
    Array.from(this.containerNode.attributes)
      .filter((att) => att.name !== 'data-component')
      .forEach((att) => this.input.setAttribute(att.name, att.value));
    this.component.tabIndex = 0;
    this.component.appendChild(this.input);
    this.containerNode?.parentNode?.replaceChild(this.component, this.containerNode);
  }

  private addEventListeners() {
    this.component.addEventListener('focus', () => {
      this.input.focus();
    });

    this.input.addEventListener('keydown', this.handleKeydown);
  }

  private createEntity(value: string) {
    const entity = this.createElement('div', EmailsInputComponent.ENTITY_CLASSNAME, value);
    const icon =
      '<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><path d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" /></svg>';
    const removeBtn = this.createElement('button', EmailsInputComponent.REMOVE_BUTTON_CLASSNAME);
    removeBtn.innerHTML = icon;
    removeBtn.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLElement;
      target.parentNode?.parentNode?.removeChild(target.parentNode);
    });
    entity.appendChild(removeBtn);
    this.component.insertBefore(entity, this.input);
    this.input.value = '';
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const key = event.keyCode || event.which;
    switch (key) {
      case Key.ENTER:
      case Key.COMMA:
      case Key.ENTER:
      case Key.TAB:
        event.preventDefault();
        if (this.input.value) {
          this.createEntity(this.input.value);
        }
        break;
      case Key.BACKSPACE:
        const lastEntity = [
          ...this.component.querySelectorAll(`.${EmailsInputComponent.ENTITY_CLASSNAME}`),
        ].pop();
        if (this.input.value === '' && lastEntity) {
          this.component.removeChild(lastEntity);
        }
    }
  };
}
