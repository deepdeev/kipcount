import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  $.getScript('../../public/js/aos.js', function(){});
  $.getScript('../../js/bootstrap.js', function(){});
  $.getScript('../../js/jquery.min.js', function(){});
  $.getScript('../../js/main.js', function(){});


  render(<App />, document.getElementById('render-target'));
});
