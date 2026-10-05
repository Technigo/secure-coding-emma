# Vecka 7 — Fel och loggning

## Mål

Du ska kunna utforma fel- och logghantering som ger felsökningsvärde utan att läcka känslig information.

## Övning

1. **Obligatoriskt: V07 felläckage.** Trigga det lokala testfelet och skilj på information för serverlogg och information för användaren.
2. **Obligatoriskt: V08 känslig loggning.** Granska login-händelserna och ta bort lösenord och andra onödiga känsliga fält.
3. Föreslå en strukturerad logghändelse med minsta nödvändiga information.
4. Implementera säkra svar och loggar för de flöden du ändrar.
5. Lägg till tester för statuskod, frånvaro av interna detaljer och frånvaro av lösenord.

## Inlämning

En kort logg- och felpolicy, kodändringar för de obligatoriska V07- och V08-riskerna samt regressionstester som visar att normal inloggning och användbara felsignaler finns kvar.
