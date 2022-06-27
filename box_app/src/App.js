import Board from './Board';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ExportImportComponent from './ExportImportComponent';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
      <ExportImportComponent />
    </div>
  );
}

export default App;
