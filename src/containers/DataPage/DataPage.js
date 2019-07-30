import React, {Component} from 'react';
import Table from './../Table/Table';

class DataPage extends Component {

    render () {
        const columns= [
            {
                label: 'Name',
                field: 'name',
            },
            {
                label: 'LastName',
                field: 'lastname',
            },
            {
                label: 'Age',
                field: 'age',
            },
            {
                label: 'Autre',
                field: 'autre',
            },

        ];

        const data = [
            {
                name : "Alain",
                lastname :"Posteur",
                age : "35",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            },
            {
                name : "Jean",
                lastname :"Balle",
                age : "82",
                autre : "rien"
            },
            {
                name : "Alain",
                lastname :"Posteur",
                age : "35",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            },
            {
                name : "Jean",
                lastname :"Balle",
                age : "82",
                autre : "rien"
            },
            {
                name : "Alain",
                lastname :"Posteur",
                age : "35",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            },
            {
                name : "Jean",
                lastname :"Balle",
                age : "82",
                autre : "rien"
            },
            {
                name : "Alain",
                lastname :"Posteur",
                age : "35",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            },
            {
                name : "Jean",
                lastname :"Balle",
                age : "82",
                autre : "rien"
            },
            {
                name : "Alain",
                lastname :"Posteur",
                age : "35",
                autre : "rien"
            },
            {
                name : "Lorie",
                lastname :"Fice",
                age : "20",
                autre : "rien"
            },
            {
                name : "Same",
                lastname :"Féchier",
                age : "47",
                autre : "rien"
            }

        ]

        const params = {
            "dynamic" : false
        };
        return (
            <Table
                columns={columns}
                data={data}
                params={params}/>
        )
    }

}

export default DataPage;