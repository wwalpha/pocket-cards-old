import { Stack, App, StackProps } from "@aws-cdk/cdk";

class CdkStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    new UserPool(parent, 'UserPool', {
      envType: 'dev',
    });
  }
}

const app = new App(process.argv);

new CdkStack(app, 'ProjectName');

process.stdout.write(app.run());