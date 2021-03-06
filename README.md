# DeepLink
`deeplink.js` is a microframework for introducing a bit of reactivity into your code without a heafty MVC
*Update* __Now Working__
## What is it
deeplink is a tool to help make functions execute when you change a variable's value.
Unlike other libraries ([RxJS](https://github.com/ReactiveX/rxjs) or [Svelte](https://svelte.dev)) it manages to be small and only includes the pure minimum needed for reactivity in about 70 lines (including comments)! This allows you to hack, modify, and otherwise extend or shrink the code to your use case.
## How to use
Add the code in `deeplink.js` to your code through any method you deem fit. No npm needed.
Make sure it can access and modify globals, though.
```javascript
    //set up a variable (or use an existing one)
    example = 0;
    //create a new DeepLink. Remember to always surround the variable with {}
    new DeepLink({example});
    //add some reactivity by binding a function (use an arrow function)
    DeepLink.react({example},()=>{console.log("testing: "+example)});
    
    example = 1; //should print out "testing: 1"

    //remove DeepLink and variable
    DeepLink.remove({example});
```
You can use multiple variables in `DeepLink.react` and `DeepLink.remove`. Just be sure to write them as `{var1,var2,etc..}`.
## Issues
* Currently, it relies on a global object that is accessible and modifiable (i.e. on a webpage). This also means that it only works with globally scoped variables
* Also, there is no auto-clean up of unused reactive statements (even when manually removed), so you might want to look out for that if you make a lot of them.
* Objects might be funky in terms of reactivity.
* Remember to **NOT** use `let` or `const` for reactive variables. I'm still trying to find a clever way that allows them, but using one of these scopes it into a weird psudo-global.
* Overall, I would say to not use it in a production enviroment, although nobody really listens to those warnings...
