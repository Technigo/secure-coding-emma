# Vecka 8 — Integrerad säker kodning och examinationsförberedelse

## Mål

Du ska självständigt kunna tillämpa hela det tekniska arbetsflödet — **Identifiera → Påvisa → Åtgärda → Verifiera** — på kod du inte nödvändigtvis skrivit själv, som förberedelse inför kursens praktiska examination.

## Övning

Arbeta igenom hela eller delar av SecureHub (gärna delar du inte fokuserat på tidigare under kursen) och tillämpa loopen på minst två brister:

1. **Identifiera** — läs koden och formulera vilket felaktigt antagande som gör en viss åtgärd osäker. Peka ut exakt fil och rad.
2. **Påvisa** — visa, lokalt och ofarligt, att antagandet faller: vilket anrop eller vilken indata demonstrerar bristen?
3. **Åtgärda** — implementera en åtgärd som löser grundorsaken, inte bara symptomet, och som bevarar avsedd funktionalitet.
4. **Verifiera** — skriv eller anpassa positiva och negativa tester (eller annan reproducerbar kontroll) som bevisar att säkerhetsegenskapen nu gäller, och att normal funktionalitet fortfarande fungerar.

Upprepa loopen för varje vald brist. Om du stöter på ett scenario eller en kodväg du inte känner igen sedan tidigare veckor, behandla det som en del av övningen — det är avsiktligt.

## Inlämning

För varje granskad plats, kort och praktiskt:
- fil- och radreferens samt vilket antagande som brast (Identifiera);
- hur du påvisade bristen lokalt (Påvisa);
- kodändringen (Åtgärda);
- dina positiva/negativa tester eller annan reproducerbar verifiering (Verifiera);
- en kort teknisk motivering av vald lösning samt eventuella antaganden eller tekniska begränsningar.

Ingen längre rapport eller essä krävs. Avslöja inte svaren till lärarens dolda tester — beskriv din egen analys och dina egna tester.
