import generateData from './libs/generateData';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const START_DATE = new Date( 2017, 0, 15 );
const END_DATE = new Date( 2017, 0, 26 );

const TEST_CONFIG = {
    
    count: 400,
    start: START_DATE,
    end: END_DATE
    
};

class ListItem extends React.Component {
    
    
    render () {
        
        return (
        
            <li className={ 'color-' + this.props.item.timestamp.toISOString().slice(0, 10) }>
                <span>{ this.props.item.id }</span>
                <span>{ this.props.item.name }</span>
                <span>{ this.props.item.timestamp.toUTCString() }</span>
                <span>{ this.props.item.timestamp.toISOString().slice(0, 10) }</span>
                <span><button onClick={ this.props.onRemove }>Remove</button></span>
            </li>
        );
    }
}

class AddListItem extends React.Component {
    
    constructor() {
        super();

        this.state = {
            newItem: this.generateOne()
        }
    }
    
    generateOne() {
        
        return generateData( {
            
            count: 1,
            start: START_DATE,
            end: END_DATE
            
        })[0];
    }
    
    handleAdd( item ) {
        
        this.props.onAdd( item );
        this.setState( {
            
            newItem: this.generateOne()
            
        } );
    }
    
    render() {
        
        return (
            <li>
                <span>{ this.state.newItem.id }</span>
                <span>{ this.state.newItem.name }</span>
                <span>{ this.state.newItem.timestamp.toUTCString() }</span>
                <span></span>
                <span>
                    <button onClick={ () => this.handleAdd( this.state.newItem ) }>Add</button>
                </span>
            </li>
        )
    }
}

class TestList extends React.Component {
    
    render() {

        return (
        
            <ul>
                <AddListItem onAdd={ this.props.onAdd } />
                { 
                    this.props.fakeData.map( ( one ) => 
                        
                        <ListItem key={ one.id } 
                                  item={ one } 
                                  onRemove={ () => this.props.onRemove( one.id ) }
                        /> 
                    ) 
                }
            </ul>
        
        );
    }
}

class CodingChallenge extends React.Component {
    
    constructor() {

        super();

        this.state = {
            
            isSorted: false,
            fakeData: generateData( TEST_CONFIG )
        }; 
        
        this.sortData = this.sortData.bind( this );
        this.produceData = this.produceData.bind( this );
        
        
    }
    
    produceData() {
        
        const fakeData = generateData( TEST_CONFIG );
        
        this.setState( {
            
            isSorted: false,
            fakeData: fakeData,
            lastRemovedId: null,
            newItemId: null
        });

    }
    
    sortData() {
        
        this.state.fakeData.sort( ( a, b ) => ( b.timestamp - a.timestamp ) );
        this.setState( { isSorted: true } );

    }
    
    handleAdd( newItem ) {
        
        let newItemCopy = Object.assign( {}, newItem );
        this.state.fakeData.unshift( newItemCopy );
        
        this.setState( {
            
            newItemId: newItemCopy.id,
        
        });
    }
    
    handleRemove( itemId ) {

        let lastRemovedId = null;
                
        this.state.fakeData.forEach( ( item, index, array ) => {
            
            if ( item.id === itemId ) {
                
                array.splice( index, 1 );
                lastRemovedId = item.id;
            }
            
        } );

        
        this.setState( {
            
            lastRemovedId: lastRemovedId
            
        } );
    }
    
    render() {

        return (
        
            <section>
                <button onClick={ this.produceData } >Regenerate</button>
                <button onClick={ this.sortData } >Sort</button>
                <TestList 
                    onAdd={ newItem => this.handleAdd( newItem ) }
                    fakeData={ this.state.fakeData }
                    onRemove={ itemId => this.handleRemove( itemId ) }
                />
            </section>
        
        );
        
    }
}

ReactDOM.render(
    <CodingChallenge />,
    document.getElementById( 'root' )
);