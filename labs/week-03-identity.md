# Vecka 3 — Identitet och behörighet

## Mål

Du ska kunna granska ett självbetjäningsflöde där klientens fält inte får avgöra användarens identitet eller roll.

## Övning

1. Logga in som en vanlig användare och ändra visningsnamnet.
2. Inspektera formuläret och POST-begäran. Fundera på vilka fält en klient kan skicka utöver dem som formuläret visar.
3. Läs uppdateringskoden och skriv ned vilka användarfält som faktiskt ska vara skrivbara.
4. Implementera en explicit tillåten fältmängd på serversidan.
5. Kontrollera att administratörssidan fortfarande skyddas efter en manipulerad profilbegäran.
6. Kontrollera att aktuell roll läses från databasen på skyddade requests och inte enbart från sessionen.

## Inlämning

Ett regressionstest för den skrivbara profilen, ett test som försöker ändra en behörighetsrelaterad egenskap och en kort motivering av var tillitsgränsen går.
