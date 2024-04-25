/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : <https://store.webkul.com/license.html/> */

odoo.define('saas_kit_custom_plan.update_app', function (require) {
    var rpc = require('web.rpc');
    var ajax = require('web.ajax');
    var apps = new Array();
    $('#error_message').hide();

        $('#add_apps_icon_div, #add_app_span_1').click(function(){
            var contract_id = parseInt($('#add_apps_submit').attr('value'));
            rpc.query({
                model: 'saas.contract',
                method: 'get_module',
                args: [contract_id],
            })
            .then(function(data){
                if (data){
                    apps.length = 0;
                    $('.apps_to_select_button').css('display', 'inline');
                    $('.apps_selected_button').css('display', 'none');
                    $('.apps_to_add_data_row').css('background', '#FFFFFF');
                    $("#add_apps").modal("toggle");
                }
            });
        });

        $('#add_apps_submit').click(function(){
            if (apps.length == 0){
                alert('Please Select Atleast One App to continue !')
                return
            }
            var contract_id = parseInt($('#add_apps_submit').attr('value'));
            // rpc.query({
            //     model: 'saas.contract',
            //     method: 'add_apps',
            //     args: [apps, contract_id],
            // })
            // .then(function(data){
            //     $('#add_apps').modal('hide');
            //     location.href='/my/saas/contract/'+contract_id+'?access_token='+data
            // });
            ajax.jsonRpc("/my/saas/contract/add/apps", 'call', {
                'apps': apps, 'contract_id':contract_id,
            }).then(function(data){
                // alert("after ajax add_apps_submit");
                $('#add_apps').modal('hide');
                $('#apps_tbody').replaceWith(data);
            });
        });

        $('.apps_to_select_button').click(function(ev){
            var technical_name = $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_to_add_tech_name').text();
            apps.push(technical_name);
            $(ev.currentTarget).closest('.apps_to_add_data_row').css('background', 'rgba(141, 255, 87, 0.2)');
            $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_selected_button').css('display', 'inline');
            $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_to_select_button').css('display', 'none');
        });

        $('.apps_selected_button').click(function(ev){
            var technical_name = $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_to_add_tech_name').text();
            apps.splice($.inArray(technical_name, apps), 1);
            $(ev.currentTarget).closest('.apps_to_add_data_row').css('background', '#FFFFFF');
            $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_selected_button').css('display', 'none');
            $(ev.currentTarget).closest('.apps_to_add_img_row').find('.apps_to_select_button').css('display', 'inline');
        });
});