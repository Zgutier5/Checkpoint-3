import React, { Component } from 'react';
import './App.css';
import Title from './title';

class App extends Component {
  state = {
    isLoading: true,
    contacts: []
  };
  componentDidMount(){
    this.fetchData();
   
  }
  fetchData(){
    fetch('https://randomuser.me/api/?results=50&nat=us,dk,fr,gb')
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.results.map(user => (
      {
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        location: `${user.location.street}, ${user.location.city} `
      }
    )))
    .then(contacts => this.setState({
      contacts,
      isLoading: false
    }))
  }

  render() {
    const {isLoading, contacts} = this.state;
    return (
      <div> 
        <header>
          <Title/>
          <h1>Customer Information<br/>
            <button className="btn btn-sm btn-danger">Call Data</button>
          </h1>
        </header>
        <div className={`content ${isLoading ? 'is-loading' : ''}`}>
          <div className="panel-group">
            {
                !isLoading && contacts.length > 0 ? contacts.map(contact => {
                  const {username, name, email, location} = contact;
                  return  <p>Username = {username} <br/>
                          Title = {name}<br/>
                          Email = {email}<br/>
                          Location = {location}</p>
                  
                }) : null 
            }
          </div>
          <div className="loader">
            <div className="icon"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
