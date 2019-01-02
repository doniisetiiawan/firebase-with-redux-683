import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Phrases.css';

class Phrases extends Component {
  static propTypes = {
    fetchPhrases: PropTypes.func,
    addPhrase: PropTypes.func,
    deletePhrase: PropTypes.func,
    updatePhrase: PropTypes.func,
    phrases: PropTypes.array,
  };

  state = {
    phrase: '',
    author: '',
    editKey: false,
  };

  componentWillMount() {
    this.props.fetchPhrases();
  }

  handleOnChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({
      [name]: value,
    });
  };

  handleAddNewPhrase = () => {
    if (this.state.phrase && this.state.author) {
      this.props.addPhrase(
        this.state.phrase,
        this.state.author,
      );

      this.setState({
        phrase: '',
        author: '',
      });
    }
  };

  handleDeleteElement = (key) => {
    this.props.deletePhrase(key);
  };

  handleEditElement = (key, phrase, author) => {
    this.setState({
      editKey: key,
      phrase,
      author,
    });
  };

  handleUpdatePhrase = () => {
    if (this.state.phrase && this.state.author) {
      this.props.updatePhrase(
        this.state.editKey,
        this.state.phrase,
        this.state.author,
      );
      this.setState({
        phrase: '',
        author: '',
        editKey: false,
      });
    }
  };

  render() {
    const { phrases } = this.props;
    return (
      <div className="phrases">
        <div className="add">
          <p>Phrase: </p>
          <textarea
            name="phrase"
            value={this.state.phrase}
            onChange={this.handleOnChange}
          />
          <p>Author</p>
          <input
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleOnChange}
          />
          <p>
            <button
              onClick={
                this.state.editKey
                  ? this.handleUpdatePhrase
                  : this.handleAddNewPhrase
              }
              type="button"
            >
              {this.state.editKey
                ? 'Edit Phrase'
                : 'Add New Phrase'}
            </button>
          </p>
        </div>
        {phrases && phrases.map(({ key, phrase, author }) => (
          <blockquote key={key} className="phrase">
            <p className="mark">
              “
            </p>
            <p className="text">
              {phrase}
            </p>
            <hr />
            <p className="author">
              {author}
            </p><a
              onClick={() => {
                this.handleDeleteElement(key);
              }}
            >
            Close
            </a>
            <a
              onClick={
                () => this.handleEditElement(key, phrase, author)
              }
            >
              Edit
            </a>
          </blockquote>
        ))}
      </div>
    );
  }
}

export default Phrases;
