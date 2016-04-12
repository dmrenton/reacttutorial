import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core.js';


describe('application logic', () => {

    describe('set entries', () => {
        it('adds entries to the map', () => {

            let state = Map();
            let entries = List.of('movie1', 'movie2');

            let nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('movie1', 'movie2'),
                round: 0
            }));
        });

        it('converts to immutable', () => {

            let state = Map();
            let entries = ['movie1', 'movie2'];

            let nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('movie1', 'movie2'),
                round: 0
            }));
        });

    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('movie1', 'movie2', 'movie3'),
                round: 1
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({pair: List.of('movie1', 'movie2')}),
                entries: List.of('movie3'),
                round: 2

            }));

        });

        it('puts winner of current vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2'),
                    tally: Map({
                        'movie1': 4,
                        'movie2': 2
                    })
                }),
                entries: List.of('movie3', 'movie4', 'movie5'),
                round: 1
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('movie3', 'movie4')
                }),
                entries: List.of('movie5', 'movie1'),
                round: 2
            }));
        });

        it('puts both from tied vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2'),
                    tally: Map({
                        'movie1': 3,
                        'movie2': 3
                    })
                }),
                entries: List.of('movie3', 'movie4', 'movie5'),
                round: 1
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('movie3', 'movie4')
                }),
                entries: List.of('movie5', 'movie1', 'movie2'),
                round: 2

            }));
        });

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('movie1', 'movie2'),
                    tally: Map({
                        'movie1': 4,
                        'movie2': 2
                    })
                }),
                entries: List(),
                round: 1
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                round: 2,
                winner: 'movie1'
            }));
        });

    });

    describe('vote', () => {
        it('creates a tally for a voted entry', () => {
            const state = Map({
                pair: List.of('movie1', 'movie2')
            });

            const nextState = vote(state, 'movie1');

            expect(nextState).to.equal(Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({'movie1': 1})
            }));

        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 3,
                    'movie2': 2
                })
            });

            const nextState = vote(state, 'movie1');

            expect(nextState).to.equal(Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 4,
                    'movie2': 2
                })
            }));

        })
            ;
        });

        it('does not allow a vote if its not in the current pair', () => {
            const state = Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 3,
                    'movie2': 2
                })
            });
            const nextState = vote(state, 'movie3');

            expect(nextState).to.equal(Map({
                pair: List.of('movie1', 'movie2'),
                tally: Map({
                    'movie1': 3,
                    'movie2': 2
                })
            }));
        });


    });