class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
                    <h1> Jokeish</h1>
                    <p> A oat of the Data jokes heheh</p>
                    <p> Sign in to get MOOwww fantastic access yo!</p>
                    <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-bloack">Sign in<</a>
                </div>
            </div>
        )
    }
}