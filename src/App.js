import React from 'react';
import axios from 'axios';
import "./App.css";

export default class extends React.Component
{
  constructor()
  {
    super();
    this.state = {
      username : "marco",
      info : {},
      followers : []
    }
  }

  componentDidMount()
  {
    axios( `https://api.github.com/users/${ this.state.username }` )
      .then( response => 
      {
          axios( response.data.followers_url )
            .then( response2 =>
            {
              this.setState( { username : this.state.username, info : response.data, followers : response2.data  } )
            } )
            .catch( response2 => console.error( "Something Went Wrong!!!" ) )   
      } )
      .catch( response => console.error( "Something Went Wront!!!" ) )
  }


  render()
  {
    return (
      <div className = "container">
        <div className = "userName" > User Name : { this.state.username } </div>
        
        <div className = "info" >
          <p>Name : {this.state.info.name}</p>
          <p>Bio : {this.state.info.bio}</p>
          <p>Public Repos : {this.state.info.public_repos}</p>
        </div>
        <div className = "Followers">
          Followers: 
          <ul>
            { this.state.followers.map( follower => <li key = { follower.id }> Login: {  follower.login }   </li> ) }
          </ul>
        </div>

        {console.log( this.state )}
      </div>
     );
  }
  
}
