import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CompanyActions from '../actions/company'

import injectTapEventPlugin from 'react-tap-event-plugin'

import CompanyList from '../components/CompanyList'
import Template from '../components/Template'

//material need onTouchTap
injectTapEventPlugin();

class App extends React.Component {
	constructor() {
		super();
	}
	componentDidMount() {
  	}
 	render(){
		return(
			<div>
				<CompanyList companyObj={this.props.companyObj} actions={this.props.actions} />
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
    actions: bindActionCreators(CompanyActions, dispatch)  //bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



