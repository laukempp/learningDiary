import React, { Component } from "react";
import ModalForm from "./components/ModalForm";
import DataTable from "./components/TopicList";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  state = {
    items: []
  };
  //Haetaan topicit
  getItems() {
    fetch("/api/topics")
      .then(res => res.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err));
  }
  //Hyödynnetään Post-funktiossa
  addItemToState = item => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }));
  };

  updateState = item => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ];
    this.setState({ items: newArray });
  };
  //Hyödynnetään Delete-funktiossa
  deleteItemFromState = id => {
    const updatedItems = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updatedItems });
  };

  //Haetaan topicit initial loadissa
  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Learning diary</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm
              buttonLabel="Add Item"
              addItemToState={this.addItemToState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
