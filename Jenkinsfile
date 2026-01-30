pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-app-frontdev"
        CONTAINER_DEV = "app-staging"
        CONTAINER_PROD = "app-production"
    }

    stages {
        stage('1. Checkout') {
            steps {
                checkout scm
            }
        }

        stage('2. Install & Test') {
            agent {
                docker { 
                    image 'node:20-alpine' 
                    // Se agrega --entrypoint="" para permitir que Jenkins ejecute comandos sh
                    // y se mapea la caché de npm para evitar problemas de permisos
                    args '-v $HOME/.npm:/root/.npm --entrypoint=""' 
                }
            }
            steps {
                echo "Construyendo rama: ${env.BRANCH_NAME}"
                // Forzamos a npm a usar una carpeta local de caché para evitar el error EACCES
                sh 'npm config set cache .npm-cache --global'
                sh 'npm install'
                sh 'npm run test:run' // Usamos test:run basado en tu package.json
                sh 'npm run build'
            }
        }

        stage('3. Build Docker Image') {
            when {
                anyOf { branch 'develop'; branch 'main' }
            }
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${env.BRANCH_NAME} ."
                }
            }
        }

        stage('4. Deploy to Staging') {
            when { branch 'develop' }
            steps {
                script {
                    echo "🚀 Desplegando en STAGING (Puerto 8081)..."
                    sh "docker stop ${CONTAINER_DEV} || true"
                    sh "docker rm ${CONTAINER_DEV} || true"
                    sh "docker run -d --name ${CONTAINER_DEV} -p 8081:80 ${IMAGE_NAME}:develop"
                }
            }
        }

        stage('5. Deploy to Production') {
            when { branch 'main' }
            steps {
                script {
                    echo "🚀 Desplegando en PRODUCCIÓN (Puerto 80)..."
                    sh "docker stop ${CONTAINER_PROD} || true"
                    sh "docker rm ${CONTAINER_PROD} || true"
                    sh "docker run -d --name ${CONTAINER_PROD} -p 80:80 ${IMAGE_NAME}:main"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}