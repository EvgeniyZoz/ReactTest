my-app-2

Наша задача создать прототип корзины, у нас есть несколько строк каждая из которых представляет из себя Counter;

------
[SW.BAND] 2. Рефакторинг кода.mp4
[SW.BAND] 3. Композиция компонентов.mp4
[SW.BAND] 4. Передача данных в компонент.mp4
[SW.BAND] 5. Передача контента компонента в сам компонент.mp4
[SW.BAND] 6. Debug. Отладка React приложений
[SW.BAND] 7. Props vs State.mp4
[SW.BAND] 8. Создание и обработка событий.mp4
[SW.BAND] 9. Обновление состояния.mp4
[SW.BAND] 10. Передача атрибутов одной сущности.mp4
[SW.BAND] 11. Единый источник истины.mp4
[SW.BAND] 12. Практическое задание #1.mp4
[SW.BAND] 13. Практическое задание #2.mp4
------

-----------------------------------------------------
---------[SW.BAND] 2. Рефакторинг кода.mp4
-----------------------------------------------------

Наш компонент const App = () => {
    return <Counter/>;
}; находятся сейчас в index.js сделаем так чтобы импортировать в index.js только App
для этого создадим компонет App
И удаляем из прошлого проекта теги

-----------------------------------------------------
---------[SW.BAND] 3. Композиция компонентов.mp4
-----------------------------------------------------

Композиция компонентов это когда используем в одном компоненте несколько вложенных компонентов реакт
Чтобы развернуть map нам нужен key, поэтому заводим id, и еще нужны начальные значения для коунтера например зададим value, в компоненты они по дефолту равны 0 /*const [count, setCount] = useState(0);)*/

-----------------------------------------------------
---------[SW.BAND] 4. Передача данных в компонент.mp4
-----------------------------------------------------

У нас было названо внутри counter /*const [count, setCount]*/ но на самом деле у нас не count а value поэтому переименовавываем

--- counter.jsx ---

import React from 'react';
import Counter from "./counter";

const СountersList = () => {
    const counters = [{id : 0, value: 0}, {id : 1, value: 4}, {id : 2, value: 0}];
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value} />
            ))}
        </>
    )
};

export default СountersList;

---- counterList.jsx ---

import React from 'react';
import Counter from "./counter";

const СountersList = () => {
    const counters = [{id : 0, value: 0}, {id : 1, value: 4}, {id : 2, value: 0}];
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value} />
            ))}
        </>
    )
};

export default СountersList;

-------------------------------------------------------------------------
---------[SW.BAND] 5. Передача контента компонента в сам компонент.mp4
-------------------------------------------------------------------------

Допустим сделаем вот так 
/*<Counter key={count.id} value={count.value}>
    <h1>Счетчик</h1>
</Counter>*/
И выведем

/*const Counter = (props) => {

    const [value, setValue] = useState(props.value);

    console.log(props);*/
Нам выведет

/*
Object
    children {$$typeof: Symbol(react.element), type: 'h1', key: null, ref: null, props: {…}, …}
    value
    key
(...) */
Если подробно посмотреть то children это у нас Реакт элемент. И его можно вывести

------counter.jsx--------

import React from 'react';
import Counter from "./counter";

const СountersList = () => {
    const counters = [{id : 0, value: 0}, {id : 1, value: 4}, {id : 2, value: 0}];
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value}>
                    <h2>Счетчик</h2>
                </Counter>
            ))}
        </>
    )
};

export default СountersList;

------counterList.jsx--------------

import React from 'react';
import Counter from "./counter";

const СountersList = () => {
    const counters = [{id : 0, value: 0}, {id : 1, value: 4}, {id : 2, value: 0}];
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value}>
                    <h2>Счетчик</h2>
                </Counter>
            ))}
        </>
    )
};

export default СountersList;

Давайте изменим <h2>Счетчик</h2>, на название элемента в корзине и получим

-------------counter.jsx----------
import React, { useState } from 'react';

