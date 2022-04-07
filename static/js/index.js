//******************************************************************* */
//VALIDATION FORM
//******************************************************************* */
let validator;

jQuery.validator.addMethod(
    "regex",
     function(value, element, regexp) {
         if (regexp.constructor != RegExp)
            regexp = new RegExp(regexp);
         else if (regexp.global)
            regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
     },"erreur expression reguliere"
);

const formQuoteValidation = () => {
    validator = $("#form_quote").validate({
        errorElement: "em",
        errorPlacement: function ( error, element ) {
            element.addClass( "is-invalid" );
            if ( element.prop( "type" ) === "checkbox" ) {
                error.insertAfter( element.parent( "label" ) );
            } else {
                error.insertAfter( element );
            }
        },
        highlight: function ( element ) {
            $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
        },
        unhighlight: function ( element ) {
            $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
        },
        rules: {
            content:{
                required: true,
                minlength: 10,
                maxlength: 500
            },
            author:{
                required:true,
                minlength:2,
                maxlength:100,
                "regex": /[a-zA-Z ]+/
            }
        }
    })
}

//Modification des messages d'erreurs
jQuery.extend(jQuery.validator.messages, {
    required: "Ce champ est obligatoire",
    maxlength: jQuery.validator.format("Ce champ doit contenir au moins {0} caractères."),
    minlength: jQuery.validator.format("{0} caractères minimum.")
});

//******************************************************************* */
//GESTION DU FORMULAIRE
//******************************************************************* */
$(document).ready(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $("#return_btn").remove();
    }
    $("#submit_form_quote").prop("disabled", false);
    $("#tags").select2({
        placeholder: "Ajoutez des tags",
        allowClear: true,
        tags: true,
        language: "fr"
    });

    if($("#author").val().length > 0){
        $("#author_string").html(`${$("#author").val().length} /100 caractères`);
    }
    if($("#content").val().length > 0){
        $("#content_string").html(`${$("#content").val().length} /500 caractères`);
    }
    
    $("#content").on('keyup', function(e){
        $("#content_string").html(`${e.target.value.length} /500 caractères`);
        if(e.target.value.length === 500){
            $("#content_string").html(`${e.target.value.length} /500 Limite atteinte`);
        }
        if(e.target.value.length > 9){
            $("#content").removeClass('is-invalid');
            $("#content").addClass('is-valid');
        }else{
            $("#content").removeClass('is-valid');
            $("#content").addClass('is-invalid');
        }
    });

    $("#author").on('keyup', function(e){
        $("#author_string").html(`${e.target.value.length} /100 caractères`);
        if(e.target.value.length === 500){
            $("#author_string").html(`${e.target.value.length} /100 Limite atteinte`);
        }
        if(e.target.value.length > 1){
            $("#author").removeClass('is-invalid');
            $("#author").addClass('is-valid');
        }else{
            $("#author").removeClass('is-valid');
            $("#author").addClass('is-invalid');
        }
    });

    $("#submit_form_quote").on('click', function(){
        submit_form();
    });

    //Gestion de l'ajout d'un tags
    // $("#create_tag")

});

const submit_form = () => {
    formQuoteValidation();
    if($("#form_quote").valid()){
        validator.destroy();
        $("#form_quote").submit();
    }
}
