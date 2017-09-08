# Grunt: automação de build front-end

* O Grunt é um task runner totalmente feito em JavaScript tornando-o atrativo no mundo front-end, inclusive ele possui um acervo com mais de 2.000 plugins suportando as mais diversas funcionalidades.

# Node.js e instalação

* O Grunt é escrito em JavaScript mas não executa no browser. Ele executa no terminal usando o Node.js.

* O Node.js é uma plataforma construída sob a máquina virtual V8, aquela utilizada no Google Chrome. Ela permite o uso da linguagem JavaScript fora do browser.

* A instalação do Node.js é feita baixando seu instalador diretamente em sua página. Logo de cara você verá um grande botão com o texto "install".

# Instalando o Grunt através do NPM e do package.json

* O Grunt nada mais é do que um módulo do Node.js. Para instalarmos um módulo do Node.js, usamos o npm, o gerenciador de pacotes do Node.js.

* Por uma questão de organização, o Node.js pode tomar nota de todos os módulos de que sua aplicação depende num arquivo chamado package.json. Podemos criá-lo através do próprio npm executando o seguinte comando dentro da pasta projeto:

> npm init

* Um assistente fará perguntas como o nome do projeto, sua versão entre outras. Você pode dar ENTER para todas elas que um padrão será adotado. Por exemplo, o nome do projeto será o nome da pasta na qual o comando foi executado. O resultado final será o arquivo package.json.

```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (projeto)
version: (0.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to package.json:

{
  "name": "projeto",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)
```

* Agora que temos o arquivo package.json podemos instalar o Grunt através da linha de comando:

> npm install grunt --save-dev

* O comando anterior baixará a versão mais atual do Grunt gravando-a dentro da pasta node_modules. Esta pasta guarda todos os módulos usado pelo seu projeto. O parâmetro --save-dev adiciona a dependência no arquivo package.json:

```
// package.json
{
  "name": "projeto",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "grunt": "^0.4.5"
  }
}
```

* Para o Grunt funcionar, ainda precisamos instalar seu cliente em linha de comando, o grunt-cli:

> npm install grunt-cli -g

# O arquivo Gruntfile.js

* O arquivo Gruntfile.js é onde configuramos tarefas (tasks). Todo o código ficará envolto por uma função wrapper que recebe como parâmetro o objeto do Grunt.

```
/* recebe o objeto grunt como parâmetro*/
module.exports = function(grunt) {
   grunt.initConfig({
        /*  suas tasks aqui */
  });
}
```

* Mas quem chamará essa função passando o objeto? Nós mesmos, quando executarmos o comando grunt no terminal. Quando executado na mesma pasta do arquivo Gruntfile.js, ele se encarregará de chamar a função wrapper definida no arquivo passando uma referência para o objeto grunt.

* Antes de pensarmos em qualquer tarefa, precisamos garantir que todas elas sejam aplicadas numa cópia da pasta 'public' de nosso projeto, garantindo assim a integridade dos arquivos originais.

* Poderíamos até tentar fazer isso usando os comandos padrões do Grunt mas, ainda assim, precisaríamos varrer recursivamente a pasta que desejamos copiar e executar uma série de comandos fragmentados.

* Para esta tarefa, tão corriqueira, podemos usar um plugin do Grunt que também é um módulo do Node.js.

# Instalando primeiro plugin

* O primeiro plugin do Grunt que utilizaremos será o **grunt-contrib-copy**. Para instalá-lo via npm:

> npm install grunt-contrib-copy --save-dev

* Pronto, mas isso ainda não é suficiente. Apesar do npm ter criado a pasta grunt-contrib-copy dentro de node_modules, o plugin ainda não é enxergado pelo Grunt. Para que ele seja enxergado precisamos registrá-lo no Gruntfile.js através da função **grunt.loadNpmTasks:**

```
/* recebe o objeto  grunt como parâmetro*/
module.exports = function(grunt) {
   grunt.initConfig({
        /*  suas tasks aqui */
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
```

* Repare que a instrução anterior não faz parte da configuração de tarefas, logo, fica fora da função grunt.initConfig. Por falar em tarefas, que tal configurarmos a tarefa copy ?

