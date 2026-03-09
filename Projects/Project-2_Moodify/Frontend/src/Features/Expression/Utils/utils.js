import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const initialize = async ({
  faceLandmarkerRef,
  videoRef,
  setExpression,
  setReady,
}) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
  });
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoRef.current.srcObject = stream;

  videoRef.current.onloadeddata = async () => {
    await videoRef.current.play();
    setReady(true);
    setExpression("Ready to Detect");
  };
};
export const detect = ({ faceLandmarkerRef, videoRef, setExpression }) => {
  if (
    !videoRef.current ||
    !faceLandmarkerRef.current ||
    videoRef.current.readyState < 2
  ) {
    return;
  }

  const results = faceLandmarkerRef.current.detectForVideo(
    videoRef.current,
    performance.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const smile =
      blendshapes.find((b) => b.categoryName === "mouthSmileLeft")?.score || 0;

    const frownLeft =
      blendshapes.find((b) => b.categoryName === "mouthFrownLeft")?.score || 0;

    const frownRight =
      blendshapes.find((b) => b.categoryName === "mouthFrownRight")?.score || 0;

    const surprised =
      blendshapes.find((b) => b.categoryName === "jawOpen")?.score || 0;

    if (smile > 0.4) {
      setExpression("😊 Happy");
    } else if (frownLeft > 0.01 && frownRight > 0.01) {
      setExpression("☹️ Sad");
    } else if (surprised > 0.01) {
      setExpression("😲 Surprised");
    } else {
      setExpression("😐 Neutral");
    }
  } else {
    setExpression("No face detected");
  }
};
