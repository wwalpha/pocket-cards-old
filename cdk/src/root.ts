import { Stack, App, StackProps } from '@aws-cdk/cdk';
import { Cognito } from './cognito';

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    Cognito(this, {
      envType: 'dev',
    });
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());
