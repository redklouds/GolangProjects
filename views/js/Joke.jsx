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