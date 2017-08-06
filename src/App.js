import React, { Component } from 'react';
import ListCoctacts from './ListCoctacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

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
      <div className="app">
        <Route
          path={'/'}
          exact
          render={() => (
            <ListCoctacts
              contacts={contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        ></Route>
        <Route
          path={'/create'}
          exact
          component={CreateContact}
        />
        
      </div>
    );
  }
}

export default App;
