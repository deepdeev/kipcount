# Kipcount

Commands needed for it to work:

React components:
```
meteor npm install --save react react-dom

```

Load transactions collection on the server
```
meteor npm install --save react-addons-pure-render-mixin
meteor add react-meteor-data
```

## Developer Notes
In order to add the datepicker, I decided to use http://www.material-ui.com/#/components/date-picker.
Follow the instructions carefully and then merge them with Meteor.

In order for this thing to run I needed to add this to my App.jsx given the fix presented here: https://github.com/callemall/material-ui/issues/4670
Change


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
```
