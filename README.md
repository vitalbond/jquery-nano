# jquery-nano.js

A lightweight jQuery-like library.

## Getting Started

## API

### General

#### $(document).ready(handler) or $(handler)

```
$(document).ready(function () {
    // do smth
});
```
```
$(function () {
    // do smth
});
```

### Selectors

```
$('span')
```
```
$('span').get(n)
```
```
$('span').length
```

### Elements

#### .addClass(className)
#### .removeClass(className)
#### .toggleClass(className [, state])
#### .hasClass(className)

#### .after(content)
**content**  
Type: htmlString or Element or Text or Array or jQueryNano
#### .before(content)
#### .append(content)
#### .prepend(content)
