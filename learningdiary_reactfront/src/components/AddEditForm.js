import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    id: 0,
    title: "",
    description: "",
    timetomaster: "",
    timespent: "",
    source: "",
    startlearningdate: "",
    inprogress: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch("/api/topics", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        timetomaster: this.state.timetomaster,
        timespent: this.state.timespent,
        source: this.state.source,
        startlearningdate: this.state.startlearningdate,
        inprogress: this.state.inprogress
      })
    })
      .then(response => response.json())
      .then(topic => {
        if (Array.isArray(topic)) {
          this.props.addTopic(topic[0]);
          this.props.toggle();
        } else {
          console.log("post request failure");
        }
      })
      .catch(err => console.log(err));
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch("/api/topics", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        timetomaster: this.state.timetomaster,
        timespent: this.state.timespent,
        source: this.state.source,
        startlearningdate: this.state.startlearningdate,
        inprogress: this.state.inprogress
      })
    })
      .then(response => response.json())
      .then(topic => {
        if (Array.isArray(topic)) {
          // console.log(topic[0])
          this.props.updateTopic(topic[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if topic exists, populate the state with proper data
    if (this.props.topic) {
      const {
        id,
        title,
        description,
        timetomaster,
        timespent,
        source,
        startlearningdate,
        inprogress
      } = this.props.topic;
      this.setState({
        id,
        title,
        description,
        timetomaster,
        timespent,
        source,
        startlearningdate,
        inprogress
      });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.topic ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            onChange={this.onChange}
            value={this.state.title === null ? "" : this.state.title}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            onChange={this.onChange}
            value={
              this.state.description === null ? "" : this.state.description
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="timetomaster">Time to master</Label>
          <Input
            type="timetomaster"
            name="timetomaster"
            id="timetomaster"
            onChange={this.onChange}
            value={
              this.state.timetomaster === null ? "" : this.state.timetomaster
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="timespent">Time spent</Label>
          <Input
            type="timespent"
            name="timespent"
            id="timespent"
            onChange={this.onChange}
            value={this.state.timespent === null ? "" : this.state.timespent}
            placeholder="e.g. 2 weeks"
          />
        </FormGroup>
        <FormGroup>
          <Label for="source">source</Label>
          <Input
            type="text"
            name="source"
            id="source"
            onChange={this.onChange}
            value={this.state.source === null ? "" : this.state.source}
            placeholder="Online course, project etc.."
          />
        </FormGroup>
        <FormGroup>
          <Label for="startlearningdate">Started learning on</Label>
          <Input
            type="text"
            name="startlearningdate"
            id="startlearningdate"
            onChange={this.onChange}
            value={
              this.state.startlearningdate === null
                ? ""
                : this.state.startlearningdate
            }
            placeholder="e.g. November"
          />
        </FormGroup>
        <FormGroup>
          <Label for="inprogress">Still in progress?</Label>
          <Input
            type="text"
            name="inprogress"
            id="inprogress"
            onChange={this.onChange}
            value={this.state.inprogress}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
