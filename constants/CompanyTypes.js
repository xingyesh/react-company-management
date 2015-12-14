/*
	编辑/新建 state的各个actionType
	1. 基本信息的城市
	2. 基本信息的 公司
	3. 整个 company 作为一个state 通过 company list的按钮修改
	4. 出单机构详情模板开关。
	5.GET_USED_AREAS 获取开通的城市
	6.GET_USED_INSURANCES 获取开通的公司
	7.SEARCH_COMPANYS 查找 机构列表。包括 分页，关键字搜索
	8.SELECT_PAGE_SIZE 修改分页页码
	9.EDIT_COMPANY  点击按钮 改为编辑状态（check 是否有权限编辑）
	10.CHANGE_COMPANY_STATUS 修改出单机构状态 禁用/启用
	11.CHANGE_ACCOUNT_LIST 修改列表
*/

export const UPDATE_CITIES = 'UPDATE_CITIES'
export const UPDATE_INSURANCES = 'UPDATE_INSURANCES'
export const CHANGE_COMPANY = 'CHANGE_COMPANY'
export const TOGGLE_TEMPLATE = 'TOGGLE_TEMPLATE'
export const CLEAR_TEMPLATE = 'CLEAR_TEMPLATE'
export const GET_USED_AREAS = 'GET_USED_AREAS'
export const GET_USED_INSURANCES = 'GET_USED_INSURANCES'
export const SEARCH_COMPANYS = 'SEARCH_COMPANYS'
export const SELECT_PAGE_SIZE = 'SELECT_PAGE_SIZE'
export const EDIT_COMPANY = 'EDIT_COMPANY'
export const CHANGE_COMPANY_STATUS = 'CHANGE_COMPANY_STATUS'
export const CHANGE_ACCOUNT_LIST = 'CHANGE_ACCOUNT_LIST'

export const COMPANYKEYS = {
	baseInfo: {
				name: {
                    required: true,
                    pattern: null,
                    label:'请输入名称'
                },
				comment: {
                    required: false,
                    pattern: null
                },
				contactName: {
                    required: true,
                    pattern: null,
                    label:'请输入姓名'
                },
				contactMobile: {
                    required: true,
                    pattern: /^((13|15|17|18)[0-9]{9})|(0(([1-9]\d)|([3-9]\d{2}))(-?)((\d{7})|(\d{8})))$/,
                    label:'请输入机构联系人电话',
                    error:'请输入正确格式的人电话'
                },
				contactEmail: {
                    required: false,
                    pattern: /^\w+@[a-z\d]+\.(com|cn|com.cn|net|org)$/,
                    error:'请输入正确格式的人邮箱'
                },
				contactQq: {
                    required: false,
                    pattern: /^[1-9][0-9]{4,9}$/,
                    error:'请输入正确格式的人QQ'
                },
				checheName: {
                    required: true,
                    pattern: null,
                    label:'请输入车车责任人姓名'
                },
				checheMobile: {
                    required: true,
                    pattern: /^((13|15|17|18)[0-9]{9})|(0(([1-9]\d)|([3-9]\d{2}))(-?)((\d{7})|(\d{8})))$/,
                    label:'请输入电话',
                    error:'请输入正确格式的电话'
                },
				checheEmail: {
                    required: true,
                    pattern: /^\w+@[a-z\d]+\.(com|cn|com.cn|net|org)$/,
                    label:'请输入邮箱',
                    error:'请输入正确格式的邮箱'
                },
				checheQq: {
                    required: false,
                    pattern: /^[1-9][0-9]{4,9}$/,
                    error:'请输入正确格式的QQ'
                }
	},
	accountObj: {
		accountName: 'accountName',
		bank: 'bank',
		accountNo: 'accountNo'
	},
	rebateObj: {
		area: 'area',
		commercialRebate: 'commercialRebate',
		compulsoryRebate: 'compulsoryRebate'
	}
}
