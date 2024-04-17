pipeline {
  environment {
    imageRepo = 'mondu/ui'
    commitSha = sh(returnStdout: true, script: "git log -1 --pretty=format:'%h'").trim()
    imageName = "${imageRepo}:${commitSha}"
    dockerImage = ''
  }

  agent any
  stages {
      stage('Clone Source') {
          steps {
            checkout scm
          }
      }
      stage('Build Image') {
          steps {
            sh 'docker build -t ${imageName} .'
            // 
            // dockerfile {
            //   args '-t ${imageName}'
            //   additionalBuildArgs  '--build-arg BASE_URL=https://api.mwd.edfinmfb.com/edfin/v1'
            // }
            // script {
            //     dockerImage = docker.build imageName
            // }
          }
      }
      stage('Deploy Application') {
          steps {
             sh 'docker stop mondu-ui || true && docker rm mondu-ui || true'
             sh 'docker run -d -p 3016:80 --name mondu-ui ${imageName}'
          }
      }
      stage('Cleanup Build') {
          steps {
             sh 'docker system prune -a -f || true'
          }
      }
  }
}
