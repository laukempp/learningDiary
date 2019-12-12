import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "./ModalForm";

class TopicList extends Component {
  //Poistetaan topic (confirmation-ikkuna vahvistukseksi)
  deleteTopic = id => {
    let confirmation = window.confirm("Delete topic forever?");
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
        .then(topic => {
          this.props.deleteTopic(id);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const topics = this.props.topics.map(topic => {
      return (
        //Delete- ja edit -nappi jokaisen topicin rivillä
        <tr key={topic.id}>
          <th>{topic.id}</th>
          <td>{topic.title}</td>
          <td>{topic.description}</td>
          <td>{topic.timetomaster}</td>
          <td>{topic.timespent}</td>
          <td>{topic.source}</td>
          <td>{topic.startlearningdate}</td>
          <td>{topic.inprogress}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                topic={topic}
                updateTopic={this.props.updateTopic}
              />{" "}
              <Button color="danger" onClick={() => this.deleteTopic(topic.id)}>
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
        <tbody>{topics}</tbody>
      </Table>
    );
  }
}

export default TopicList;
