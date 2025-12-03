pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ankandhang/rest-api-devops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("rest-api-devops:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            environment {
                DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
            }
            steps {
                script {
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

                    sh 'docker tag rest-api-devops:latest ankandhang/rest-api-devops:latest'
                    sh 'docker push ankandhang/rest-api-devops:latest'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@YOUR_EC2_PUBLIC_IP "
                            docker pull ankandhang/rest-api-devops:latest &&
                            docker stop rest-api-devops || true &&
                            docker rm rest-api-devops || true &&
                            docker run -d -p 3000:3000 --name rest-api-devops ankandhang/rest-api-devops:latest
                        "
                    '''
                }
            }
        }
    }
}
