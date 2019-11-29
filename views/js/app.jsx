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
const AUTH0_DOMAIN = "";
const AUTH0_CALLBACK_URL = "";
const AUTH0_API_AUDIENCE = "https://redklouds-inc-dev.auth0.com/api/v2/";

class App extends React.Component {
    //this is the entry Component of the application!!!
    parseHash() {
        this.auth0 = new auth0.WebAuth({
            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID
        });

        this.auth0.parseHash({hash: window.location.hash}, function(err, authResult){
            if(err) {
                return console.log("ERROR" + err);
            }
            if (
                
                authResult !== null &&
                authResult.accessToken !== null &&
                authResult.idToken
            ) {

                console.log("DOIUNG SOMETHING")
                localStorage.setItem("access_token", authResult.accessToken);
                localStorage.setItem("id_token", authResult.idToken);
                localStorage.setItem(
                    //a key value pair where the value is an object
                    "profile", JSON.stringify(authResult.idTokenPayload)
                );
                console.log("Location: " +  window.location.href.indexOf("#") );
                window.location = window.location.href.substr(
                    0, window.location.href.indexOf("#")
                );
            }
        });//end of parseHash extension
    }


    setup() {
        $.ajaxSetup({
            //before the sending of the ajax request , go to the cache and get the 
            //access token
       
            beforeSend: (r) => {
                if (localStorage.getItem("access_token")){
                    r.setRequestHeader(
                        "Authorization",
                        "Bearer " + localStorage.getItem("access_token")
                    );
                }
            }
        });
        console.log("Finished set up " + localStorage.getItem("access_token"))
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
        this.setup();
        this.parseHash();
        this.setState();
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

    constructor(props){
        super(props);
        this.authenticate = this.authenticate.bind(this);
    }
    authenticate(){
        alert("hehe Take Tickles");

        this.WebAuth = new auth0.WebAuth( {
            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID,
            scope: "openid profile",
            audience : AUTH0_API_AUDIENCE,
            responseType: "token id_token",
            redirectUri: AUTH0_CALLBACK_URL
        });
        alert(this.WebAuth);
        console.log(this.WebAuth);
        this.WebAuth.authorize();
        this.loggedIn = true;
        console.log("DONE");
    }
    render() {
        console.log("DONE" + this.WebAuth);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
                        <h1>Jokish</h1>
                        <p>A load of Dad Jokes !</p>
                        <p> Sign in to get access</p>
                        <a onClick={this.authenticate.bind(this)}
                        className="btn btn-primary btn-lg btn-login btn-block"> Sign In</a>
                    </div>
                </div>
            </div>
/*
            <div className="container">
                <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
                    <h1> Jokeish</h1>
                    <p> A FLued of the Data jokes heheh!!! friend ! </p>
                    <p> Sign in to get MOOwww fantastic access yo!</p>
                    <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-block">Sign in </a>
                </div>
            </div>
            */
        )
    }
}





class Joke extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            liked: "",
            jokes : []
        };
        this.like = this.like.bind(this);
        this.serverRequest = this.serverRequest.bind(this);
    }

    serverRequest(joke){
        $.post(
            "http://localhost:3000/api/jokes/like/" + joke.id,
            {like: 1},
            res => {
                console.log("Res....", res);
                this.setState({liked: "Liked!", jokes: res});
                this.props.jokes = res;
            }
        )
    }

    like(){
        //helperfunction of this component on what we should do if somone liked this particular compnent or joek
        //edit later
        let joke = this.props.joke;
        this.serverRequest(joke);
    }

    render() {
        return (
            <div className="col-xs-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                #{this.props.joke.id}{" "}
                <span className="pull-right">{this.state.liked}</span>
              </div>
              <div className="panel-body">{this.props.joke.joke}</div>
              <div className="panel-footer">
                {this.props.joke.likes} Likes &nbsp;
                <a onClick={this.like} className="btn btn-default">
                  <span className="glyphicon glyphicon-thumbs-up" />
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
        this.serverRequest = this.serverRequest.bind(this);
        //still not sure what this means when we bind this?..
        this.logout = this.logout.bind(this);
    }

    serverRequest() {
        $.get("/api/jokes", res => {
            this.setState( {
                jokes : res
            });
        });
    }

    componentDidMount() {
        this.serverRequest();
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("profile");
        //location is how react controls where we are or where we want to go
        //it also handles reloading of the page and/or component
        //#X see window.location.reload(this)
        location.reload();
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
                        <div className="container">
                            {this.state.jokes.map((joke, i)=> {
                                //we are passing the Joke component the properties of key and joke
                                return <Joke key={i} joke={joke} />;
                            })}
                        </div>
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


