/*
Understanding React

     react is mainly built in components, meaning that each appliation in react
     is a combination of multiple react components at the basic
     this app.jsx is the base component that is in charge of display and showing components
     we can think of this as the entry point or the main file of a program


     in our implementation we are checking if the user is logged in, if so display
     logged in specfiic content, otherwise go t the normal homepage components
*/

//import Home from "home";
//https://www.freecodecamp.org/news/how-to-build-a-web-app-with-go-gin-and-react-cffdc473576/
//about let
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
//about closures
//https://blog.appsignal.com/2018/09/04/ruby-magic-closures-in-ruby-blocks-procs-and-lambdas.html
//about setting env vvaraibles

//https://github.com/joho/godotenv
//about authoizations middleware for golang gin
//https://dzone.com/articles/authentication-in-golang-with-jwts

const AUTH0_CLIENT_ID = "";
const AUTH0_DOMAIN = "redklouds-inc-dev.auth0.com";
const AUTH0_CALLBACK_URL = "http://localhost:3000";
const AUTH0_API_AUDIENCE = "";

class App extends React.Component {
    //this is the entry Component of the application!!!
    parseHash() {
        this.auth0 = new auth0.WebAuth({
            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID
        });

        this.auth0.parseHash(window.localtion.hash, (err, authResult)=>{
            if(err) {
                return console.log(err);
            }
            if (
                
                authResult !== null &&
                authResult.accessToken !== null &&
                authResult.idToken
            ) {
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token", authResult.idToken);
                localStorage.setItem(
                    //a key value pair where the value is an object
                    "profile", JSON.stringify(authResult.idTokenPayload)
                );
                window.location = window.location.href.substr(
                    0, window.location.href.indexOf("#")
                );
            }
        });//end of parseHash extension
    }


    setup() {
        $.ajaxSetup({
            beforeSend: (r) => {
                if (localStorage.getItem("access_token")){
                    r.setRequestHeader(
                        "Authorization",
                        "Bearer" + localStorage.getItem("access_token")
                    );
                }
            }
        });
    } //end of setup, setting up the request payload header

    setState() {
        let idToken = localStorage.getItem("id_token");
        if (idToken){
            this.loggedIn = true;
        }else {
            this.loggedIn = false;
        }
    }

    /*
    https://dev.to/torianne02/componentwillmount-vs-componentdidmount-5f0n
    ComponentWillMount is depreciated, because it is NOT SAFE
     this is a contruction for the compoennt which will not return before the first render
     of the component, so for example say we make a initalize of some sort of data for this initalie page
     that data has a chance NOT to show up if it depends on this contructor to retrieve it, because asically in javascript
     this event is async in nature, so using 

    */
    componentWillMount(){

    }













    render() {
        if(this.loggedIn) {
            return (<LoggedIn />);
        }else {
            return (<Home />);
        }
    } 
}

class Home extends React.Component {

    authenticate(){
        alert("hehe Take Tickles");
        this.loggedIn = true;
    }
    render() {
        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
                    <h1> Jokeish</h1>
                    <p> A FLued of the Data jokes heheh!!! friend ! </p>
                    <p> Sign in to get MOOwww fantastic access yo!</p>
                    <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-block">Sign in </a>
                </div>
            </div>
        )
    }
}





class Joke extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liked: ""
        }
        this.like = this.like.bind(this);
    }

    like(){
        //helperfunction of this component on what we should do if somone liked this particular compnent or joek
        //edit later
    }

    render() {
        return (
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div id="">this.prop</div>.joke.id}<span className="pull-right">{this.state.liked}</span>
                    </div>
                    <div className="panel-body">
                        {this.props.Joke.Joke}
                    </div>
                    <div className="panel-footer">
                        {this.props.Joke.likes} Likes &nbsp;
                        <a onClick={this.like} className="btn btn-default">
                            <span className="glyphicon glyphicon-thumbs-up"></span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

class LoggedIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jokes : []
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-12">
                    <br />
                    <span classname="pull-right">
                        <a onClick={this.logout}> Log Out</a>
                    </span>
                    <h2> Jokish</h2>
                    <p> Let's feed you with some funny jokes Nao :D</p>
                    <div className="row">
                        {this.state.jokes.map(function(joke, i) {
                        return (<Joke key={i} joke={joke} />);
                        })}
                    </div>
                </div>
            </div>
        )
    }
}




ReactDOM.render(<App />, document.getElementById("app"));


