
## ¿Qué es Git Flow?

Git Flow es una metodología de ramificación (branching model) creada por Vincent Driessen que define un modelo estricto de ramas diseñado para el desarrollo de proyectos. Proporciona un marco robusto para gestionar proyectos grandes con múltiples desarrolladores.

## Estructura de Ramas

### Ramas Principales (Permanentes)

#### 1. **main** (o master)
- Contiene el código de **producción**
- Siempre debe estar en estado estable
- Cada commit representa una versión de producción
- **NUNCA se hace commit directo aquí**

#### 2. **develop**
- Rama de **integración** para desarrollo
- Contiene las últimas características completadas
- Base para crear nuevas ramas de características
- Estado: funcional pero puede no estar listo para producción

### Ramas de Soporte (Temporales)

#### 3. **feature/** (Características)
- **Propósito**: Desarrollar nuevas funcionalidades
- **Nace de**: `develop`
- **Se fusiona en**: `develop`
- **Nomenclatura**: `feature/nombre-funcionalidad`
- **Ejemplo**: `feature/login-usuario`, `feature/carrito-compras`

#### 4. **release/** (Lanzamiento)
- **Propósito**: Preparar una nueva versión de producción
- **Nace de**: `develop`
- **Se fusiona en**: `main` y `develop`
- **Nomenclatura**: `release/v1.0.0`
- **Actividades**: corrección de bugs menores, preparación de metadata

#### 5. **hotfix/** (Parches de emergencia)
- **Propósito**: Corregir bugs críticos en producción
- **Nace de**: `main`
- **Se fusiona en**: `main` y `develop`
- **Nomenclatura**: `hotfix/descripcion-bug`
- **Ejemplo**: `hotfix/corregir-error-contador`