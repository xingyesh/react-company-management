/*
   
*/
import React, { Component, PropTypes } from 'react'
import { TableRow, TableHeaderColumn} from 'material-ui' 

class PaymentInsurances extends Component {
	constructor(props) {
		super(props); 
	}
	render() {
	  	let Insurances = this.props.insurances.map((item)=>{
			return 	<TableHeaderColumn key={item.id + 'insurance'} colSpan="2" style={{textAlign: 'center'}}>
			      		<div className='label'>{item.label || item.name}</div>
				    </TableHeaderColumn>
		});
		return (
			<TableRow>
				<TableHeaderColumn style={{'width': '40px'}}></TableHeaderColumn>
				{Insurances}
		    </TableRow>
			  
		)
	}
}

PaymentInsurances.propTypes = {
  insurances: PropTypes.array.isRequired
}

export default PaymentInsurances
