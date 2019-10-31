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