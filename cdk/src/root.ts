import { Stack, App, StackProps } from '@aws-cdk/cdk';
import { Cognito, AppSync } from './index';

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const cognito = Cognito(this, {
      envType: 'dev',
    });

    AppSync(this, {
      envType: 'dev',
      userPoolId: cognito.userPoolId,
    });
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());
