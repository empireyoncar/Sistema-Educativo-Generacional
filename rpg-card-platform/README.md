# RPG Card Platform

Plataforma base para comunidad de cartas RPG con:

- Frontend React SPA.
- Backend FastAPI con JWT.
- PostgreSQL expuesto en el puerto externo `6800`.
- Docker Compose.

## Levantar

```bash
cd rpg-card-platform
docker compose up --build
```

URLs:

- Frontend: `http://localhost:3005/empireyoncarsistemaeducativo/`
- Backend API: `http://localhost:8000`
- Docs API: `http://localhost:8000/docs`
- PostgreSQL externo: `localhost:6800`

## Admin inicial

El backend crea un admin por defecto:

```txt
email: admin@rpg.local
password: admin123
```

## Flujo

1. Registro en `/register`.
2. Login en `/login`.
3. Home en `/home`.
4. Comunidad Tarjeta en `/comunidad-tarjeta`.
5. Si el usuario no tiene carta, puede crear una sola.
6. Si ya tiene carta, solo ve la carta en modo lectura.
7. Admin gestiona combinaciones en `/admin/combinaciones`.
8. Admin gestiona cartas en `/admin/cartas`.
9. Admin entra al constructor visual en `/admin/constructor`.

## Constructor de cartas

La ruta `/admin/constructor` carga el constructor visual en un iframe.
Puedes cambiar la URL con:

```txt
VITE_CARD_BUILDER_URL=/empireyoncarsistemaeducativo/constructor-rpg/
```
