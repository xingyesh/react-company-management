/*
   
*/
import React, { Component, PropTypes } from 'react'
import {  TableRow, TableHeaderColumn} from 'material-ui' 

class InsuranceHeaders extends Component {
	constructor(props) {
		super(props); 
	}
	render() {
		let Components = this.props.insurances.map((item)=>{
			return 	[
						<TableHeaderColumn style={{textAlign: 'center'}}>
							<div>列表1</div>
						</TableHeaderColumn>,
						<TableHeaderColumn style={{textAlign: 'center'}}>
							<div>列表2</div>
						</TableHeaderColumn>
					]
		});
		return (
			<TableRow>
				<TableHeaderColumn></TableHeaderColumn>
				{Components}
		    </TableRow>
			  
		)
	}
}

InsuranceHeaders.propTypes = {
  insurances: PropTypes.array.isRequired
}

export default InsuranceHeaders
