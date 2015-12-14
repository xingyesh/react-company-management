import React, { Component, PropTypes } from 'react'
import { TableRow, TableRowColumn, FlatButton, RaisedButton} from 'material-ui' 

export default class TableItem extends Component {
	constructor() {
		super()
	}
	_toggleStatus() {
		this.props.actions.changeCompanyStatus(this.props.company);
	}
	__handleOpenTemplate(company) {
		this.props._handleOpenTemplate(company);
	}
	render() {
			let item = this.props.company;
			let closeOrOpen = <FlatButton label={item.enable ? '禁用': '启用'} secondary={item.enable} primary={!item.enable} onClick={this._toggleStatus.bind(this)} />;
			let areas = '';
			for (let i=0; i < item.areaList.length; i++) {
				areas += item.areaList[i].name;
				if (i != item.areaList.length - 1)
					areas += ',';
			}
            let simpleAreas = areas;
            let splitAreas = areas.split(",");
            if(splitAreas.length > 3) {
                simpleAreas = splitAreas[0] + "," + splitAreas[1] + "," + splitAreas[2] + "...";
            }
            let simpleName = item.name.length > 10? (item.name.substring(0, 10) + "...") : item.name;
            let simpleComment = item.comment != null && item.comment.length > 10? (item.comment.substring(0, 10) + "...") : item.comment;
			let status = item.enable ? '已启用': '已禁用';
			return (
					<TableRow>
					      <TableRowColumn><div>{item.id}</div></TableRowColumn>
					      <TableRowColumn><div title={item.name}>{simpleName}</div></TableRowColumn>
					      <TableRowColumn><div className='white-space' title={areas}>{simpleAreas}</div></TableRowColumn>
					      <TableRowColumn>
					      		<div>{item.operator}</div>
					      		<div>{item.updateTime}</div>
					      </TableRowColumn>
					      <TableRowColumn><div>{status}</div></TableRowColumn>
					      <TableRowColumn><div title={item.comment}>{simpleComment}</div></TableRowColumn>
					      <TableRowColumn style={{textAlign: 'center'}} colSpan="2">
					      	<div>{closeOrOpen} 
					      		<RaisedButton label="查看详情" backgroundColor='#d9534f' onClick={this.__handleOpenTemplate.bind(this)} />
				      		</div>
			      		  </TableRowColumn>
					    </TableRow>
		)
	}
}

TableItem.propTypes = {
  company: PropTypes.object.isRequired,
  _handleOpenTemplate: PropTypes.func.isRequired
}
