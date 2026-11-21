Visão geral - moodle-editor_tiptap
==================================

O **moodle-editor_tiptap** (componente ``editor_tiptap``) é um editor de texto WYSIWYG leve para o Moodle. Ele substitui a área de
texto dos campos HTML por uma área editável e uma barra de ferramentas curta, e salva HTML simples, como os demais editores do Moodle.

A interface é inspirada no editor `TipTap <https://tiptap.dev/>`_, mas o plugin **não** inclui a biblioteca TipTap:
usa os recursos de edição do navegador (``contenteditable``) e não tem JavaScript de terceiros.

Compatível com o Moodle 4.5 LTS e 5.3 LTS.

Recursos principais
-------------------

- **Barra de ferramentas**: parágrafo e títulos (H1, H2, H3), negrito, itálico, sublinhado, listas com marcadores e numeradas,
  links, desfazer e refazer.
- **Configurações**: cada botão de formatação (negrito, itálico, sublinhado, listas e link) pode ser desligado pelo administrador.
- **Links**: a janela de inserir link aceita só links ``http(s)://``, ``mailto:``, relativos (``/``) e âncoras (``#``).
- **Carregamento seguro**: scripts, objetos incorporados, atributos de eventos e links ``javascript:`` são removidos do texto
  ao carregá-lo no editor.
- **Cores do tema**: o editor segue as cores Bootstrap do tema, inclusive os modos de cor do Boost.
- **Privacidade**: o plugin não armazena dados pessoais.

Limitações
----------

- Sem envio de arquivos ou imagens, sem mídia incorporada, sem tabelas e sem visualização do código-fonte.
- Textos gravados em outros formatos (por exemplo, formato automático do Moodle ou Markdown) abrem no próximo editor habilitado
  que suporte esse formato.

Documentação
------------

.. toctree::
   :maxdepth: 2
   :caption: Conteúdo:

   installation
   configuration
   usage
