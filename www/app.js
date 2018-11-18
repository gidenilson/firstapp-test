var vm = new Vue({
  el: '#app',
  data: {
    books: [
      { name: 'Gênesis' },
      { name: 'Êxodo' },
      { name: 'Levíticos' },
      { name: 'Números'},
      { name: 'Deuteronômio'}
    ]
  },
  methods: {
    load : function(){
      $.ajax('data.json', {
        complete: function(data){
          console.log(data.responseJSON)
          for(var i = 0; i < data.responseJSON.length; i++){
            vm.books.push(data.responseJSON[i])
          }

        }
      })
    },

  }
})
