# Vecka 6 — Säker kodgranskning och säkerhetstestning

## Mål

Du ska kunna granska kod tekniskt för att hitta återkommande säkerhetsbrister på implementationsnivå, bedöma om en föreslagen åtgärd faktiskt löser grundorsaken, och verifiera definierade säkerhetsegenskaper med reproducerbara tester.

Detta är en teknisk granskning av kod — inte en övning i granskningsprocess, pull request-arbetsflöden eller teamrutiner. Den typen av processfrågor hör till den senare kursen Säkra utvecklingsprocesser.

## Del A — Säker kodgranskning och säkerhetsmönster

1. Välj två eller tre av de brister du redan har arbetat med (t.ex. från vecka 1–4) och läs om koden som om du granskade den åt en kollega.
2. För varje vald plats: identifiera det mönster som orsakade bristen (t.ex. saknad ägarkontroll, strängbyggd SQL, oescapad utdata, friformig fältuppdatering).
3. Jämför den sårbara varianten med en säkrare implementation av samma funktion. Formulera skillnaden i en mening — vad är det som faktiskt gör den säkrare varianten säker?
4. Granska en given åtgärd (din egen eller en kollegas) och bedöm om den löser grundorsaken eller bara döljer symptomet. Exempel på skenlösningar att leta efter: filtrering i gränssnittet, hårdkodade undantag för enstaka ID, validering endast på klienten.

## Del B — Säkerhetstestning och robust implementation

1. Skriv eller anpassa minst ett positivt test (visar att avsedd funktionalitet fortsatt fungerar) och minst ett negativt test (visar att den otillåtna åtgärden nekas) för en av bristerna i Del A.
2. Kombinera gärna fler än en säkerhetsegenskap i samma övning, t.ex. både åtkomstkontroll och korrekt statuskod.
3. Pröva om din åtgärd går att kringgå med en närliggande variant av anropet (t.ex. annan HTTP-metod, annat fält, annat ID-format). Justera åtgärden om testet avslöjar en lucka.
4. Kontrollera att den normala, avsedda funktionaliteten fortfarande fungerar efter ändringen.

## Inlämning

Kortfattade fynd per granskad kodplats, eventuella kodändringar, dina positiva/negativa tester (eller annan reproducerbar verifiering), och en kort teknisk motivering av varför åtgärden löser grundorsaken.

Avslöja inte svaren till lärarens dolda tester — beskriv din egen analys och dina egna tester.
