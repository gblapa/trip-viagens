# Trip.Viagens - Sistema de Reserva de Pacotes

Este é um sistema Full Stack para reserva de pacotes de viagens.

## Estrutura
- `/backend`: API Spring Boot 3
- `/frontend`: SPA Angular 17+ (Standalone)

## Como Executar

### Backend
1. Navegue até `/backend`.
2. Configure as credenciais de e-mail no `application.yml` ou via env vars (`MAIL_USERNAME`, `MAIL_PASSWORD`).
3. Execute: `./mvnw spring-boot:run`.
4. API disponível em `http://localhost:8080`.
5. Banco de dados H2 (console): `http://localhost:8080/h2-console` (User: `sa`, No Password).

### Frontend
1. Navegue até `/frontend`.
2. Instale dependências: `npm install`.
3. Adicione seu `GOOGLE_CLIENT_ID` no arquivo `src/app/components/booking-modal/booking-modal.component.ts`.
4. Execute: `npm start`.
5. App disponível em `http://localhost:4200`.

## Principais Funcionalidades
- **Busca reativa** de pacotes por destino e preço.
- **Integração de Moedas**: Conversão em tempo real de BRL para USD/EUR usando AwesomeAPI.
- **Autenticação Google**: Login obrigatório para reservas.
- **Reserva Assíncrona**: O sistema confirma a reserva e dispara e-mail em background.
