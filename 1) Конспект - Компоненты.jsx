Будем использовать пример my-app

npx create-react-app my-app

Babel и JSX

https://babeljs.io/ - нужен для того чтобы переводить из jsx в реакт

import React from 'react'
import reactDom from 'react-dom' - монтирует наши реакт компоненты в dom дерево

const element = <h1>Hello world</h1>;
//const element = React.createElement(‘h1’, null, ‘Hello World’); - это тоже самое что выше, 
console.log(element);

reactDom.render(element, document.getElementById("root")); - добавляем наш элемент див на странице

Приложение нужные в vs code
1) Auto Import  
2) Material Icon Theme - добавляет иконки, чтобы быстрее ориентироваться, в настройках выбираем react 
3) Prettier - для форматирования кода - переходим в Settings (пишем save и ставим галочку на Editor:Format on Save)

---------------------------------------------------------------
-----[SW.BAND] 2. Первый React компонент-----
---------------------------------------------------------------

1) Создаем папку Components внутри будут компоненты

2) в ней создаем компонент components/counter.jsx

import React from 'react'
const Counter = () => {
    return <h1>Counter</h1>;
};

export default Counter;

3). переходим в index.js
и импортируем туда наш Counter component и наше расширение Авто импорта добавит импорт для нашего компонента


import React from 'react';
import reactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Counter from "./my-app/src/Components/counter";

const App = () => {
    return <Counter />
};

reactDom.render(<App />, document.getElementById("root"));

---------------------------------------------------------------
-----[SW.BAND] 3. Указание дочерних компонентов.mp4-------
---------------------------------------------------------------
Теперь добавим к нашему компоненту кнопку
Вместо <React.Fragment> может быть <></> или <div></div>

import React from 'react'
    const Counter = () => {
        return (
            <React.Fragment>
                <h1>Counter</h1>
                <button>1</button>
            </React.Fragment>
        );
    };
};

export default Counter;

---------------------------------------------------------------
------[SW.BAND] 4. Вложенные выражения.mp4-----
---------------------------------------------------------------

import React from 'react';

const Counter = () => {
    const count = 0;
    const formatCount = () => {
        return count===0 ? 'empty' : count;
    }
    const imgUrl = 'https://picsum.photos/300';
    return (
        <>
            <img src={imgUrl} alt="" />
            <span className='bg-primary rounded-sm p-2 text-white mx-2'>{formatCount()}</span>
            <button>1</button>
        </>
    );
};

export default Counter;


---------------------------------------------------------------
-----[SW.BAND] 6. Динамический рендер классов.mp4
---------------------------------------------------------------

import React from 'react';

const Counter = () => {
    const count = 2;
    const formatCount = () => {
        return count===0 ? 'empty' : count;
    }
    const imgUrl = 'https://picsum.photos/300';

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };
    
    return (
        <>
            <img src={imgUrl} alt="" />
            <span className={getBageClasses()}>{formatCount()}</span>
            <button>1</button>
        </>
    );
};

export default Counter;

---------------------------------------------------------------
-----[SW.BAND] 7. Обработка событий.mp4
---------------------------------------------------------------
//handleIncrement() - вызовет функцию сразу, а нам надо сейчас только при нажатии поэтому handleIncrement
//Ниже в коде у нас меняется count но отображение не меняется, чтобы менялось отображение надо рендерить для этого хук ниже

import React from 'react';

const Counter = () => {
    let count = 2;
    const formatCount = () => {
        return count===0 ? 'empty' : count;
    }
    const imgUrl = 'https://picsum.photos/300';

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       count++;
       console.log(count);
    };
    
    return (
        <>
            <img src={imgUrl} alt="" />
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
        </>
    );
};

export default Counter;

---------------------------------------------------------------
-----[SW.BAND] 8. useState.mp4
---------------------------------------------------------------
Каждый хук это функция котррую нужно вызывать, нам нужен хук чтобы рендерить каждый раз когда меняется count

import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0); // это деструктуризация, т.е мы переменным count, setCount присваиваем значения из объекта useState
    // useState может принимать значения как численные, так и объекты, массивы, объекты массивов и так далее useState({})
    
    console.log(count);

    const formatCount = () => {
        return count===0 ? 'empty' : count;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setCount(count + 1); //если вызвать функцию 2 раза setCount(count + 1); setCount(count + 1); отработает только одна функция, 2 штуки схлопнутся это связано с системой оптимизации дублирования событий, но если нам нужно именно запустить 2 то для этого есть prevState - это наше текущее значение count которое на данный момент хранится в нашем состоянии useState
       console.log(count);
    };
    
    return (
        <>
            <img src={imgUrl} alt="" />
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
        </>
    );
};

