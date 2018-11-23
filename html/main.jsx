var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            email:'',
            password:''
        };
    }
    signIn(){
        axios.post('/signin', {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                if(response.data == 'success'){
                    window.location.assign('http://localhost:7777/home#/startPage')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    render() {
        return (
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Вход в систему</h2>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Адрес электронной почты" required autofocus />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Пароль" required />

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Войти</button>
                </form>
                <div>
                    <Link to="/signup">{'Регистрация'}</Link>
                </div>
            </div>

        )
    }
}
//AIzaSyDFFUT9f-bvJixfeLBUa6l5jIx7Q8fUcuE
class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            name:'',
            email:'',
            password:''
        };
    }
    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handleEmailChange(e){
        this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    signUp(){
        axios.post('/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <form className="form-signin">
                    <h2 className="form-signin-heading">Регистрация</h2>
                    <label for="inputName" className="sr-only">Name</label>
                    <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Имя" required autofocus />
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Адрес электронной почты" required autofocus />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Пароль" required />

                    <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Зарегистрироваться</button>
                </form>
                <div>
                    <Link to="/">{'Вход'}</Link>
                </div>
            </div>

        )
    }
}


ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Signin} path="/"></Route>
        <Route component={Signup} path="/signup"></Route>
    </Router>,
    document.getElementById('app'));