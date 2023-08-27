# IfElif 🔗 

Chainable functions for all kind of conditions? 🐤 Sounds cool!

IfElif is a very simple Javascript package 📦 that allows you to create conditional statements as chainable methods.
Every IfElif chain returns the result of the first condition that is true. If none of the conditions are true, it returns null.
It's basically the same as ternary operator (true ? 'yes' : 'no') but with better readability and `else if` support. 🎉

I made this package, because I didn't like the way **React 🐬** handles conditional rendering as a **Vue.js ☘️** developer.
React uses ternary operator for conditional rendering, while Vue.js uses `v-if`, `v-else-if`, and `v-else` directives.
I wanted to use a similar approach in React, so I created IfElif. 

> React developers, scroll down to the bottom of the page to see an example of IfElif usage in React. 

## Installation

You can install IfElif using your favorite package manager.

```bash
npm install ifelif
```

```bash
yarn add ifelif
```

## Usage

```javascript
const { _if } = require('ifelif');

const result = _if(true)
  .then('yes')
  .else('no');

console.log(result); // yes
```

## API 📚

- `_if(boolean)` Creates a new IfElif instance with the given condition.

- `.elif(boolean)` Adds a new condition to the IfElif instance.

- `.else()` Adds an else condition to the IfElif instance.

- `.then(callback|value)` If the condition before this method is true, it will execute the callback or return the value.

- `.end()` Ends the IfElif instance and returns the result. Must be called at the end of the chain if `.else()` is not used.

- `.else(callback|value)` Alias for `.else().then(callback|value)`.

- `.elseIf(boolean)` Alias for `.elif(boolean)`.

### Examples

We can chain multiple conditions

```javascript
const number = 5;

const result = 
_if(number > 10)
  .then('greater than 10')
  .elif(number > 5)
  .then('greater than 5')
  .elif(number > 0)
  .then('greater than 0')
  .end(); // since we don't have an else condition, we need to call end() to get the result

console.log(result); // greater than 0
```

We can use functions as callbacks

```javascript
const name = 'John';

_if(name === 'John')
  .then(() => console.log('Hello John!'))
  .else(() => console.log('Hello stranger!'));

// Hello John!
```

We can use values instead of callbacks

```javascript
const name = 'John';

const result = _if(name === 'John')
  .then('Hello John!')
  .else('Hello stranger!');

console.log(result); // Hello John!
```

We can use `.elseIf()` instead of `.elif()`

```javascript

const age = 18;

const result = _if(age > 18)
  .then('You are an adult')
  .elseIf(age > 13)
  .then('You are a teenager')
  .else()
  .then('You are a child');

console.log(result); // You are a teenager
```

If you are developing React applications, you can use IfElif to render components conditionally (this is the main reason I created this package)

```javascript
const App = () => {
  // ...
  return (
    <div>
      {
        _if(!users || !messages).then(<LoadingComponent />)
          .elif(panel === 'users').then(<>
            <SearchComponent />
            <UsersComponent
              users={users}
              onUserClick={openChat}
            />
          </>)
          .elif(panel === 'chat').then(
            <>
              <MessagesComponent messages={messages} />
              <ColumnComponent>
                <AttachmentComponent />
                <MessageInputComponent />
              </ColumnComponent>
            </>)
          .else(<AlertComponent message="Panel not found!" />)
      }
    </div>
  );
};
```

instead of

```javascript
const App = () => {
  // ...
  return (
    <div>
      {
        !users || !messages
        ? <LoadingComponent />
        : panel === 'users'
          ? <>
            <SearchComponent />
            <UsersComponent
              users={users}
              onUserClick={openChat}
            />
          </>
          : panel === 'chat'
            ? <>
              <MessagesComponent messages={messages} />
              <ColumnComponent>
                <AttachmentComponent />
                <MessageInputComponent />
              </ColumnComponent>
            </>
            : <AlertComponent message="Panel not found!" />
      }
    </div>
  );
};
```

IfElif approach is much more readable and easier to maintain, as you can see in the examples above. You can also use IfElif in every other Javascript project, not just React.

## License

IfElif is licensed under the MIT license. See [LICENSE](LICENSE) for more information.
