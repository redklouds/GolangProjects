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
class App extends React.Component {
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
        alert("SWAGGER");
        this.loggedIn = true;
    }
    render() {
        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
                    <h1> Jokeish</h1>
                    <p> A oat of the Data jokes heheh</p>
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


