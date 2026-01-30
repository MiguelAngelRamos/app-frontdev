pipeline {
    agent any

    environment {
        // Nombre de la imagen base
        IMAGE_NAME = "react-app-jenkins"
        // Contenedores según ambiente
        CONTAINER_DEV = "react-app-staging"
        CONTAINER_PROD = "react-app-production"
    }

    stages {
        stage('1. Build & Test') {
            agent {
                docker { 
                    image 'node:20-alpine' 
                    // Reutiliza la cache de npm para ir más rápido
                    args '-v $HOME/.npm:/root/.npm'
                }
            }
            steps {
                echo "Construyendo rama: ${env.BRANCH_NAME}"
                sh 'npm install'
                sh 'npm run build'
                // sh 'npm run test:run' // Descomenta cuando tengas tus tests listos
            }
        }

        stage('2. Docker Build') {
            // Solo creamos imagen si es una rama de integración (develop) o producción (main)
            when {
                anyOf {
                    branch 'develop'
                    branch 'main'
                }
            }
            steps {
                echo "Creando imagen Docker para ${env.BRANCH_NAME}..."
                sh "docker build -t ${env.IMAGE_NAME}:${env.BRANCH_NAME} ."
            }
        }

        stage('3. Deploy to Staging') {
            when { branch 'develop' }
            steps {
                script {
                    echo "Desplegando en STAGING (Puerto 8081)..."
                    // Detener y eliminar contenedor anterior si existe
                    sh "docker stop ${env.CONTAINER_DEV} || true"
                    sh "docker rm ${env.CONTAINER_DEV} || true"
                    // Correr nuevo contenedor
                    sh "docker run -d --name ${env.CONTAINER_DEV} -p 8081:80 ${env.IMAGE_NAME}:develop"
                }
            }
        }

        stage('4. Deploy to Production') {
            when { branch 'main' }
            steps {
                script {
                    echo "Desplegando en PRODUCCIÓN (Puerto 80)..."
                    // Detener y eliminar contenedor anterior si existe
                    sh "docker stop ${env.CONTAINER_PROD} || true"
                    sh "docker rm ${env.CONTAINER_PROD} || true"
                    // Correr nuevo contenedor
                    sh "docker run -d --name ${env.CONTAINER_PROD} -p 80:80 ${env.IMAGE_NAME}:main"
                }
            }
        }
    }

    post {
        success {
            echo "¡Pipeline finalizado con éxito para la rama ${env.BRANCH_NAME}!"
        }
        failure {
            echo "El pipeline falló. Revisa los logs de construcción."
        }
        always {
            // Limpia el espacio de trabajo para no llenar el disco de la VM
            cleanWs()
        }
    }
}