# Configurando tarefas (tasks) do Grunt

* Plugins no Grunt são configurados através da função **grunt.initConfig({ }):**

```
grunt.initConfig({
        plugin1: { 
           /* configurações do plugin1 */
         }, 
        plugin2: {
          /* configurações do plugin2 */
        }
  });
```

* Repare que a função recebe um **objeto JavaScript** . Este objeto tem como propriedades os nomes das **tasks** que desejamos configurar e como valor suas configurações. Sabemos pela documentação do **grunt-contrib-copy** que propriedade que representa a task deste plugin é **copy**. Assim temos:

```
grunt.initConfig({
        copy: {/* configurações de grunt-contrib-copy*/}
  });
```

# Targets

* Cada tarefa do Grunt pode ter alvos (targets) diferentes, que podem ser entendidos como subtarefas. Por exemplo, podemos querer copiar a pasta public inteiramente ou apenas a pasta public/css

```
   grunt.initConfig({
        copy: {
            tudo: {/* copia a pasta public */}, 
            css: {/* copia a pasta public/css apenas */}
        }
  });
```

* O exemplo anterior não tem as tasks totalmente configuradas, mas se tivessem prontas, poderíamos executar no terminal:

> grunt copy

* O comando anterior executará a task copy e seus targets tudo e css. Mas se quisermos rodar apenas um target específico? Podemos qualificar a task indicando qual target queremos executar:

> grunt copy:tudo

* Agora que entendemos o mecanismo de task e target, vamos configurar nossa task copy:

```
module.exports = function(grunt) {
   grunt.initConfig({
        copy: {
              public: {
                   cwd: 'public', 
                   src: '**', 
                   dest: 'dist', 
                   expand: true
              }
         }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
```

* Vamos entender os parâmetros da task copy:

> **expand:** quando true ativa o mapeamento dinâmico. No lugar de definirmos o nome de cada arquivo e seu destino, indicamos o diretório de trabalho (cwd) a origem (src) e o destino (desc). Caso contrário precisaríamos fazer da seguinte forma:

```
copy: {
   public: {
       files: [
           {src: 'public/index.html', dest: 'dist/index.html'},
           {src: 'public/css/index.css', dest: 'dist/css/index.css'},
           /* demais arquivos */
       ],      
   }
}
```

> **cwd:** diretório padrão (current work directory) no qual as demais propriedades se basearão.

> **src:** arquivos que desejamos copiar. Usamos o globbing pattern ** para copiar todos os arquivos e diretórios.

> **dest:** pasta de destino. Em nosso caso, a pasta dist. É criada caso não exista.

* Agora que temos tudo configurado, podemos rodar a task copy através do grunt:

```
$ grunt copy
Running "copy:public" (copy) task
Created 4 directories, copied 5 files

Done, without errors.
```

# Registrando tarefa atalho

* Tudo funciona, mas imagine o seguinte cenário: alguém apagou algum arquivo do projeto. Nossa cópia precisa refletir o projeto, logo, rodamos novamente o comando **grunt copy**. O problema é que ele conterá o arquivo que foi apagado do projeto original e isso é um problema.

* Precisamos apagar a pasta **'dist'** antes de rodarmos novamente nossa task **'copy'**. Para isso existe a task clean. Instalamos o plugin através do comando:

> npm install grunt-contrib-clean --save-dev

* Não podemos nos esquecer de registrá-lo em nosso arquivo :

> grunt.loadNpmTasks('grunt-contrib-clean');

* E por fim configurar a task:

```
module.exports = function(grunt) {
   grunt.initConfig({
        copy: {
              public: {
                   cwd: 'public', 
                   src: '**', 
                   dest: 'dist', 
                   expand: true
              }
         }, 
         clean: {
              dist: {
                  src: 'dist'
              }
         }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
```

* Usamos o nome **clean** porque é este o nome da task fornecido por sua **documentação**. Escolhemos o nome dist para seu target, que recebe como parâmetro um objeto com a propriedade **src**. Nele definimos o diretório que será apagado.

Testando a task clean:

