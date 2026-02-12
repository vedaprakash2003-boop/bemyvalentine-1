import { useState } from "react";
import { motion } from "framer-motion";

function FormPage({ onSubmit }) {
  const [formData, setFormData] = useState({
    receiverName: "",
    senderName: "",
    nickname: "",
    letterPart1: "",
    letterPart2: "",
    letterPart3: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.receiverName.trim()) {
      newErrors.receiverName = "Receiver name is required";
    }

    if (!formData.senderName.trim()) {
      newErrors.senderName = "Sender name is required";
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }

    if (!formData.letterPart1.trim()) {
      newErrors.letterPart1 = "First paragraph is required";
    }

    if (!formData.letterPart2.trim()) {
      newErrors.letterPart2 = "Second paragraph is required";
    }

    if (!formData.letterPart3.trim()) {
      newErrors.letterPart3 = "Third paragraph is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create URL with form data as parameters
    const urlParams = new URLSearchParams({
      receiver: formData.receiverName,
      sender: formData.senderName,
      nickname: formData.nickname,
      letter1: formData.letterPart1,
      letter2: formData.letterPart2,
      letter3: formData.letterPart3,
    });

    // Create shareable URL
    const currentUrl = window.location.origin + window.location.pathname;
    const shareableUrl = `${currentUrl}?${urlParams.toString()}`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert(
          "Your Valentine website has been created! The link has been copied to your clipboard. Share it with your loved one!",
        );
      })
      .catch((err) => {
        alert(
          `Your Valentine website has been created! Share this link: ${shareableUrl}`,
        );
      });

    onSubmit(formData);
  };

  // Generate shareable URL for display
  const generateShareableUrl = () => {
    const urlParams = new URLSearchParams({
      receiver: formData.receiverName,
      sender: formData.senderName,
      nickname: formData.nickname,
      letter1: formData.letterPart1,
      letter2: formData.letterPart2,
      letter3: formData.letterPart3,
    });
    return `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  };

  const shareableUrl = generateShareableUrl();

  return (
    <div className="form-root">
      <motion.div
        className="form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="form-title">Create Your Valentine Template</h1>
        <p className="form-subtitle">
          Fill in the details to customize your Valentine's Day website
        </p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="receiverName" className="form-label">
              Receiver Name (Your Valentine's Name)
            </label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              className={`form-input ${errors.receiverName ? "error" : ""}`}
              placeholder="Enter your Valentine's name"
            />
            {errors.receiverName && (
              <span className="error-message">{errors.receiverName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="senderName" className="form-label">
              Sender Name (Your Name)
            </label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              className={`form-input ${errors.senderName ? "error" : ""}`}
              placeholder="Enter your name"
            />
            {errors.senderName && (
              <span className="error-message">{errors.senderName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nickname" className="form-label">
              Special Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className={`form-input ${errors.nickname ? "error" : ""}`}
              placeholder="Enter a special nickname"
            />
            {errors.nickname && (
              <span className="error-message">{errors.nickname}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="letterPart1" className="form-label">
              First Paragraph
            </label>
            <textarea
              id="letterPart1"
              name="letterPart1"
              value={formData.letterPart1}
              onChange={handleChange}
              className={`form-textarea ${errors.letterPart1 ? "error" : ""}`}
              placeholder="Write the first paragraph of your love letter..."
              rows={3}
            />
            {errors.letterPart1 && (
              <span className="error-message">{errors.letterPart1}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="letterPart2" className="form-label">
              Second Paragraph
            </label>
            <textarea
              id="letterPart2"
              name="letterPart2"
              value={formData.letterPart2}
              onChange={handleChange}
              className={`form-textarea ${errors.letterPart2 ? "error" : ""}`}
              placeholder="Write the second paragraph of your love letter..."
              rows={3}
            />
            {errors.letterPart2 && (
              <span className="error-message">{errors.letterPart2}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="letterPart3" className="form-label">
              Third Paragraph
            </label>
            <textarea
              id="letterPart3"
              name="letterPart3"
              value={formData.letterPart3}
              onChange={handleChange}
              className={`form-textarea ${errors.letterPart3 ? "error" : ""}`}
              placeholder="Write the third paragraph of your love letter..."
              rows={3}
            />
            {errors.letterPart3 && (
              <span className="error-message">{errors.letterPart3}</span>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn create-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Create My Valentine Website
          </motion.button>
        </form>

        {/* Shareable URL Display */}
        {(formData.receiverName ||
          formData.senderName ||
          formData.nickname ||
          formData.letterPart1 ||
          formData.letterPart2 ||
          formData.letterPart3) && (
          <motion.div
            className="url-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="url-label">Your Customized Link:</div>
            <div className="url-display">
              <input
                type="text"
                value={shareableUrl}
                readOnly
                className="url-input"
                onClick={(e) => e.target.select()}
              />
              <motion.button
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(shareableUrl).then(() => {
                    alert("Link copied to clipboard!");
                  });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Copy Link
              </motion.button>
            </div>
            <div className="url-hint">
              Share this link with your loved one to give them their
              personalized Valentine's website!
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default FormPage;
