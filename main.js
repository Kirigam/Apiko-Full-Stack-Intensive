const React = {
    createElement(teg, atribut, content) {
        const element = document.createElement(teg);

        if(atribut !== undefined && atribut !== null) {
            Object.entries(atribut).forEach(att => {
                
                let val1 = att[0], val2;
                if(typeof(att[1]) === 'object') {
                     
                    val2 = generator(att[1]);
                    val2.forEach(item => {
                        element.setAttribute(val1, item);
                    });
                    
                } else { 
                    val2  = att[1];
                    element[val1] = val2;
                }
            });
        }
        if(typeof(content) === 'object') {
            content.forEach(item => {
                (typeof(item) === 'string')
                    ? item = document.createTextNode(item)
                    : item = item;
                
                element.appendChild(item);
            });

            return element;
        }
        if(content !== undefined && content !== null) { element.innerHTML = content;}

        return element;
    },
    render(app, node) {
        node.innerHTML = '';
        node.appendChild(app);
    }
};

function generator(obj) {
    let value = [];

    for(key in obj) {
        let a = key + ": " + obj[key];
        
        let index = a.match( /[A-Z]/);
        index = (index !== null)? index.index : -1;
        if(index >= 0) {
            let b = a.split('');
            b.splice(index, 0, '-');
            value.push(b.join('').toLowerCase());
        } else value.push(a);
    }

    return value;
}


const app = 
    React.createElement('div', { style: { backgroundColor: 'red' } }, [
      React.createElement('span', undefined, 'Hello world'),
      React.createElement('br'),
      'This is just a text node',
      React.createElement('div', { textContent: 'Text content' }),
    ]);

React.render(
  app,
  document.getElementById('root'),
);