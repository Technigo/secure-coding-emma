# SecureHub

SecureHub är en lokal övningsapplikation som används under kursen Säker kodning. Applikationen innehåller avsiktliga säkerhetsbrister. Kör den endast lokalt enligt instruktionerna.

## Kom igång

SecureHub kräver Node.js 22 eller senare.

```bash
npm install
npm run db:reset
npm run dev
```

Öppna sedan [http://127.0.0.1:3000](http://127.0.0.1:3000).

Applikationen är avsedd för lokal träning. Distribuera den inte till internet eller andra nätverk.

## Testa

```bash
npm test
```

## Träningsanvändare

Alla uppgifter och lösenord nedan är fiktiva träningsuppgifter:

| E-post                    | Lösenord           | Namn            | Roll    |
| ------------------------- | ------------------ | --------------- | ------- |
| alice@example.test        | `SecureHub!Alice1` | Alice Andersson | user    |
| bob@example.test          | `SecureHub!Bob1`   | Bob Berg        | user    |
| sara.support@example.test | `SecureHub!Sara1`  | Sara Support    | support |
| admin@example.test        | `SecureHub!Admin1` | Admin User      | admin   |

## Kursregler

- Distribuera eller driftsätt inte applikationen.
- Byt inte ut teknikstacken.
- Behåll befintlig funktionalitet när du gör ändringar.
- Lägg till eller uppdatera tester när du ändrar en säkerhetsegenskap.
- AI-verktyg är tillåtna enligt kursens regler, men du ska kunna förklara allt du lämnar in.

Återställ träningsdatan med `npm run db:reset` när du vill börja om.
