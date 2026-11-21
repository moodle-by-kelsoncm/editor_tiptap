Instalação
==========

Requisitos
----------

- Moodle 4.5 LTS ou 5.3 LTS (PHP conforme exigido pela versão do Moodle).
- Navegador com JavaScript habilitado.

Pelo pacote ZIP
---------------

1. Baixe ``editor_tiptap-<versão>.zip`` nas
   `releases do GitHub <https://github.com/moodle-by-kelsoncm/moodle-editor_tiptap/releases>`_.
2. Acesse **Administração do site > Plugins > Instalar plugins**, envie o ZIP e siga os passos.

Pelo Git
--------

A pasta do plugin é ``tiptap`` dentro da pasta de editores: ``lib/editor/tiptap`` no Moodle 4.5 e
``public/lib/editor/tiptap`` no Moodle 5.1 ou posterior.

.. code-block:: bash

   cd /caminho/do/moodle/public/lib/editor   # Moodle 4.5: /caminho/do/moodle/lib/editor
   git clone https://github.com/moodle-by-kelsoncm/moodle-editor_tiptap.git tiptap

Depois acesse **Administração do site > Notificações** para concluir a instalação.
