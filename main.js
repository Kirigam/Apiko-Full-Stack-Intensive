const React = {
    createElement(teg, atribut, content) {
        const element = document.createElement(teg);

        if(atribut !== undefined && atribut !== null) {
            Object.entries(atribut).forEach(att => {
                
                let prop1 = att[0], prop2;
                if(typeof(att[1]) === 'object') {
                     
                    prop2 = generatorProp2(att[1]);
                    prop2.forEach(item => {
                        element.setAttribute(prop1, item);
                    });
                    
                } else { 
                    prop2  = att[1];
                    element[prop1] = prop2;
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

        function generatorProp2(obj) {
            let properties = [];
        
            for(key in obj) {
                let a = key + ": " + obj[key];
                
                let index = a.match( /[A-Z]/);
                index = (index !== null)? index.index : -1;
                if(index >= 0) {
                    let b = a.split('');
                    b.splice(index, 0, '-');
                    properties.push(b.join('').toLowerCase());
                } else properties.push(a);
            }
        
            return properties;
        }

        return element;
    },
    render(app, node) {
        node.innerHTML = '';
        node.appendChild(app);
    }
};


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