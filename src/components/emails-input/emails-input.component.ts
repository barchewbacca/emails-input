import './emails-input.component.scss';

// enum Key {
//   BACKSPACE = 8,
//   TAB = 9,
//   ENTER = 13,
//   LEFT = 37,
//   RIGHT = 39,
//   DELETE = 46,
//   COMMA = 188,
// }

export default class EmailsInputComponent {
  static readonly CLASSNAME = 'emails-input';

  private parentNode: (Node & ParentNode) | null;
  private container: Element;

  constructor(container: Element) {
    this.container = container;
    this.parentNode = this.container.parentNode;
    this.initComponent();
    this.addEventListeners();
  }

  private initComponent() {
    const emailsInputMarkup = `
      <div class="emails-input">
        <input class="emails-input__input" type="text" placeholder="add more people...">
      </div>
    `;

    this.container.outerHTML = emailsInputMarkup;

    // const emailsInput = document.createElement('div', 'test');
    // emailsInput.classList.add(CLASSNAME);
    // const emailsInput = document.createElement('div');
    // containerNode.parentNode.replaceChild(emailsInput, containerNode);
  }

  private addEventListeners() {
    const input = this.parentNode?.querySelector('input');
    input?.addEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const key = event.keyCode || event.which;
    // console.log('Keycode', key);

    // switch (key) {
    //   case Key.ENTER:
    //   case Key.COMMA:
    //   case Key.ENTER:
    //   case Key.TAB:
    // }
  };
}
