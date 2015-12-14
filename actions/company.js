import * as types from '../constants/CompanyTypes'
import $ from 'jquery'

export function updateCities(text) {
	return {type: types.UPDATE_CITIES, text};
}
export function getUsedAreas(text) {
	return dispatch => $.ajax({
			'type':'GET',
			'url': '/allArea',
			'contentType': 'application/json',
			'dataType':'json',
			'success': function(data){
				let array = []
				for(let i = 0; i< data.length; i++) {
					array.push({
						label: data[i].name,
						id: data[i].id,
						value: data[i].name
					})
				}
				dispatch({type: types.GET_USED_AREAS, array});
			}
		});
}
export function getUsedInsurances(text) {
	return dispatch => $.ajax({
			'type':'GET',
			'url': '/getQuotableCompanies',
			'contentType': 'application/json',
			'dataType':'json',
			'success': function(data){
				let array = []
				for(let i = 0; i< data.length; i++) {
					array.push({
						label: data[i].name,
						id: data[i].id,
						value: data[i].name
					})
				}
				dispatch({type: types.GET_USED_INSURANCES, array});
			}.bind(this)
		});
}
export function searchCompanys(object) {
	return dispatch => $.ajax({
			'type':'GET',
			'url': '/company',
			'contentType': 'application/json',
			'dataType':'json',
			'data':object,
			'success': function(array){
				dispatch({type: types.SEARCH_COMPANYS, array});
			}.bind(this)
		});
}

export function editCompany() {
	const isFlag = true;
	return {type: types.EDIT_COMPANY, isFlag};
}

export function changeCompanyStatus(company) { //这个actions 目前没有对应的reducers
	let status = company.enable ? 0 : 1;
	return dispatch => $.ajax({
			'type':'PUT',
			'url': '/company/' + company.id + '/' + status,
			'contentType': 'application/json',
			'dataType':'json',
			'success': function(array){
				company.enable = !company.enable;
				dispatch({type: types.CHANGE_COMPANY, company});  //如果成功 company
			}.bind(this)
		});
}

export function updateInsurances(text) {
	return {type: types.UPDATE_INSURANCES, text};
}

export function changeAccountList(list) {
	return {type: types.CHANGE_ACCOUNT_LIST, list};
}

export function changeCompany(company) {
	return {type: types.CHANGE_COMPANY, company};
}
export function toggleTemplate(company) {
	if (Object.keys(company).length == 0) {
		company = {
			bankAccountViewModelList:[],
			areaList:[],
			insuranceCompanyList:[],
			rebateViewModelList:[]
		};
	}
	return {type: types.TOGGLE_TEMPLATE, company};
}
export function clearTemplate(company) {
	return {type: types.CLEAR_TEMPLATE, company};
}
