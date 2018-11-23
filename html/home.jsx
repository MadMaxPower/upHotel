var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

var word = "word.json";

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.getTags = this.getTags.bind(this);
        this.getPostWithId = this.getPostWithId.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
            title:'',
            subject:'',
            id:'',
            tag:0,
            tags: []
        };
    }
    componentDidMount(){
        document.getElementById('addHyperLink').className = "active";
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('startPage').className = "";
        document.getElementById('mapsHyperlink').className = "";
        this.getPostWithId();
        this.getTags();
    }
    addPost(){

        axios.post('/addPost', {
            title: this.state.title,
            subject: this.state.subject,
            tag: this.state.tag,
            id: this.props.params.id
        })
            .then(function (response) {
                console.log('response from add post is ',response);
                hashHistory.push('/')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getTags(){
        var self = this;

        axios.post('/getTag', {
        })
            .then(function (response) {
                if(response){
                    self.setState({tags:response.data});
                }

            })
            .catch(function (error) {
                console.log('error is ',error);
            });

    }

    getPostWithId(){
        var id = this.props.params.id;

        var self = this;

        axios.post('/getPostWithId', {
            id: id
        })
            .then(function (response) {
                if(response){
                    self.setState({title:response.data.title});
                    self.setState({subject:response.data.subject});
                    self.setState({tag:response.data.tag})
                }

            })
            .catch(function (error) {
                console.log('error is ',error);
            });

    }

    handleTitleChange(e){
        this.setState({title:e.target.value})
    }
    handleSubjectChange(e){
        this.setState({subject:e.target.value})
    }
    handleTagChange(e){
        this.setState({tag:e.target.value})
    }
    render() {
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <label for="inputtitle"> Место </label>
                            <input value={this.state.title} type="text" id="inputtitle" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Университет Аэрокосмического Приборостроения" required />
                        </div>

                        <div className="form-group">
                            <label for="subject"> Расположение(страна, город) </label>
                            <textarea value={this.state.subject} className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Россия, Санкт-Петербург" maxlength="140" rows="7"></textarea>
                        </div>

                        <div className="form-group">
                            <select className="form-control" value={this.state.tag} id="tag" onChange={this.handleTagChange}>
                                <option value="0">Выберите метку</option>
                                {
                                    this.state.tags.map(function(tag, i) {
                                        return (<option key={i} value={tag._id}>{tag.name}</option>)
                                    }.bind(this))
                                }
                            </select>
                        </div>

                        <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
                    </form>
                </div>
            </div>
        )
    }
}

class AddTag extends React.Component {
    constructor(props) {
        super(props);
        this.addTag = this.addTag.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.state = {
            tag:''
        };
    }
    componentDidMount(){
        document.getElementById('addHyperLink').className = "";
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "active";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('startPage').className = "";
        document.getElementById('mapsHyperlink').className = "";
    }
    addTag(){

        axios.post('/addtag', {
            tag: this.state.tag
        })
            .then(function (response) {
                console.log('response from add tag is ',response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleTagChange(e){
        this.setState({tag:e.target.value})
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input value={this.state.tag} type="text" onChange={this.handleTagChange} className="form-control" id="tag" name="tag" placeholder="Метка(например: важно)" required />
                        </div>
                        <div className="form-group">
                            <button type="button" onClick={this.addTag} id="submit" name="submit" className="btn btn-primary pull-right">Добавить метку</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

class ShowProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.state = {
            name:'',
            email:'',
            password:'',
            id:''
        };

    }
    componentDidMount(){
        document.getElementById('addHyperLink').className = "";
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('profileHyperlink').className = "active";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('startPage').className = "";
        document.getElementById('mapsHyperlink').className = "";
        this.getProfile();
    }
    updateProfile(){

        var self = this;
        axios.post('/updateProfile', {
            name: this.state.name,
            password: this.state.password
        })
            .then(function (response) {
                if(response){
                    hashHistory.push('/')
                }
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }

    handleNameChange(e){
        this.setState({name:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    getProfile(){
        var self = this;
        axios.post('/getProfile', {
        })
            .then(function (response) {
                if(response){
                    self.setState({name:response.data.name});
                    self.setState({email:response.data.email});
                    self.setState({password:response.data.password});
                }
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <label for id="nameforinput"> Имя </label>
                            <input value={this.state.name} type="text" id="nameforinput" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor id="inputpassword"> Пароль </label>
                            <input value={this.state.password} type="password" id="inputpassword" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                        </div>

                        <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Изменить</button>
                    </form>
                </div>
            </div>
        )
    }
}

class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.updatePost = this.updatePost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.getPost = this.getPost.bind(this);
        this.state = {
            posts:[],
            tag:'',
            tags:[],
            name:''
        };

    }

    updatePost(id){
        hashHistory.push('/addPost/' + id);
    }

    deletePost(id){
        if(confirm('Вы уверены?')){
            var self = this;
            axios.post('/deletePost', {
                id: id
            })
                .then(function (response) {
                    self.getPost();
                })
                .catch(function (error) {
                    console.log('Error is ',error);
                });
        }
    }

    getPost(){
        var self = this;
        axios.post('/getPost', {
        })
            .then(function (response) {
                console.log('res is ',response);
                self.setState({posts:response.data})
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }


    componentDidMount(){
        this.getPost();

        document.getElementById('homeHyperlink').className = "active";
        document.getElementById('addHyperLink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('startPage').className = "";
        document.getElementById('mapsHyperlink').className = "";
    }

    render() {

        return(
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Место</th>
                    <th>Расположение(страна и город)</th>
                    <th></th>
                    <th>Редактировать</th>
                    <th>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.posts.map(function(post,index) {
                        return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{post.title}</td>
                            <td>{post.subject}</td>
                            <td>{post.tag}</td>
                            <td>
                                <span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-pencil"></span>
                            </td>
                            <td>
                                <span onClick={this.deletePost.bind(this,post._id)} className="glyphicon glyphicon-remove"></span>
                            </td>
                        </tr>
                    }.bind(this))
                }
                </tbody>
            </table>
        )
    }
}

/*
class ShowMaps extends React.Component
{

    constructor(props)
    {
        super(props);
    }

    componentDidMount(){
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('addHyperLink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('mapsHyperlink').className = "active";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('startPage').className = "";
    }


}
*/


class ShowAirs extends React.Component {
    constructor(props)
    {
        super(props);
        this.getAirs = this.getAirs.bind(this);
        this.state = {
            air:[],
            name:''
        }
    }

    componentDidMount() {
        this.getAirs();
        document.getElementById('addHyperLink').className = "";
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('listOfAirs').className = "active";
        document.getElementById('startPage').className = "";
        document.getElementById('mapsHyperlink').className = "";

    }

    getAirs(){
        var self = this;
        axios.get('/getAirs', {
        })
            .then(function (response) {
                console.log('resposne is asdas ',response);
                self.setState({air:response.data})
            })
            .catch(function (error) {
                console.log('error is ',error);
            });
    }


        render() {
            return(
                <div>
                    <table>
                        <caption id="aircaption">Список рейсов: Санкт-Петербург -> Барселона </caption>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата отправления </th>
                            <th>Время отправления</th>
                            <th>Время прибытия</th>
                            <th>Город отправления</th>
                            <th>Город прибытия</th>
                            <th>Информация</th>
                            <th>Время в пути</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.air.map(function(airs,index) {
                                return <tr key={index} >
                                    <td>{index+1}</td>
                                    <td>{airs.Departure_date}</td>
                                    <td>{airs.Departure_time}</td>
                                    <td>{airs.Arrival_time}</td>
                                    <td>{airs.Departure_city}</td>
                                    <td>{airs.AArrival_city}</td>
                                    <td>{airs.Information}</td>
                                    <td>{airs.Time_in_a_row}</td>
                                </tr>
                            }.bind(this))
                        }
                        <form action="https://www.kayak.ru/flights/LED-BCN/2018-06-03/2018-06-09?sort=bestflight_a">
                            <button type="submit" id="airsbutton">Заказ билетов</button>
                        </form>
                        </tbody>
                    </table>
                </div>
            )
        }

}


class StartPage extends React.Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount() {
        document.getElementById('addHyperLink').className = "";
        document.getElementById('homeHyperlink').className = "";
        document.getElementById('profileHyperlink').className = "";
        document.getElementById('tagHyperlink').className = "";
        document.getElementById('startPage').className = "active";
        document.getElementById('listOfAirs').className = "";
        document.getElementById('mapsHyperlink').className = "";
    }



    render() {
        return(
            <div className="start">
                <h2 id="startslogan">
                    Планируйте свое путешествие с нами
                </h2>
                <ul id="pluses">
                    <li> Проостой дизайн </li>
                    <li> Быстрый доступ к данным </li>
                    <li> Круглосуточная поддержка</li>
                </ul>
                <img src="./img/bag_trav.jpg" id="startimg"/>
            </div>
        )
    }

}

//AIzaSyCMmo8OlmY9IuHrRFDpJxygYRywY9x2whE


ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
        <Route component={ShowProfile} path="/showProfile"></Route>
        <Route component={AddTag} path="/addTag"></Route>
        <Route component={ShowAirs} path="/showAirs"></Route>
        <Route component={StartPage} path="/startPage"></Route>
    </Router>,
    document.getElementById('app'));