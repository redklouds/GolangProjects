/*
Understanding React

     react is mainly built in components, meaning that each appliation in react
     is a combination of multiple react components at the basic
     this app.jsx is the base component that is in charge of display and showing components
     we can think of this as the entry point or the main file of a program


     in our implementation we are checking if the user is logged in, if so display
     logged in specfiic content, otherwise go t the normal homepage components
*/
class App extends React.Component {
    render() {
        if(this.loggedIn) {
            return (<LoggedIn />);
        }else {
            return (<Home />);
        }
    }
}