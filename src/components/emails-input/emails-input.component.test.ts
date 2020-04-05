import EmailsInputComponent, { Key } from './emails-input.component';

describe('EmailsInputComponent', () => {
  let emailsInputComponent: EmailsInputComponent;

  beforeAll(() => {
    // arrange
    const mockNodeContainer = document.createElement('div');
    mockNodeContainer.setAttribute('data-component', 'emails-input');
    mockNodeContainer.setAttribute('id', 'qa-emails-input');
    mockNodeContainer.setAttribute('name', 'qa-emails-name');
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
    expect(emailsInputComponent.getEntities()).toEqual([
      { value: 'foma@kiniaev.com', valid: true },
    ]);
  });

  it('should not add entity if it is empty', () => {
    // act
    emailsInputComponent.addEntity('');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual([
      { value: 'foma@kiniaev.com', valid: true },
    ]);
  });

  it('should not add same entity twice', () => {
    // act
    emailsInputComponent.addEntity('foma@kiniaev.com');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual([
      { value: 'foma@kiniaev.com', valid: true },
    ]);
  });

  it('should add invalid entity', () => {
    // act
    emailsInputComponent.addEntity('Foma Kiniaev');

    // assert
    expect(emailsInputComponent.getEntities()).toEqual([
      { value: 'foma@kiniaev.com', valid: true },
      { value: 'Foma Kiniaev', valid: false },
    ]);
  });

  it('should replace all entities', () => {
    // act
    emailsInputComponent.replaceAll(['hideo@kodjima.com']);

    // assert
    expect(emailsInputComponent.getEntities()).toEqual([
      { value: 'hideo@kodjima.com', valid: true },
    ]);
  });

  it('should remove entitity on BACKSPACE key', () => {
    // arrange
    emailsInputComponent.removeEntity = jest.fn();

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.BACKSPACE,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.removeEntity).toHaveBeenCalledWith('hideo@kodjima.com');
  });

  it('should not call remove entitity on BACKSPACE key if no entities left or value not empty', () => {
    // arrange
    emailsInputComponent['_input'].value = 'test-backspace';
    emailsInputComponent.removeEntity = jest.fn();

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.BACKSPACE,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.removeEntity).not.toHaveBeenCalled();
  });

  it('should add entitity on COMMA key', () => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent['_input'].value = 'test-comma';

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.COMMA,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.addEntity).toHaveBeenCalledWith('test-comma');
  });

  it('should add entitity on TAB key', () => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent['_input'].value = 'test-tab';

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.TAB,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.addEntity).toHaveBeenCalledWith('test-tab');
  });

  it('should not add entitity on TAB key when value is empty', () => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent['_input'].value = '';

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.TAB,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.addEntity).not.toHaveBeenCalled();
  });

  it('should add entitity on ENTER key', () => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent['_input'].value = 'test-enter';

    // act
    emailsInputComponent['_handleKeydown']({
      keyCode: Key.ENTER,
      preventDefault: () => {},
    } as KeyboardEvent);

    // assert
    expect(emailsInputComponent.addEntity).toHaveBeenCalledWith('test-enter');
  });

  it('should add styles on component focus', () => {
    // act
    emailsInputComponent['_handleComponentFocus']();

    // assert
    expect(
      emailsInputComponent.componentNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME),
    ).toBe(true);
  });

  it('should add styles on input focus', () => {
    // act
    emailsInputComponent['_handleInputFocus']();

    // assert
    expect(
      emailsInputComponent.componentNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME),
    ).toBe(true);
  });

  it('should add entity and remove focus styling on blur', () => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent.componentNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
    emailsInputComponent['_input'].value = 'test-blur';

    // act
    emailsInputComponent['_handleBlur']();

    // assert
    expect(
      emailsInputComponent.componentNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME),
    ).toBe(false);
    expect(emailsInputComponent.addEntity).toHaveBeenCalledWith('test-blur');
  });

  it('should parse string and add entites on paste', (done) => {
    // arrange
    emailsInputComponent.addEntity = jest.fn();
    emailsInputComponent['_input'].value = 'test-paste-1, test-paste-2, test-paste-3';

    // act
    emailsInputComponent['_handlePaste']();

    // assert
    setTimeout(() => {
      expect(emailsInputComponent.addEntity).toHaveBeenCalledTimes(3);
      done();
    }, 0);
  });
});
