import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('movie1', 'movie2');
const tally = Map({'movie1': 5, 'movie2': 4});

export default React.createClass({
    render: function() {
        return React.cloneElement(this.props.children, {
            pair: pair,
            tally: tally
        });
    }
});
