import mongoose from 'mongoose';

const commandmentsSchema = new mongoose.Schema({
    questionnaireNumber: {
        type: Number,
        required: true
    },
    questionnaireTitle: {
        type: String,
        required: true
    },
    questions: [{
        questionNumber: {
            type: Number,
            required: true
        },
        questionTitle: {
            type: String,
            required: true
        },
        options: [
            {
                optionNumber: {
                    type: Number,
                    required: true
                },
                optionPhrase: {
                    type: String,
                    required: true
                },
                isExclusive: {
                    type: Boolean,
                    required: false
                }
            }
        ]
    }]
})

const Commandments = mongoose.models.Commandments || mongoose.model('Commandments', commandmentsSchema);

export default Commandments;