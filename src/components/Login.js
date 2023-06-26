import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="register">
                <div className="register-left">
                    <img src={process.env.PUBLIC_URL + '/login.png'} alt={'Log In'}/>
                </div>
                <div className="register-right">
                    <div className={"title"}>Log In</div>
                    <div className={"subTitle"}>Enter your details below</div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className={"label"}>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className={"label"}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                            />
                        </div>
                        <center>
                            <button type="submit" className="btn-padding">Log In</button>
                        </center>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;