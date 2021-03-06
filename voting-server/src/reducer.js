import {next, setEntries, vote, INITIAL_STATE} from '../src/core';

export default function reducer(state = INITIAL_STATE, action) {
    // why doesn't this line work?
    console.log(`received: ${action.type}`);

    switch (action.type){
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote', voteState => vote(voteState, action.entry));
    }

    //no-op
    return state;
}