import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from './search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John C.", salary: 800, increase: false, like: true, id: 1 },
                { name: "Alex M.", salary: 3000, increase: true, like: false, id: 2 },
                { name: "Carl W.", salary: 15000, increase: false, like: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);

            // const newArr = {...before, ...after};


            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id)

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0,index), newItem, ...data.slice(index+1)];

        //     return {
        //         data: newArr
        //     }
        // })
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    // onToggleRise = (id) => {
    //     this.setState(({ data }) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return { ...item, like: !item.like }
    //             }
    //             return item;
    //         })
    //     }))
    // }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const employers = this.state.data.length
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data,term), filter)
        return (
            <div className="app">
                <AppInfo employers={employers} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp} />
                <EmployersAddForm  onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App