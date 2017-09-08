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
       }

    });

    /*Registrand as tasks*/    
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
    
}