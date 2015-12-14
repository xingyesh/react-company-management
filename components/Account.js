/*
   银行账户组件
*/
import React, { Component, PropTypes }  from 'react'


 class Account extends Component {
	constructor() {
		super(); 
	}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.item !== this.props.item || nextProps.isEditCompany !== this.props.isEditCompany;
    }
    _setAccountValue() {
        if (this.refs.bank && this.refs.accountName && this.refs.accountNo) {
            let object = {
                bank: this.refs.bank.value,
                accountName: this.refs.accountName.value,
                accountNo: this.refs.accountNo.value
            }
            this.props._setAccountValue(object);
        }
    }
	render() {
        let isFlag = this.props.isEditCompany || !this.props.company.id;
        let okBtn = isFlag ? <i className="icon-ok icon width-20" onClick={this._setAccountValue.bind(this)}></i> : <i className="width-20"></i>
        let deleteBtn = isFlag ? <i className="fa fa-times icon width-20" onClick={this.props._removeAccount}></i> : <i className="width-20"></i>

		let bank = this.props.item.bank ? <div className='item'>{this.props.item.bank}</div> : <input className='item account-input' required maxLength='20' type='text' ref={this.props.keys.bank} />
		let name = this.props.item.accountName ? <div className='item'>{this.props.item.accountName}</div> : <input className='item account-input' required maxLength='20' type='text' ref={this.props.keys.accountName} />
		let account = this.props.item.accountNo ? <div className='item'>{this.props.item.accountNo}</div> : <input className='item account-input' required maxLength='20' pattern="^\d+$" type='text' ref={this.props.keys.accountNo} />
		return (
			<div className='account-body'>
				{/*
				<div className='delete'>
					<i className="fa fa-times icon"></i>
				</div>
				*/}
             	<div className='col-item'>
             		<div className='label'>开户行：</div>
             		{bank}
                    {okBtn}
                    {deleteBtn}
                    
             	</div>
             	<div className='col-item'>
             		<div className='label'>开户名：</div>
             		{name}
             		<div className='width-20'></div>
                    <div className='width-20'></div>
             	</div>
             	<div className='col-item'>
             		<div className='label'>账户：</div>
             		{account}
             		<div className='width-20'></div>
                    <div className='width-20'></div>
             	</div>
             	
             </div>
		)
	}
}


Account.propTypes = {
  _removeAccount: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

export default Account
