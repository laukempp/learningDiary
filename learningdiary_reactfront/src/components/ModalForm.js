import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEditForm from "./AddEditForm";

class ModalForm extends Component {
  //Määritetään modalille oletusarvoksi "false" eli ei näkyvissä.
  state = {
    modal: false
  };
  //Funktio, jolla saadaan modal näkyviin
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    //Modalin sulkemisnäppäin (togglee modalin pois näkyvistä)
    const closeBtn = (
      <button className="close" onClick={this.toggleModal}>
        &times;
      </button>
    );

    const label = this.props.buttonLabel;

    let button = "";
    let title = "";

    //Editille speksit
    if (label === "Edit") {
      button = (
        <Button
          color="warning"
          onClick={this.toggleModal}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      title = "Edit Topic";
    }
    // Add-buttonille speksit
    else {
      button = (
        <Button
          color="success"
          onClick={this.toggleModal}
          style={{ float: "left", marginRight: "10px" }}
        >
          {label}
        </Button>
      );
      title = "Add New Topic";
    }

    return (
      <div>
        {button}
        <Modal
          isOpen={this.state.modal}
          toggleModal={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal} close={closeBtn}>
            {title}
          </ModalHeader>
          <ModalBody>
            <AddEditForm
              addTopic={this.props.addTopic}
              updateTopic={this.props.updateTopic}
              toggleModal={this.toggleModal}
              topic={this.props.topic}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
