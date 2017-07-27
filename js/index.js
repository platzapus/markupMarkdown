'use strict';

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',

  getInitialState: function getInitialState() {
    return {
      value: "BIG OL' HEADER\n=====\n\nLil' Header\n------\n\n### Even Lil'er Heading\n\nTwo spaces at the end of a line for a  \nline break.\n\nGettin' Textual\n=====\n\n*Itaaaalicized*, **B O L D**\n`monospace`, ~~strikethru~~ \n\n Dotted List of Mammals:\n * Squirrels\n * Rabbits\n * Gophers\n\nNumbered List\n 1. Three\n 2. Four\n 3. One\n 4. Two"
    };
  },

  updateInput: function updateInput(newInput) {
    this.setState({
      value: newInput
    });
  },

  rawText: function rawText(val) {
    var rawText = marked(val, { sanitize: true }); //Runs raw input text through marked library.
    return { __html: rawText };
  },
  render: function render() {
    //Outputs converted text followed by the InputField component that houses the textarea in columns.
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { id: 'output', className: 'col-md-6' },
        React.createElement('div', { dangerouslySetInnerHTML: this.rawText(this.state.value) })
      ),
      React.createElement(
        'div',
        { className: 'col-md-6' },
        React.createElement(InputField, { value: this.state.value, updateInput: this.updateInput })
      )
    ); // ^Initial values for value (base text for input box) and the state updating function passed to InputField
  }

});

var InputField = React.createClass({
  displayName: 'InputField',
  //Component that renders the textarea and monitors its current value. When the value changes, calls the updateMarkdown function that was passed down from the parent DisplayBox component
  updateMarkdown: function updateMarkdown(e) {
    var newValue = e.target.value; //target is the textarea, as that's where it was called from.
    this.props.updateInput(newValue); //Function call to update state of DisplayBox and thus the value to be run through the marked library.
  },
  render: function render() {
    return React.createElement('textarea', { rows: '21', type: 'text', value: this.props.value, onChange: this.updateMarkdown });
  }

});

ReactDOM.render(React.createElement(DisplayBox, null), document.getElementById("container")); //Renders DisplayBox to the div with the id of container in the html.