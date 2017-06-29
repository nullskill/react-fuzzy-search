'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _global = global,
    describe = _global.describe,
    it = _global.it;


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
}];

describe('<FuzzySearch />', function () {
  it('should set correct placeholder text', function () {
    var onSelect = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
      onSelect: onSelect,
      keys: ['author', 'title'],
      list: list,
      placeholder: 'testing'
    }));
    var placeholder = wrapper.ref('searchBox').prop('placeholder');
    (0, _chai.expect)(placeholder).to.equal('testing');
  });

  it('should show results on typing', function () {
    var onSelect = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
      onSelect: onSelect,
      keys: ['author', 'title'],
      list: list
    }));

    var input = wrapper.ref('searchBox');
    (0, _chai.expect)(wrapper.state('results').length).to.equal(0);

    input.simulate('change', {
      target: {
        value: 't'
      }
    });

    (0, _chai.expect)(wrapper.state('results').length).to.not.equal(0);
  });

  it('should set results as ids if passed in options', function () {
    var onChange = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
      list: list,
      onSelect: onChange,
      keys: ['author', 'title'],
      id: 'id'
    }));

    var input = wrapper.ref('searchBox');
    input.simulate('change', {
      target: {
        value: 't'
      }
    });

    (0, _chai.expect)(wrapper.state('results')).to.eql([2, 1]);
  });

  it('should call onChange on selection of result', function () {
    var onChange = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_index2.default, {
      list: list,
      onSelect: onChange,
      keys: ['author', 'title']
    }));

    var input = wrapper.ref('searchBox');
    input.simulate('change', {
      target: {
        value: 't'
      }
    });

    (0, _chai.expect)(wrapper.state('results').length).to.not.equal(0);

    var div = wrapper.find('.react-fuzzy-search');

    div.simulate('keydown', {
      keyCode: 13
    });

    (0, _chai.expect)(onChange.calledOnce).to.equal(true);
  });
});