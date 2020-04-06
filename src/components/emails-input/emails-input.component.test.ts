import EmailsInputComponent, { Key } from './emails-input.component';

describe('EmailsInputComponent', () => {
  let emailsInputComponent: EmailsInputComponent;
  let mockContainerNode: HTMLElement;

  describe('when container node null', () => {
    test('should throw an error', () => {
      // arrange
      mockContainerNode = (null as unknown) as HTMLElement;
      try {
        // act
        emailsInputComponent = new EmailsInputComponent(mockContainerNode);
      } catch (error) {
        // assert
        expect(error).toEqual(new Error('Container node is not found.'));
      }
    });
  });

  describe('when container node is provided', () => {
    beforeAll(() => {
      // arrange
      mockContainerNode = document.createElement('div');
      mockContainerNode.setAttribute('data-component', 'emails-input');
      mockContainerNode.setAttribute('id', 'qa-emails-input');
      mockContainerNode.setAttribute('name', 'qa-emails-name');
      const mockNodeParentContainer = document.createElement('div');
      mockNodeParentContainer.appendChild(mockContainerNode);
      emailsInputComponent = new EmailsInputComponent(mockContainerNode);
      emailsInputComponent.onEmailAdded(() => {});
      emailsInputComponent.onEmailRemoved(() => {});
    });

    test('should render', () => {
      // assert
      expect(EmailsInputComponent).toBeTruthy();
    });

    it('should add email', () => {
      // act
      emailsInputComponent.addEmail('foma@kiniaev.com');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'foma@kiniaev.com', valid: true },
      ]);
    });

    it('should not add email if it is empty', () => {
      // act
      emailsInputComponent.addEmail('');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'foma@kiniaev.com', valid: true },
      ]);
    });

    it('should not add same email twice', () => {
      // act
      console.error = jest.fn();
      emailsInputComponent.addEmail('foma@kiniaev.com');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'foma@kiniaev.com', valid: true },
      ]);
      expect(console.error).toHaveBeenCalledWith(
        'Value "foma@kiniaev.com" is already in the list!',
      );
    });

    it('should add invalid email', () => {
      // act
      emailsInputComponent.addEmail('Foma Kiniaev');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'foma@kiniaev.com', valid: true },
        { value: 'Foma Kiniaev', valid: false },
      ]);
    });

    it('should remove email', () => {
      // act
      emailsInputComponent.removeEmail('foma@kiniaev.com');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([{ value: 'Foma Kiniaev', valid: false }]);
    });

    it('should replace all emails', () => {
      // act
      emailsInputComponent.replaceAll(['hideo@kodjima.com']);

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'hideo@kodjima.com', valid: true },
      ]);
    });

    it('should parse provided csv string and add email for each item', () => {
      // act
      emailsInputComponent.addEmail('test@test.com,test@hello,');

      // assert
      expect(emailsInputComponent.getEmails()).toEqual([
        { value: 'hideo@kodjima.com', valid: true },
        { value: 'test@test.com', valid: true },
        { value: 'test@hello', valid: false },
      ]);
    });

    it('should remove email on BACKSPACE key', () => {
      // arrange
      emailsInputComponent.removeEmail = jest.fn();

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.BACKSPACE,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.removeEmail).toHaveBeenCalledWith('test@hello');
    });

    it('should not call remove email on BACKSPACE key if no emails left or value not empty', () => {
      // arrange
      emailsInputComponent['input'].value = 'test-backspace';
      emailsInputComponent.removeEmail = jest.fn();

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.BACKSPACE,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.removeEmail).not.toHaveBeenCalled();
    });

    it('should add email on COMMA key', () => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      emailsInputComponent['input'].value = 'test-comma';

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.COMMA,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.addEmail).toHaveBeenCalledWith('test-comma');
    });

    it('should add email on TAB key', () => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      emailsInputComponent['input'].value = 'test-tab';

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.TAB,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.addEmail).toHaveBeenCalledWith('test-tab');
    });

    it('should not add email on TAB key when value is empty', () => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      emailsInputComponent['input'].value = '';

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.TAB,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.addEmail).not.toHaveBeenCalled();
    });

    it('should add email on ENTER key', () => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      emailsInputComponent['input'].value = 'test-enter';

      // act
      emailsInputComponent['handleKeydown']({
        keyCode: Key.ENTER,
        preventDefault: () => {},
      } as KeyboardEvent);

      // assert
      expect(emailsInputComponent.addEmail).toHaveBeenCalledWith('test-enter');
    });

    it('should add styles on component focus', () => {
      // act
      emailsInputComponent['handleComponentFocus']();

      // assert
      expect(mockContainerNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME)).toBe(
        true,
      );
    });

    it('should add styles on input focus', () => {
      // act
      emailsInputComponent['handleInputFocus']();

      // assert
      expect(mockContainerNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME)).toBe(
        true,
      );
    });

    it('should add email and remove focus styling on blur', () => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      mockContainerNode.classList.add(EmailsInputComponent.FOCUSED_CLASSNAME);
      emailsInputComponent['input'].value = 'test-blur';

      // act
      emailsInputComponent['handleBlur']();

      // assert
      expect(mockContainerNode.classList.contains(EmailsInputComponent.FOCUSED_CLASSNAME)).toBe(
        false,
      );
      expect(emailsInputComponent.addEmail).toHaveBeenCalledWith('test-blur');
    });

    it('should parse string and add emails on paste', (done) => {
      // arrange
      emailsInputComponent.addEmail = jest.fn();
      emailsInputComponent['input'].value = 'test-paste-1, test-paste-2, test-paste-3';

      // act
      emailsInputComponent['handlePaste']();

      // assert
      setTimeout(() => {
        expect(emailsInputComponent.addEmail).toHaveBeenCalledTimes(3);
        done();
      }, 0);
    });
  });
});