```
$ grunt clean
Running "clean:dist" (clean) task
Cleaning dist...OK

Done, without errors.
```

* Agora basta rodar as tasks na ordem e torcer para não esquecer:

> grunt clean

> grunt copy

* Você pode executar as duas de uma vez:

> grunt clean copy

* Repare que estamos querendo automatizar nossas tarefas e ter que lembrar de executar em ordem as duas não se coaduna com nosso objetivo.

* Para resolver problemas como esse, o Grunt permite registrar novas tasks que chamam outras na sequência que definirmos. Fazemos isso através da função **grunt.registerTask.**

```
grunt.registerTask('dist', ['clean', 'copy']);
```

* Repare que a função acima recebe como primeiro parâmetro o nome da nossa task. O segundo é um array com o nome de todas as tasks já configuradas pelo Grunt. A ordem é importante, pois a primeira será executada antes da segunda e por ai vai.

* Nosso script final fica:

```
module.exports = function(grunt) {
   grunt.initConfig({
        copy: {
              public: {
                   cwd: 'public', 
                   src: '**', 
                   dest: 'dist', 
                   expand: true
              }
         }, 
         clean: {
              dist: {
                  src: 'dist'
              }
         }
  });

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
```

* Agora basta executarmos no terminal:

```
$ grunt dist
Running "clean:dist" (clean) task

Running "copy:public" (copy) task
Created 4 directories, copied 5 files

Done, without errors.
```

* O Grunt ainda permite registrarmos a task **'default'.** Ela será executada apenas através do comando 'grunt'. Modificando nosso script:

```
module.exports = function(grunt) {
   grunt.initConfig({
        copy: {
              public: {
                   cwd: 'public', 
                   src: '**', 
                   dest: 'dist', 
                   expand: true
              }
         }, 
         clean: {
              dist: {
                  src: 'dist'
              }
         }
  });

  grunt.registerTask('dist', ['clean', 'copy']);
  grunt.registerTask('default', ['dist']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
```

* Agora basta executar no terminal:

```
$ grunt
Running "clean:dist" (clean) task
Cleaning dist...OK

Running "copy:public" (copy) task
Created 4 directories, copied 5 files

Done, without errors.
```

# Automatizando merge e minificação com Grunt

* Os plugins envolvidos nestas tarefas são o grunt-contrib-concat, o grunt-contrib-uglify e o grunt-contrib-cssmin. 

* No terminal:

```
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-cssmin --save-dev
```

* Em Gruntfile.js:

```
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
```

* O problema é que seremos responsáveis pela configuração das tasks de cada um deles. Para resolver isso, utilizaremos o **grunt-usemin** para gerar as configurações dos plugins citados.

# grunt-usemin

* O **grunt-usemin** é um plugin que facilita incrivelmente a configuração das tasks envolvidas no processo de merge e minificação. Só precisamos configurar sua task para que ela gere automaticamente os parâmetros de configuração para os três plugins que vimos anteriormente.

* Para instalá-lo, basta executar no terminal o comando:

> npm install grunt-usemin --save-dev

* O **grunt-usemin** funciona da seguinte maneira. Em nossas páginas, envolvemos os blocos de css e de script que desejamos realizar o merge e minficação utilizando um comentário especial. Por exemplo, em nossa página index.html:

```
<!-- build:css css/index.min.css -->
<link rel="stylesheet" href="css/base.css">    
<link rel="stylesheet" href="css/index.css">    
<!-- endbuild -->

<!-- build:js js/index.min.js -->
<script src="js/index.js"></script>
<!-- endbuild -->
```

* É necessário registrar o grunt-usemin no Gruntfile.js e configurar duas tasks distintas.

* A primeira **useminPrepare** gerará configurações dinâmicas para **grunt-contrib-concat**, **grunt-contrib-uglify**, **grunt-contrib-cssmin**. O primeiro plugin concatenará os arquivos e os dois últimos "minificarão" JavaScript e CSS respectivamente.

* A segunda task **usemin** alterará nossos arquivos HTML fazendo com que eles apontem para os arquivos concatenados e minificados definidos nos comentários especiais, pois foram criados antes pela task **useminPrepare.**

