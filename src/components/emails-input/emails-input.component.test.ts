import EmailsInputComponent from './emails-input.component';

describe('EmailsInputComponent', () => {
  let emailsInputComponent: EmailsInputComponent;

  beforeAll(() => {
    // arrange
    const mockNodeContainer = document.createElement('div');
    mockNodeContainer.setAttribute('data-component', 'emails-input');
    mockNodeContainer.setAttribute('id', 'qa-emails-input');
    emailsInputComponent = new EmailsInputComponent(mockNodeContainer);
    emailsInputComponent.onEntityAdded(() => {});
    emailsInputComponent.onEntityRemoved(() => {});
  });

  test('should render', () => {
    // assert
    expect(EmailsInputComponent).toBeTruthy();
  });

  it('should add entity', () => {
    // act
    emailsInputComponent.addEntity('foma@kiniaev.com');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual(['foma@kiniaev.com']);
  });

  it('should not add entity if it is empty', () => {
    // act
    emailsInputComponent.addEntity('');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual(['foma@kiniaev.com']);
  });

  it('should not add same entity twice', () => {
    // act
    emailsInputComponent.addEntity('foma@kiniaev.com');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual(['foma@kiniaev.com']);
  });

  it('should add invalid entity', () => {
    // act
    emailsInputComponent.addEntity('Foma Kiniaev');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual(['foma@kiniaev.com', 'Foma Kiniaev']);
  });

  it('should replace all entities', () => {
    // act
    emailsInputComponent.replaceAll(['Jason Bourne', 'hideo@kodjima.com']);

    // assert
    expect(emailsInputComponent.getEntities()).toEqual(['Jason Bourne', 'hideo@kodjima.com']);
  });

  it('should remove entitity on button click', () => {
    const clickHandler: any = jest.fn();
    const buttons = [
      ...emailsInputComponent.component.querySelectorAll(
        EmailsInputComponent.REMOVE_BUTTON_CLASSNAME,
      ),
    ] as HTMLElement[];
    console.log('Buttons', emailsInputComponent.component);
    buttons.forEach((btn) => {
      btn.addEventListener('click', clickHandler);
    });
    const testClick = (list: HTMLElement[]) => {
      if (list.length) {
        list.forEach((item) => {
          item.click();
        });
      }
    };
    testClick(buttons);
    expect(emailsInputComponent.getEntities()).toEqual(['Jason Bourne', 'hideo@kodjima.com']);
  });
});
