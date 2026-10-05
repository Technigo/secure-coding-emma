# Vecka 5 — Säkra standardinställningar

## Mål

Du ska kunna granska konfiguration och felhantering som säkerhetskontroller, inte bara som drift- eller UX-frågor.

## Övning

1. Inventera standardvärden för bind-adress, sessionscookie, felstatus och diagnostiksidor.
2. Kontrollera vilka standardvärden som är rimliga för en lokal övning och vilka som skulle vara olämpliga i produktion.
3. Verifiera att appen endast lyssnar på loopback. Granska hur oväntade fel hanteras och identifiera om interna detaljer exponeras. Dokumentera vad som skulle behöva ändras i en produktionsmiljö. Själva åtgärden återkommer vi till i vecka 7.
4. Dokumentera vilka lokala begränsningar som är avsiktliga och vilka som behöver ändras före produktion.
5. Lägg till tester för de standarder du vill skydda mot framtida regressioner.

## Inlämning

En konfigurationschecklista, minst ett regressionstest, en kort teknisk motivering av en vald säker standardinställning samt relevanta antaganden eller tekniska begränsningar.
