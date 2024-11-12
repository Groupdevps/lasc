# Gestión de Branches en Git

Este documento describe cómo gestionar y sincronizar ramas en Git, específicamente para los branches `IssueAttention`, `dev`, y `server`.

## Sincronización de Ramas

### Sincronizar `dev` y `server` con `IssueAttention`

Para sincronizar las ramas `dev` y `server` con `IssueAttention`, eliminando el contenido desactualizado, sigue estos pasos:

#### Sincronizar `dev`

1. Cambia a la rama `dev`:
   ```bash
   git checkout dev
   ```

2. Resetea la rama `dev` a `IssueAttention`:
   ```bash
   git reset --hard IssueAttention
   ```

3. Fuerza el push de los cambios al repositorio remoto:
   ```bash
   git push origin dev --force
   ```

#### Sincronizar `server`

1. Cambia a la rama `server`:
   ```bash
   git checkout server
   ```

2. Resetea la rama `server` a `dev`:
   ```bash
   git reset --hard dev
   ```

3. Fuerza el push de los cambios al repositorio remoto:
   ```bash
   git push origin server --force
   ```

## Trabajo en la Rama `dev`

Cada vez que trabajes en la rama `dev` y desees enviar esos cambios a `server`, sigue estos pasos:

1. Cambia a la rama `dev`:
   ```bash
   git checkout dev
   ```

2. Realiza tus cambios y haz commit:
   ```bash
   git add .
   git commit -m "Descripción de tus cambios"
   ```

3. Cambia a la rama `server`:
   ```bash
   git checkout server
   ```

4. Fusiona los cambios de `dev` en `server`:
   ```bash
   git merge dev
   ```

5. Si hay conflictos, resuélvelos. Luego agrega los archivos modificados y haz commit:
   ```bash
   git add .
   git commit -m "Resuelto conflicto al fusionar dev en server"
   ```

6. Empuja los cambios al repositorio remoto en la rama `server`:
   ```bash
   git push origin server
   ```

## Nota

Si prefieres que `server` sea exactamente igual a `dev`, puedes usar un `reset --hard` en lugar de hacer un merge, pero ten en cuenta que esto sobrescribirá cualquier cambio en `server`.

---

¡Sigue estos pasos para gestionar tus branches de manera eficiente!
# Actualización de la Rama `dev` en una Computadora Vieja

Este documento proporciona instrucciones para actualizar la rama `dev` en una computadora vieja con la versión más reciente de `dev` desde el repositorio remoto, asegurándose de que no se mezclen ni conserven los cambios antiguos.

## Pasos a Seguir

1. **Abrir la terminal**:
   - Abre la terminal o línea de comandos en tu computadora vieja.

2. **Cambiar a la rama `dev`**:
   - Navega hasta el directorio del repositorio y asegúrate de estar en la rama `dev`:

     ```sh
     git checkout dev
     ```

3. **Actualizar la rama `dev` con la versión remota**:
   - Descarga la última versión del repositorio sin fusionar cambios locales:

     ```sh
     git fetch origin
     ```

   - Resetea la rama `dev` local para que coincida exactamente con la versión remota:

     ```sh
     git reset --hard origin/dev
     ```

   > **Nota:** El comando `reset --hard` descartará cualquier cambio no guardado en la rama local `dev`. Asegúrate de que no necesitas esos cambios antes de ejecutar este comando.

4. **Verificar el estado del repositorio**:
   - Verifica que la rama `dev` esté completamente sincronizada con el remoto y que no haya cambios pendientes:

     ```sh
     git status
     ```

   Si el mensaje indica que tu rama está "up to date" con `origin/dev`, has completado correctamente el proceso.

## Consideraciones Finales

- Este proceso sobrescribirá cualquier cambio local en la rama `dev` en la computadora vieja. Si necesitas conservar alguno de esos cambios, asegúrate de guardarlos en otra rama o de hacer un backup antes de continuar.
- Ahora puedes continuar trabajando en la rama `dev` en tu computadora vieja con la tranquilidad de que está completamente actualizada con los últimos cambios del repositorio remoto.