* Não se preocupe, as duas tasks são tão simples quanto as que vimos anteriormente:

* No Gruntfile.js:

```
module.exports = function(grunt) {

   grunt.initConfig({
      /* Copia os arquivos para o diretório 'dist' */
      copy: {
         public: {
           expand: true,
           cwd: 'public',
           src: '**',
           dest: 'dist'
         }
     },

     clean: {
          dist: {
              src: 'dist'
          }
     },

     useminPrepare: {
       html: 'dist/**/*.html'
     },

     usemin: {
       html: 'dist/**/*.html'
     }
  });


  //registrando task para minificação

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.registerTask('minifica', ['useminPrepare','concat', 'uglify', 'cssmin', 'usemin']);

  // registrando tasks
  grunt.registerTask('default', ['dist', 'minifica']);

  // carregando tasks
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin'); 
}
```

# Otimizando imagens com Grunt

* O Grunt também permite automatizar uma tarefa como essa através do **grunt-contrib-imagemin**. Sua instalação é como qualquer plugin do Grunt, logo, como qualquer outro módulo do Node.js:

> npm install grunt-contrib-imagemin --save-dev

* Como qualquer plugin do Grunt ele precisa ser carregado no Gruntfile.js:

```
grunt.loadNpmTasks('grunt-contrib-imagemin');
```

* Por fim, resta apenas configurar a task também no Gruntfile.js:

```
imagemin: {
   public: {
     expand: true,
     cwd: 'dist/img',
     src: '**/*.{png,jpg,gif}',
     dest: 'dist/img'
   }
}
```

# A técnica de versionamento

* Queremos que nossos arquivos fiquem no cache quase que eternamente, mas queremos que arquivos alterados sejam baixados novamente pelo navegador. Uma maneira de fazermos isso é alterando o nome do arquivo criando uma nova versão. Por exemplo:

```
<img src="img/logo.png">
```

* Renomeamos o arquivo para:

```
<img src="2babcead.logo.png">
```

* Repare o prefixo do nome do arquivo. Poderia ter sido qualquer coisa como um número incremental, mas no exemplo acima usamos um hash de 8 dígitos calculado a partir do arquivo. Se por acaso ele mudar, basta calcularmos esse hash com alguma ferramenta alterando logo em seguida o nome do arquivo e sua referência em nossas páginas.

# Versionamento através do Grunt

* Você já deve ter percebido que além de termos que adicionar automaticamente um hash de 8 dígitos do arquivo como prefixo precisaremos alterar nosso HTML para que aponte para o novo arquivo. Já temos a task **'usemin'** que altera a importação de arquivos JavaScript e CSS de nossa aplicação. Ela é ainda mais esperta, e alterará o caminho dos arquivos que tiverem sua versão de revisão no disco. Fantástico!

* Primeiro instalaremos o plugin grunt-rev. Ele será responsável em renomear os arquivos adicionando seu hash como prefixo:

> npm install grunt-rev --save-dev

* Registrando o plugin em nosso **GruntFile.js**

```
grunt.loadNpmTasks('grunt-rev');
```

* O nome da task é rev. Ela conterá dois targets: um que aponta para nossas imagens e outro para nossos scripts, porém apenas os minificados!

```
rev: {
      imagens: {
        src: ['dist/img/**/*.{png,jpg,gif}']
      },

      minificados: {
        src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
      }
}
```

* Nossa task está quase pronta, ainda falta indicar qual estratégia de versionamento utilizaremos para gerar o hash e quantos dígitos ele utilizará. Fazemos isso adicionando um targets especial, que parece target mais não é. Quase todos os plugins do grunt aceitam o parâmetro **'options':**

```
rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },

      imagens: {
        src: ['dist/img/**/*.{png,jpg,gif}']
      },

      minificados: {
        src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
      }
}
```

* A configuração options recebe um objeto com três parâmetros: o encoding do arquivo, o algoritmo utilizado e o tamanho do prefixo gerado. Usaremos UTF-8, MD5 e o tamanho 8 respectivamente.

* Por fim, precisamos rodar as dois targets antes da task **'usemin':**

