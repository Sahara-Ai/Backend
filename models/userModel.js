import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [
        {
            currentSystemDetails: {
                operatingSystem: {
                    type: String,
                },
                processor: {
                    type: String,
                },
                ram: {
                    type: String,
                    required: true
                },
                storage: {
                    type: String,
                    required: true
                },
                graphicsCard: {
                    type: String
                },
                otherHardwareSpecifications: {
                    type: String
                }
            },
            usageAndPerformanceRequirements: {
                primaryUse: {
                    type: String,
                },
                performanceExpectations: {
                    type: String,
                },
                softwareRequirements: {
                    type: String
                }
            },
            additionalCommentsOrRequirements: {
                type: String
            }
        }
    ]
});

export default mongoose.model('User', userSchema);
