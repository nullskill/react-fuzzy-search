'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  searchBoxStyle: {
    border: '1px solid #eee',
    borderRadius: 2,
    padding: '8px 10px',
    lineHeight: '24px',
    width: '100%',
    outline: 'none',
    fontSize: 16,
    color: '#666',
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  searchBoxWrapper: {
    padding: '4px',
    boxShadow: '0 4px 15px 4px rgba(0,0,0,0.2)',
    borderRadius: 2,
    backgroundColor: '#fff'
  },
  resultsStyle: {
    backgroundColor: '#fff',
    position: 'relative',
    padding: '12px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: 14
  },
  selectedResultStyle: {
    backgroundColor: '#f9f9f9',
    position: 'relative',
    padding: '12px',
    borderTop: '1px solid #eee',
    color: '#666',
    fontSize: 14
  },
  resultsWrapperStyle: {
    width: '100%',
    boxShadow: '0px 12px 30px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eee',
    borderTop: 0,
    boxSizing: 'border-box',
    maxHeight: 400,
    overflow: 'auto',
    position: 'relative'
  }
};

var defaultResultsTemplate = function defaultResultsTemplate(props, state, styl) {
  return state.results.map(function (val, i) {
    var style = state.selectedIndex === i ? styl.selectedResultStyle : styl.resultsStyle;
    return _react2.default.createElement(
      'div',
      { key: i, style: style },
      val.title
    );
  });
};

var FuzzySearch = function (_Component) {
  _inherits(FuzzySearch, _Component);

  function FuzzySearch(props) {
    _classCallCheck(this, FuzzySearch);

    var _this = _possibleConstructorReturn(this, (FuzzySearch.__proto__ || Object.getPrototypeOf(FuzzySearch)).call(this, props));

    _this.state = {
      results: [],
      selectedIndex: 0
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.fuse = new _fuse2.default(props.list, _this.getOptions());
    return _this;
  }

  _createClass(FuzzySearch, [{
    key: 'getOptions',
    value: function getOptions() {
      var _props = this.props,
          caseSensitive = _props.caseSensitive,
          id = _props.id,
          include = _props.include,
          keys = _props.keys,
          shouldSort = _props.shouldSort,
          sortFn = _props.sortFn,
          tokenize = _props.tokenize,
          verbose = _props.verbose,
          maxPatternLength = _props.maxPatternLength,
          distance = _props.distance,
          threshold = _props.threshold,
          location = _props.location;


      return {
        caseSensitive: caseSensitive,
        id: id,
        include: include,
        keys: keys,
        shouldSort: shouldSort,
        sortFn: sortFn,
        tokenize: tokenize,
        verbose: verbose,
        maxPatternLength: maxPatternLength,
        distance: distance,
        threshold: threshold,
        location: location
      };
    }
  }, {
    key: 'getResultsTemplate',
    value: function getResultsTemplate() {
      var _this2 = this;

      return this.state.results.map(function (val, i) {
        var style = _this2.state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        return _react2.default.createElement(
          'div',
          { key: i, style: style },
          val.title
        );
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({
        results: this.fuse.search(e.target.value).slice(0, this.props.maxResults - 1)
      });
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      var _state = this.state,
          results = _state.results,
          selectedIndex = _state.selectedIndex;

      if (e.keyCode === 40 && selectedIndex < results.length - 1) {
        this.setState({
          selectedIndex: selectedIndex + 1
        });
      } else if (e.keyCode === 38 && selectedIndex > 0) {
        this.setState({
          selectedIndex: selectedIndex - 1
        });
      } else if (e.keyCode === 13) {
        if (results[selectedIndex]) {
          this.props.onSelect(results[this.state.selectedIndex]);
        }
        this.setState({
          results: [],
          selectedIndex: 0
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          resultsTemplate = _props2.resultsTemplate,
          placeholder = _props2.placeholder,
          autoFocus = _props2.autoFocus;


      var mainClass = (0, _classnames2.default)('react-fuzzy-search', className);

      return _react2.default.createElement(
        'div',
        {
          className: mainClass,
          style: { width: width },
          onKeyDown: this.handleKeyDown
        },
        _react2.default.createElement(
          'div',
          { style: styles.searchBoxWrapper },
          _react2.default.createElement('input', {
            type: 'text',
            style: styles.searchBoxStyle,
            onChange: this.handleChange,
            ref: 'searchBox',
            placeholder: placeholder,
            autoFocus: autoFocus
          })
        ),
        this.state.results && this.state.results.length > 0 && _react2.default.createElement(
          'div',
          { style: styles.resultsWrapperStyle },
          resultsTemplate(this.props, this.state, styles)
        )
      );
    }
  }]);

  return FuzzySearch;
}(_react.Component);

FuzzySearch.propTypes = {
  caseSensitive: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  distance: _propTypes2.default.number,
  id: _propTypes2.default.string,
  include: _propTypes2.default.array,
  maxPatternLength: _propTypes2.default.number,
  onSelect: _propTypes2.default.func.isRequired,
  width: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  keys: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.string]),
  list: _propTypes2.default.array.isRequired,
  location: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  resultsTemplate: _propTypes2.default.func,
  shouldSort: _propTypes2.default.bool,
  sortFn: _propTypes2.default.func,
  threshold: _propTypes2.default.number,
  tokenize: _propTypes2.default.bool,
  verbose: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  maxResults: _propTypes2.default.number
};

FuzzySearch.defaultProps = {
  caseSensitive: false,
  distance: 100,
  include: [],
  location: 0,
  width: 430,
  placeholder: 'Search',
  resultsTemplate: defaultResultsTemplate,
  shouldSort: true,
  sortFn: function sortFn(a, b) {
    return a.score - b.score;
  },

  threshold: 0.6,
  tokenize: false,
  verbose: false,
  autoFocus: false,
  maxResults: 10
};

exports.default = FuzzySearch;