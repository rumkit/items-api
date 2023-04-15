import React, { Component, useEffect, useState } from 'react'
import { Item } from './Models/Item'
import { getItems } from './Services/Api';
import './App.css';
import ItemsTable from './Components/ItemsTable/ItemsTable';

function App() {

  const [items, setItems] = useState<Item[]>();

  useEffect(() => {
    getItems()
      .then(items => {
        setItems(items);
        console.log(`got ${items.length} items`)
        console.log(items);
      }
      )
      .catch(reason => console.error(reason))
  }, [])

  return (
    <div>
      <header className="site-header">
        <div className="wrapper site-header__wrapper">
          <div className="brand">
            <img className="brand__logo" src={"items-logo.png"} alt="items-app" />
            <div className="brand__caption"><h2>Items App</h2></div>
          </div>
        </div>
      </header>
      <div className="items-table__wrapper">
          <ItemsTable items={items ?? []}/>
      </div>
    </div>
  )
}

export default App;