import './assets/DescriptionField.css';

function DescriptionField( {description, onDescriptionChange} ) {
  return (
    <div className="Description-wrapper">
      <div className="Description-input-data">
        <input
          type="text"
          value={description}
          onChange={onDescriptionChange}
          required
        />
        <div className="Description-underline"></div>
        <label>Description</label>
      </div>
    </div>
  );
};

export default DescriptionField;
