/*
	订单详情 需要弹出 出单机构详情
*/

import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CompanyActions from '../actions/company'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MessageDialog from '../components/MessageDialog'
import Template from '../components/Template'
import $ from 'jquery'

//material need onTouchTap
injectTapEventPlugin();

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			showMessageDialog: false,
            messageFlag: false,
			errorMessage: ''
		}
	}
	_toggleMessageDialog(errorMessage, messageFlag) {
		this.setState({
			showMessageDialog: !this.state.showMessageDialog,
			errorMessage: errorMessage,
            messageFlag: messageFlag
		})
	}
	_toggleMessageDialog(errorMessage, messageFlag) {
		this.setState({
			showMessageDialog: !this.state.showMessageDialog,
			errorMessage: errorMessage,
            messageFlag: messageFlag
		})
	}
	_loadCompanyList(){
		//TODO! 为了保证不出错我加上的， 以后需要去掉
	}
	_handleOpenTemplate(event) {
		this._loadInstitutionInfo(event.target.getAttribute('institutionId'));
  	}
	componentDidMount() {
  	}
  	_loadInstitutionInfo(institutionId) {
  		console.log('institutionId', institutionId);
		$.ajax({
			'type':'GET',
			'url': '/orderCenter/nationwide/institution/' + institutionId,
			'contentType': 'application/json',
			'dataType':'json',
			'success': function(institution){
				this.props.actions.toggleTemplate(institution);
			}.bind(this)
		});
		
  	}
 	render(){
		return(
			<div>
				<MessageDialog showMessageDialog={this.state.showMessageDialog} _toggleMessageDialog={this._toggleMessageDialog.bind(this,'',false)} errorMessage={this.state.errorMessage} messageFlag={this.state.messageFlag} />
				<Template _loadCompanyList={this._loadCompanyList.bind(this)} companyObj={this.props.companyObj} _toggleMessageDialog={this._toggleMessageDialog.bind(this)} actions={this.props.actions} />
				<a href="javascript:void(0)"  id='institutionName' onClick={this._handleOpenTemplate.bind(this)}></a>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    companyObj: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CompanyActions, dispatch)
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