```
grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:imagens','rev:minificados', 'usemin', 'imagemin']);
```

* Nosso script final ficará assim:

```
module.exports = function(grunt) {

   grunt.initConfig({
      /* Copia os arquivos para o diretório 'dist' */
      copy: {
         public: {
           expand: true,
           cwd: 'public',
           src: '**',
           dest: 'dist'
         }
     },

     clean: {
          dist: {
              src: 'dist'
          }
     },

     useminPrepare: {
       html: 'dist/**/*.html'
     },

     usemin: {
       html: 'dist/**/*.html'
     }, 

     imagemin: {
      public: {
        expand: true,
        cwd: 'dist/img',
        src: '**/*.{png,jpg,gif}',
        dest: 'dist/img'
      }
    }, 

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },

      imagens: {
        src: ['dist/img/**/*.{png,jpg,gif}']
      },
      minificados: {
        src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
      }
    }   

  });

  //registrando task para minificação

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.registerTask('minifica', ['useminPrepare', 
                                  'concat', 'uglify', 'cssmin', 'rev:imagens','rev:minificados', 'usemin', 'imagemin']);

  // registrando tasks
  grunt.registerTask('default', ['dist', 'minifica', ]);

  // carregando tasks
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin'); 
  grunt.loadNpmTasks('grunt-contrib-imagemin'); 
  grunt.loadNpmTasks('grunt-rev'); 
}
```

* Rodando a tasks padrão:

> grunt

* Se abrirmos o arquivo dist/index.html veremos que as tag's de recurso passaram a apontar para o arquivo da revisão encontrado em disco:

```
<link rel="stylesheet" href="css/ebb6096a.index.min.css"/>
...
<img src="img/2babcead.grunt-banner.png">
...
<script src="js/3ee7db69.index.min.js"></script>
```

* Se você rodar novamente o script, os arquivo continuaram com o mesmo nome e só mudarão caso o arquivo original tenha sido modificado.

# Grunt e tasks de pré-processamento

* O Grunt possui o plugin **grunt-contrib-coffee** para compilar **CoffeeScript**, inclusive o **grunt-contrib-less** para compilar **LESS**. O problema é que eles devem ser executados quando novos arquivos forem criados e quando os já existentes forem modificados. Para resolver este último problema, o Grunt possui o plugin **grunt-contrib-watch.**

* Primeiro, vamos executar o corriqueiro comando npm para instalar os dois pré-processadores que utilizaremos:

> npm install grunt-contrib-coffee grunt-contrib-less  --save-dev

* Inclusive registrá-los em nosso Gruntfile.js:

```
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-less');
```

* Agora só nos resta configurar as tasks.

# As tasks coffee e less

* A configuração das taks coffee e less são praticamente idênticas. Para cada uma delas, adicionaremos o target **'compilar':**

```
coffee: {
   compilar: { 
      expand: true,
      cwd: 'public/coffee', 
      src: ['**/*.coffee'],
      dest: 'public/js'
   }
} ,

less: {
   compilar: {
      expand: true,
      cwd: 'public/less',
      src: ['**/*.less'],
      dest: 'public/css'
   }
}
```

* Repare no código anterior que os arquivos **.coffee e .less** ficarão em suas respectivas pastas. A ideia é que cada arquivo arquivo **.coffee e .less** compilado vá para a pasta **js e css** respectivamente.

* O problema é que no processo de compilação não muda a extensão do arquivo. Para isso, adicionamos a propriedade **ext** na configuração do target. Ela mudará a extensão do arquivo copiado para o valor que definimos na propriedade:

```
coffee: {
   compilar: { 
      expand: true,
      cwd: 'public/coffee', 
      src: ['**/*.coffee'],
      dest: 'public/js', 
      ext: '.js'
   }
} ,

less: {
   compilar: {
      expand: true,
      cwd: 'public/less',
      src: ['**/*.less'],
      dest: 'public/css', 
      ext: '.css'
   }
}
```
# Automatizando com a task watch

* Para termos a tarefa watch disponível, precisamos instalar o plugin **grunt-contrib-watch** através do npm:

