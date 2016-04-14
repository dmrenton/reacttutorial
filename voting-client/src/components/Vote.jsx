import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Round from './Round';

export default React.createClass({
    mixins: [PureRenderMixin],
    getPair: function() {
        return this.props.pair || [];
    },
    isDisabled: function() {
        return !!this.props.hasVoted;
    },
    hasVotedFor: function(entry){
        return this.props.hasVoted ? this.props.hasVoted.get('entry') === entry : false;
    },
    render: function(){
        return <div className="voting">
            <Round ref="round" round={this.props.round} />
            {
                this.getPair().map(
                    entry =>
                    <button
                        key={entry}
                        disabled={this.isDisabled()}
                        onClick={() => this.props.vote(entry)}
                        >

                        <h1>{entry}</h1>
                        {this.hasVotedFor(entry) ?
                            <div className="label">Voted</div> : null
                        }
                    </button>
                )
            }

            </div>;
    }
});