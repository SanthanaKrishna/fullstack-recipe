import React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNIN_USER } from '../../queries/index';
import { Error } from '../Error';

const initialState = {
    username: "",
    password: "",
}
class Signin extends React.Component {
    state = {
        ...initialState
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    clearState = () => {
        this.setState({ ...initialState })
    }
    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({ data }) => {
            console.log('data', data)
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        });
    }
    validateForm = () => {
        const { username, password } = this.state
        const isInvalid = !username || !password
        return isInvalid;
    }
    render() {
        const { username, password } = this.state
        return (
            <div className="App">
                <h2 className="form">Signin</h2>
                <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={(event) => this.handleSubmit(event, signinUser)}>
                                <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                                <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }}

                </Mutation>
            </div>
        )
    }
}



export default withRouter(Signin);