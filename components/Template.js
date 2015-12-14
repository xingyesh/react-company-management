/*
	
*/

import React, { Component, PropTypes } from 'react'
import { RaisedButton, Dialog, FlatButton, Tab, Tabs} from 'material-ui'
import Select from 'react-select'
import $ from 'jquery'

import BaseInfo from './BaseInfo'
import Account from './Account'
import Payment from './Payment'
import {COMPANYKEYS} from '../constants/CompanyTypes'

export default class Template extends Component {
	constructor() {
		super();
		this.state = {
		  modal: true
	    };
	}
	componentDidMount() {
		this.props.actions.getUsedAreas();
		this.props.actions.getUsedInsurances();
	}
  	_selectCities(cities, option) {
  		this.props.actions.updateCities(option);
	}
	_selectInsurances(insurances, option) {
		this.props.actions.updateInsurances(option);
	}
	_handleCancelTemplate(){
	    this.props.actions.toggleTemplate({});
	    this.props.actions.clearTemplate();
  	}
  	_editCompany(){
  		this.props.actions.editCompany();
  	}
  	_handleSubmitTemplate() {
  		let companyForm = document.getElementById('companyForm');
  		let institution = {
  			rebateViewModelList:[],
  			bankAccountViewModelList: []
  		};
  		for (let key in COMPANYKEYS.baseInfo) {
            if(COMPANYKEYS.baseInfo[key].required && !companyForm[key].value) {
                this.props._toggleMessageDialog(COMPANYKEYS.baseInfo[key].label);
                return;
            }
            if(COMPANYKEYS.baseInfo[key].pattern && companyForm[key].value
                && !COMPANYKEYS.baseInfo[key].pattern.test(companyForm[key].value)) {
                this.props._toggleMessageDialog(COMPANYKEYS.baseInfo[key].error);
                return;
            }
  			institution[key] = companyForm[key].value;
  		}

        if(this.props.companyObj.company.cities.length == 0) {
            this.props._toggleMessageDialog("请选择城市");
            return;
        }
        if(this.props.companyObj.company.insurances.length == 0) {
            this.props._toggleMessageDialog("请选择公司");
            return;
        }
        if(this.props.companyObj.company.bankAccountViewModelList.length == 0) {
            this.props._toggleMessageDialog("请添加银行账户");
            return;
        }

  		institution.bankAccountViewModelList = this.props.companyObj.company.bankAccountViewModelList;
  		for (let index=0; index< institution.bankAccountViewModelList.length; index++) {
  			let account = institution.bankAccountViewModelList[index];
  			if ( !account.bank || !account.accountName || !account.accountNo) {
                this.props._toggleMessageDialog('请先保存添加的银行账户');
  				return;
  			}
  		}

        const cities = this.props.companyObj.company.cities;
        const insurances = this.props.companyObj.company.insurances;
        for(let j = 0; j<insurances.length; j++) {
			const insuranceId = insurances[j].id;
			for (let i = 0; i<cities.length; i++) {
				const cityId = cities[i].id;
				let object = {};

				object.insuranceCompanyData = {
					id: insuranceId
				};
				object.areaViewData = {
					id: cityId
				};
				const commercialRebate = companyForm['commercial' + cityId + insuranceId];
				const compulsoryRebate = companyForm['compulsory' + cityId + insuranceId ];
                if (compulsoryRebate && !compulsoryRebate.value) {
                    this.props._toggleMessageDialog('请输入值');
                    return;
                }
                if(!/^(([1-9]\d*)|0)(\.(\d){1,2})?$/.test(compulsoryRebate.value)) {
                    this.props._toggleMessageDialog('最多保留两位小数');
                    return;
                }
                if ((parseFloat(compulsoryRebate.value) < 0 || parseFloat(compulsoryRebate.value) > 100)) {
                    this.props._toggleMessageDialog('0-100');
                    return;
                }
                if (commercialRebate && !commercialRebate.value) {
                    this.props._toggleMessageDialog('请输入值');
                    return;
                }
                if(!/^(([1-9]\d*)|0)(\.(\d){1,2})?$/.test(commercialRebate.value)) {
                    this.props._toggleMessageDialog('最多保留两位小数');
                    return;
                }
                if ((parseFloat(commercialRebate.value) < 0 || parseFloat(commercialRebate.value) > 100)) {
                    this.props._toggleMessageDialog('0到100');
                    return;
                }
                object.commercialRebate = parseFloat(commercialRebate.value);
                object.compulsoryRebate = parseFloat(compulsoryRebate.value);
                institution.rebateViewModelList.push(object);
			}
		}
		if (this.props.companyObj.company.company.id) {
			institution.id = this.props.companyObj.company.company.id;
		}
		$.ajax({
			'type':'POST',
			'url':'/company',
			'data':JSON.stringify(institution),
			'contentType':'application/json',
			'success':function(result){
                if(result.pass) {
                    this.props._toggleMessageDialog('保存成功', true);
                    this.props._loadCompanyList();
                    this.props.actions.toggleTemplate({});
                    this.props.actions.clearTemplate();
                } else {
                    this.props._toggleMessageDialog(result.message);
                }
			}.bind(this)
		})
  				
   		//this.props.actions.toggleTemplate({});
   		//this.props.actions.clearTemplate();
  	} 
	_addAccount() {
		let accountList = this.props.companyObj.company.bankAccountViewModelList || [];
		accountList.push({
			bank: '',
      		accountName: '',
      		accountNo: ''
		});
		this.props.actions.changeAccountList(accountList);
	}
	_setAccountValue(index, object) {
        if(!object.bank) {
            this.props._toggleMessageDialog('开户行不允许为空', false);
            return;
        }
        if(!object.accountName) {
            this.props._toggleMessageDialog('开户名不允许为空', false);
            return;
        }
        if(!object.accountNo) {
            this.props._toggleMessageDialog('账户不允许为空', false);
            return;
        }
		let accountList = this.props.companyObj.company.bankAccountViewModelList;
		accountList[index] = object;
		this.props.actions.changeAccountList(accountList);
	}
	_removeAccount(index) {
		let accountList = this.props.companyObj.company.bankAccountViewModelList;
		accountList.splice(index, 1);
		this.props.actions.changeAccountList(accountList);
	}
	_submitForm(event) {
		this._handleSubmitTemplate();
		event.preventDefault();
	}
	render() {
		let companyObj = this.props.companyObj.company;
		let isFlag = companyObj.isEditCompany || !companyObj.company.id;
		let templateActions = [];
	    if (isFlag) {
	    	templateActions.push(<FlatButton
	        key={3}
	        label="保存"
            onTouchTap={this._handleSubmitTemplate.bind(this)}
	        secondary={true} />)
	    }
	    if (!isFlag && companyObj.company.id) {
	    	templateActions.push(<FlatButton
	        key={1}
	        label="编辑"
	        onTouchTap={this._editCompany.bind(this)} />)
	    }
        let titleContent = companyObj.company.id ? (companyObj.isEditCompany ? "编辑" : "查看") : "新建";
	    templateActions.push(<FlatButton
	        key={2}
	        label="取消"
	        primary={true}
	        onTouchTap={this._handleCancelTemplate.bind(this)} />)
	    let title = <div className='dialog-header' >
	    				<div>{titleContent}</div>
	    			</div>
		//银行账户
		const bankAccountViewModelList = companyObj.bankAccountViewModelList || [];
		let AccountComponentList = bankAccountViewModelList.map((item, index)=>{
			return <Account isEditCompany={companyObj.isEditCompany} company={companyObj.company} 
			keys={COMPANYKEYS.accountObj} id={index} key={ 'account'+ new Date().getTime + index} _removeAccount={this._removeAccount.bind(this, index)} 
			 _setAccountValue={this._setAccountValue.bind(this, index)} item={item}  />
		});
		
		let addAccountButtom = isFlag ? <div className='account-body account-add'>
					                 	<i className="fa fa-plus fa-6" onClick={this._addAccount.bind(this)}></i>
					                 </div>
					                 : ''
		return (
		<div><form id='companyForm'>
				<Dialog
	            ref="templdateDialog"
	            title={title}
	            actions={templateActions}
	            autoDetectWindowHeight={true}
	            autoScrollBodyContent={true}
	            open={this.props.companyObj.company.isShowtemplate}>
	            <div style={{height: '500px'}}>
	            
	              <Tabs>
		            <Tab label="基本信息" >
		            	<BaseInfo keys={COMPANYKEYS.baseInfo} usedInsurances={companyObj.usedInsurances} usedAreas={companyObj.usedAreas} 
		            	isEditCompany={companyObj.isEditCompany} company={companyObj.company} cities={companyObj.cities} insurances={companyObj.insurances} 
		            	_selectInsurances={this._selectInsurances.bind(this)} _selectCities={this._selectCities.bind(this)} />
		            </Tab>
		            <Tab label="银行账户" >
		              <div className='account-list'>
		                 {AccountComponentList}
		                 {addAccountButtom}
		              </div>
		            </Tab>
		            <Tab label="佣金设置" >
		              <div className='payment-setting'>
		                <Payment keys={COMPANYKEYS.rebateObj} isEditCompany={companyObj.isEditCompany} company={companyObj.company} cities={companyObj.cities} insurances={companyObj.insurances} />
		              </div>
		            </Tab>
		          </Tabs>
		        

	            </div>
	          </Dialog>
	            </form>
		</div>
		)
	}

}