export default Counter;

---------------------------------------------------------------
-----[SW.BAND] 8.1 useState.mp4 - prev
---------------------------------------------------------------
import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0);
    
    const formatCount = () => {
        return count === 0 ? 'empty' : count;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setCount((prevState) => prevState + 1);
       //setCount((prevState) => prevState + 1);
       //console.log(count);
    };

    const handleDecrement = () => {
        setCount((prevState) => prevState > 0 ? prevState - 1 : 0);
     };
    
    return (
        <>
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </>
    );
};

export default Counter;


---------------------------------------------------------------
-----[SW.BAND] 9. Рендер списка из массива.mp4
---------------------------------------------------------------
import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0);
    const [tegs, setTegs] = useState(['tag1', 'tag2', 'tag3']);

    
    console.log(tegs)

    const formatCount = () => {
        return count === 0 ? 'empty' : count;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setCount((prevState) => prevState + 1);
       //setCount((prevState) => prevState + 1);
       //console.log(count);
    };

    const handleDecrement = () => {
        setCount((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

     const handleTagChange = () => {
        setTegs(['tag4', 'tag5']);
     };
    
    return (
        <>
            <ul className='flex'>
                {/*
                    Чтобы не записывать вот так мы используем функцию js map
                    <li>{tegs[0]};</li>
                    <li>{tegs[1]};</li>
                    <li>{tegs[2]};</li>
                */}
                {tegs.map((tag, index) => (
                    <li key={tag} onClick={handleTagChange} className='btn text-white bg-primary mx-2'
                    >{tag};</li>
                ))}
            </ul>
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </>
    );
};

export default Counter;

---------------------------------------------------------------
-----[SW.BAND] 10. Передача аргументов событий.mp4
---------------------------------------------------------------
//С помощью такого метода можно удалять 

import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0);
    const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);

    
    console.log(tags)

    const formatCount = () => {
        return count === 0 ? 'empty' : count;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setCount((prevState) => prevState + 1);
       //setCount((prevState) => prevState + 1);
       //console.log(count);
    };

    const handleDecrement = () => {
        setCount((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

     const handleTagChange = (id) => {
        setTags(prevState => prevState.filter(tag => tag !== id));
     };
    
    return (
        <>
            <ul className='flex p-0'>
                {/*
                    Чтобы не записывать вот так мы используем функцию js map
                    <li>{tags[0]};</li>
                    <li>{tags[1]};</li>
                    <li>{tags[2]};</li>
                */}
                {/*Если написать ниже onClick={handleTagChange()} то будет переполнен стек рендеринга будет ошибка*/}
                {tags.map((tag) => (
                    <li
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className='btn text-white bg-primary mx-2'>
                            {tag};
                    </li>
                ))}
            </ul>
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </>
    );
};

export default Counter;

---------------------------------------------------------------
-----[SW.BAND] 11. Условный рендеринг
---------------------------------------------------------------

//Если у нас не будет тегов, то tags.length будет равна 0

import React, { useState } from 'react';

const Counter = () => {

    const [count, setCount] = useState(0);
    const [tags, setTags] = useState(['tag1', 'tag2', 'tag3']);

    const formatCount = () => {
        return count === 0 ? 'empty' : count;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += count === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setCount((prevState) => prevState + 1);
    };

    const handleDecrement = () => {
        setCount((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

     const handleTagChange = (id) => {
        setTags(prevState => prevState.filter(tag => tag !== id));
     };

     const renderTags = () => {
        {
            /*если тегов нет то будет ошибка поэтому пишем условие*/
            /*Есть еще вариант рендеринга в том случае если тегов нет
                return tags.length !== 0 && tags.map((tag) => (
                    <li
                        ...
                    </li>
                )) : <div class="btn btn-danger">No tags</div>;
            
            */
        }
        return tags.length !== 0 && tags.map((tag) => (
            <li
                key={tag}
                onClick={() => handleTagChange(tag)}
                className='btn text-white bg-primary mx-2'>
                    {tag};
            </li>
        ));
    };
    
    if (tags.length !== 0) {
        return (
            <>
                <ul className='flex p-0'>
                    {renderTags()}
                </ul>
            </>
        );
    }

    return (
        <>
            <ul className='flex p-0'>
                {renderTags()}
            </ul>
            <span className={getBageClasses()}>{formatCount()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </>
    );
};

export default Counter;