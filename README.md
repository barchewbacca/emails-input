<p align="center">
  <img src="screenshot.png" alt="Emails input screenshot">
</p>
<h3 align="center">Emails Input Component</h3>

---

## 📝 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Tests](#tests)
- [Tools](#tools)

## 🧐 About <a name = "about"></a>

This repo is made to showcase one of the test assignments which I have done. The task is to build a
component which is an implementation of input where you may add multiple emails.

### Requirements:

- Email block should be created by pressing Enter, entering comma, or by losing focus on the input
  field. A Block can be deleted.
- Input width must depend on the parent container’s width and height. If parent width changes,
  emails should be redistributed by rows.
- Other than that input should neither depend on the form or page styles, nor conflict with them.
- If input has too many emails, user should be able to scroll it.
- Pasted emails should be converted into blocks immediately. If multiple comma-separated emails are
  pasted (e.g., “ivan@mail.ru, max@mail.ru”), they should be converted into multiple blocks.
- "Add email" button adds a random email to the list.
- "Get emails count" button shows an alert with valid emails count.
- Do NOT implement editing of added emails.
- It should be possible to create several emails editors on the same page.
- emails-input should have no external dependencies like React, Lodash or any polyfills.
- Performance isn’t a big concern, but there should be no major flaws, such as memory leaks or
  re-rendering all email blocks every time you add or remove a single email.
- An emails-input instance should implement the following API: A method to get all entered emails.
  Both valid and invalid. A method to replace all entered emails with new ones. Ability to subscribe
  for emails list changes.

## 🎮 Demo <a name = "demo"></a>

Live demo available here: https://barchewbacca.github.io/emails-input/

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for
development and testing purposes.

### Install dependencies

```sh
# yarn
yarn

# npm
npm install
```

### Development

For development it is more handy to use webpack-dev-server with hot modules replacement.

```sh
# yarn
yarn start

# npm
npm run start
```

> ⚠️ Keep in mind that this step cleans the `/dist` folder.

### Production

Production build generates the `/dist` folder with assets which are required by the local
`index.html` page and the e2e tests.

```sh
# yarn
yarn build

# npm
npm run build
```

## 🔧 Running tests <a name = "tests"></a>

There are both unit and e2e tests implemented for our component.

### Unit tests

In order to develop the unit tests with a watcher run:

```sh
# yarn
yarn test

# npm
npm run test
```

In order to check unit tests coverage rates run:

```sh
# yarn
yarn test:coverage

# npm
npm run test:coverage
```

You may also open the coverage report locally from here:
`coverage/lcov-report/emails-input.component.ts.html`

<img src="unit-report.png" alt="Unit tests report screenshot">

### e2e tests

In order to check e2e tests coverage headlessly(without displaying the browser) run:

```sh
# yarn
yarn e2e

# npm
npm run e2e
```

In order to check e2e tests coverage headed(with displaying the browser) run:

```sh
# yarn
yarn e2e:headed

# npm
npm run e2e:headed
```

In order to develop e2e tests run:

```sh
# yarn
yarn e2e:open

# npm
npm run e2e:open
```

You may find the e2e tests captured video here: `cypress/videos/`

<img src="e2e-report.gif" alt="e2e tests report screenshot">

## 🎈 Usage <a name="usage"></a>

#### Create markup

You may also want to pass the usual attributes of the input:

```html
<div
  data-component="emails-input"
  id="emails-input-id-1"
  name="emails-input-name-1"
  placeholder="add more people..."
></div>
```

#### Initialize component

```ts
// get the element
const emailsInput = document.querySelector('[data-component="emails-input"]') as HTMLElement;

// initialize the emails-input component on the element
const emailsInputInstance = new EmailsInputComponent(emailsInput);
```

#### Methods

Methods are called on emails-input instances.

```ts
// add email
emailsInputInstance.addEmail('test@gmail.com');

// remove email
emailsInputInstance.removeEmail('test@gmail.com');

// get emails
emailsInputInstance.getEmails();

// replace all
emailsInputInstance.replaceAll(['valid@email.com', 'invalid email']);

// on email added
emailsInputInstance.onEmailAdded((email: string) => console.log('Added:', email));

// on email removed
emailsInputInstance.onEmailRemoved((email: string) => console.log('Removed:', email));
```

| Method           | Argument                 | Description                                                                  |
| ---------------- | ------------------------ | ---------------------------------------------------------------------------- |
| `addEmail`       | emailValue: string       | Adds new email to the list. Email won't be added if it's already in the list |
| `removeEmail`    | emailValue: string       | Removes existing email from the list                                         |
| `getEmails`      |                          | Returns all emails, both valid and invalid                                   |
| `replaceAll`     | newEmailValues: string[] | Replaces all emails added to the emails-input with provided email list       |
| `onEmailAdded`   | callback: function       | Callback firing when the email is added to the emails-input                  |
| `onEmailRemoved` | callback: function       | Callback firing when the email is removed from the emails-input              |

## ⛏️ Tools <a name = "tools"></a>

- [TypeScipt](https://www.typescriptlang.org/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Sass](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)
