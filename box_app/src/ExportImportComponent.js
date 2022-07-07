import { useRef } from 'react';

function ExportImportComponent({ getStateForExport, importState }) {

  const inputImportRef = useRef(null);
  
  const exportFile = async () => {
    console.log(getStateForExport);
    const myData = getStateForExport();
    const fileName = "file";
    const json = JSON.stringify(myData);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // todo: is this call required?
    //URL.revokeObjectURL(href);
  }

  const handleImportClick = () => {
    inputImportRef.current.click();
  };

  const handleImportFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      const importedJson = JSON.parse(evt.target.result);
      importState(importedJson);
    };
    reader.readAsText(fileObj);

    event.target.value = null;
  };

  return(
    <div>
      <div className='ExportImportButtonContainer'>
        <button onClick={exportFile}>
          Export
        </button>
        <input
          style={{display: 'none'}}
          ref={inputImportRef}
          type="file"
          onChange={handleImportFileChange}
        />
        <button onClick={handleImportClick}>
          Import
        </button>
      </div>
      <div>
        Export your data if you want to use it on another PC or to save it, the board is kept only in the local storage of your browser.
      </div>
    </div>
  );
}

export default ExportImportComponent;
