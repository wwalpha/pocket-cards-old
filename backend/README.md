# Backend

## Preinstall
### Software
* [Docker](https://www.docker.com/)
* [Python3.6](https://www.python.org/)
* [aws-sam-cli](https://github.com/awslabs/aws-sam-cli)
* [Visual Studio Code (VSCode)](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/ja/)
* Option: [Yarn](https://yarnpkg.com/lang/ja/)

### Plugin
* TSLint
* YAML Support by Red Hat

## Settings
Set the DOCKER_HOST environment variable.
```s
$ export DOCKER_HOST=127.0.0.1
```

## Running and debugging lambda locally:
### Function
```
$ sam local invoke FunctionName -e sam/event.json -t sam/template.yml
```

### Api
```
$ sam local start-api -t sam/template.yml
```

### Lambda
```
$ sam local start-lambda -t sam/template.yml
```
