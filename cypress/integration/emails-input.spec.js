
describe('EmailsInputComponent', () => {
  before(() => {
    // arrange
    cy.visit('index.html');
  })

  it('should focus the input when clicking on the email input component', () => {
    // act
    cy.get('.emails-input').click();

    // assert
    cy.get('.emails-input__input').should('be.focused');
  })

  it('should add entity on ENTER and COMMA key', () => {
    // act
    cy.get('.emails-input__input').type('HelloWorld{enter}jason.bourne@mail.com,foma.kiniaev@aol.com,');

    // assert
    cy.get('.emails-input__entity:nth-child(1)').should('contain.text', 'HelloWorld');
    cy.get('.emails-input__entity:nth-child(2)').should('contain.text', 'jason.bourne@mail.com');
    cy.get('.emails-input__entity:nth-child(3)').should('contain.text', 'foma.kiniaev@aol.com');
  })

  it('should remove entity on BACKSPACE key', () => {
    // act
    cy.get('.emails-input__input').type('{backspace}{backspace}{backspace}');

    // assert
    cy.get('.emails-input__entity').should('not.exist');
  })

  it('should distinguish valid and invalid emails', () => {
    // act
    cy.get('.emails-input__input').type('HelloWorld{enter}foma.kiniaev@gmail.com{enter}');

    // assert
    cy.get('.emails-input__entity:nth-child(1)').should('have.class', 'is-invalid');
    cy.get('.emails-input__entity:nth-child(2)').should('not.have.class', 'is-invalid');
  })

  it('should remove entity on clicking remove entity button', () => {
    // act
    cy.get('.emails-input__entity-btn').click({ multiple: true });

    // assert
    cy.get('.emails-input__entity').should('not.exist');
  })

  it('should add random email on clicking "Add email" button', () => {
    // act
    for (let i = 0; i < 10; i++) {
      cy.get('[data-component="add-random"]').click();
    }

    // assert
    cy.get('.emails-input__entity').should('have.length', 10);
  })

  it('should return valid emails count on clicking "Get emails count" button', () => {
    // arrange
    cy.get('.emails-input__input').type('InvalidEmail,valid@email.com');
    const stub = cy.stub()
    cy.on ('window:alert', stub)

    // act
    cy.get('[data-component="get-valid-count"]').click().then(() => {
      // assert
      expect(stub.getCall(0)).to.be.calledWith('Valid emails count: 11')
    });
  })
})