import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries/index';


const App = () => (
  <div className="App">
    <h3>Home</h3>
    <Query query={GET_ALL_RECIPES}>
      {({data,loading,error}) => {     //render props
      if(loading) return <div>Loading....</div>
      if(error) return <div> Error</div>
      console.log('data', data);
        return (
          <p>Recipes</p>
        )
      }}
    </Query>
  </div>
)
export default App;
