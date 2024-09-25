import React, { useState} from "react";
import TodoItem from "./TodoItem";
import ImageSearch from './ImageSearch';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");

  // Thêm công việc mới vào danh sách
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, isCompleted: false, isEditing: false }]);
      setNewTask(""); // Reset input sau khi thêm
    }
  };

  // Xóa công việc
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Bắt đầu chỉnh sửa task
  const handleEditTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  // Cập nhật công việc đã chỉnh sửa
  const handleUpdateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  // Thay đổi trạng thái hoàn thành (gạch ngang) của công việc
  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      {/* Form nhập công việc mới */}
      <input
        type="text"
        placeholder="Nhập công việc..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Thêm công việc</button>

      {/* Danh sách công việc */}
      <ul>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onUpdate={handleUpdateTask}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
  
};

{/*Search Image*/}
function Image() {
  return (
    <div className="App">
      <ImageSearch />
    </div>
  );
}


const ColorChanger = () => {
  const colors = ['red', 'green', 'blue']; 
  const [currentColor, setCurrentColor] = useState('red'); 
  const [colorHistory, setColorHistory] = useState([]); 

  //  thay đổi màu ngẫu nhiên
  const changeColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);
    setColorHistory([randomColor, ...colorHistory]); 
  };

  //  undo 
  const undoColor = () => {
    if (colorHistory) {
      setCurrentColor(colorHistory[1]); 
      setColorHistory(colorHistory.slice(1)); 
    }
  };
  
  const autoChangeColor  = () => {
    
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Random Color</h1>
      <button onClick={changeColor}>Change Color</button>
      <button onClick={undoColor} style={{ marginLeft: '10px' }}>Undo</button>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: currentColor,
              border: '1px solid #000',
              marginRight: '20px'
            }}
          />
          <div>
            <h3>Current Color: {currentColor}</h3>
            <h3>Color History:</h3>
            <ul>
              {colorHistory.map((color, index) => (
                <li key={index} style={{ color }}>{color}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ColorChanger;
// export default  App;
// export default  Image;







