
var vm = new Vue({
  el: '#app',
  methods : {

    getValue : function(value, type){

      if(type == 'b'){
        this.ref.b.id = value.book.id
        this.ref.b.abb = value.book.abb
        $( "#book" ).panel( "close" )
        this.chapters = value.book.cs

      }else if (type == 'c' ) {
        this.ref.c = value.index + 1
        $( "#chapter" ).panel( "close" )
        this.verses = this.chapters[value.index]

      }else if (type == 'v') {
        $( "#verse" ).panel( "close" )
        console.log(value)
        this.ref.v.v = value.v
        this.getText()

      }else if(type == 'p'){
        this.ref.p = value.persona
        $( "#persona" ).panel( "close" )

      }

    },
    getVerses : function(){
      var v=[];
      for(var i=0;i<this.verses;i +=1){
        v[i] = i + 1
      }
      return v
    },
    getText : function(){
      var that = this
      $.ajax(vm.urlroot + "/verse/text/" + this.ref.b.id + "/" + this.ref.c + "/" + this.ref.v.v, {
        complete : function(data){
          //console.log(data.responseJSON)
          that.ref.v = data.responseJSON
        },
        method: 'get'
      })
    },
    saveQuestion : function(){
      console.log(this.ref)
      $.ajax(vm.urlroot + "/question", {
        data: {'p': this.ref.p.id, 'v':this.ref.v.id, 't':this.ref.t, 'owner': this.ref.owner.userID},
        complete : function(data){
          console.log(data)
        },
        method : 'post'
      })
    }
  },

  data: {

    books: bible,
    chapters: null,
    verses:null,
    ref: {
      b: {abb:'Livro', id: 0},
      c:'Capítulo',
      v:{ id: 0, t: 'texto do versículo', v: 'versículo'},
      p: { id: 0, name:"Personagem"},
      t: 'texto da pergunta',
      owner: {userID:'0', name: 'nome do perguntador'}},
      verses : null,
      letters: personages,
      urlroot : "http://localhost"

    },
    mounted: function(){
      console.log('mounted')
    }
  })
