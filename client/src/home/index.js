import ko from 'knockout';
import $ from 'jquery';

import { printHome, HomeViewModel } from './homeScreen';
import { printHome1, Home1ViewModel } from './homeScreen1';
import '../../style/common.scss';
import '../../style/home.scss';

// Ensures sub-modules are loaded fine
printHome();
printHome1();

$(document).ready(() => {
  ko.cleanNode(document.getElementById('app-main'));

  if (window.location.pathname === '/') {
    ko.applyBindings(new HomeViewModel('Planet', 'Earth'), document.getElementById('app-home')); // This makes Knockout get to work
  } else if (window.location.pathname === '/home/home1') {
    ko.applyBindings(new Home1ViewModel(), document.getElementById('app-home-1')); // This makes Knockout get to work
  }
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {});
}
