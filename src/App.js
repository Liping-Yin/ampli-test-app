import "./App.css";
import * as amplitude from "@amplitude/analytics-browser";
// import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "dwi8mo6ev" } });
  // Use this sample image or upload your own via the Media Explorer
  const img = cld
    .image("IMG_1514_jzxba8")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  // ********** scripty loader ******************* //
  const apiKey = process.env.REACT_APP_AMPLI_API_KEY;
  const initializeAmplitude = () => {
    amplitude.init(apiKey, "lp-test-vl@gmail.com", {
      fetchRemoteConfig: true,
      autocapture: {
        attribution: false,
        pageViews: true,
        sessions: false,
        formInteractions: false,
        fileDownloads: false,
        elementInteractions: true,
      },
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form Submitted: Name - ${formData.name}, Email - ${formData.email}`);
  };

  useEffect(() => {
    initializeAmplitude();
    // console.log("Component mounted");

    return () => {
      console.log("Cleanup on unmount");
    };
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="App">
      <div className="form-container">
        <h1>Simple React Form</h1>
        <form onSubmit={handleSubmit} className="form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      <AdvancedImage cldImg={img} />
    </div>
  );
}

export default App;
