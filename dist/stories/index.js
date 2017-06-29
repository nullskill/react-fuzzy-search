'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybook = require('@kadira/storybook');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = [{
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald'
}, {
  id: 2,
  title: 'The DaVinci Code',
  author: 'Dan Brown'
}, {
  id: 3,
  title: 'Angels & Demons',
  author: 'Dan Brown'
}, {
  id: 4,
  title: 'The Greater Gatsby',
  author: 'F. Scott Fitzgerald'
}, {
  id: 5,
  title: 'The DaVinci1 Code',
  author: 'Dan Brown'
}, {
  id: 6,
  title: 'Angels1 & Demons',
  author: 'Dan Brown'
}, {
  id: 7,
  title: 'The Greater2 Gatsby',
  author: 'F. Scott Fitzgerald'
}, {
  id: 8,
  title: 'The DaVinci2 Code',
  author: 'Dan Brown'
}, {
  id: 9,
  title: 'Angels2 & Demons',
  author: 'Dan Brown'
}, {
  id: 10,
  title: 'The Greater Gatsby',
  author: 'F. Scott Fitzgerald'
}, {
  id: 11,
  title: 'The DaVinci1 Code',
  author: 'Dan Brown'
}, {
  id: 12,
  title: 'Angels1 & Demons',
  author: 'Dan Brown'
}];

(0, _storybook.storiesOf)('SearchBox', module).add('Basic', function () {
  return _react2.default.createElement(_index2.default, {
    list: list,
    keys: ['author', 'title'],
    width: 430,
    onSelect: (0, _storybook.action)('selected')
  });
}).add('Custom Template', function () {
  function x(props, state, styles) {
    return state.results.map(function (val, i) {
      var style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
      return _react2.default.createElement(
        'div',
        {
          key: i,
          style: style
        },
        val.title,
        _react2.default.createElement(
          'span',
          { style: { float: 'right', opacity: 0.5 } },
          'by ',
          val.author
        )
      );
    });
  }

  return _react2.default.createElement(_index2.default, {
    list: list,
    keys: ['author', 'title'],
    onSelect: (0, _storybook.action)('selected'),
    resultsTemplate: x,
    placeholder: 'I am custom placeholder'
  });
});