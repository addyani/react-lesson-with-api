import React, { useEffect, useState } from "react";
import AddProducts from "./components/addproducts/AddProducts";
import Button from "./components/button/Button";
import CardBody from "./components/cards/CardBody";
import Category from "./components/categories";
import Header from "./components/header/Header";
import Search from "./components/search/Search";

import "./App.css";
const App = () => {
  const [items, setItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchValueCategory, setSearchValueCategory] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  function changingSearchData(e) {
    setSearchValue(e.target.value);
    setSearchValueCategory(e.target.value);
  }

  //Masih Tahap Percobaan
  function changingSearchDataByCategory(e) {
    setSearchValueCategory(e.target.value);
  }

  const itmesFilter = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValueCategory.toLowerCase())
  );

  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }

  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
  }

  return (
    <div className="body__container">
      <div className="nav">
        <Header />
        <div className="nav-right">
          <Search
            products={items}
            value={searchValue}
            onChangeData={changingSearchData}
          />
          <Button num={addedItems.length} click={setShowAddProducts} />
        </div>
      </div>
      <Category
        products={items}
        value={searchValueCategory}
        onChangeData={changingSearchDataByCategory}
      />

      {showAddProducts && (
        <AddProducts
          click={setShowAddProducts}
          items={addedItems}
          removeItem={removeItem}
          setAddedItem={setAddedItem}
        />
      )}
      <CardBody
        products={itmesFilter}
        addItem={addItem}
        removeItem={removeItem}
        addedItems={addedItems}
      />
    </div>
  );
};

export default App;
