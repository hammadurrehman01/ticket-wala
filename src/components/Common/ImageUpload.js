import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row , Form } from "reactstrap";

const ImageUplaod = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleAcceptedFiles = (files) => {
    console.log(files);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles(files);
    props.Preview(files[0].preview)

    var reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
      console.log(reader.result);
      var newResult = reader.result.split(",");
      props.setImageBase64(newResult[1]);
      props.imageType(files[0].type);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <Card>
      <CardBody>
        <Form>
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDropAccepted={(acceptedFiles) =>
              handleAcceptedFiles(acceptedFiles)
            }
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone">
                <div className="dz-message needsclick" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="dz-message needsclick">
                    <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="dropzone-previews mt-3" id="file-previews">
            {selectedFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="avatar-sm rounded bg-light"
                          alt={f.name}
                          src={f.preview}
                        />
                      </Col>
                      <Col>
                        <Link to="#" className="text-muted font-weight-bold">
                          {f.name}
                        </Link>
                        <p className="mb-0">
                          <strong>{f.formattedSize}</strong>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ImageUplaod;
