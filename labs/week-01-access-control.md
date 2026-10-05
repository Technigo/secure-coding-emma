# Vecka 1 — Åtkomstkontroll

## Mål

Du ska kunna skilja på autentisering och auktorisering och genomföra en server-side kontroll av vem som får läsa ett specifikt objekt.

## Övning

1. Starta SecureHub enligt README och logga in som Alice.
2. Följ länkarna till fakturor och öppna en faktura.
3. Ändra objektets ID i URL:en och observera vad som händer.
4. Läs route- och repositorykoden och formulera den avsedda åtkomstregeln för rollerna `user`, `support` och `admin`.
5. Implementera regeln i serverkoden. Kontrollen ska inte bero på vad som syns i gränssnittet.
6. Lägg till eller uppdatera ett test för både tillåten och nekad åtkomst.

Ändra inte fakturor eller andra användares data under demonstrationen. Använd endast den fiktiva seed-datan.

## Inlämning

En liten kodändring, ett regressionstest och en kort förklaring av var auktoriseringsbeslutet fattas. Beskriv också skillnaden mellan 403 och 404 i ditt val.
