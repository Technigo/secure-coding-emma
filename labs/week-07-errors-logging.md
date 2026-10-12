# Vecka 7 — Fel och loggning

## Mål

Du ska kunna utforma fel- och logghantering som ger felsökningsvärde utan att läcka känslig information.

## Övning

1. **Obligatoriskt: Felläckage.** Trigga det lokala testfelet och skilj på information för serverlogg och information för användaren.
2. **Obligatoriskt: Känslig loggning.** Granska login-händelserna och ta bort lösenord och andra onödiga känsliga fält.
3. Föreslå en strukturerad logghändelse med minsta nödvändiga information.
4. Implementera säkra svar och loggar för de flöden du ändrar.
5. Lägg till tester för statuskod, frånvaro av interna detaljer och frånvaro av lösenord.

## Resultat

Labben lämnas inte in. När du är klar ska du ha:

En kort logg- och felpolicy, kodändringar för felläckaget och den känsliga loggningen samt regressionstester som visar att normal inloggning och användbara felsignaler finns kvar.
