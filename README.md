# TargetReactHOC

This is an example of how to do testing with Adobe Target and React

## How it works

This HOC will only work for simple static stuff in your components, which doesn't change anything. So itsn't possible to overwrite input fields which as a state handler or something like that.

But if you have a simple text which is toggling then its very simple to use the `TargetHOC.js` function. Just wrap you component with it, like the example `example/components/TargetExample.js`. Then you would need to execute the `targetUpdate()` prop, which is inherit from the `TargetHOC` component.

Here is a somple way to update your component with Target changes.

```javascript
...
componentDidUpdate() {
    if (this.props.targetUpdate) {
        this.props.targetUpdate();
    }
}
```
