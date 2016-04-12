import {List, Map} from 'immutable';

function setState(state, newState){
    return state.merge(newState);
}

function vote(state, entry){
    const currentPair = state.getIn(['vote', 'pair']);
    if (currentPair && currentPair.includes(entry)){
        return state.set(
            'hasVoted',
            Map({
                'entry': entry,
                'round': state.get('round')
        }));
    } else {
        return state;
    }
};

function resetVote(state) {
    const hasVoted = state.get('hasVoted');
    const currentPair = state.getIn(['vote', 'pair'], List());
    const round = state.get('round');
    if(hasVoted && (hasVoted.get('round') < round)){  //there is a vote, but its for an earlier round
        console.log("removing previous vote");
        return state.remove('hasVoted');
    }else{
        return state;
    }
};

export default function(state = Map(), action){
    switch (action.type){
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
};