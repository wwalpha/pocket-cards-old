import { Stack, App } from "@aws-cdk/cdk";
import { LambdaOutput, LambdaInput, ImageToWord, AddNewWords, WordToSpeech, StudyHistory, StudySet } from ".";


export default class LambdaStack extends Stack {
  public readonly output: LambdaOutput

  constructor(parent: App, name: string, props: LambdaInput) {
    super(parent, name, props);

    const imageToWord = ImageToWord(this, props);
    const addNewWords = AddNewWords(this, props);
    const wordToSpeech = WordToSpeech(this, props);
    const studyHistory = StudyHistory(this, props);
    const studySet = StudySet(this, props);

    this.output = {
      'ImageToWord': imageToWord.export(),
      'AddNewWords': addNewWords.export(),
      'WordToSpeech': wordToSpeech.export(),
      'StudyHistory': studyHistory.export(),
      'StudySet': studySet.export(),
    }
  }
}
