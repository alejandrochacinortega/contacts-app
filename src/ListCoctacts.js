import React, { Component } from 'react';

const ListContacts = ({contacts, onDeleteContact}) => {
  return (
    <ol className="contact-list">
      {contacts.map(contact => {
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
            <button className="contact-remove" onClick={() => onDeleteContact(contact)}>
              Remove
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default ListContacts;
