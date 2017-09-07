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
       }
    });

    /*Registrand as tasks*/
    grunt.registerTask('dist',['clean','copy']);
    grunt.registerTask('default', ['dist']);

    /*Carregando as tasks*/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
}