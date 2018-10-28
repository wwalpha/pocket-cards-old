import { LambdaOutput, ImageToWord, AddNewWords, WordToSpeech, StudyHistory, StudySet, StudySave } from ".";

export default (): LambdaOutput => {
  return {
    ImageToWord,
    AddNewWords,
    WordToSpeech,
    StudyHistory,
    StudySet,
    StudySave,
  }
}
