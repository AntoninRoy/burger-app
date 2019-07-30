import React, {Component} from 'react';
import classes from './Table.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Table extends Component {
    state = {
        loading : true,
        initialDatas : null,
        datas : null,
        dynamic:false,
        row_number : 10,
        start_row : 0
    };

    componentDidMount() {
        if(this.props.params.dynamic)this.setState({dynamic: this.props.params.dynamic});
        if(this.props.params.row_number)this.setState({dynamic: this.props.params.row_number});


        if(this.props.params.dynamic){
            console.log("Load 10 entries");
            setTimeout(()=>{
                const datasDynamic = [
                        {
                            name : "Jean",
                            lastname :"Balle",
                            age : "82",
                            autre : "rien"
                        }
                    ];
                this.setState(
                {
                        initialDatas : datasDynamic,
                        datas: datasDynamic,
                        loading : false
                });
            },2000)
        }else{
            console.log("All entries are in the data field");
            this.setState({initialDatas: this.props.data,datas: this.props.data,loading: false});
        }


    }
    inputChangedHandler = (event) => {
        let result = [];

        for (let raw in this.state.initialDatas) {
            for (let entry in this.state.initialDatas[raw]){
                if(this.state.initialDatas[raw][entry].toLowerCase().includes(event.target.value.toLowerCase())){
                    if(!result.includes(this.state.initialDatas[raw])){
                        result.push(this.state.initialDatas[raw]);
                    }

                }
            }
        }

        this.setState({datas: result,loading: false});
    };

    selectChangedHandler = (event) => {
        this.setState({row_number: parseInt(event.target.value), start_row: 0});
    };

    nextButtonChangedHandler = () => {
        const new_start_row =  this.state.start_row + this.state.row_number;
        console.log(new_start_row, this.state.datas.length);

        if(new_start_row <= this.state.datas.length-1){
            this.setState({start_row: new_start_row});
        }
    };

    previousButtonChangedHandler = () => {
        let new_start_row =  0;
        if(this.state.start_row !== 0){
            if(this.state.start_row - this.state.row_number < 0){
                new_start_row =  0;
            }else{
                new_start_row = this.state.start_row - this.state.row_number;
            }
            this.setState({start_row: new_start_row});
        }else{
            console.log("Deja au minimum");
        }
    };


    render () {
        let content_headers = Object.keys(this.props.columns)
            .map( key => {
                return (<th key = {this.props.columns[key].field}>{this.props.columns[key].label}</th>)
            });


        let table = <Spinner/>
        if(!this.state.loading){
            if(this.state.datas.length > 0){
                let datas = Object.keys(this.state.datas)
                    .map( (key,i) => {
                        if( this.state.start_row <= i && i < this.state.row_number+this.state.start_row){
                            return (
                                <tr key = {i} >
                                    {Object.keys(this.state.datas[key]).map((name,j) => {
                                        return(
                                            <td key = {j} >
                                                {this.state.datas[key][name]}{i}
                                            </td>
                                        )
                                    })}
                                </tr>)
                        }else{
                            return null;
                        }

                    });

                table = (
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            {content_headers}
                        </tr>
                        </thead>
                        <tbody>
                        {datas}
                        </tbody>
                    </table>
                );
            }else{
                table = (
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            {content_headers}
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={this.props.columns.length}> Nothing to show</td>
                            </tr>
                        </tbody>

                    </table>

                );
            }

        }
        let footer = null;
        if(this.state.datas){
            console.log(Math.ceil(this.state.datas.length/10));

            let buttons=[];
            for (let i = 0; i < Math.ceil(this.state.datas.length/10); i++) {
                buttons.push(<button key={i+1}>{i+1}</button>);
            }
            footer = (
                <div className={classes.footer}>
                    <div className={classes.showing}>
                       <p>Showing {this.state.start_row+1} to {this.state.row_number+this.state.start_row >= this.state.datas.length ?  this.state.datas.length : this.state.row_number+this.state.start_row} of { this.state.datas.length} entries</p>;
                    </div>
                    <div  className={classes.pagination}>
                        <button  disabled={this.state.start_row <=0} onClick={() => this.previousButtonChangedHandler()}>Previous</button>
                        {buttons}
                        <button  disabled={this.state.start_row + this.state.row_number >=this.state.datas.length}  onClick={(event) => this.nextButtonChangedHandler(event)} >Next</button>
                    </div>
                </div>
            );
        }



        return (
            <div className={classes.Table}>
                <div className={classes.header}>
                    <div className ={ classes.entries }>
                        <p>Show</p>
                        <div className={classes.select}>
                            <select onChange={(event) => this.selectChangedHandler(event)} name="slct" id="slct">
                                <option defaultValue value="10">10</option>
                                <option value="15">15</option>*
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                            </select>
                        </div>
                        <p>entries</p>
                    </div>

                    <div className={classes.search}>
                        <p>Search</p>
                        <input onChange={(event) => this.inputChangedHandler(event)} placeholder="Search"/>
                    </div>
                </div>
                {table}
                {footer}
            </div>
        )
    }

}

export default Table;