/*
	错误信息提示框
	目前只接收一个string类型的message作为显示
*/

import React, { Component, PropTypes } from 'react'
import { Dialog, FlatButton} from 'material-ui'

class MessageDialog extends Component {
	constructor() {
		super();
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.showMessageDialog !== nextProps.showMessageDialog;
	}
	getStyles() {
		let styles = {
			width: '700px',
			left: 500,
		    zIndex: 100
		}
		return styles;
	}
	render() {
		let templateActions = [
			<FlatButton
				        key={2}
				        label="确定"
				        primary={true}
				        onTouchTap={this.props._toggleMessageDialog} />
		];
	    let title = <div className='dialog-header' >
	    				<div>温馨提示</div>
	    			</div>
        let content = !this.props.messageFlag?
            <div style={{height: '150px'}}>
                <div className='error-icon'>
                    <i className='fa fa-times-circle-o'></i>
                </div>
                <div className='error-message'>{this.props.errorMessage}</div>
            </div>
            :
            <div style={{height: '150px'}}>
                <div className='success-icon'>
                    <i className='fa fa-info-circle'></i>
                </div>
                <div className='success-message'>{this.props.errorMessage}</div>
            </div>
         let styles = this.props.showMessageDialog ? this.getStyles() : {width: '500px'};

        return (
		<div>
				<Dialog
	            title={title}
	            actions={templateActions}
	            autoDetectWindowHeight={true}
	            autoScrollBodyContent={true}
	            style={styles}
	            open={this.props.showMessageDialog}>
	            <div>
                    {content}
                </div>
	          </Dialog>
		</div>
		)
	}
}

MessageDialog.propTypes = {
  errorMessage:PropTypes.string.isRequired,
  messageFlag:PropTypes.bool,
  showMessageDialog:PropTypes.bool.isRequired
}

export default MessageDialog

 // left:'35% !important'

