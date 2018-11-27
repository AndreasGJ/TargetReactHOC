# TargetReactHOC

This is an example of how to do testing with Adobe Target and React

## How it works

This [HOC](https://reactjs.org/docs/higher-order-components.html) will only work for simple static stuff in your components, which doesn't change anything. So itsn't possible to overwrite input fields which as a state handler or something like that.

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

And here is how to wrap your component with the `TargetHOC` component:

```javascript
// First of all import the HOC
import TargetHOC from "./../helpers/hoc/TargetHOC";

// Setup your component
class TargetExample extends React.Component {
...
}

// and lastly wrap the component with the HOC function
export default TargetHOC(TargetExample);
```

## What is happening
First of all the HOC will execute the `adobe.target.getOffer`on `componentDidMount`. All the returned offers will then be executed and saved in the state for the wrapped HOC component. This means that we dont have to ask Target for offers anymore, because we already have the answer for the given component. So every time the `targetUpdate` function is executed we are using the saved data in the `adobe.target.applyOffer` method.
