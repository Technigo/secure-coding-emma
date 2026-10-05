# Vecka 4 — Hemligheter och känsliga data

## Mål

Du ska kunna skilja mellan träningsdata och riktiga hemligheter samt granska hur lösenord, diagnostik och loggar behandlar känslig information.

## Övning

1. Inventera vilka värden som finns i seed-filer, konfiguration, HTML-svar och logghändelser.
2. Markera vilka värden som är fiktiva träningsvärden och vilka typer av värden som aldrig ska exponeras.
3. **Obligatoriskt: V05 lösenordslagring.** Granska lösenordshjälparen och ersätt den snabba generella hashen med säker lösenordshashing.
4. **Obligatoriskt: V06 diagnostik/config.** Granska debug-sidan och begränsa diagnostisk information till rätt behörighet, eller ta bort endpointen.
5. Granska login-loggen och föreslå ett minimalt fälturval som fortfarande kan användas vid felsökning.
6. Lägg till regressionstester för V05 och V06 samt för övriga säkerhetsegenskaper du ändrar.

## Inlämning

En kort data-inventering, kod- och teständringar för de obligatoriska V05- och V06-riskerna samt en motivering av varför inga riktiga hemligheter behövs i den lokala övningen.
