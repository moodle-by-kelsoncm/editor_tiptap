# Editor TipTap para Moodle

Um plugin de editor WYSIWYG para Moodle que utiliza uma interface inspirada no TipTap.

## Características

- Interface de editor moderna e responsiva
- Suporte a formatação de texto básica (negrito, itálico, sublinhado)
- Suporte a listas (ordenadas e não ordenadas)
- Suporte a links
- Suporte a cabeçalhos (H1, H2, H3)
- Botões de desfazer/refazer
- Configurações administrativas para habilitar/desabilitar funcionalidades
- Suporte a tema escuro
- Design responsivo para dispositivos móveis

## Requisitos

- Moodle 4.0 ou superior
- PHP 7.4 ou superior
- Navegadores modernos com JavaScript habilitado

## Instalação

1. Copie o diretório `editor_tiptap` para a pasta `editor/` da sua instalação do Moodle.
2. Acesse a página de notificações do Moodle (Site administration > Notifications).
3. Siga as instruções na tela para completar a instalação.

## Configuração

1. Navegue para "Site administration > Plugins > Text editors > TipTap editor".
2. Configure quais botões da barra de ferramentas devem estar habilitados.
3. Salve as alterações.

## Ativação

1. Vá para "Site administration > Plugins > Text editors > Manage editors".
2. Habilite o "TipTap editor".
3. Mova-o para a posição desejada na lista de editores disponíveis.

## Uso

Uma vez instalado e ativado, o editor TipTap estará disponível como uma opção para os usuários em suas preferências de editor.

## Estrutura do Plugin

```
editor_tiptap/
├── version.php          # Informações de versão do plugin
├── lib.php             # Classe principal do editor
├── settings.php        # Configurações administrativas
├── styles.css          # Estilos CSS do editor
├── README.md           # Este arquivo
├── lang/               # Arquivos de idioma
│   ├── en/
│   │   └── editor_tiptap.php
│   └── pt_br/
│       └── editor_tiptap.php
├── db/                 # Definições de banco de dados
│   ├── access.php      # Definições de capabilities
│   └── install.xml     # Schema do banco de dados
└── amd/               # Módulos JavaScript AMD
    └── src/
        └── editor.js   # Módulo principal do editor
```

## Desenvolvimento

### Compilar JavaScript

Se você modificar o código JavaScript em `amd/src/`, será necessário executar o Grunt para compilar.

**IMPORTANTE:** O comando Grunt deve ser executado a partir do diretório raiz do Moodle, não do diretório do plugin:

```bash
# Navegue até o diretório raiz do Moodle
cd /path/to/moodle

# Execute o Grunt para compilar o JavaScript do plugin
grunt amd --root=editor/tiptap
```

**Compilação automática (modo watch):**

Para recompilar automaticamente sempre que modificar os arquivos JavaScript, use o modo watch:

```bash
cd /path/to/moodle
grunt watch
```

O Grunt ficará monitorando todos os arquivos do Moodle e recompilará automaticamente quando detectar mudanças. Útil durante o desenvolvimento!

**Nota:** Se você ainda não tem o Grunt instalado no Moodle:
```bash
cd /path/to/moodle
npm install
```

### Limpar caches

Após fazer alterações, limpe os caches do Moodle:

```bash
php admin/cli/purge_caches.php
```

Ou navegue para "Site administration > Development > Purge all caches".

## Licença

Este plugin é licenciado sob a GNU GPL v3 ou posterior.

## Créditos

Desenvolvido em 2025.

## Suporte

Para relatar problemas ou sugerir melhorias, entre em contato através do seu canal de suporte preferido.
