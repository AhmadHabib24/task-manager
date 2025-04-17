import { mongoose } from "../db/connectionDB.mjs"; 

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    }, 
    description: { 
        type: String, 
        required: [true, "Description is required"],
        trim: true
    },
    status: { 
        type: String, 
        required: [true, "Status is required"],
        enum: {
            values: ["todo", "in-progress", "done"],
            message: '{VALUE} is not a valid status. Use "todo", "in-progress", or "done"'
        },
        default: "todo",
        lowercase: true
    },
    assignto: { 
        type: String, 
        required: [true, "Assign to field is required"],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
TaskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const TaskModel = mongoose.model("Task", TaskSchema);
export default TaskModel;