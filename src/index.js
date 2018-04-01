import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import data from './data';
import styled from 'styled-components';

let ls = data;

const Posts = ({ list }) => (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          {item.title}
        </li>
      ))}
    </ul>
  );

class PostsUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 10
        };

       this.clickMore = this.clickMore.bind(this);
    }
    clickMore() {
        let value = (this.state.count < 100)? this.state.count+10 : 100;
        
        this.setState({count: value});
    }
    render() {
        return (
            <React.Fragment>
                <h3>Users ask: {this.state.count}</h3>
                <Posts list={ls.slice(0 ,this.state.count)} />
                <button onClick={this.clickMore}>More</button>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <PostsUsers />,
    document.getElementById('posts')
);

/////////////////////////////////////////////////////////////////////

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '' };

        this.hendleChange = this.hendleChange.bind(this);
    }

    hendleChange({target: {name, value}}) {
        this.setState({[name]: value});
        if(this.state[name] === '') {
            ReactDOM.render(
                <PostsUsers />,
                document.getElementById('posts')
            );
        }else {
            let pattern = new RegExp(value);
         
            let filtredArr = data.filter(item => {
                if(item.title.match(pattern)) {
                    return item;
                }
            });
            
            ls = filtredArr;
            ReactDOM.render(
               (filtredArr.length > 0)
                ? <PostsUsers />
                : <p>Not found</p>,

                document.getElementById('posts')
            );
        } 
    }

    render() {
        return (
            <input type="text" name="search" 
            placeholder="search" value={this.state.value} 
            onChange={this.hendleChange} />
        );
    }
}

ReactDOM.render(
    <SearchInput /> , document.getElementById('main')
);