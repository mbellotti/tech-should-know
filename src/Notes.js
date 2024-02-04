import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Notes extends Component {

    state = {
        top: 0,
        bottom: 0,
        index: 0,
    };

    alignNotes = () => {
        let boundary = this.props.top
        let inline = document.querySelector(boundary)
        let pos = inline.getBoundingClientRect();
        this.setState({top: pos.top+window.scrollY});
    }

    componentDidMount(){
        window.addEventListener('resize', this.alignNotes);
        this.alignNotes();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.alignNotes);
    }


    render() {
        const innerStyle = {
            position: 'relative',
            top: this.state.top + 'px',
            width: '100%',
        };

        const children = this.props.children;
        
        return (
            <div
                className='Notes-outer-wrapper'
                    >
                    <div
                        className='Notes-inner-wrapper'
                        style={innerStyle}
                    >
                        {typeof children === 'function'
                            ? children({ status: this.state.status })
                            : children}
                    </div>
                </div>
            );
        }
    
    }


Notes.displayName = 'Notes';

Notes.defaultProps = {
    top: 0,
    bottomBoundary: 0,
};

/**
 * @param {Bool} enabled A switch to enable or disable Notes.
 * @param {String/Number} top A top offset px for Notes. Could be a selector representing a node
 *        whose height should serve as the top offset.
 * @param {String/Number} bottomBoundary A bottom boundary px on document where Notes will stop.
 *        Could be a selector representing a node whose bottom should serve as the bottom boudary.
 */
Notes.propTypes = {
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottomBoundary: PropTypes.oneOfType([
        PropTypes.object, // TODO, may remove
        PropTypes.string,
        PropTypes.number,
    ]),
};
    export default Notes;