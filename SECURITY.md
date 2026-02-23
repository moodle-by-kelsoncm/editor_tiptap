# Política de Segurança (Security Policy)

Obrigado por ajudar a manter este projeto seguro. Este documento descreve quais versões recebem correções de segurança e como reportar vulnerabilidades de forma responsável.

## Versões suportadas

Correções de segurança são aplicadas às versões conforme a tabela abaixo:

| Versão | Suportada |
|-------|-----------|
| 1.0.x | Sim       |

> Nota: versões fora do intervalo suportado podem não receber correções. Recomendamos sempre atualizar para a última release disponível.

## Reportando uma vulnerabilidade

Se você encontrar uma vulnerabilidade de segurança, **não abra uma issue pública** e não publique detalhes em fóruns, chats ou redes sociais até que haja mitigação/correção.

### Como reportar

Envie um relatório por um dos canais abaixo (preferência na ordem):

1. **GitHub Security Advisory (recomendado)**  
   Use o recurso “Report a vulnerability” do GitHub (aba **Security** do repositório), quando disponível.

2. **E-mail para o mantenedor**  
   Caso o fluxo de Security Advisory não esteja disponível, reporte por e-mail para o(a) mantenedor(a) do projeto via o contato público do perfil GitHub do owner do repositório:
   https://github.com/kelsoncm

### O que incluir no relatório

Para agilizar a triagem, inclua:

- Descrição clara do problema e impacto (o que um atacante consegue fazer).
- Componente/arquivo/versão afetada (ex.: versão do plugin e versão do Moodle, se aplicável).
- Passos para reproduzir (PoC) ou um exemplo mínimo.
- Logs, mensagens de erro e/ou evidências relevantes.
- Possíveis mitigações temporárias (se você tiver).
- Se você já testou uma correção proposta (patch), inclua detalhes.

### SLA (tempos esperados)

Nosso objetivo é:

- **Confirmação de recebimento:** até **7 dias**.
- **Atualização de status inicial:** até **14 dias** após a confirmação (triagem e severidade).
- **Correção e release:** varia conforme severidade e complexidade. Para casos críticos, priorizamos uma correção o mais rápido possível.

> Esses prazos podem variar conforme disponibilidade, necessidade de reproduzir o problema e coordenação com dependências (por exemplo, Moodle/core ou bibliotecas externas).

## Divulgação responsável

Pedimos que você:

- Dê tempo para que uma correção seja desenvolvida e publicada antes de divulgar publicamente.
- Evite exploração em ambientes de terceiros e evite acesso a dados que não sejam seus.
- Coordene a divulgação conosco, quando possível.

## Escopo

Esta política cobre vulnerabilidades no código deste repositório. Problemas em:

- Dependências de terceiros
- Infraestrutura fora do repositório
- Configurações específicas do ambiente do usuário

podem ser tratados como “fora de escopo”, mas ainda assim aceitamos relatórios e tentaremos orientar o melhor caminho.

## Agradecimentos

Relatórios válidos e enviados de forma responsável são muito bem-vindos. Quando apropriado, podemos creditar o(a) pesquisador(a) na nota de release ou advisory.
