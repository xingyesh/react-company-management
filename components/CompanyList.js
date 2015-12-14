import React, {Component, PropTypes} from 'react'
import { Table, TableBody, TableHeader, TableFooter, TableRow, 
	TableHeaderColumn, TableRowColumn, Toggle, RaisedButton, Dialog, FlatButton} from 'material-ui' 
import CompanyItem from './CompanyItem'
import Template from './Template'
import Pagination from './Pagination'
import MessageDialog from './MessageDialog'

import $ from 'jquery'

export default class CompanyList extends React.Component {
	constructor() {
		super();
		this.state = {
			showMessageDialog: false,
            messageFlag: false,
			errorMessage: '',
			 pageObj:{
		        currentPage: 1,
		        pageSize: 8,
		        keyword:''
		    }
		}
	}
	_toggleMessageDialog(errorMessage, messageFlag) {
		this.setState({
			showMessageDialog: !this.state.showMessageDialog,
			errorMessage: errorMessage,
            messageFlag: messageFlag
		})
	}
	_handleOpenTemplate(company) {
	    this.props.actions.toggleTemplate(company);
  	}
  	componentDidMount() {
	    this._loadCompanyList(this.state.pageObj);
  	}
  	_loadCompanyList(object){
  		this.props.actions.searchCompanys(object);
  	}
  	_upadateSearchObj(object) {
  		this.setState({pageObj:object});
  		this._loadCompanyList(object);
  	}
  	_searchKey() {
  		let obj = {
		        currentPage: 1,
		        pageSize: 8,
		        keyword:''
	    };
  		obj.keyword = this.refs.keyword.value.trim();
  		this._upadateSearchObj(obj);
  	}
	render() {
		let Contents = this.props.companyObj.company.companyList.map((item)=>{
			return <CompanyItem key={item.id} _handleOpenTemplate={this._handleOpenTemplate.bind(this, item)} actions={this.props.actions} company={item} />
		})
		return (
		<div>
			<Template companyObj={this.props.companyObj} _toggleMessageDialog={this._toggleMessageDialog.bind(this)} _loadCompanyList={this._loadCompanyList.bind(this)} actions={this.props.actions} />
			<MessageDialog showMessageDialog={this.state.showMessageDialog} _toggleMessageDialog={this._toggleMessageDialog.bind(this,'',false)} errorMessage={this.state.errorMessage} messageFlag={this.state.messageFlag} />
			<div className='header'>
				<div className='search'>
					<input type='text' className='search-key' placeholder='' ref='keyword' />
					<RaisedButton backgroundColor='#d9534f' label="搜索" onClick={this._searchKey.bind(this)} />
				</div>

				<RaisedButton label="新建" backgroundColor='#d9534f' onTouchTap={this._handleOpenTemplate.bind(this, {})} />
			</div>
			<div className='body' style={{'width': '800px'}, {'overflow': 'auto'}}>
				<div>
					<Table fixedHeader={true} fixedFooter={false} >
					  	<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						    <TableRow>
						      <TableHeaderColumn>ID</TableHeaderColumn>
						      <TableHeaderColumn>出单机构</TableHeaderColumn>
						      <TableHeaderColumn>地区</TableHeaderColumn>
						      <TableHeaderColumn>最后操作人</TableHeaderColumn>
						      <TableHeaderColumn>状态</TableHeaderColumn>
						      <TableHeaderColumn>备注</TableHeaderColumn>
						      <TableHeaderColumn style={{textAlign: 'center'}} colSpan="2">操作</TableHeaderColumn>
						    </TableRow>
					  	</TableHeader>
					  	<TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
					  		{Contents}
					  	</TableBody>
					</Table>
				</div>
			</div>
			<div>
			<Pagination totalElements={this.props.companyObj.company.pageInfo.totalElements}  _upadateSearchObj={this._upadateSearchObj.bind(this)} pageObj={this.state.pageObj}/>
			</div>

		</div>
		)
	}
}
