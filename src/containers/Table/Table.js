import React, {Component} from 'react';
import classes from './Table.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Table extends Component {
    state = {
        loading : true,
        initialDatas : null,
        datas : null,
        dynamic:false
    };

    componentDidMount() {
        if(this.props.params.dynamic){
            console.log(this.props.params.dynamic);
            this.setState({dynamic: this.props.params.dynamic});
        }

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
                        if(i < 10){
                            return (
                                <tr key = {i} >
                                    {Object.keys(this.state.datas[key]).map((name,j) => {
                                        return(
                                            <td key = {j} >
                                                {this.state.datas[key][name]}
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
        return (
            <div className={classes.Table}>
                <div className={classes.header}>
                    <div className ={ classes.entries }>
                        <p>Show</p>
                        <div className={classes.select}>
                            <select name="slct" id="slct">
                                <option defaultValue value="10">10</option>
                                <option value="15">15</option>
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
                <div className={classes.footer}>
                    <div className={classes.showing}>
                        <p>Showing 1 to 10 of 57 entries</p>
                    </div>
                    <div className={classes.pagination}>
                        <button>Previous</button>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Table;