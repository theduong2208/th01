import React, { useState } from "react";

function TodoItem({ task, onDelete, onEdit, onUpdate, onToggleComplete }) {
  const [editText, setEditText] = useState(task.text); // Lưu trữ văn bản khi đang chỉnh sửa

  return (
    <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task.id)}
        />

        {/* Kiểm tra nếu task đang chỉnh sửa */}
        {task.isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => onUpdate(task.id, editText)} // Cập nhật khi thoát khỏi ô input
            onKeyPress={(e) => {
              if (e.key === "Enter") onUpdate(task.id, editText); // Cập nhật khi nhấn Enter
            }}
            autoFocus
            style={{ textDecoration: "line-through" }}
          />
        ) : (
          <span
            style={{
              marginLeft: "10px",
              // Khi đang chỉnh sửa, luôn để line-through là none
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.text}
          </span>
        )}
      </div>
      <div>
        {/* Chỉ hiện nút Chỉnh sửa nếu không trong chế độ chỉnh sửa */}
        {!task.isEditing ? (
          <>
            <button onClick={() => onEdit(task.id)}>Chỉnh sửa</button>
            <button onClick={() => onDelete(task.id)}>Xóa</button>
          </>
        ) : (
          <>
            <button onClick={() => onUpdate(task.id, editText)}>Lưu lại</button>
            <button onClick={() => onDelete(task.id)}>Xóa</button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
