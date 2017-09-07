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

       useminPrepare: {
           html: 'dist/**/*.html'
       },
       usemin: {
           html: 'dist/**/*.html'
       }

    });

    /*Registrand as tasks*/
    grunt.registerTask('dist', ['clean','copy']);
    grunt.registerTask('minifica', ['useminPrepare','concat','uglify','cssmin','usemin']);
    grunt.registerTask('default', ['dist','minifica']);

    /*Carregando as tasks*/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    
}