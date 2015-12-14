/*
   
*/
import React, { Component, PropTypes } from 'react'
import { Table, TableBody, TableHeader} from 'material-ui' 

import PaymentInsurances from './PaymentInsurances'
import PaymentCities from './PaymentCities'
import InsuranceHeaders from './InsuranceHeaders'


 class Payment extends Component {
	constructor() {
		super(); 
	}
	getInsurancesByCity(id) {
			return this.props.company.rebateViewModelList.filter((rebate)=>{
				return rebate.areaViewData.id == id
			})
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.cities !== this.props.cities 
				|| nextProps.insurances !== this.props.insurances
				|| nextProps.isEditCompany !== this.props.isEditCompany
	}
	render() {
		let newWidth = 40 + this.props.insurances.length * 200;
		let width = (newWidth > 500 ? newWidth : 500 ) + 'px';

		let isFlag = this.props.isEditCompany || !this.props.company.id;

		let PaymentItems = this.props.cities.map((item)=>{
				let insurancesByCity = this.getInsurancesByCity(item.id);
				return <PaymentCities isFlag={isFlag} insurancesByCity={insurancesByCity} key={item.id} keys={this.props.keys} insurances={this.props.insurances}  city={item} />
		});
		return (
			<div className='body' style={{'width': width}}>
            	<Table height={'300px'} fixedHeader={true} fixedFooter={false} >
				  	<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					    <PaymentInsurances insurances={this.props.insurances} />
					    <InsuranceHeaders insurances={this.props.insurances} />
				  	</TableHeader>
				  	<TableBody showRowHover={false} displayRowCheckbox={false} selectable={false}>
				  			{PaymentItems}  	
					</TableBody>
				</Table>
            </div>
		)
	}
}


Payment.propTypes = {
  company: PropTypes.object.isRequired,
  insurances: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired
}

export default Payment
