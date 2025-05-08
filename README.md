# Prueba Técnica para Desarrollador Mobile - Aplicación Ionic

## 📱 Descripción General

Esta es una prueba técnica desarrollada con **Ionic + Angular**, cuyo objetivo es demostrar habilidades en el desarrollo de aplicaciones móviles híbridas. Se construyó una **aplicación de lista de tareas (To-Do List)** que permite:

- Agregar nuevas tareas  
- Marcar tareas como completadas  
- Eliminar tareas  
- Categorizar tareas (crear, editar, eliminar categorías)  
- Filtrar tareas por categoría

Se utilizaron buenas prácticas de desarrollo, optimización de rendimiento y configuración para múltiples plataformas móviles.

Además, la aplicación fue diseñada siguiendo los principios de Clean Architecture, separando responsabilidades en distintas capas: presentación, dominio, datos, lo que garantiza una estructura robusta, mantenible y testeable.

---

## 🧱 Clean Architecture
El proyecto está dividido en las siguientes capas:
- Presentación: Páginas y componentes de la interfaz de usuario (Ionic/Angular)
- Dominio: Contiene las entidades del negocio, interfaces de repositorios y casos de uso (UseCases)
- Datos: Implementación concreta de repositorios y acceso a datos (por ejemplo, localStorage)

Esto permite:
- Independencia del framework
- Mayor facilidad para pruebas unitarias
- Sólida separación de responsabilidades
- Escalabilidad limpia del proyecto

## ⚠️ Nota Importante: Capacitor en lugar de Cordova

A partir de **Ionic v4**, el framework dejó de usar Cordova como motor por defecto para las funcionalidades nativas y lo reemplazó por **Capacitor**, una solución moderna, más integrada y mantenida activamente por el equipo de Ionic. Actualmente, Ionic se encuentra en la v8

Por esta razón, **esta aplicación utiliza Capacitor** para compilar y ejecutar en Android, en lugar de Cordova.

Adicionalmente, el proyecto está configurado para compilar **exclusivamente en android**, ya que no dispongo de un equipo MAC para hacer el respectivo build en xcode.

---

## 🚀 Funcionalidades

- To-Do List con almacenamiento local  
- Gestión de categorías y tareas (Ver, Crear, Actualizar y Eliminar)  
- Filtro por categoría  
- Integración con Firebase + Remote Config para feature flags  
- Optimización de rendimiento (carga inicial, uso eficiente de memoria)  
- Exportación de APK e IPA para pruebas
- Diseño amigable con el usuario

---

## 🚨 Pre-Requisitos

- Java JDK 21
- Android Studio
- Ionic CLI
- SonarQube (Opcional)

---

## 🔧 Tecnologías Utilizadas

- Ionic Framework  
- Angular  
- Capacitor  
- Firebase + Remote Config  
- TypeScript

---

## ⚙️ Instalación y Ejecución

### 1. Clonar el repositorio e instalar paquetes

```bash
git clone https://github.com/n1colasc/todo-list
cd todo-list
npm install
```
### 2. Ejecutar en navegador (modo desarrollo)
```bash
npm run start
```
### 3. Preparar plataformas móviles
```bash
npm run build:android // Este comando compila web, limpia y sincroniza android y procede a generar la APK.
```

## 🧪 Calidad del Código
- Análisis con SonarQube: Código limpio y mantenible
- Principios SOLID aplicados
- Test unitarios en los casos de uso (UseCases)
- Arquitectura limpia y documentación interna
- Tipado estricto con TypeScript

## 📦 Exportación

Se generaron archivos .apk para Android, listo para pruebas.

## 📁 Estructura del Repositorio
```bash
src/app/
├── presentation/           # Páginas y componentes (UI)
├── domain/                 # Entidades, repositorios y casos de uso (negocio)
├── data/                   # Fuentes de datos (localStorage, API, etc.)
├── core/                   # Servicios comunes y configuración
└── assets/                 # Imágenes, íconos y otros recursos estáticos
```

## Modelos de Datos

### Task
```typescript
interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    completed: boolean;
    categoryId?: number;
}
```

### Category
```typescript
interface Category {
    id: number;
    name: string;
}
```

## 📸 Demostraciones

### Estado del análisis del SonarQube
![Estado del análisis de SonarQube](./docs/sonar.png)
### Diseño y funcionamiento de la aplicación
![Diseño de la aplicación](./docs/visual.png)
### Funcionamiento de firebase remote config
#### Flag activo
![Funcionamiento de firebase](./docs/firebase_activo.png)
#### Flag inactivo
![Funcionamiento de firebase](./docs/firebase_inactivo.png)

### Nota:
- En la ruta ./docs/apk se encuentra el archivo generado para android con nombre **todo-list.apk**.

---

### 

## ❓ Preguntas

### ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?

- Inicialmente, el desconocimiento de nunca haber trabajado con ionic y que hace mucho no usaba Angular fue todo un reto.
- El intentar integrar cordova en ionic fue otro dolor de cabeza, ya que de manera explicita Ionic instala capacitor de manera predeterminada, sin embargo, en lo que pude investigar, ambos compiladores se comportan de manera similar. Incluso los plugins de Cordova sirven en Capacitor.

### ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

- Lazy loading de módulos > Ayuda a un renderizadi óptimo de componentes.
- Uso de trackBy en listas > Para listas muy grandes trackBy ayuda a pasar un id único en vez de que Angular tenga que analizar objetos completos.
- Almacenamiento eficiente en localStorage > Es una integración normal, no tiene mayor ciencia.

### ¿Cómo aseguraste la calidad y mantenibilidad del código?

- Revisión con SonarQube
- Uso de principios SOLID
- Estructura del proyecto bien definida
- Documentación interna y tipado estricto con TypeScript.
