import * as types from '../constants/CompanyTypes'

/*
  bankAccountViewModelList 从company中剥离出来。  提交的时候再组合成一个大的 company。 需要重构！！
*/
const initialState = 
  {
    cities: [],
    usedAreas:[],
    usedInsurances: [],
    companyList: [],
    pageInfo:{totalElements:0},
    insurances: [],
    company: {},
    bankAccountViewModelList:[],
    isShowtemplate: false,
    isEditCompany: false
  }

export default function company(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CITIES:
      // return [...state.cities, action.text ]
      // state.cities = action.text;
    	return Object.assign({}, state, {cities: action.text});
    case types.UPDATE_INSURANCES:
      // let insurances = state.insurances.concat(action.text);
      state.insurances = action.text;
      return Object.assign({}, state, {insurances: action.text});
    	// return Object.assign({}, state, { insurances: action.text })

    case types.GET_USED_AREAS:
      // state.usedAreas = action.array;
      return Object.assign({}, state, {usedAreas: action.array});

    case types.GET_USED_INSURANCES:
      // state.usedInsurances = action.array;
      return Object.assign({}, state, {usedInsurances: action.array});

    case types.SEARCH_COMPANYS:
      return Object.assign({}, state, {companyList: action.array.viewList, pageInfo: action.array.pageInfo});

    case types.TOGGLE_TEMPLATE:
      return Object.assign({}, state, { 
        isShowtemplate: !state.isShowtemplate, 
        company: action.company, 
        bankAccountViewModelList: action.company.bankAccountViewModelList.filter((item)=>item.id),
        cities: action.company.areaList,
        insurances: action.company.insuranceCompanyList
      });
    case types.CHANGE_COMPANY:
      return Object.assign({}, state, { company: action.company });
    case types.EDIT_COMPANY:
      return Object.assign({}, state, { isEditCompany: action.isFlag });
    case types.CHANGE_ACCOUNT_LIST:
      return Object.assign({}, state, { bankAccountViewModelList: action.list });
    // case types.SELECT_PAGE_SIZE:
    //   return Object.assign({}, state.pageObj, { currentPage: action.index });

    case types.CLEAR_TEMPLATE:
      initialState.usedAreas = state.usedAreas;
      initialState.usedInsurances = state.usedInsurances;
      initialState.companyList = state.companyList;
      initialState.pageInfo = state.pageInfo;
      return Object.assign({}, state, initialState);
      
    default:
      return state
  }
}
