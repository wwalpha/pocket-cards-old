import { LambdaOutput, ImageToWord, AddNewWords, WordToSpeech, StudyHistory, StudySet } from ".";

export default (): LambdaOutput => {
  return {
    ImageToWord,
    AddNewWords,
    WordToSpeech,
    StudyHistory,
    StudySet,
  }
}
