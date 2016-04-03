import React from 'react';
import ReactDOM from 'react-dom';
import{ renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import{expect} from 'chai';

describe('Results', () => {

    it('renders entries with vote counts or zero', () => {
        const pair = List.of('movie1', 'movie2');
        const tally = Map({'movie1': 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [mOne, mTwo] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(mOne).to.contain('movie1');
        expect(mOne).to.contain('5');
        expect(mTwo).to.contain('movie2');
        expect(mTwo).to.contain('0');
    });

    it('invokes the next callback when next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;

        const pair = List.of('movie1', 'movie2');
        const component = renderIntoDocument(
            <Results pair={pair}
                     tally={Map()}
                     next={next} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results winner="movie1"
                     pair={["movie1", "movie2"]}
                     tally={Map()} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('movie1');
    });

});