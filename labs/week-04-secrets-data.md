# Vecka 4 — Hemligheter och känsliga data

## Mål

Du ska kunna skilja mellan träningsdata och riktiga hemligheter samt granska hur lösenord, diagnostik och loggar behandlar känslig information.

## Övning

1. Inventera vilka värden som finns i seed-filer, konfiguration, HTML-svar och logghändelser.
2. Markera vilka värden som är fiktiva träningsvärden och vilka typer av värden som aldrig ska exponeras.
3. **Obligatoriskt: Lösenordslagring.** Granska lösenordshjälparen och ersätt den snabba generella hashen med säker lösenordshashing.
4. **Obligatoriskt: Diagnostik och konfiguration.** Granska debug-sidan och begränsa diagnostisk information till rätt behörighet, eller ta bort endpointen.
5. Granska login-loggen och föreslå ett minimalt fälturval som fortfarande kan användas vid felsökning.
6. Lägg till regressionstester för lösenordslagringen och debug-sidan samt för övriga säkerhetsegenskaper du ändrar.

## Resultat

Labben lämnas inte in. När du är klar ska du ha:

En kort data-inventering, kod- och teständringar för lösenordslagringen och debug-sidan samt en motivering av varför inga riktiga hemligheter behövs i den lokala övningen.
