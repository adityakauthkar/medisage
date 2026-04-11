/* id, project_id, title, description, status (todo/in-progress/done), priority
(low/medium/high), due_date, created_at */

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    title: {
      type: String,
      required:true , 
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    due_date: {
      type: Date
    }
  },
  
  {
    timestamps: { createdAt: "created_at", updatedAt: false }
  }
);

module.exports = mongoose.model("Task", taskSchema);