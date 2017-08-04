import React, { Component } from 'react';
import ListCoctacts from './ListCoctacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: [],
  };
  
  componentDidMount () {
    ContactsAPI
      .getAll()
      .then(contacts => this.setState({contacts}))
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id),
    }));
    
    ContactsAPI.remove(contact)
  };

  render() {
    const { contacts } = this.state;
    return (
      <div>
        <ListCoctacts
          contacts={contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
