/*
   
*/
import React, { Component, PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableRow, 
	TableHeaderColumn, TableRowColumn} from 'material-ui' 


class PaymentCities extends Component {
	constructor(props) {
		super(props); 
	}
	getInsurance(id) {
			return this.props.insurancesByCity.filter((item)=>{
				return item.insuranceCompanyData.id == id
			})
	}
	render() {
		let insuranceComponenct = this.props.insurances.map((item, index)=>{
			const rebate = this.getInsurance(item.id)[0] || {};
			const rebateCommercialInput = 'commercial' + this.props.city.id + item.id;
			const rebateCompulsoryInput = 'compulsory' + this.props.city.id + item.id;
			const commercialRebate = this.props.isFlag ? <input type='text' className='rebate margin-right-20' required pattern="^(([1-9]\d*)|0)(\.(\d){1,2})?$" defaultValue={rebate.commercialRebate} name={rebateCommercialInput} /> :
										<span>{rebate.commercialRebate}</span>
			const compulsoryRebate = this.props.isFlag ? <input type='text' className='rebate' required pattern="^(([1-9]\d*)|0)(\.(\d){1,2})?$" defaultValue={rebate.compulsoryRebate} name={rebateCompulsoryInput} /> :
										<span>{rebate.compulsoryRebate}</span>
			return 	[<TableRowColumn style={{textAlign: 'center'}}>
						{compulsoryRebate}%
					</TableRowColumn>,
					<TableRowColumn style={{textAlign: 'center'}}>
						{commercialRebate}%
					</TableRowColumn>
					]
		})
		return (
			<TableRow >
					<TableRowColumn style={{'width': '40px'}}><div>{this.props.city.name || this.props.city.label}</div></TableRowColumn>
					{insuranceComponenct}      
		    </TableRow>	
			  
		)
	}
}

PaymentCities.propTypes = {
  insurances: PropTypes.array.isRequired
  // city: PropTypes.object
}

export default PaymentCities


