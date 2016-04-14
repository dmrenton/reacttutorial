import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        return <div className="round">
            <h3>Round {this.props.round}.</h3>
        </div>
    }

});