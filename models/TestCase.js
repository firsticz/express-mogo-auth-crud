import mongoose from "mongoose";

const { Schema } = mongoose;

const caseSchema = new Schema({
    id: {
        type: Number
    },
    description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
  },
  automation_status: {
    type: Number,
    required: true,
  },
  rec_status: {
    type: Number,
    required: true,
  },
  product: {
    type: {
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }
  },
  test_steps: {
    type: String
  },
  expected_result: {
    type: String
  },
  tags: {
    type: [{
        id: {
            type: Number
        },
        name: {
            type: String
        }
    }]
  }
});

export default mongoose.model("Case", caseSchema);