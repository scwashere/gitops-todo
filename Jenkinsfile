pipeline {
    agent {
        label 'docker'
    }
    environment {
        DOCKER_IMAGE = "dhinojosa/gitops-todo"
        CONFIG_REPO = "https://github.com/dhinojosa/gitops-todo-config.git"
    }

    stages {
        stage('Checkout Application') {
            steps {
                checkout scm
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    def tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    docker.build("${DOCKER_IMAGE}:${tag}").push()
                }
            }
        }

        stage('Update Manifest') {
            steps {
                script {
                    def tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    sh """
                    git clone ${CONFIG_REPO} config-repo
                    cd config-repo
                    sed -i 's|image: .*|image: ${DOCKER_IMAGE}:${tag}|' base/deployment.yaml
                    if git diff --quiet; then
                      echo "No changes to manifest, skipping commit."
                    else
                      git config user.email "ci-bot@example.com"
                      git config user.name "CI Bot"
                      git commit -am "Update image to ${DOCKER_IMAGE}:${tag}"
                      git push
                    fi
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
