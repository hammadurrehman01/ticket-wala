import React from "react";
import { Modal,Col } from "reactstrap";

const ModalComp = (props) => {
  return (
    <Modal size={`${props.size ? props.size : 'md'}`} isOpen={props.isStopAddPopup}>
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myLargeModalLabel">
          {props.title}
        </h5>
        <button
          onClick={() => props.setIsStopAddPopup(false)}
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Col lg="12">{props.children}</Col>
    </Modal>
  );
};

export default ModalComp;
