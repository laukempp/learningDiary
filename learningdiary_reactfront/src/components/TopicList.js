import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "./ModalForm";

class DataTable extends Component {
  //Poistetaan topic (confirmation-ikkuna vahvistukseksi)
  deleteItem = id => {
    let confirmation = window.confirm("Delete item forever?");
    if (confirmation) {
      fetch("/api/topics", {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map(item => {
      return (
        //Delete- ja edit -nappi jokaisen itemin rivillä
        <tr key={item.id}>
          <th>{item.id}</th>
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.timetomaster}</td>
          <td>{item.timespent}</td>
          <td>{item.source}</td>
          <td>{item.startlearningdate}</td>
          <td>{item.inprogress}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Time to master</th>
            <th>Time spent</th>
            <th>Source</th>
            <th>Started learning on: </th>
            <th>In progress</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default DataTable;
