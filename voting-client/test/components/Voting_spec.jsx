import React from 'react';
import ReactDom from 'react-dom';
import {List,Map} from 'immutable';

import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils';

import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['movie1', 'movie2']} round="1"/>
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('movie1');
        expect(buttons[1].textContent).to.equal('movie2');
    });
    
    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={["movie1", "movie2"]} vote={vote} round="1"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect (votedWith).to.equal('movie1');
    });

    it('disables buttons when user has voted', () => {
        const hasvoted = Map({entry: "movie1", round: 1});
        const component = renderIntoDocument(
            <Voting pair={["movie1", "movie2"]}
                    hasVoted={hasvoted}
                    round="1"/>
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const hasvoted = Map({entry: "movie1", round: 1});
        const component = renderIntoDocument(
            <Voting pair={['movie1', 'movie2']}
                    hasVoted={hasvoted} round="1"/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner="movie1" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDom.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('movie1');
    });

    it('renders as a pure component', () => {
        const pair = List.of('movie1', 'movie2');
        const container = document.createElement('div');
        let component = ReactDom.render(
            <Voting pair={pair} round="1"/>,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('movie1');

        pair[0] = 'movie3';
        component = ReactDom.render(
            <Voting pair={pair} round="2"/>,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('movie1');
    });

});