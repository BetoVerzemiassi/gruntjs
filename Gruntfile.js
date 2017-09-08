/* recebe o objeto grunt como parâmetro*/
module.exports = function(grunt){
    grunt.initConfig({
        /*Configurando task copy*/
        copy: {
            public: {
                cwd: 'public', //diretório padrão (current work directory) 
                src: '**', //globbing pattern ** para copiar todos os arquivos e diretórios.
                dest: 'dist', //pasta de destino
                expand: true //ativa o mapeamento dinâmico.
            }
        },
        /*Configuração task clean*/
        clean: {
            dist: {
                src: 'dist'
            }
       },

       /*Configuração task usemin, com isso não é necessário configurar as tasks concat, uglify e cssmin separadamente*/
       useminPrepare: {
           html: 'dist/**/*.html'
       },
       usemin: {
           html: 'dist/**/*.html'
       },

       /*Configuração task imagemin*/
       imagemin: {
           public: {
               expand: true,
               cwd: 'dist/img',
               src: '**/*.{png,jpg,gif}',
               dest: 'dist/img'
           }
       },

       /*Configuração task rev*/
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
                src: ['dist/js/**/*.min.js','dist/css/**/*.min.css']
           }
       },

       /*Configuração task coffee*/
       coffee: {
           compilar: {
               expand: true,
               cwd: 'public/coffee',
               src: ['**/*.coffee'],
               dest: 'public/js',
               ext: '.js'
           }
       },
       /*Configuração task less*/
       less: {
           compilar: {
               expand: true,
               cwd: 'public/less',
               src: ['**/*.less'],
               dest: 'public/css',
               ext: '.css'
           }
       },

       /*Configuração task watch*/
       watch: {
           coffee: {
               options: {
                    event: ['added','changed']
               },
                files: 'public/coffee/**/*.coffee',
                tasks: 'coffee:compilar'
           },
           less: {
                options: {
                    event: ['added','changed']
                },
                files: 'public/less/**/*.less',
                tasks: 'less:compilar'
           },
           js: {
               options: {
                   event: ['changed']
               },
               files: 'public/js/**/*.js',
               tasks: 'jshint:js'
           }
       },

       /*Configuração task jshint*/
       jshint: {
           js: {
               src: ['public/js/**/*.js']
           }
       },

       /*Configuração task browsersync*/
       browserSync: {
           public: {
               bsFiles: {                  
                   src: ['public/**/*']
               },
               options: {
                   watchTask: true,
                   server: {
                       baseDir: "public"
                   }
               }
           }
       }

    });

    /*Registrand as tasks*/  
    grunt.registerTask('server', 'browserSync','watch');  
    grunt.registerTask('minifica', ['useminPrepare','concat','uglify','cssmin','rev','usemin','imagemin']);
    grunt.registerTask('dist', ['clean','copy']);
    grunt.registerTask('default', ['dist','minifica']);

    /*Carregando as tasks*/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    
}