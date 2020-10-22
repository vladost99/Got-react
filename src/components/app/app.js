import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './app.css';
import ErrorPage from '../errorPage';


export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };



    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router> 
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Switch>
                        <Route path='/' component={() => <h1 style={{color: "white"}}>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {

                            const {id} = match.params;
                        return <BooksItem   bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path="*" component={ErrorPage}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        )
    }

};
