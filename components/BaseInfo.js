/*
   新建出单机构 基本信息组件
*/
import React, { Component, PropTypes } from 'react'
import { COMPANYKEYS } from '../constants/CompanyTypes'
import Select from 'react-select'

class BaseInfo extends Component {
	constructor() {
		super(); 
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.company !== this.props.company || 
				nextProps.usedAreas !== this.props.usedAreas || 
				nextProps.usedInsurances !== this.props.usedInsurances ||
				nextProps.isEditCompany !== this.props.isEditCompany;
	}
	render() {
		// 是否可以编辑
		let isFlag = this.props.isEditCompany || !this.props.company.id;
		// console.log('选中的 company is ', this.props.company);
		let city = '';
		for (let i=0; i< this.props.cities.length; i++) {
			city += this.props.cities[i].label || this.props.cities[i].name;
			if (i != this.props.cities.length - 1)
				city += ',';
		}
		let insurance = '';
		for (let i=0; i< this.props.insurances.length; i++) {
			insurance += this.props.insurances[i].label || this.props.insurances[i].name;
			if (i != this.props.insurances.length - 1)
				insurance += ',';
		}

		let items = {}
		for (let item in COMPANYKEYS.baseInfo) {
			switch(item) {
			    case 'name':
			        items[item] = isFlag ? <input className='item input' required type='text' defaultValue={this.props.company[item]} maxLength='20'
			        	name={item} ref={item} /> : <div className='item text-show height-27' title={this.props.company[item]}>{this.props.company[item]}</div>;
			        break;
			    case 'comment':
			        items[item] = isFlag ? <textarea className='item' maxLength='200' defaultValue={this.props.company[item]} rows="8"
                        name={item} ref={item} /> : <div className='item text-show height-27' title={this.props.company[item]}>{this.props.company[item]}</div>;
			        break;
			    case 'contactName':
			        items[item] = isFlag ? <input className='item input' type='text' required maxLength='20' defaultValue={this.props.company[item]}
                        name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
			    case 'contactMobile':
			        items[item] = isFlag ? <input className='item input' type='text' required defaultValue={this.props.company[item]} maxLength='11' pattern="^((13|15|17|18)[0-9]{9})|(0(([1-9]\d)|([3-9]\d{2}))(-?)((\d{7})|(\d{8})))$"
                                                  name={item} ref={item} />: <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
		        case 'contactEmail':
			        items[item] = isFlag ? <input className='item input' type='text' maxLength='45' defaultValue={this.props.company[item]} pattern="^\w+@[a-z\d]+\.(com|cn|com.cn|net|org)$"
                                                  name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
		        case 'contactQq':
			        items[item] = isFlag ? <input className='item input' type='text' maxLength='10' defaultValue={this.props.company[item]} pattern="^[1-9][0-9]{4,9}$"
                                                  name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
		        case 'checheName':
			        items[item] = isFlag ? <input className='item input' type='text' required maxLength='20' defaultValue={this.props.company[item]}
                                                  name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
			    case 'checheMobile':
			        items[item] = isFlag ? <input className='item input' type='text' required defaultValue={this.props.company[item]} maxLength='11' pattern="^((13|15|17|18)[0-9]{9})|(0(([1-9]\d)|([3-9]\d{2}))(-?)((\d{7})|(\d{8})))$"
                                                  name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
		        case 'checheEmail':
			        items[item] = isFlag ? <input className='item input' type='text' required maxLength='45' defaultValue={this.props.company[item]} pattern="^\w+@[a-z\d]+\.(com|cn|com.cn|net|org)$"
                                                  name={item} ref={item} /> : <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
		        case 'checheQq':
			        items[item] = isFlag ? <input className='item input' type='text' maxLength='10' defaultValue={this.props.company[item]} pattern="^[1-9][0-9]{4,9}$"
                                                  name={item} ref={item} />: <div className='item text-show height-27'>{this.props.company[item]}</div>;
			        break;
			    default:
			        console.log('not exists')
			}
		}

        items['areas'] = isFlag ? <Select className='item'
								    name="form-field-name"
								    value={city}
								    options={this.props.usedAreas}
								    multi={true}
								    noResultsText=''
								    placeholder='选择城市'
								    onChange={this.props._selectCities} /> : <div className='item text-show height-27' title={city} >{city}</div>;
        items['insurances'] = isFlag ? <Select className='item'
								    name="form-field-name"
								    value={insurance}
								    options={this.props.usedInsurances}
								    multi={true}
								    noResultsText=''
								    placeholder='选择保险公司'
								    onChange={this.props._selectInsurances} /> : <div className='item text-show height-27' title={insurance} >{insurance}</div>;

		return (
			<div className='base-info'>
			              	<div className='left-side'>
				                <div className='account'>
				                	<div className='title'>账户信息</div>
				                	<div className='body'>
				                		<div className='col-item'>
					                		<div className='label'>机构名称：</div>
				                			{items['name']}
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>城市：</div>
					                		{items['areas']}
				                		</div>
				                		<div className='col-item'>
					                		<div className='label' >保险公司：</div>
					                		{items['insurances']}
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>备注：</div>
					                		{items['comment']}
				                		</div>
				                	</div>
				                </div>
			              	</div>
			                <div className='right-side'>
			                	<div className='comnapy-contact'>
			                		<div className='title'>机构联系人</div>
			                		<div className='body'>
			                			<div className='col-item'>
					                		<div className='label'>姓名：</div>
					                		{items['contactName']}
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>电话：</div>
					                		{items['contactMobile']}
					                		
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>邮箱：</div>
					                		{items['contactEmail']}
					                		
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>QQ：</div>
					                		{items['contactQq']}
					                		
				                		</div>
			                		</div>
			                	</div>
			                	<div className='cheche-contact'>
			                		<div className='title'>车车责任人</div>
			                		<div className='body'>
			                			<div className='col-item'>
					                		<div className='label'>姓名：</div>
					                		{items['checheName']}
					                		
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>电话：</div>
					                		{items['checheMobile']}
					                		
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>邮箱：</div>
					                		{items['checheEmail']}
					                		
				                		</div>
				                		<div className='col-item'>
					                		<div className='label'>QQ：</div>
					                		{items['checheQq']}
					                		
				                		</div>
			                		</div>
			                	</div>
			                </div>
		              	</div>
		)
	}
}

BaseInfo.propTypes = {
  _selectCities: PropTypes.func.isRequired,
  _selectInsurances: PropTypes.func.isRequired,
  insurances: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  isEditCompany:PropTypes.bool.isRequired,
  company:PropTypes.object.isRequired
}

export default BaseInfo
