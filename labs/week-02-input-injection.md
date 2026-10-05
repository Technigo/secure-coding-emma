# Vecka 2 — Indata och injektion

## Mål

Du ska kunna identifiera när data blandas ihop med SQL eller HTML och välja en kontroll som passar den aktuella tolkningskontexten.

## Övning A — Sökning

1. Logga in som **Sara Support** och sök efter en vanlig text och därefter en text som inte finns.
2. Studera hur sökfrågan byggs i koden och jämför `searchTickets()` med `searchTicketsForUser()`.
3. Prova ett ofarligt kontrolltecken i sökfältet och notera om resultatmängden ändras på ett oväntat sätt.
4. Båda implementationerna löser nästan samma problem — varför är den ena säker medan den andra inte är det?
5. Ändra implementationen så att söktermen inte kan ändra SQL-strukturen.

## Övning B — Kommentarer

1. Lägg till en kommentar med vanlig text på ett ärende.
2. Prova ofarlig markup som bara ändrar textens presentation.
3. Följ kommentaren från formuläret till databasen och vidare till HTML-svaret.
4. Säkerställ att kommentaren visas som data och inte som ny HTML.

## Inlämning

Kodändringarna, ett test för sökning med kontrolltecken, ett test för HTML-tecken i kommentar och en kort jämförelse mellan parameterisering och output encoding. Testerna ska även visa att normal funktion finns kvar.
