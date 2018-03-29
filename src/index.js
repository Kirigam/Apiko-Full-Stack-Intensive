import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import data from './data';

let count = 10;
let ls = data.slice(0,count);
const buttonMore = document.getElementById('more');

const PostCounter = ({count}) => <span>{count}</span>;

const Posts = ({ list }) => (
    <ol>
      {list.map(item => (
        <li key={item}>
          {item.title}
        </li>
      ))}
    </ol>
  );

ReactDOM.render(
    <Posts list={ls} />,
    document.getElementById('posts')
);

buttonMore.onclick = () => {
    count = (count < 100)
        ? count+10 : 100;
    ls = data.slice(0,count);
    
    ReactDOM.render(
        <PostCounter count={count} />,
        document.getElementById('postCounter')
    );

    ReactDOM.render(
        <Posts list={ls} />,
        document.getElementById('posts')
    );
}

