import React, { useRef, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const mediaRecorderOptions = {
  mimeType: 'video/mp4', // Use VP8 codec for better compression
  // mimeType: 'video/webm; codecs=vp8', // Use VP8 codec for better compression
  videoBitsPerSecond: 250000, // Set video bitrate to minimize file size
  audioBitsPerSecond: 128000, // Set audio bitrate (optional)
};

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return (
    <video
      ref={videoRef}
      width="100%"
      height="auto"
      autoPlay
      controls
      style={{ borderRadius: '5px' }}
    />
  );
};

const MediaRecorder = () => {
  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <CardTitle tag="h2">Video Recorder</CardTitle>
          <ReactMediaRecorder
            video={{
              width: 320, // Set width for 240p
              height: 240, // Set height for 240p
              frameRate: 15, // Optional: lower frame rate for smaller file size
            }}
            mediaRecorderOptions={mediaRecorderOptions}
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
              previewStream,
            }) => (
              <div>
                <CardText>Status: {status}</CardText>

                <Row className="mb-3">
                  <Col xs="6">
                    <Button color="primary" onClick={startRecording} block>
                      Start Recording
                    </Button>
                  </Col>
                  <Col xs="6">
                    <Button color="danger" onClick={stopRecording} block>
                      Stop Recording
                    </Button>
                  </Col>
                </Row>

                {previewStream && !mediaBlobUrl && (
                  <div className="mb-3">
                    <h4>Live Preview:</h4>
                    <VideoPreview stream={previewStream} />
                  </div>
                )}

                {mediaBlobUrl && (
                  <div>
                    <h4>Recorded Video:</h4>
                    {/* <video
                      src={mediaBlobUrl}
                      controls
                      autoPlay
                      loop
                      style={{ width: '100%', borderRadius: '5px' }}
                    /> */}
                    <a href={mediaBlobUrl} download="a.webm">
                      download
                    </a>
                  </div>
                )}
              </div>
            )}
          />
        </CardBody>
      </Card>
    </Container>
  );
};

export default MediaRecorder;
