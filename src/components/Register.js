import React, {Component} from 'react';

class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        passwordConfirm:''
    };
    handleSubmit = async e => {
        e.preventDefault();
        const {data} = await this.props.registerFn.registerAc(this.state);
        console.log(data);
        // console.log(this.props.registerData.name);
    }
    handleChange = e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        const{username,email,password,passwordConfirm} = this.state;
        return (
            <div className="register">
                <div className="register-left">
                    <img src={process.env.PUBLIC_URL + '/login.png'} alt={'Log In'}/>
                </div>
                <div className="register-right">
                    <form onSubmit={this.handleSubmit}>
                        <div className={"title"}>Register</div>
                        <div className={"subTitle"}>Enter your details below</div>
                        <div className="form-group">
                            <label htmlFor="username" className={"label"}>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                defaultValue={username}
                                name = "username"
                                onChange={this.handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email" className={"label"}>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name = "email"
                                defaultValue={email}
                                onChange={this.handleChange}
                                aria-describedby="emailHelp"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className={"label"}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name = "password"
                                defaultValue={password}
                                onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className={"label"}>Confirm Your Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordConfirm"
                                name = "passwordConfirm"
                                defaultValue={passwordConfirm}
                                onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <center>
                            <button type="submit" className="btn-padding">Submit</button>
                        </center>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;