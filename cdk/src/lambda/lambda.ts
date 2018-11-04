import { LambdaOutput, ImageToWord, AddNewWords, WordToSpeech, StudyHistory, StudySet, StudyAnswer } from ".";

export default (): LambdaOutput => {
  return {
    ImageToWord,
    AddNewWords,
    WordToSpeech,
    StudyHistory,
    StudySet,
    StudyAnswer,
  }
}