const Counter = (props) => {

    const [value, setValue] = useState(props.value);

    console.log(props);
    
    const formatValue = () => {
        return value === 0 ? 'empty' : value;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += value === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setValue((prevState) => prevState + 1);
    };

    const handleDecrement = () => {
        setValue((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

    
    return (
        <div>
            <span>{props.name}</span>
            <span className={getBageClasses()}>{formatValue()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default Counter;

-------------countersList.jsx----------
import React from 'react';
import Counter from "./counter";

const СountersList = () => {
    const counters = [
        {id : 0, value: 0, name:'Ложка'},
        {id : 1, value: 4, name:'Тарелка'},
        {id : 2, value: 0, name:'Вилка'}
    ];
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value} name={count.name} />
            ))}
        </>
    )
};

export default СountersList;

-------------------------------------------------------------------------
---------[SW.BAND] 6. Debug. Отладка React приложений
-------------------------------------------------------------------------
вводим в гугл поиске react dev tools и надо для отладки установить это расширение
https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?pli=1

Если открыть панель инструментов хром где console и прочее там появяться вкладки реакт
Components и Profiler. В настройках можно удалить фильтры и сделать чтобы все были видны 

-------------------------------------------------------------------------
---------[SW.BAND] 7. Props vs State.mp4
-------------------------------------------------------------------------
Props нельзя поменять, подробнее в видео

-------------------------------------------------------------------------
---------[SW.BAND] 8. Создание и обработка событий.mp4
-------------------------------------------------------------------------
Для того чтобы удалять нам нужен будет не просто использовать константу а нужно будет использовать хук useState в countersList

Важное правило Реакт! Компонент, которому принадлежит часть состояния должен быть тем кто его модифицирует
Получается counters вызывает метод Delete а countersList обрабатывает его

---counter.jsx----

import React, { useState } from 'react';

const Counter = (props) => {

    const [value, setValue] = useState(props.value);

    const formatValue = () => {
        return value === 0 ? 'empty' : value;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += value === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setValue((prevState) => prevState + 1);
    };

    const handleDecrement = () => {
        setValue((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

    
    return (
        <div>
            <span>{props.name}</span>
            <span className={getBageClasses()}>{formatValue()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={props.onDelete}>Удалить</button>
        </div>
    );
};

export default Counter;

---countersList.jsx-----
import React, {useState} from 'react';
import Counter from "./counter";

const СountersList = () => {
    const [counters, setCounters] = useState([
        {id : 0, value: 0, name:'Ложка'},
        {id : 1, value: 4, name:'Тарелка'},
        {id : 2, value: 0, name:'Вилка'}
    ]);
    
    const handleDelete = () => {
        console.log('Delete');
    };
    
    return (
        <>
            {counters.map((count) => (
                <Counter key={count.id} value={count.value} name={count.name} onDelete={handleDelete} />
            ))}
        </>
    )
};

export default СountersList;

-------------------------------------------------------------------------
---------[SW.BAND] 9. Обновление состояния.mp4
-------------------------------------------------------------------------
---countersList.jsx-----------
import React, {useState} from 'react';
import Counter from "./counter";

const СountersList = () => {
    const [counters, setCounters] = useState([
        {id : 0, value: 0, name:'Ложка'},
        {id : 1, value: 4, name:'Тарелка'},
        {id : 2, value: 0, name:'Вилка'}
    ]);
    
    const handleDelete = (id) => {
        console.log('handleDelete', id);
        const newCounters = counters.filter(c => c.id !== id); 
        setCounters(newCounters);
    };

    return (
        <>
            {counters.map((count) => (
                <Counter
                    key={count.id}
                    id={count.id}
                    value={count.value}
                    name={count.name}
                    onDelete={handleDelete} />
            ))}
        </>
    )
};

export default СountersList;


-----counters.jsx-------
import React, { useState } from 'react';

const Counter = (props) => {

    const [value, setValue] = useState(props.value);

    const formatValue = () => {
        return value === 0 ? 'empty' : value;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += value === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    const handleIncrement = () => {
       setValue((prevState) => prevState + 1);
    };

    const handleDecrement = () => {
        setValue((prevState) => prevState > 0 ? prevState - 1 : 0);
     };

    
    return (
        <div>
            <span>{props.name}</span>
            <span className={getBageClasses()}>{formatValue()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={() => props.onDelete(props.id)}>Удалить</button>
        </div>
    );
};

export default Counter;

-------------------------------------------------------------------------
---------[SW.BAND] 10. Передача атрибутов одной сущности.mp4
-------------------------------------------------------------------------
можно чтобы не записывать внутри countersList
/*
{counters.map((count) => (
                <Counter
                    key={count.id}
                    id={count.id}
                    value={count.value}
                    name={count.name}
                    onDelete={handleDelete} />
            ))}
*/
сделать так, как эти свойства у нас уже повторяются выше в объявлении переменной

/*{counters.map((count) => (
    <Counter
        key={count.id}
        {...count}
        onDelete={handleDelete} />
))}*/

-------------------------------------------------------------------------
---------[SW.BAND] 11. Единый источник истины.mp4
-------------------------------------------------------------------------

---counterList.jsx-----

import React, {useState} from 'react';
import Counter from "./counter";

const СountersList = () => {

    const initialState = [
        {id : 0, value: 0, name:'Ложка'},
        {id : 1, value: 4, name:'Тарелка'},
        {id : 2, value: 0, name:'Вилка'}
    ];
        
    const [counters, setCounters] = useState(initialState);
    
    const handleDelete = (id) => {
        console.log('handleDelete', id);
        const newCounters = counters.filter(c => c.id !== id); 
        setCounters(newCounters);
    };

    const handleReset = () => {
        //console.log('handleReset');
        setCounters(initialState);
    };

    const handleUpdate = () => {
        const updateState = [
            {id : 0, value: 5, name:'Ложка'},
            {id : 1, value: 9, name:'Тарелка'},
            {id : 2, value: 11, name:'Вилка'}
        ];
        setCounters(updateState);
    };

    return (
        <>
            {counters.map((count) => (
                <Counter
                    key={count.id}
                    {...count}
                    onDelete={handleDelete} />
            ))}
            <button onClick={handleReset}>Сброс</button>
            <button onClick={handleUpdate}>Новое состояние</button>
        </>
    )
};

export default СountersList;


---counter.jsx----
import React, { useState } from 'react';

const Counter = (props) => {

    const {value} = props;

    const formatValue = () => {
        return value === 0 ? 'empty' : value;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += value === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    return (
        <div>
            <span>{props.name}</span>
            <span className={getBageClasses()}>{formatValue()}</span>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={() => props.onDelete(props.id)}>Удалить</button>
        </div>
    );
};

export default Counter;

-------------------------------------------------------------------------
---------[SW.BAND] 12. Практическое задание #1.mp4
-------------------------------------------------------------------------

----counters.jsx-----

import React, { useState } from 'react';

const Counter = (props) => {

    const {value} = props;

    const formatValue = () => {
        return value === 0 ? 'empty' : value;
    }

    const getBageClasses = () => {
        let classes = 'rounded-sm p-2 text-white mx-2 ';
        classes += value === 0 ? 'bg-warning' : 'bg-primary';
        return classes;
    };

    return (
        <div>
            <span>{props.name}</span>
            <span className={getBageClasses()}>{formatValue()}</span>
            <button onClick={() => props.onIncrement(props.id)}>+</button>
            <button onClick={() => props.onDecrement(props.id)}>-</button>
            <button onClick={() => props.onDelete(props.id)}>Удалить</button>
        </div>
    );
};

export default Counter;


----countersList.jsx-----

import React, {useState} from 'react';
import Counter from "./counter";

const СountersList = () => {

    const initialState = [
        {id : 0, value: 0, name:'Ложка'},
        {id : 1, value: 4, name:'Тарелка'},
        {id : 2, value: 0, name:'Вилка'}
    ];
        
    const [counters, setCounters] = useState(initialState);
    
    console.log(counters);

    const handleDelete = (id) => {
        console.log('handleDelete', id);
        const newCounters = counters.filter(c => c.id !== id); 
        setCounters(newCounters);
    };

    const handleReset = () => {
        //console.log('handleReset');
        setCounters(initialState);
    };

    const handleIncrement = (id) => {
        const elementIndex = counters.findIndex(c => c.id === id);
        const newCounters = [...counters];
        newCounters[elementIndex].value++;
        setCounters(newCounters);
    };

    const handleDecrement = (id) => {
        const elementIndex = counters.findIndex(c => c.id === id);
        const newCounters = [...counters];
        newCounters[elementIndex].value--;
        setCounters(newCounters);
    };

    const handleUpdate = () => {
        const updateState = [
            {id : 0, value: 5, name:'Ложка'},
            {id : 1, value: 9, name:'Тарелка'},
            {id : 2, value: 11, name:'Вилка'}
        ];
        setCounters(updateState);
    };

    return (
        <>
            {counters.map((count) => (
                <Counter
                    key={count.id}
                    {...count}
                    onDelete={handleDelete} onIncrement={handleIncrement} onDecrement={handleDecrement} />
            ))}
            <button onClick={handleReset}>Сброс</button>
            <button onClick={handleUpdate}>Новое состояние</button>
        </>
    )
};

export default СountersList;

-------------------------------------------------------------------------
---------[SW.BAND] 13. Практическое задание #2.mp4
-------------------------------------------------------------------------
Мой пример внутри fast-company
В проекте hw2 - уже разбитый на компоненты код
