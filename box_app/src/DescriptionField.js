import './assets/DescriptionField.css';

function DescriptionField( {description, onDescriptionChange} ) {
  return (
    <div className="description-wrapper">
      <div className="description-input-data">
        <input
          type="text"
          value={description}
          onChange={onDescriptionChange}
          required
        />
        <div className="description-underline"></div>
        <label>Description</label>
      </div>
    </div>
  );
};

export default DescriptionField;
