import React from 'react';
import ReactDom from 'react-dom';
import Voting from './components/Voting';

const pair = ['movie1', 'movie2'];

ReactDom.render(
    <Voting pair={pair} winner="movie1"/>,
    document.getElementById('app')
);
