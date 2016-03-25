import {expect} from 'chai';
import {Map, List} from 'immutable';


describe('immutibility', () => {

    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });
    });


    describe('a list', () => {
        function addMovie(currentState, movie) {
            return currentState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('movie1', 'movie2', 'movie3');
            let nextState = addMovie(state, 'movie4');

            expect(state).to.equal(List.of('movie1', 'movie2', 'movie3'));
            expect(nextState).to.equal(List.of('movie1', 'movie2', 'movie3', 'movie4'));
        });
    });

    describe('a tree', () => {
        function addMovie(currentState, movie) {
            //return currentState.set('movies', currentState.get('movies').push(movie));
            return currentState.update('movies', movies => movies.push(movie));
        }

        it('is immmutable', () => {
            let state =  Map({
                movies: List.of('movie1', 'movie2')
            });
            let nextState = addMovie(state, 'movie3');

            expect(nextState).to.equal(
                 Map({
                    movies: List.of('movie1', 'movie2', 'movie3')
                })
            );
            expect(state).to.equal(
                 Map({
                     movies: List.of('movie1', 'movie2')
                })
            );
        });

    });


});
