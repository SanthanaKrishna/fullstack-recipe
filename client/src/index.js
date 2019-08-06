import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './component/App';
import Signin from './component/Auth/Signin';
import Signup from './component/Auth/Signup';
import withSession from './component/withSession';
import Navbar from './component/Navbar';
import Search from './component/Recipe/search';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddRecipe from './component/Recipe/AddRecipe';
import Profile from './component/Profile/Profile';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include' //allow to send token to backend
    },
    request: (operation) => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);
        }
        if (networkError && networkError.statusCode === 401) {
            // localStorage.setItem('token', '');
            localStorage.removeItem('token')
        }
    }
})

const Root = ({ refetch, session }) => (
    <Router>
        <Fragment>
            <Navbar session={session} />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/search" component={Search} />
                <Route path="/signin" render={() => <Signin refetch={refetch} />} />
                <Route path="/signup" render={() => <Signup refetch={refetch} />} />
                <Route path="/recipe/add" component={AddRecipe} />
                <Route path="/profile" component={Profile} />
                <Redirect to="/" />
            </Switch>
        </Fragment >
    </Router>
)

const RootWithSession = withSession(Root)

ReactDOM.render(<ApolloProvider client={client}>
    <RootWithSession />
</ApolloProvider>, document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
