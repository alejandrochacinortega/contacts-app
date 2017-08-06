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
  
  onCreateContact = contact => {
    console.log(' contact ', contact);
    ContactsAPI.create(contact).then(c => {
      this.setState(state => ({
        contacts: state.contacts.concat([ c ])
      }))
    })
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
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.onCreateContact(contact);
                history.push('/');
              }}
              
            />
          )}
        />
        
      </div>
    );
  }
}

export default App;
