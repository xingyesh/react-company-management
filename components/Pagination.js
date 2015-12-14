/*
   分页模块
   totalElements: 50, //总数  
   currentPage: 0,  //当前页码
   pageSize: 8,  //当前页显示的调试。  
   totalSizes = Math.ceil(totalElements / number ) //总页面
*/
import React, { Component, PropTypes } from 'react'
import { Table, TableBody, TableHeader, TableRow, 
	TableHeaderColumn, TableRowColumn} from 'material-ui' 


class Pagination extends React.Component {
	constructor(props){
		super(props);
	}
	_nextPage(){
		const index = this.props.pageObj.currentPage + 1;
		if (index > this.totalSizes) {
			return;
		}
		this.props.pageObj.currentPage = index
		this.props._upadateSearchObj(this.props.pageObj);
		// this.setState({index:index});
	}
	_previousPage(){
		const index = this.props.pageObj.currentPage - 1;
		if (index == 0) {
			return;
		}
		// this.setState({index:index})
		this.props.pageObj.currentPage = index
		this.props._upadateSearchObj(this.props.pageObj);
		// this.setState({index:index});
	}
	_selectPage(index){
		// this.setState({index:index -1});
		this.props.pageObj.currentPage = index
		this.props._upadateSearchObj(this.props.pageObj);
	}
  	render() {
  		this.totalSizes = Math.ceil(this.props.totalElements / this.props.pageObj.pageSize);
 		const index = this.props.pageObj.currentPage - 1;

  		let Pages = [];
		let preItem = <li key='pagination-prev'><a href="javascript:void(0)" onClick={this._previousPage.bind(this)}><span>&laquo;</span></a></li>
  		if (index == 0) {
			preItem = <li key='pagination-prev' className='disabled'><a href="javascript:void(0)" onClick={this._previousPage.bind(this)}><span aria-hidden="true">&laquo;</span></a></li>
		}
		Pages.push(preItem);

  		for(let i = 0; i< this.totalSizes;i++){
  			let li = <li><a href="javascript:void(0)" onClick={this._selectPage.bind(this, i+1)}>{i+1}</a></li>
  			if (index == i) {
  				li = <li className='active' key={'pagination' + i}><a href="javascript:void(0)" onClick={this._selectPage.bind(this, i+1)}>{i+1}</a></li>
  			}
  			Pages.push(li)
  		}

  		if (this.totalSizes == 0) {
  			Pages.push(<li className='active' key={'pagination' + 1}><a href="javascript:void(0)" onClick={this._selectPage.bind(this, 1)}>{1}</a></li>)
  		}

  		let nextItem = <li key='pagination-next'><a href="javascript:void(0)" onClick={this._nextPage.bind(this)} ><span>&raquo;</span></a></li>
  		if (this.totalSizes == index + 1 || this.totalSizes == 0) {
			nextItem = <li key='pagination-next' className='disabled'><a href="javascript:void(0)" onClick={this._nextPage.bind(this)} ><span>&raquo;</span></a></li>
		}
		Pages.push(nextItem);
  		return(
  			<div style={{margin:'20px'}}>
  				<nav>
				  <ul className="pagination">
				    {Pages}
				  </ul>
				</nav>
  			</div>
  		)
  	}
}

Pagination.propTypes = {
  pageObj: PropTypes.object.isRequired,
  _upadateSearchObj: PropTypes.func.isRequired
}

export default Pagination


