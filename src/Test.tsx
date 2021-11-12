// import DBR from "./dbr";
import * as Quagga from "quagga";
import React from "react";

const MyBarcodeScanner = () => {
  const elRef = React.createRef<HTMLVideoElement>();
  const [barcode, setBarcode] = React.useState<null | number>(null);
  return (
    <>
      <button
        onClick={() => {
          navigator.mediaDevices
            .getUserMedia({
              video: {
                facingMode: "environment",
              },
            })
            .then((stream) => {
              // const pc = new RTCPeerConnection();
              // const track = stream.getVideoTracks()[0];
              // const sender = pc.addTrack(track, stream);
              if (elRef.current) {
                elRef.current.srcObject = stream;
                stream.getVideoTracks().forEach((tracker) => {
                  console.log(tracker.getCapabilities());
                });
                Quagga.init(
                  {
                    inputStream: {
                      name: "Live",
                      type: "LiveStream",
                      target: elRef.current, // Or '#yourElement' (optional)
                    },
                    decoder: {
                      readers: [
                        "code_128_reader",
                        "ean_reader",
                        "ean_8_reader",
                        // "code_39_vin_reader",
                        "code_39_reader",
                        // "codabar_reader",
                        "upc_reader",
                        // "upc_e_reader",
                        // "i2of5_reader",
                        // "2of5_reader",
                        // "code_93_reader",
                      ],
                    },
                    locate: true,

                    locator: {
                      halfSample: true,
                      patchSize: "x-large", // x-small, small, medium, large, x-large
                    },
                  },
                  function (err) {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log("Initialization finished. Ready to start");
                    Quagga.start();
                  }
                );

                elRef.current.onloadedmetadata = function (e) {
                  if (e.target) {
                    const mytr = e.target as any;
                    mytr.play();
                  }
                };
                const a = (data) => {
                  console.log(data);
                  if (data && elRef.current) {
                    Quagga.offProcessed(a);
                    stream.getTracks().forEach(function (track) {
                      track.stop();
                    });

                    elRef.current.srcObject = null;
                    Quagga.stop();
                    setBarcode(data.codeResult.code);
                  }
                };
                Quagga.onDetected(a);
                // Quagga.onProcessed(a);
              }
            })
            .catch((err) => console.log(err.name + ": " + err.message));
        }}
      >
        ss
      </button>
      <video ref={elRef}></video>
      {barcode}
    </>
  );
};

export default MyBarcodeScanner;
