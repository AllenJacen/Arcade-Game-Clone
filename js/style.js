/**
 * Created by Administrator on 2017/8/28.
 */
$(function(){
    $('button').on('click',function(e){
        $('#selected').show();

        $(document).one("click", function(){
            $('#selected').hide();
        });
        e.stopPropagation();
    });
    $('#selected').on("click", function(e){
        e.stopPropagation();
    });
    $('#selected li img').on('click',function(){
        that=this.name;
        $('#imgs img').attr({
            src:"images/player-imgs/"+that+".png"
        });
        player.sprite='images/'+this.name+'.png';
    });
});
