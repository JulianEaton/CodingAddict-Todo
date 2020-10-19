import React, { Component } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 } from "uuid";
class App extends Component {
  state = {
    items: [],
    id: v4(),
    title: "",
    editItem: false,
  };
  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.title.trim()) {
      const newItem = {
        id: this.state.id,
        title: this.state.title,
      };
      const updatedItems = [...this.state.items, newItem];

      this.setState({
        items: updatedItems,
        title: "",
        id: v4(),
        editItem: false,
      });
    }
  };
  handleClearList = (e) => {
    this.setState({ items: [] });
  };
  handleDeleteItem = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: filteredItems });
  };
  handleEditItem = (id) => {
    if (!this.state.editItem) {
      const itemToEdit = this.state.items.find((item) => item.id === id);

      const filteredItems = this.state.items.filter((item) => item.id !== id);
      this.setState({
        items: filteredItems,
        title: itemToEdit.title,
        editItem: true,
        id,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput
              title={this.state.title}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              handleClearList={this.handleClearList}
              handleDeleteItem={this.handleDeleteItem}
              handleEditItem={this.handleEditItem}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
