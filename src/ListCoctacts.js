import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  
  state = {
    query: ''
  }

  render() {
    let showingContacts;
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;
    
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      console.log(' match ', match);  
      showingContacts = contacts.filter(c => match.test(c.name))
    } else {
      showingContacts = contacts;
    }
    
    showingContacts.sort(sortBy('name'));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input type="text"
            className="search-contacts"
                 placeholder="Search Contacts"
                 value={query}
                 onChange={event => this.setState({ query: event.target.value.trim()})}
          />
        </div>
  
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={() => this.setState({ query: ''})}>Show all</button>
          </div>
        )}
        
        <ol>
          {showingContacts.map(contact => {
            return (
              <li className="contact-list-item" key={contact.name}>
                <div
                  className="contact-avatar"
                  style={{ backgroundImage: `url(${contact.avatarURL})` }}
                />
                <div className="contact-details">
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button
                  className="contact-remove"
                  onClick={() => onDeleteContact(contact)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