> npm install grunt-contrib-watch --save-dev

* E também registrá-la em nosso **Gruntfile.js:**

```
grunt.loadNpmTasks('grunt-contrib-watch');
```

* A configuração da task é feita da seguinte forma: para a task watch criaremos dois targets. Um responsável em observar arquivos **.coffee** e outro arquivos **.less:**

```
watch: {

   coffee: {
      files: 'public/coffee/**/*.coffee',
      tasks: 'coffee:compilar'
   },

   less: {
       files: 'public/less/**/*.less', 
       tasks: 'less:compilar'
   }
}
```

* Toda vez que um arquivo **.coffee ou .less** for **incluído (added), alterado (changed) ou deletado (deleted)** as tasks **watch:coffee e watch:less** chamarão as tasks definidas na propriedade task. Essas tasks são as que compilarão nossos arquivos.

* Repare que elas compilarão todos os arquivos das pastas **coffee e less** respectivamente. Isso não é algo ruim, já que arquivos **.less** podem depender de outros, a mesma coisa com nossos arquivos **.coffee.**

* Está quase pronto! Quase? Sim, porque não nos interessa executar as tarefas para arquivos deletados. Podemos sair do padrão **'all'** e indicar que as tarefas devem escutar apenas os eventos **'added' e 'changed'** deixando de fora o evento **'deleted'**. Fazemos adicionando a propriedade **options:**

```
watch: {

   coffee: {
      options: {
           event: ['added', 'changed']
       },
      files: 'public/coffee/**/*.coffee',
      tasks: 'coffee:compilar'
   },

   less: {
       options: {
          event: ['added', 'changed']
       },
       files: 'public/less/**/*.less', 
       tasks: 'less:compilar'
   }
}
```

* Diferente do que estamos acostumados, rodarmos a task watch diretamente sem qualificar seus targets.

```
$ grunt watch
Running "watch" task
Waiting...
```

* Nosso script com todas as nossas tasks ficou assim:

```
module.exports = function(grunt) {

   grunt.initConfig({
      /* Copia os arquivos para o diretório 'dist' */
      copy: {
         public: {
           expand: true,
           cwd: 'public',
           src: '**',
           dest: 'dist'
         }
     },

     clean: {
          dist: {
              src: 'dist'
          }
     },

     useminPrepare: {
       html: 'dist/**/*.html'
     },

     usemin: {
       html: 'dist/**/*.html'
     }, 

     imagemin: {
      public: {
        expand: true,
        cwd: 'dist/img',
        src: '**/*.{png,jpg,gif}',
        dest: 'dist/img'
      }
    }, 

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },

      imagens: {
        src: ['dist/img/**/*.{png,jpg,gif}']
      },
      minificados: {
        src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
      }
    }, 

    coffee: {
      compilar: { 
        expand: true,
        cwd: 'public/coffee', 
        src: ['**/*.coffee'],
        dest: 'public/js', 
        ext: '.js'
      }
    },

    less: {
      compilar: {
        expand: true,
        cwd: 'public/less',
        src: ['**/*.less'],
        dest: 'public/css', 
        ext: '.css'
      }
    }, 

    watch: {
      coffee: {
        options: {
          event: ['added', 'changed']
        },
        files: 'public/coffee/**/*.coffee',
        tasks: 'coffee:compilar'
      },

      less: {
        options: {
          event: ['added', 'changed']
        },
        files: 'public/less/**/*.less', 
        tasks: 'less:compilar'
      }
    }

  });

  //registrando task para minificação

  grunt.registerTask('dist', ['clean', 'copy']);

  grunt.registerTask('minifica', ['useminPrepare', 
                                  'concat', 'uglify', 'cssmin', 'rev:imagens','rev:minificados', 'usemin', 'imagemin']);

  // registrando tasks
  grunt.registerTask('default', ['dist', 'minifica', ]);

  // carregando tasks
  grunt.loadNpmTasks('grunt-contrib-copy'); 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin'); 
  grunt.loadNpmTasks('grunt-contrib-imagemin'); 
  grunt.loadNpmTasks('grunt-rev'); 
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
}
```
