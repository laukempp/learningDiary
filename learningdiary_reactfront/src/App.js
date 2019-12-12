import React, { Component } from "react";
import ModalForm from "./components/ModalForm";
import TopicList from "./components/TopicList";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  state = {
    topics: []
  };
  //Haetaan topicit
  getTopics() {
    fetch("/api/topics")
      .then(res => res.json())
      .then(topics => this.setState({ topics }))
      .catch(err => console.log(err));
  }
  //Käytetään post:ssa
  addTopic = topic => {
    this.setState(prevState => ({
      topics: [...prevState.topics, topic]
    }));
  };

  //Käytetään put:ssa
  updateTopic = topic => {
    const topicIndex = this.state.topics.findIndex(
      data => data.id === topic.id
    );
    const newArray = [
      ...this.state.topics.slice(0, topicIndex),
      topic,
      ...this.state.topics.slice(topicIndex + 1)
    ];
    this.setState({ topics: newArray });
  };
  //Hyödynnetään Delete:ssä
  deleteTopic = id => {
    const updatedTopics = this.state.topics.filter(topic => topic.id !== id);
    this.setState({ topics: updatedTopics });
  };

  //Haetaan kaikki topicit sivun initial loadissa
  componentDidMount() {
    this.getTopics();
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
            <TopicList
              topics={this.state.topics}
              updateTopic={this.updateTopic}
              deleteTopic={this.deleteTopic}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm buttonLabel="Add Topic" addTopic={this.addTopic} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
