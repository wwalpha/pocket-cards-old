import { cloudformation } from "@aws-cdk/aws-cognito";
import { CognitoProps } from './index.d';

export default (props: CognitoProps) => new cloudformation.UserPoolResource(
  this,
  `${props.envType}-UserPool`,
  {
    adminCreateUserConfig: {
      // 管理者のみ追加
      allowAdminCreateUserOnly: true,
      // 無効期限10年
      unusedAccountValidityDays: 3650,
    },
    policies: {
      // パスワードポリシー
      passwordPolicy: {
        // 数字必要
        requireNumbers: true,
        // 小文字必要
        requireLowercase: true,
        // 記号必要
        requireSymbols: true,
        // 大文字不必要
        requireUppercase: false,
        // 最小文字数：８
        minimumLength: 8,
      }
    },
    // プール名
    userPoolName: `${props.envType}-UserPool`,
    // ユーザ属性定義
    schema: [
      {
        name: 'email',
        attributeDataType: 'String',
        developerOnlyAttribute: false,
        mutable: true,
        stringAttributeConstraints: {
          maxLength: '200',
          minLength: '0',
        },
        required: true,
      },
    ],
    // 自動認証属性
    autoVerifiedAttributes: [
      'email'
    ]
  });