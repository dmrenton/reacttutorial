    import {Map, fromJS} from 'immutable';
    import {expect} from 'chai';

    import reducer from '../src/reducer';

    describe('reducer', () => {

        it('handles SET_ENTRIES', () => {
            const initialState = Map();
            const action = {type: 'SET_ENTRIES', entries: ['movie1']};
            const nextState = reducer(initialState, action);

            expect(nextState).to.equal(fromJS({
                entries: ['movie1'],
                round: 0
            }));
        });

        it('handles NEXT', () => {
            const initialState = fromJS({
                entries: ['movie1', 'movie2'],
                round: 1
            });
            const action = {type: 'NEXT'};
            const nextState = reducer(initialState, action);

            expect(nextState).to.equal(fromJS({
                vote: {pair: ['movie1', 'movie2']},
                entries: [],
                round: 2
            }));
        });

        it('handles VOTE', () => {
            const initialState = fromJS({
                vote: {pair: ['movie1', 'movie2']},
                entries: []
            });
            const action = {type: 'VOTE', entry: 'movie1'};

            const nextState = reducer(initialState, action);

            expect(nextState).to.equal(fromJS({
                vote: {pair: ['movie1', 'movie2'],
                tally: {'movie1': 1}},
                entries: []
            }));
        });

        it('has an initial state', () => {
            const action = {type: 'SET_ENTRIES', entries: ['movie1']};
            const nextState = reducer(undefined, action);
            expect(nextState).to.equal(fromJS({
                entries: ['movie1'],
                round: 0
            }));
        });

        it('can be used with reduce', () => {
            const actions = [
                {type: 'SET_ENTRIES', entries: ['movie1', 'movie2']},
                {type: 'NEXT'},
                {type: 'VOTE', entry: 'movie1'},
                {type: 'VOTE', entry: 'movie2'},
                {type: 'VOTE', entry: 'movie1'},
                {type: 'NEXT'}
            ];
            const finalState = actions.reduce(reducer, Map());

            expect(finalState).to.equal(fromJS({
                winner: 'movie1',
                round: 2
            }));
        });

    });